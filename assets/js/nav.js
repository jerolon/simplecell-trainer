/* ===========================================================================
   SimpleCell Protocol Trainer — navigation scroll-spy
   ---------------------------------------------------------------------------
   Keeps exactly ONE sidebar step and ONE top-bar section highlighted at every
   scroll position (no gaps). Pure CSS scroll-driven animations can't guarantee
   "always exactly one" because each element's timeline goes inactive between
   elements — so this small, isolated script owns the highlight instead.

   Current step  = the lowest step whose HEADER has scrolled into view (so a
     step lights up as soon as its header appears on screen), clamped to the
     first step when you're still above them all.
   Current section = the last section whose top has passed just under the top
     bar (the conventional "section you're reading" highlight).
   Runs on scroll/resize via rAF. Without this script the nav links still work
   as ordinary anchors.
   =========================================================================== */
(function () {
  "use strict";

  var steps = [].slice.call(document.querySelectorAll(".step[id]"));

  // map section/step id -> the nav link that should light up
  function linkFor(sel, id) { return document.querySelector(sel + '[href="#' + id + '"]'); }

  var stepLinks = {};
  var stepHeaders = {};
  steps.forEach(function (s) {
    stepLinks[s.id] = linkFor(".side-step", s.id);
    stepHeaders[s.id] = s.querySelector(".step-summary") || s;
  });

  var navSections = [].slice.call(document.querySelectorAll("main > section[id]"));
  var sectionLinks = {};
  navSections.forEach(function (s) { sectionLinks[s.id] = linkFor(".topnav-link", s.id); });

  if (!steps.length && !navSections.length) return;

  // last item in (top-to-bottom ordered) list for which pred() is true,
  // clamped to the first item; guarantees exactly one result.
  function lastWhere(list, pred) {
    var chosen = list[0];
    for (var i = 0; i < list.length; i++) {
      if (pred(list[i])) chosen = list[i];
      else break;
    }
    return chosen;
  }

  // a step is "current" once its header has scrolled into view from the bottom
  function currentStep() {
    var vh = window.innerHeight;
    return lastWhere(steps, function (s) {
      return stepHeaders[s.id].getBoundingClientRect().top <= vh - 16;
    });
  }

  // a section is "current" once its top passes just under the sticky top bar
  function currentSection() {
    var bar = document.querySelector(".topbar");
    var line = (bar ? bar.getBoundingClientRect().bottom : 0) + 12;
    return lastWhere(navSections, function (s) {
      return s.getBoundingClientRect().top - line <= 0;
    });
  }

  function setCurrent(map, chosen) {
    for (var id in map) {
      if (!map[id]) continue;
      map[id].classList.toggle("is-current", !!chosen && id === chosen.id);
    }
  }

  var ticking = false;
  function update() {
    ticking = false;
    if (steps.length) setCurrent(stepLinks, currentStep());
    if (navSections.length) setCurrent(sectionLinks, currentSection());
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("hashchange", onScroll);
  update();
})();
