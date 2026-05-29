#!/usr/bin/env python3
"""
Static site generator for the SimpleCell Protocol Trainer.

Reads the protocol content from data/*.js (the single source of truth) and
emits a fully static, zero-JavaScript index.html.  The only interactive piece
that genuinely needs scripting -- the gamified quiz -- is rendered as static,
readable HTML that the isolated assets/js/quiz.js island progressively
enhances.  Everything else (step cards, the reagent reference panels, filters)
works with pure HTML5 + CSS.

Run:  python3 build/generate.py
"""

from __future__ import annotations

import html
import os
import re

from parse_data import load_data

ROOT = os.path.dirname(os.path.dirname(__file__))
OUT = os.path.join(ROOT, "index.html")

VERSION = "CS GENETICS 3' GEX v1.12"


# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------
def esc(text) -> str:
    return html.escape(str(text), quote=False)


def attr(text) -> str:
    return html.escape(str(text), quote=True)


def slug(key: str) -> str:
    s = re.sub(r"[^A-Za-z0-9]+", "-", key).strip("-")
    return s or "x"


def build_reagent_slugs(reagent_db):
    slugs = {}
    seen = {}
    for key in reagent_db:
        base = slug(key)
        s = base
        n = 2
        while s in seen:
            s = f"{base}-{n}"
            n += 1
        seen[s] = key
        slugs[key] = s
    return slugs


def make_linkifier(reagent_db, slugs):
    """Return fn(text)->html that escapes text and links reagent terms."""
    keys = sorted(reagent_db.keys(), key=len, reverse=True)
    alternation = "|".join(re.escape(k) for k in keys)
    # match a key only when not flanked by another alphanumeric character
    pattern = re.compile(r"(?<![A-Za-z0-9])(" + alternation + r")(?![A-Za-z0-9])")

    def repl(m):
        term = m.group(1)
        return f'<label class="rlink" for="cb-{slugs[term]}">{esc(term)}</label>'

    def linkify(text):
        return pattern.sub(repl, esc(text))

    return linkify


def steps_label(nums):
    return ", ".join(f"Step {n}" for n in nums)


# ---------------------------------------------------------------------------
# reagent reference layer (pure-CSS checkbox panels)
# ---------------------------------------------------------------------------
def render_reagent_layer(reagent_db, slugs):
    out = ['<div class="reagent-layer">']
    for key, r in reagent_db.items():
        sid = slugs[key]
        cb = f"cb-{sid}"
        out.append(f'<input type="checkbox" id="{cb}" class="reagent-toggle" hidden>')
        out.append('<div class="reagent-panel">')
        out.append(f'<label class="reagent-backdrop" for="{cb}" aria-label="Close"></label>')
        out.append(f'<aside class="reagent-card" role="dialog" aria-label="{attr(key)}">')
        out.append(f'<label class="reagent-close" for="{cb}" aria-label="Close">&#10005;</label>')
        out.append(f'<h3 class="reagent-name">{esc(key)}</h3>')
        if r.get("fullName"):
            out.append(f'<p class="reagent-full">{esc(r["fullName"])}</p>')
        if r.get("link"):
            out.append(
                f'<a class="reagent-link" href="{attr(r["link"])}" target="_blank" '
                f'rel="noopener noreferrer">&#128279; More info &#8594;</a>'
            )
        if r.get("image"):
            out.append(f'<img class="reagent-img" src="{attr(r["image"])}" alt="{attr(key)}" loading="lazy">')
        chips = []
        if r.get("box"):
            chips.append(f'<span class="chip chip-box">{esc(r["box"])}</span>')
        if r.get("capColor"):
            chips.append(f'<span class="chip">{esc(r["capColor"])}</span>')
        if chips:
            out.append('<div class="reagent-chips">' + "".join(chips) + "</div>")
        if r.get("usedIn"):
            out.append(f'<p class="reagent-usedin">Used in: {esc(steps_label(r["usedIn"]))}</p>')
        if r.get("handling"):
            out.append('<h4 class="reagent-subhead">Handling</h4>')
            out.append('<ul class="reagent-handling">')
            for h in r["handling"]:
                out.append(f"<li>{esc(h)}</li>")
            out.append("</ul>")
        sc = r.get("scaling")
        if sc:
            out.append(f'<h4 class="reagent-subhead reagent-subhead--alt">{esc(sc["title"])}</h4>')
            out.append('<table class="reagent-scaling"><thead><tr>')
            for c in sc["cols"]:
                out.append(f"<th>{esc(c)}</th>")
            out.append("</tr></thead><tbody>")
            for row in sc["rows"]:
                out.append("<tr>" + "".join(f"<td>{esc(c)}</td>" for c in row) + "</tr>")
            out.append("</tbody></table>")
        out.append("</aside></div>")
    out.append("</div>")
    return "\n".join(out)


