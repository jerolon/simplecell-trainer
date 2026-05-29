"""
Tolerant parser for the project's data/*.js files.

The data files are plain JavaScript that assign array/object literals to top
level `var` bindings (STEPS, REAGENT_DB, QUESTIONS, ...).  They are *almost*
JSON but use unquoted object keys, single-line comments, trailing commas, JS
string escapes (including ES6 ``\\u{...}``) and raw unicode (µ, °, emoji).

We parse them directly so that every protocol value comes straight from the
source of truth -- nothing is re-typed by hand.  This module exposes
``load_data()`` which returns a dict of the top level bindings we care about.
"""

from __future__ import annotations

import os

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")


class JSValueParser:
    """Recursive-descent parser for the JS-literal subset used in data/*.js."""

    def __init__(self, text: str, pos: int = 0):
        self.s = text
        self.i = pos
        self.n = len(text)

    # -- low level helpers ------------------------------------------------
    def _skip_ws(self):
        while self.i < self.n:
            c = self.s[self.i]
            if c in " \t\r\n":
                self.i += 1
            elif c == "/" and self.i + 1 < self.n and self.s[self.i + 1] == "/":
                self.i += 2
                while self.i < self.n and self.s[self.i] != "\n":
                    self.i += 1
            elif c == "/" and self.i + 1 < self.n and self.s[self.i + 1] == "*":
                self.i += 2
                while self.i + 1 < self.n and not (
                    self.s[self.i] == "*" and self.s[self.i + 1] == "/"
                ):
                    self.i += 1
                self.i += 2
            else:
                break

    def _err(self, msg):
        snippet = self.s[max(0, self.i - 30): self.i + 30]
        raise ValueError(f"{msg} at pos {self.i}: ...{snippet!r}...")

    # -- value dispatch ---------------------------------------------------
    def parse_value(self):
        self._skip_ws()
        if self.i >= self.n:
            self._err("unexpected end of input")
        c = self.s[self.i]
        if c == "{":
            return self._object()
        if c == "[":
            return self._array()
        if c in "\"'":
            return self._string()
        if c == "-" or c.isdigit():
            return self._number()
        return self._keyword()

    def _keyword(self):
        for word, val in (("true", True), ("false", False), ("null", None)):
            if self.s.startswith(word, self.i):
                self.i += len(word)
                return val
        self._err("unexpected token")

    def _string(self):
        quote = self.s[self.i]
        self.i += 1
        out = []
        simple = {
            "n": "\n", "t": "\t", "r": "\r", "b": "\b", "f": "\f",
            "\\": "\\", "/": "/", '"': '"', "'": "'", "`": "`", "\n": "",
        }
        while self.i < self.n:
            c = self.s[self.i]
            if c == "\\":
                nxt = self.s[self.i + 1]
                if nxt == "u":
                    if self.s[self.i + 2] == "{":
                        j = self.i + 3
                        hexs = ""
                        while self.s[j] != "}":
                            hexs += self.s[j]
                            j += 1
                        out.append(chr(int(hexs, 16)))
                        self.i = j + 1
                    else:
                        hexs = self.s[self.i + 2: self.i + 6]
                        out.append(chr(int(hexs, 16)))
                        self.i += 6
                elif nxt == "x":
                    out.append(chr(int(self.s[self.i + 2: self.i + 4], 16)))
                    self.i += 4
                else:
                    out.append(simple.get(nxt, nxt))
                    self.i += 2
            elif c == quote:
                self.i += 1
                return "".join(out)
            else:
                out.append(c)
                self.i += 1
        self._err("unterminated string")

    def _number(self):
        start = self.i
        if self.s[self.i] == "-":
            self.i += 1
        while self.i < self.n and self.s[self.i] in "0123456789.eE+-":
            self.i += 1
        text = self.s[start:self.i]
        if any(ch in text for ch in ".eE"):
            return float(text)
        return int(text)

    def _array(self):
        self.i += 1  # consume [
        out = []
        while True:
            self._skip_ws()
            if self.s[self.i] == "]":
                self.i += 1
                return out
            out.append(self.parse_value())
            self._skip_ws()
            if self.s[self.i] == ",":
                self.i += 1
            elif self.s[self.i] == "]":
                self.i += 1
                return out
            else:
                self._err("expected ',' or ']'")

    def _object(self):
        self.i += 1  # consume {
        out = {}
        while True:
            self._skip_ws()
            if self.s[self.i] == "}":
                self.i += 1
                return out
            # key: quoted string or bare identifier
            if self.s[self.i] in "\"'":
                key = self._string()
            else:
                start = self.i
                while self.s[self.i] not in " \t\r\n:":
                    self.i += 1
                key = self.s[start:self.i]
            self._skip_ws()
            if self.s[self.i] != ":":
                self._err("expected ':'")
            self.i += 1
            out[key] = self.parse_value()
            self._skip_ws()
            if self.s[self.i] == ",":
                self.i += 1
            elif self.s[self.i] == "}":
                self.i += 1
                return out
            else:
                self._err("expected ',' or '}'")


def _extract(text: str, var_name: str):
    """Find ``var NAME =`` and parse the literal that follows."""
    needle = "var " + var_name
    idx = text.find(needle)
    if idx < 0:
        raise ValueError(f"{var_name} not found")
    eq = text.index("=", idx + len(needle))
    parser = JSValueParser(text, eq + 1)
    return parser.parse_value()


def _read(filename: str) -> str:
    with open(os.path.join(DATA_DIR, filename), encoding="utf-8") as fh:
        return fh.read()


def load_data():
    steps_src = _read("steps.js")
    reagents_src = _read("reagents.js")
    questions_src = _read("questions.js")
    return {
        "STEPS": _extract(steps_src, "STEPS"),
        "LIBRARY_STRUCTURE": _extract(steps_src, "LIBRARY_STRUCTURE"),
        "SEQUENCER_TABLE": _extract(steps_src, "SEQUENCER_TABLE"),
        "REAGENT_DB": _extract(reagents_src, "REAGENT_DB"),
        "QUESTIONS": _extract(questions_src, "QUESTIONS"),
        "ORDERING_CHALLENGES": _extract(questions_src, "ORDERING_CHALLENGES"),
    }


if __name__ == "__main__":
    data = load_data()
    for key, val in data.items():
        print(f"{key}: {len(val)} entries")
