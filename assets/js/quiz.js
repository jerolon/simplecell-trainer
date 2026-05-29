/* ===========================================================================
   SimpleCell Protocol Trainer — quiz island
   ---------------------------------------------------------------------------
   This is the ONLY script in the site. It is optional: if it never runs, the
   quiz section degrades to a static list of self-check cards (question +
   options + reveal-the-answer). When it does run, it progressively enhances
   that same static markup into a gamified quiz (XP, levels, streaks, random
   draw, difficulty + per-step filtering, ordering challenges).

   It reads all its data from the DOM the generator already produced, so there
   is no separate data file to keep in sync. Vanilla JS, no dependencies.
   =========================================================================== */
(function () {
  "use strict";

  var section = document.getElementById("quiz");
  if (!section) return;

  // ---- read content out of the static markup -----------------------------
  function txt(el) { return el ? el.textContent.trim() : ""; }
  function stripIcon(s) { return s.replace(/^[^\w(]+\s*/, "").trim(); }

  var QUESTIONS = [].map.call(section.querySelectorAll(".quiz-q"), function (li) {
    var opts = [].map.call(li.querySelectorAll(".q-opt"), function (o) {
      return { text: txt(o), correct: o.hasAttribute("data-correct") };
    });
    return {
      q: txt(li.querySelector(".q-text")),
      diff: parseInt(li.dataset.diff, 10) || 1,
      cat: li.dataset.cat || "",
      steps: (li.dataset.steps || "").split(",").filter(Boolean).map(Number),
      options: opts,
      answer: (opts.filter(function (o) { return o.correct; })[0] || {}).text || "",
      hint: stripIcon(txt(li.querySelector(".q-hint")))
    };
  });

  var ORDERING = [].map.call(section.querySelectorAll(".quiz-order"), function (li) {
    return {
      q: txt(li.querySelector(".q-text")),
      diff: parseInt(li.dataset.diff, 10) || 1,
      steps: (li.dataset.steps || "").split(",").filter(Boolean).map(Number),
      items: [].map.call(li.querySelectorAll(".order-item"), txt),
      hint: stripIcon(txt(li.querySelector(".q-hint")))
    };
  });

  if (!QUESTIONS.length && !ORDERING.length) return;

  // ---- gamification rules (mirrors the original trainer) ------------------
  var LEVELS = [
    { min: 0,    title: "Lab Intern" },
    { min: 50,   title: "Bench Scientist" },
    { min: 150,  title: "Protocol Pro" },
    { min: 350,  title: "Assay Expert" },
    { min: 600,  title: "Single-Cell Wizard" },
    { min: 1000, title: "Protocol Master 🧬" }
  ];
  function levelFor(xp) {
    var i = LEVELS.length - 1;
    while (i > 0 && xp < LEVELS[i].min) i--;
    var cur = LEVELS[i], next = LEVELS[i + 1] || null;
    return { level: i + 1, title: cur.title, prev: cur.min, next: next ? next.min : null };
  }
  function xpFor(diff, streak) {
    return (diff === 1 ? 10 : diff === 2 ? 25 : 50) + Math.min(streak, 5) * 5;
  }
  function shuffle(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }
  function stepName(n) {
    var el = document.querySelector("#step-" + n + " .step-name");
    return el ? el.textContent.trim() : "Step " + n;
  }

  // ---- state --------------------------------------------------------------
  var state = {
    xp: 0, streak: 0, best: 0, answered: 0, correct: 0,
    diff: 0, stepFilter: null, asked: {}, current: null
  };

  // ---- build the shell ----------------------------------------------------
  section.classList.add("js-quiz");
  var hud = section.querySelector(".quiz-hud");
  hud.removeAttribute("hidden");
  hud.innerHTML =
    '<div class="hud-top">' +
      '<div class="hud-level"><span class="hud-lvl"></span><div class="xp-bar"><i></i></div></div>' +
      '<div class="hud-xp">0 XP</div>' +
    '</div>' +
    '<div class="hud-stats">' +
      '<span>Streak <b class="s-streak">0</b></span>' +
      '<span>Best <b class="s-best">0</b></span>' +
      '<span>Answered <b class="s-answered">0</b></span>' +
      '<span>Accuracy <b class="s-acc">&mdash;</b></span>' +
    '</div>' +
    '<div class="step-badge" hidden><span class="step-badge-text"></span>' +
      '<button type="button" class="clear-step">&#10005; All steps</button></div>' +
    '<div class="hud-filter">' +
      '<button type="button" class="diff-btn is-on" data-diff="0">All</button>' +
      '<button type="button" class="diff-btn" data-diff="1">Easy</button>' +
      '<button type="button" class="diff-btn" data-diff="2">Medium</button>' +
      '<button type="button" class="diff-btn" data-diff="3">Hard</button>' +
    '</div>';

  var stage = document.createElement("div");
  stage.className = "quiz-stage";
  hud.insertAdjacentElement("afterend", stage);

  var nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "btn btn-primary quiz-next";
  nextBtn.innerHTML = "Next question →";
  nextBtn.hidden = true;
  stage.insertAdjacentElement("afterend", nextBtn);

  // cache HUD nodes
  var ui = {
    lvl: hud.querySelector(".hud-lvl"),
    bar: hud.querySelector(".xp-bar i"),
    xp: hud.querySelector(".hud-xp"),
    streak: hud.querySelector(".s-streak"),
    best: hud.querySelector(".s-best"),
    answered: hud.querySelector(".s-answered"),
    acc: hud.querySelector(".s-acc"),
    badge: hud.querySelector(".step-badge"),
    badgeText: hud.querySelector(".step-badge-text")
  };

  function syncHud() {
    var lv = levelFor(state.xp);
    ui.lvl.textContent = "Lv." + lv.level + " " + lv.title;
    var pct = lv.next ? ((state.xp - lv.prev) / (lv.next - lv.prev)) * 100 : 100;
    ui.bar.style.width = Math.max(0, Math.min(100, pct)) + "%";
    ui.xp.textContent = state.xp + " XP";
    ui.streak.textContent = state.streak;
    ui.best.textContent = state.best;
    ui.answered.textContent = state.answered;
    ui.acc.textContent = state.answered ? Math.round(state.correct / state.answered * 100) + "%" : "—";
    if (state.stepFilter) {
      ui.badge.hidden = false;
      ui.badgeText.innerHTML = "Filtering: <b>Step " + state.stepFilter + " &middot; " +
        stepName(state.stepFilter) + "</b>";
    } else {
      ui.badge.hidden = true;
    }
  }

  // ---- award / feedback ---------------------------------------------------
  function award(amount) {
    var pop = document.createElement("div");
    pop.className = "xp-pop";
    pop.textContent = "+" + amount;
    document.body.appendChild(pop);
    setTimeout(function () { pop.remove(); }, 1200);
  }
  function levelToast(title) {
    var t = document.createElement("div");
    t.className = "level-toast";
    t.innerHTML = '<div class="emoji">🎉</div>' +
      '<div class="lvl-label">Level up!</div>' +
      '<div class="lvl-title">' + title + '</div>';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }
  function gainXp(amount, diff) {
    var before = levelFor(state.xp).level;
    state.xp += amount;
    award(amount);
    var after = levelFor(state.xp);
    if (after.level > before) setTimeout(function () { levelToast(after.title); }, 500);
  }
  function recordCorrect(diff, multiplier) {
    state.streak++;
    if (state.streak > state.best) state.best = state.streak;
    state.correct++;
    state.answered++;
    gainXp(xpFor(diff, state.streak) * (multiplier || 1), diff);
  }
  function recordWrong() { state.streak = 0; state.answered++; }

  // ---- pools + draw -------------------------------------------------------
  function matchSteps(item) {
    return state.stepFilter === null || item.steps.indexOf(state.stepFilter) !== -1;
  }
  function matchDiff(item) {
    return state.diff === 0 || item.diff === state.diff;
  }
  function pick() {
    nextBtn.hidden = true;
    var qPool = QUESTIONS.filter(function (q) { return matchDiff(q) && matchSteps(q); });
    var oPool = ORDERING.filter(function (o) { return matchDiff(o) && matchSteps(o); });
    if (!qPool.length && !oPool.length) {            // relax difficulty
      qPool = QUESTIONS.filter(matchSteps);
      oPool = ORDERING.filter(matchSteps);
    }
    if (!qPool.length && !oPool.length) { renderEmpty(); return; }

    if (oPool.length && (Math.random() < 0.2 || !qPool.length)) {
      renderOrder(oPool[Math.floor(Math.random() * oPool.length)]);
      return;
    }
    var fresh = qPool.filter(function (q) { return !state.asked[QUESTIONS.indexOf(q)]; });
    if (!fresh.length) { state.asked = {}; fresh = qPool; }
    var q = fresh[Math.floor(Math.random() * fresh.length)];
    state.asked[QUESTIONS.indexOf(q)] = true;
    renderQuestion(q);
  }

  // ---- renderers ----------------------------------------------------------
  function diffTag(diff) {
    var name = diff === 1 ? "easy" : diff === 2 ? "medium" : "hard";
    var label = diff === 1 ? "EASY" : diff === 2 ? "MEDIUM" : "HARD";
    return '<span class="q-tag ' + name + '">' + label + '</span>';
  }

  function renderQuestion(q) {
    state.current = q;
    var opts = shuffle(q.options);
    var html = '<div class="q-tags">' + diffTag(q.diff) +
      (q.cat ? '<span class="q-tag cat">' + q.cat.toUpperCase() + '</span>' : '') + '</div>' +
      '<p class="q-text">' + escapeHtml(q.q) + '</p>';
    if (q.hint) {
      html += '<button type="button" class="hint-btn">💡 Show hint</button>' +
              '<div class="hint-box" hidden>' + escapeHtml(q.hint) + '</div>';
    }
    html += '<div class="opts"></div>';
    stage.innerHTML = html;

    var optWrap = stage.querySelector(".opts");
    opts.forEach(function (o, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt-btn";
      btn.innerHTML = '<span class="opt-key">' + String.fromCharCode(65 + i) + '</span>' + escapeHtml(o.text);
      btn.addEventListener("click", function () { answer(btn, o, opts, optWrap, q); });
      optWrap.appendChild(btn);
    });

    var hintBtn = stage.querySelector(".hint-btn");
    if (hintBtn) {
      hintBtn.addEventListener("click", function () {
        var box = stage.querySelector(".hint-box");
        var open = box.hidden;
        box.hidden = !open;
        hintBtn.classList.toggle("is-on", open);
        hintBtn.innerHTML = (open ? "💡 Hide hint" : "💡 Show hint");
      });
    }
  }

  function answer(btn, opt, opts, optWrap, q) {
    var buttons = optWrap.querySelectorAll(".opt-btn");
    [].forEach.call(buttons, function (b, i) {
      b.disabled = true;
      if (opts[i].correct) b.classList.add("is-correct");
      else if (b === btn) b.classList.add("is-wrong");
      else b.classList.add("is-dim");
    });
    if (opt.correct) recordCorrect(q.diff);
    else recordWrong();
    syncHud();
    nextBtn.hidden = false;
  }

  function renderOrder(o) {
    state.current = o;
    var items = shuffle(o.items);
    var html = '<div class="q-tags">' + diffTag(o.diff) +
      '<span class="q-tag cat">ORDERING</span></div>' +
      '<p class="q-text">' + escapeHtml(o.q) + '</p>';
    if (o.hint) {
      html += '<button type="button" class="hint-btn">💡 Show hint</button>' +
              '<div class="hint-box" hidden>' + escapeHtml(o.hint) + '</div>';
    }
    html += '<p style="font-size:12px;color:var(--dim);margin-bottom:12px">Use the arrows to reorder, then check.</p>' +
            '<div class="order-rows"></div>' +
            '<button type="button" class="btn btn-primary quiz-check" style="margin-top:14px;width:100%;justify-content:center">Check order</button>';
    stage.innerHTML = html;

    var rows = stage.querySelector(".order-rows");
    function draw() {
      rows.innerHTML = "";
      items.forEach(function (label, i) {
        var row = document.createElement("div");
        row.className = "order-row";
        row.innerHTML = '<span class="idx">' + (i + 1) + '.</span><span class="label">' +
          escapeHtml(label) + '</span><span class="order-moves">' +
          '<button type="button" class="up"' + (i === 0 ? " disabled" : "") + '>▲</button>' +
          '<button type="button" class="down"' + (i === items.length - 1 ? " disabled" : "") + '>▼</button>' +
          '</span>';
        row.querySelector(".up").addEventListener("click", function () { move(i, i - 1); });
        row.querySelector(".down").addEventListener("click", function () { move(i, i + 1); });
        rows.appendChild(row);
      });
    }
    function move(from, to) {
      var m = items.splice(from, 1)[0];
      items.splice(to, 0, m);
      draw();
    }
    draw();

    var hintBtn = stage.querySelector(".hint-btn");
    if (hintBtn) {
      hintBtn.addEventListener("click", function () {
        var box = stage.querySelector(".hint-box");
        var open = box.hidden;
        box.hidden = !open;
        hintBtn.classList.toggle("is-on", open);
        hintBtn.innerHTML = (open ? "💡 Hide hint" : "💡 Show hint");
      });
    }

    stage.querySelector(".quiz-check").addEventListener("click", function () {
      var ok = items.every(function (it, i) { return it === o.items[i]; });
      var rowEls = rows.querySelectorAll(".order-row");
      [].forEach.call(rowEls, function (row, i) {
        row.querySelector(".up").disabled = true;
        row.querySelector(".down").disabled = true;
        row.classList.add(items[i] === o.items[i] ? "is-right" : "is-wrong");
      });
      this.disabled = true;
      if (ok) recordCorrect(o.diff, 2); else recordWrong();
      syncHud();
      nextBtn.hidden = false;
    });
  }

  function renderEmpty() {
    stage.innerHTML = '<p style="text-align:center;color:var(--faint);padding:30px">' +
      'No questions match this filter. ' +
      '<button type="button" class="clear-step" style="color:var(--violet);background:none;border:none;cursor:pointer;text-decoration:underline">Show all steps</button>.</p>';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // ---- wiring -------------------------------------------------------------
  nextBtn.addEventListener("click", pick);

  hud.querySelectorAll(".diff-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      hud.querySelectorAll(".diff-btn").forEach(function (b) { b.classList.remove("is-on"); });
      btn.classList.add("is-on");
      state.diff = parseInt(btn.dataset.diff, 10);
      state.asked = {};
      pick();
    });
  });

  section.addEventListener("click", function (e) {
    var clr = e.target.closest(".clear-step");
    if (clr) { state.stepFilter = null; state.asked = {}; syncHud(); pick(); }
  });

  // "Test me on Step N" links elsewhere on the page
  document.querySelectorAll(".btn-test[data-step]").forEach(function (link) {
    link.addEventListener("click", function () {
      state.stepFilter = parseInt(link.dataset.step, 10);
      state.diff = 0;
      hud.querySelectorAll(".diff-btn").forEach(function (b) {
        b.classList.toggle("is-on", b.dataset.diff === "0");
      });
      state.asked = {};
      syncHud();
      pick();
      // the href="#quiz" handles scrolling
    });
  });

  // ---- go -----------------------------------------------------------------
  syncHud();
  pick();
})();