# ---------------------------------------------------------------------------
# step cards
# ---------------------------------------------------------------------------
def render_thermo(prog):
    return (
        '<div class="thermo">'
        f'<div class="thermo-head">&#127777;&#65039; {esc(prog["name"])} '
        f'<span class="thermo-meta">Vol: {esc(prog["vol"])} &middot; ~{esc(prog["time"])}</span></div>'
        f'<pre class="thermo-steps">{esc(prog["steps"])}</pre>'
        "</div>"
    )


def render_mastermixes(mixes):
    out = ['<div class="mm-group">']
    for m in mixes:
        lines = []
        if m.get("per1"):
            lines.append(f'<div class="mm-line"><span>1&times;</span> {esc(m["per1"])}</div>')
        if m.get("per8"):
            lines.append(f'<div class="mm-line"><span>8&times;</span> {esc(m["per8"])}</div>')
        if m.get("note"):
            lines.append(f'<div class="mm-note">{esc(m["note"])}</div>')
        out.append(
            '<div class="mm">'
            f'<div class="mm-name">&#129514; {esc(m["name"])}</div>'
            + "".join(lines)
            + "</div>"
        )
    out.append("</div>")
    return "\n".join(out)


def render_reagent_table(rt):
    out = [f'<div class="rtable"><div class="rtable-title">{esc(rt["title"])}</div><table><tbody>']
    for row in rt["rows"]:
        out.append("<tr>" + "".join(f"<td>{esc(c)}</td>" for c in row) + "</tr>")
    out.append("</tbody></table></div>")
    return "".join(out)


def render_step(step, linkify):
    phase = step["phase"]
    color = step["color"]
    sid = step["id"]
    parts = [
        f'<section class="step" id="step-{sid}" data-phase="{attr(phase)}" '
        f'data-step="{sid}" style="--c:{attr(color)}">'
    ]
    phase_label = "PRE-PCR" if phase == "pre" else "POST-PCR"
    parts.append(
        '<div class="step-summary">'
        f'<span class="step-icon">{esc(step["icon"])}</span>'
        f'<span class="step-id">STEP {sid}</span>'
        f'<span class="phase-tag phase-{attr(phase)}">{phase_label}</span>'
        f'<span class="step-name">{esc(step["name"])}</span>'
        f'<span class="step-dur">{esc(step["duration"])}</span>'
        "</div>"
    )
    parts.append('<div class="step-body">')
    parts.append(f'<p class="step-blurb">{linkify(step["summary"])}</p>')

    if step.get("thermoProgram"):
        parts.append(render_thermo(step["thermoProgram"]))
    if step.get("masterMixes"):
        parts.append(render_mastermixes(step["masterMixes"]))
    if step.get("reagentTable"):
        parts.append(render_reagent_table(step["reagentTable"]))

    for sec in step.get("details", []):
        title = (f'{sec["sub"]}. ' if sec.get("sub") else "") + sec["title"]
        parts.append('<div class="detail">')
        parts.append(f'<h4 class="detail-title">{esc(title)}</h4>')
        if sec.get("image"):
            parts.append(
                f'<img class="detail-img" src="{attr(sec["image"])}" '
                f'alt="{attr(sec["title"])}" loading="lazy">'
            )
        parts.append('<ol class="detail-steps">')
        for line in sec["steps"]:
            parts.append(f"<li>{linkify(line)}</li>")
        parts.append("</ol></div>")

    if step.get("criticalNotes"):
        parts.append('<div class="critical"><div class="critical-head">&#9888; Critical notes</div><ul>')
        for note in step["criticalNotes"]:
            parts.append(f"<li>{linkify(note)}</li>")
        parts.append("</ul></div>")

    parts.append(
        f'<a class="btn-test" href="#quiz" data-step="{sid}">'
        f'&#9889; Test me on Step {sid}</a>'
    )
    parts.append("</div></section>")
    return "\n".join(parts)


def render_steps_section(steps, linkify):
    pre = sum(1 for s in steps if s["phase"] == "pre")
    post = len(steps) - pre
    out = [
        '<section id="steps" class="panel">',
        '<div class="panel-inner">',
        '<header class="panel-head"><span class="panel-tag">01</span>'
        "<h2>Protocol steps</h2>"
        "<p class=\"panel-lead\">All 14 steps, laid out in full. Jump to any step "
        "from the sidebar, and tap a <span class=\"rlink-demo\">reagent</span> term "
        "for handling notes, images and scaling tables.</p></header>",
        # pure-CSS phase filter
        '<div class="filter" role="radiogroup" aria-label="Filter steps by phase">',
        '<input type="radio" name="phase-filter" id="f-all" class="filter-input" checked hidden>'
        f'<label for="f-all" class="filter-btn">All ({len(steps)})</label>',
        '<input type="radio" name="phase-filter" id="f-pre" class="filter-input" hidden>'
        f'<label for="f-pre" class="filter-btn">Pre-PCR ({pre})</label>',
        '<input type="radio" name="phase-filter" id="f-post" class="filter-input" hidden>'
        f'<label for="f-post" class="filter-btn">Post-PCR ({post})</label>',
        '<div class="steps">',
    ]
    for step in steps:
        out.append(render_step(step, linkify))
    out.append("</div></div></div></section>")
    return "\n".join(out)


# ---------------------------------------------------------------------------
# overview + pipeline
# ---------------------------------------------------------------------------
def render_hero(steps, n_questions, n_ordering):
    return f"""
<section id="overview" class="panel panel--hero">
  <div class="panel-inner">
    <div class="hero-mark">&#129516;</div>
    <h1 class="hero-title">SimpleCell Protocol Trainer</h1>
    <p class="hero-sub">Master the CS Genetics 3&#8242; Gene Expression Assay &mdash;
       a single-cell library prep without droplets or wells.</p>
    <div class="stat-grid">
      <div class="stat"><span class="stat-n">{len(steps)}</span><span class="stat-l">Steps</span></div>
      <div class="stat"><span class="stat-n">{n_questions}</span><span class="stat-l">Questions</span></div>
      <div class="stat"><span class="stat-n">{n_ordering}</span><span class="stat-l">Ordering</span></div>
      <div class="stat"><span class="stat-n">2</span><span class="stat-l">Phases</span></div>
    </div>
    <div class="hero-cta">
      <a class="btn btn-primary" href="#steps">&#128214; Study the protocol</a>
      <a class="btn btn-ghost" href="#quiz">&#9889; Challenge mode</a>
    </div>
  </div>
</section>"""




# ---------------------------------------------------------------------------
# library / sequencing
# ---------------------------------------------------------------------------
def render_library(library_structure, sequencer_table):
    segs = "".join(
        f'<div class="lib-seg" style="--c:{attr(seg["color"])}">'
        f'<span class="seg-name">{esc(seg["name"])}</span>'
        + (f'<span class="seg-read">{esc(seg["read"])}</span>' if seg.get("read") else "")
        + "</div>"
        for seg in library_structure
    )
    seqs = "".join(
        f'<div class="seq-tile"><span class="seq-name">{esc(s["name"])}</span>'
        f'<strong class="seq-load">{esc(s["loading"])}</strong></div>'
        for s in sequencer_table
    )
    return f"""
<section id="library" class="panel">
  <div class="panel-inner">
    <header class="panel-head"><span class="panel-tag">03</span>
      <h2>Library &amp; sequencing</h2>
      <p class="panel-lead">Final library structure, read layout and loading concentrations.</p>
    </header>
    <h3 class="sub-h">Library structure (5&#8242;&#8594;3&#8242;)</h3>
    <div class="lib-segments">{segs}</div>
    <p class="lib-reads">R1: 92cy &middot; I1: 10cy &middot; I2: 10cy &middot; R2: 26cy</p>
    <h3 class="sub-h">Sequencer loading</h3>
    <div class="seq-grid">{seqs}</div>
    <p class="lib-foot">30,000 reads/cell &middot; 2% PhiX &middot; 600&ndash;800 bp average insert</p>
  </div>
</section>"""


# ---------------------------------------------------------------------------
# reagents grid
# ---------------------------------------------------------------------------
def render_reagents_section(reagent_db, slugs):
    # group by box, preserving first-seen order
    groups = {}
    order = []
    for key, r in reagent_db.items():
        box = r.get("box", "Other")
        if box not in groups:
            groups[box] = []
            order.append(box)
        groups[box].append(key)
    out = [
        '<section id="reagents" class="panel">',
        '<div class="panel-inner">',
        '<header class="panel-head"><span class="panel-tag">02</span>'
        "<h2>Reagent reference</h2>"
        '<p class="panel-lead">Tap any reagent for handling notes, kit location, '
        "images and master-mix scaling.</p></header>",
    ]
    for box in order:
        out.append(f'<h3 class="sub-h">{esc(box)}</h3>')
        out.append('<div class="reagent-grid">')
        for key in groups[box]:
            r = reagent_db[key]
            sid = slugs[key]
            full = esc(r.get("fullName", ""))
            out.append(
                f'<label class="reagent-tile" for="cb-{sid}">'
                f'<span class="tile-term">{esc(key)}</span>'
                f'<span class="tile-full">{full}</span></label>'
            )
        out.append("</div>")
    out.append("</div></section>")
    return "\n".join(out)


# ---------------------------------------------------------------------------
# quiz (static, progressively enhanced)
# ---------------------------------------------------------------------------
def render_quiz(questions, ordering, linkify):
    out = [
        '<section id="quiz" class="panel">',
        '<div class="panel-inner">',
        '<header class="panel-head"><span class="panel-tag">04</span>'
        "<h2>Challenge mode</h2>"
        '<p class="panel-lead">Test yourself. With JavaScript enabled this becomes a '
        "scored quiz with XP, levels and streaks; without it, every question below "
        "is a self-check card &mdash; pick an answer, then reveal it.</p></header>",
        # HUD + controls are revealed by quiz.js only
        '<div class="quiz-hud" hidden></div>',
        '<ol class="quiz-list">',
    ]
    for qi, q in enumerate(questions):
        steps_attr = ",".join(str(s) for s in q.get("step", []))
        out.append(
            f'<li class="quiz-q" data-diff="{q["diff"]}" data-cat="{attr(q.get("cat",""))}" '
            f'data-steps="{attr(steps_attr)}">'
        )
        out.append(f'<p class="q-text">{linkify(q["q"])}</p>')
        # render correct first, then wrongs; correct flagged with data-correct
        options = [(q["a"], True)] + [(w, False) for w in q["wrong"]]
        out.append('<ol class="q-options" type="A">')
        for text, correct in options:
            flag = " data-correct" if correct else ""
            out.append(f'<li class="q-opt"{flag}>{esc(text)}</li>')
        out.append("</ol>")
        out.append(
            '<details class="q-reveal"><summary>Show answer &amp; hint</summary>'
            f'<p class="q-answer">&#10003; {esc(q["a"])}</p>'
            + (f'<p class="q-hint">&#128161; {esc(q["hint"])}</p>' if q.get("hint") else "")
            + "</details>"
        )
        out.append("</li>")
    out.append("</ol>")

    # ordering challenges
    out.append('<h3 class="sub-h sub-h--order">Ordering challenges</h3>')
    out.append('<ol class="quiz-list quiz-list--order">')
    for q in ordering:
        steps_attr = ",".join(str(s) for s in q.get("steps", []))
        out.append(
            f'<li class="quiz-order" data-diff="{q["diff"]}" data-steps="{attr(steps_attr)}">'
        )
        out.append(f'<p class="q-text">{esc(q["q"])}</p>')
        out.append('<ol class="order-items">')
        for item in q["items"]:
            out.append(f'<li class="order-item">{esc(item)}</li>')
        out.append("</ol>")
        if q.get("hint"):
            out.append(
                '<details class="q-reveal"><summary>Show hint</summary>'
                f'<p class="q-hint">&#128161; {esc(q["hint"])}</p></details>'
            )
        out.append("</li>")
    out.append("</ol>")
    out.append("</div></section>")
    return "\n".join(out)


# ---------------------------------------------------------------------------
# nav + shell
# ---------------------------------------------------------------------------
# top-bar section links (the former sidebar menu)
NAV_ITEMS = [
    ("overview", "Overview"),
    ("steps", "Steps"),
    ("reagents", "Reagents"),
    ("library", "Library"),
    ("quiz", "Challenge"),
]


def render_sidebar(steps):
    """Big-Picture style fixed sidebar — now a full protocol-step navigator."""
    groups = [("pre", "Pre-PCR"), ("post", "Post-PCR")]
    blocks = []
    for phase, label in groups:
        items = [s for s in steps if s["phase"] == phase]
        if not items:
            continue
        rows = "".join(
            f'<a class="side-step" href="#step-{s["id"]}" style="--c:{attr(s["color"])}">'
            f'<span class="ss-dot" aria-hidden="true"></span>'
            f'<span class="ss-icon">{esc(s["icon"])}</span>'
            f'<span class="ss-id">{s["id"]:02d}</span>'
            f'<span class="ss-name">{esc(s["name"])}</span></a>'
            for s in items
        )
        blocks.append(f'<p class="side-phase side-phase--{phase}">{esc(label)}</p>{rows}')
    nav = "".join(blocks)
    return f"""
<input type="checkbox" id="nav-toggle" class="nav-toggle" hidden>
<nav id="sidebar" class="sidebar">
  <a class="brand" href="#overview">
    <span class="brand-mark">&#129516;</span>
    <span class="brand-text">SIMPLECELL<br><small>TRAINER</small></span>
  </a>
  <div class="side-steps">{nav}</div>
  <div class="sidebar-foot">{esc(VERSION)}</div>
</nav>"""


def render_topbar():
    """Sticky top bar carrying the section menu (former sidebar links)."""
    links = "".join(
        f'<a class="topnav-link" href="#{slug_id}">{esc(label)}</a>'
        for slug_id, label in NAV_ITEMS
    )
    return (
        '<header class="topbar">'
        '<label for="nav-toggle" class="nav-burger" aria-label="Toggle step navigator">'
        '<span></span><span></span><span></span>'
        '<em>Steps</em></label>'
        f'<nav class="topnav">{links}</nav>'
        "</header>"
    )


def build():
    data = load_data()
    steps = data["STEPS"]
    reagent_db = data["REAGENT_DB"]
    slugs = build_reagent_slugs(reagent_db)
    linkify = make_linkifier(reagent_db, slugs)

    body = "\n".join([
        render_reagent_layer(reagent_db, slugs),
        render_sidebar(steps),
        '<main id="main" class="main">',
        render_topbar(),
        render_hero(steps, len(data["QUESTIONS"]), len(data["ORDERING_CHALLENGES"])),
        render_steps_section(steps, linkify),
        render_reagents_section(reagent_db, slugs),
        render_library(data["LIBRARY_STRUCTURE"], data["SEQUENCER_TABLE"]),
        render_quiz(data["QUESTIONS"], data["ORDERING_CHALLENGES"], linkify),
        '<footer class="site-foot">'
        '<p>SimpleCell Protocol Trainer &middot; '
        f'{esc(VERSION)} &middot; Built from the CS Genetics protocol.</p>'
        '<p class="credit">Design blended from the '
        '<a href="https://html5up.net/" target="_blank" rel="noopener noreferrer">HTML5&nbsp;UP</a> '
        'templates '
        '<a href="https://html5up.net/big-picture" target="_blank" rel="noopener noreferrer">Big&nbsp;Picture</a>, '
        '<a href="https://html5up.net/fractal" target="_blank" rel="noopener noreferrer">Fractal</a> and '
        '<a href="https://html5up.net/spectral" target="_blank" rel="noopener noreferrer">Spectral</a> '
        '(free for personal &amp; commercial use under the '
        '<a href="https://html5up.net/license" target="_blank" rel="noopener noreferrer">CCA&nbsp;3.0</a> license).</p>'
        "</footer>",
        "</main>",
    ])

    doc = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Interactive trainer for the CS Genetics SimpleCell 3' Gene Expression single-cell assay.">
<title>SimpleCell Protocol Trainer</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;600;700;900&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/site.css">
</head>
<body>
<!-- ============================================================
     This file is GENERATED by build/generate.py from data/*.js.
     Edit the data files (or the generator), then re-run:
         python3 build/generate.py
     The site is pure HTML5 + CSS. The only script is the
     isolated, optional quiz island: assets/js/quiz.js
     ============================================================ -->
{body}
<!-- Navigation scroll-spy: highlights the current step/section. -->
<script src="assets/js/nav.js" defer></script>
<!-- Quiz island: optional progressive enhancement, isolated from the rest of the site. -->
<script src="assets/js/quiz.js" defer></script>
</body>
</html>
"""
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(doc)
    print(f"Wrote {OUT} ({len(doc):,} bytes)")
    print(f"  {len(steps)} steps, {len(reagent_db)} reagents, "
          f"{len(data['QUESTIONS'])} questions, {len(data['ORDERING_CHALLENGES'])} ordering")


if __name__ == "__main__":
    build()
