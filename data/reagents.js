// ═══════════════════════════════════════════════════════════════════════
// REAGENT DATABASE — Powers the tappable reagent sidebar in Study Mode
//
// Each key is the term as it appears in step text (case-sensitive).
// When the app sees this term in any step description, it becomes a
// clickable blue link that opens the sidebar with all this info.
//
// Fields:
//   fullName  - human-readable name
//   box       - which kit box it lives in
//   capColor  - visual identifier in the box
//   image     - photo filename (in images/ folder)
//   handling  - array of handling notes
//   scaling   - optional table: {title, cols:[], rows:[[]]}
//   usedIn    - array of step numbers where this reagent appears
// ═══════════════════════════════════════════════════════════════════════

var REAGENT_DB = {

  // ─── Box 2 (4°C) reagents ────────────────────────────────────────

  "CPair": {
    fullName: "Cell Pairing Beads",
    box: "Box 2 (4\u00B0C)", capColor: "Green cap",
    image: "images/CSGen4C.jpeg",
    link : "http://knowledge-base.csgenetics.com/knowledge-base/using-cpair-after-one-month",
    handling: [
      "Do NOT vortex \u2014 tap tube on bench, then pipette 10\u00D7",
       "During mixing you can use the solution to wash droplets from the side of the tube",
      "Avoid warming with hands",
      "Do not let solution sit for more than 30 sec before next step",
      "Pellet is small and slides \u2014 be careful on magnet",
      "Unused washed CPair: 4\u00B0C for up to 1 month",
      "For use after one month, follow more info link"
    ],
    usedIn: [1]
  },

  "DB": {
    fullName: "Dilution Buffer",
    box: "Box 2 (4\u00B0C)", capColor: "Gray cap (small)",
    image: "images/CSGen4C.jpeg",
    handling: [
      "Do NOT vortex \u2014 pipette mix 10\u00D7",
      "Contains beads \u2014 resuspend before use",
      "Store DB MM on ice after preparing"
    ],
    scaling: {
      title: "DB Master Mix",
      cols: ["", "1 sample", "8+25%", "16+25%"],
      rows: [
        ["DB", "75.6 \u00B5L", "756 \u00B5L", "1,512 \u00B5L"],
        ["1M DTT", "6.4 \u00B5L", "64 \u00B5L", "128 \u00B5L"],
        ["Total", "82 \u00B5L", "820 \u00B5L", "1,640 \u00B5L"]
      ]
    },
    usedIn: [3]
  },

  "WB": {
    fullName: "Wash Buffer B",
    box: "Box 2 (4\u00B0C)", capColor: "Silver cap",
    image: "images/CSGen4C.jpeg",
    handling: [
      "Bring to room temperature before use",
      "Used on-magnet \u2014 do not resuspend beads with WB",
      "2 washes total in Step 4"
    ],
    usedIn: [4]
  },

  "EA": {
    fullName: "Enrichment Mix",
    box: "Box 2 (4\u00B0C)", capColor: "Pink cap",
    image: "images/CSGen4C.jpeg",
    handling: [
      "Bring to RT before use",
      "Vortex then pipette 10\u00D7 to fully homogenize",
      "Dilute 1:1 with dPBS before use"
    ],
    scaling: {
      title: "Diluted EA",
      cols: ["", "1 sample", "8+10%", "16+10%"],
      rows: [
        ["EA", "10 \u00B5L", "88 \u00B5L", "176 \u00B5L"],
        ["dPBS", "10 \u00B5L", "88 \u00B5L", "176 \u00B5L"]
      ]
    },
    usedIn: [11, 12]
  },

  // ─── Box 1 (\u221220\u00B0C) reagents ───────────────────────────────────────

  "KCB": {
    fullName: "Kinetic Confinement Buffer",
    box: "Box 1 (\u221220\u00B0C)", capColor: "Green cap",
    image: "images/CSGenminus20.jpeg",
    handling: [
      "EXTREMELY viscous \u2014 reverse pipette very slowly",
      "Quick spin before opening",
      "No visible refraction when properly mixed",
      "Store unused KCB at \u221220\u00B0C"
    ],
    scaling: {
      title: "KCB Master Mix",
      cols: ["", "1 sample", "8+25%", "16+25%"],
      rows: [
        ["KCB", "73.6 \u00B5L", "736 \u00B5L", "1,472 \u00B5L"],
        ["1M DTT", "6.4 \u00B5L", "64 \u00B5L", "128 \u00B5L"],
        ["Total", "80 \u00B5L", "800 \u00B5L", "1,600 \u00B5L"]
      ]
    },
    usedIn: [1, 2]
  },

  "WA": {
    fullName: "Wash Buffer A",
    box: "Box 1 (\u221220\u00B0C)", capColor: "White cap",
    image: "images/CSGenminus20.jpeg",
    handling: [
      "Vortex to dissolve any precipitate",
      "Bring to room temperature before use",
      "Add DTT to make WA MM"
    ],
    scaling: {
      title: "WA Master Mix",
      cols: ["", "1 sample", "8+25%", "16+25%"],
      rows: [
        ["WA", "153.6 \u00B5L", "1,536 \u00B5L", "3,072 \u00B5L"],
        ["1M DTT", "6.4 \u00B5L", "64 \u00B5L", "128 \u00B5L"],
        ["Total", "160 \u00B5L", "1,600 \u00B5L", "3,200 \u00B5L"]
      ]
    },
    usedIn: [3, 4]
  },

  "CPM": {
    fullName: "Cell Pairing Mix",
    box: "Box 1 (\u221220\u00B0C) \u2014 UNDER INSERT!", capColor: "Hidden beneath tube insert!",
    image: "images/CSGenminus20.jpeg",
    handling: [
      "Lyophilized powder \u2192 reconstitute in 200 \u00B5L ice-cold dPBS",
      "Vortex 30s, quick spin = 6\u00D7 CPM",
      "UNSTABLE above 4\u00B0C \u2014 use within 15 min",
      "Aliquot unused 6\u00D7 into 30 \u00B5L portions at \u221280\u00B0C"
    ],
    usedIn: [1]
  },

  "R1A": {
    fullName: "RT Mix 1A",
    box: "Box 1 (\u221220\u00B0C)", capColor: "White cap",
    image: "images/CSGenminus20.jpeg",
    handling: ["Vortex before use", "4 \u00B5L/sample in RT MM"],
    usedIn: [3, 5]
  },

  "R1B": {
    fullName: "RT Mix 1B",
    box: "Box 1 (\u221220\u00B0C)", capColor: "White cap",
    image: "images/CSGenminus20.jpeg",
    handling: ["Vortex before use", "2 \u00B5L/sample in RT MM"],
    usedIn: [3, 5]
  },

  "R1C": {
    fullName: "RT Mix 1C",
    box: "Box 1 (\u221220\u00B0C)", capColor: "White cap",
    image: "images/CSGenminus20.jpeg",
    handling: ["Vortex before use", "10 \u00B5L/sample \u2014 largest RT component"],
    usedIn: [3, 5]
  },

  "R2": {
    fullName: "RT Mix 2",
    box: "Box 1 (\u221220\u00B0C)", capColor: "Black cap",
    image: "images/CSGenminus20.jpeg",
    handling: ["Do NOT vortex \u2014 quick spin only", "0.75 \u00B5L/sample"],
    usedIn: [3, 5]
  },

  "R3": {
    fullName: "RT Mix 3",
    box: "Box 1 (\u221220\u00B0C)", capColor: "Black cap",
    image: "images/CSGenminus20.jpeg",
    handling: ["Do NOT vortex \u2014 quick spin only", "0.25 \u00B5L/sample (smallest RT component)"],
    usedIn: [3, 5]
  },

  "S1A": {
    fullName: "3S Mix 1A",
    box: "Box 1 (\u221220\u00B0C)", capColor: "Orange cap",
    image: "images/CSGenminus20.jpeg",
    handling: [
      "PRECIPITATES during storage \u2014 vortex until fully dissolved!",
      "6.7 \u00B5L/sample in 3S MM"
    ],
    usedIn: [7]
  },

  "S1B": {
    fullName: "3S Mix 1B",
    box: "Box 1 (\u221220\u00B0C)", capColor: "White cap",
    image: "images/CSGenminus20.jpeg",
    handling: ["Vortex before use", "2.7 \u00B5L/sample in 3S MM"],
    usedIn: [7]
  },

  "S2": {
    fullName: "3S Mix 2",
    box: "Box 1 (\u221220\u00B0C)", capColor: "Purple cap",
    image: "images/CSGenminus20.jpeg",
    handling: ["Do NOT vortex", "0.6 \u00B5L/sample in 3S MM"],
    usedIn: [7]
  },

  "H": {
    fullName: "RNase H",
    box: "Box 1 (\u221220\u00B0C)", capColor: "Magenta cap",
    image: "images/CSGenminus20.jpeg",
    handling: ["1.5 \u00B5L/sample", "No mixing needed after adding", "Keep on ice"],
    usedIn: [6]
  },

  "K": {
    fullName: "Proteinase K",
    box: "Box 1 (\u221220\u00B0C)", capColor: "Black cap",
    image: "images/CSGenminus20.jpeg",
    handling: [
      "1 \u00B5L/sample \u2014 smallest addition in protocol",
      "Mix 10\u00D7 after adding",
      "Keep on ice"
    ],
    usedIn: [8]
  },

  "A1": {
    fullName: "Amplification Mix 1",
    box: "Box 1 (\u221220\u00B0C)", capColor: "Blue cap",
    image: "images/CSGenminus20.jpeg",
    handling: [
      "Used in BOTH PCR1 (Step 10) AND PCR2 (Step 13)",
      "Do NOT discard after PCR1!",
      "10 \u00B5L/sample in both Amp PCR MM and Indexing PCR"
    ],
    usedIn: [10, 13]
  },

  "A2": {
    fullName: "Amplification PCR 1 Primers",
    box: "Box 1 (\u221220\u00B0C)", capColor: "Blue cap",
    image: "images/CSGenminus20.jpeg",
    handling: ["2 \u00B5L/sample in Amp PCR MM", "Only used in PCR1 (NOT in PCR2)"],
    usedIn: [10]
  },
  // ─── Prepared Buffers & Master Mixes ─────────────────────────────
  // These aren't raw kit reagents — they're what you prepare during the protocol.
  // No box or image since you make them fresh each time.

  "KCB MM": {
    fullName: "Kinetic Confinement Buffer Master Mix",
    box: "Prepared fresh (Step 1C)", capColor: "Made from KCB + DTT",
    handling: [
      "Prepare on ice",
      "KCB is extremely viscous — mix by pipette VERY slowly",
      "Use reverse pipetting to avoid bubbles",
      "No visible refraction when properly mixed",
      "Aliquot 80 µL per sample into strip tubes on ice"
    ],
    scaling: {
      title: "KCB MM Recipe",
      cols: ["Component", "1 sample", "1 + 25%", "8 + 25%", "16 + 25%"],
      rows: [
        ["KCB",     "73.6 µL", "92 µL",   "736 µL",  "1,472 µL"],
        ["1M DTT",  "6.4 µL",  "8 µL",    "64 µL",   "128 µL"],
        ["Total",   "80 µL",   "100 µL",  "800 µL",  "1,600 µL"]
      ]
    },
    usedIn: [1, 2]
  },

  "DB MM": {
    fullName: "Dilution Buffer Master Mix",
    box: "Prepared fresh (Step 3)", capColor: "Made from DB + DTT",
    handling: [
      "Store on ice until use",
      "Pipette mix DB 10× before adding DTT (contains beads!)",
      "Do NOT vortex",
      "Add 82 µL per sample after TRB program"
    ],
    scaling: {
      title: "DB MM Recipe",
      cols: ["Component", "1 sample", "1 + 25%", "8 + 25%", "16 + 25%"],
      rows: [
        ["DB",      "75.6 µL", "94.5 µL", "756 µL",  "1,512 µL"],
        ["1M DTT",  "6.4 µL",  "8 µL",    "64 µL",   "128 µL"],
        ["Total",   "82 µL",   "102.5 µL","820 µL",  "1,640 µL"]
      ]
    },
    usedIn: [3]
  },

  "WA MM": {
    fullName: "Wash Buffer A Master Mix",
    box: "Prepared fresh (Step 3)", capColor: "Made from WA + DTT",
    handling: [
      "Store at ROOM TEMPERATURE (not ice!)",
      "Vortex WA first to dissolve any precipitate",
      "Used off-magnet to resuspend beads in Step 4"
    ],
    scaling: {
      title: "WA MM Recipe",
      cols: ["Component", "1 sample", "1 + 25%", "8 + 25%", "16 + 25%"],
      rows: [
        ["WA",      "153.6 µL", "192 µL",  "1,536 µL", "3,072 µL"],
        ["1M DTT",  "6.4 µL",   "8 µL",    "64 µL",    "128 µL"],
        ["Total",   "160 µL",   "200 µL",  "1,600 µL", "3,200 µL"]
      ]
    },
    usedIn: [3, 4]
  },

  "RT MM": {
    fullName: "Reverse Transcription Master Mix",
    box: "Prepared fresh (Step 3)", capColor: "Made from R1A/B/C + R2 + R3 + DTT",
    handling: [
      "Store on ice",
      "Vortex R1A, R1B, R1C before use",
      "Do NOT vortex R2 and R3",
      "Prepare 166 µM DTT first (serial dilution)",
      "Add 20 µL per sample to washed beads"
    ],
    scaling: {
      title: "RT MM Recipe",
      cols: ["Component", "1 sample", "1 + 10%", "8 + 10%", "16 + 10%"],
      rows: [
        ["R1A",       "4 µL",    "4.4 µL",  "35.2 µL",  "70.4 µL"],
        ["R1B",       "2 µL",    "2.2 µL",  "17.6 µL",  "35.2 µL"],
        ["R1C",       "10 µL",   "11 µL",   "88 µL",    "176 µL"],
        ["R2",        "0.75 µL", "0.8 µL",  "6.6 µL",   "13.2 µL"],
        ["R3",        "0.25 µL", "0.3 µL",  "2.2 µL",   "4.4 µL"],
        ["166 µM DTT","3 µL",    "3.3 µL",  "26.4 µL",  "52.8 µL"],
        ["Total",     "20 µL",   "22 µL",   "176 µL",   "352 µL"]
      ]
    },
    usedIn: [3, 5]
  },

  "3S MM": {
    fullName: "Second Strand Synthesis Master Mix",
    box: "Prepared fresh (Step 7)", capColor: "Made from S1A + S1B + S2",
    handling: [
      "Store on ice",
      "S1A PRECIPITATES — vortex until fully dissolved!",
      "Vortex S1B",
      "Do NOT vortex S2",
      "Add 10 µL per sample, mix 15×"
    ],
    scaling: {
      title: "3S MM Recipe",
      cols: ["Component", "1 sample", "1 + 10%", "8 + 10%", "16 + 10%"],
      rows: [
        ["S1A",  "6.7 µL", "7.4 µL", "59 µL",   "118 µL"],
        ["S1B",  "2.7 µL", "3 µL",   "23.8 µL", "47.5 µL"],
        ["S2",   "0.6 µL", "0.7 µL", "5.3 µL",  "10.6 µL"],
        ["Total","10 µL",  "11 µL",  "88 µL",   "176 µL"]
      ]
    },
    usedIn: [7]
  },

  "Amp PCR MM": {
    fullName: "Amplification PCR Master Mix",
    box: "Prepared fresh (Step 10)", capColor: "Made from A1 + A2",
    handling: [
      "Store on ice",
      "Mix 15× by pipette without bubbles",
      "Add 12 µL per sample to 28 µL eluate",
      "⚠ Do NOT discard A1 after — needed for PCR2!"
    ],
    scaling: {
      title: "Amp PCR MM Recipe",
      cols: ["Component", "1 sample", "1 + 10%", "8 + 10%", "16 + 10%"],
      rows: [
        ["A1",   "10 µL", "11 µL", "88 µL",   "176 µL"],
        ["A2",   "2 µL",  "2.2 µL","17.6 µL", "35.2 µL"],
        ["Total","12 µL", "13.2 µL","105.6 µL","211.2 µL"]
      ]
    },
    usedIn: [10]
  },

  "166 µM DTT": {
    fullName: "Diluted DTT for RT Master Mix",
    box: "Prepared fresh (Step 3)", capColor: "Serial dilution from 1M DTT",
    handling: [
      "Two-step serial dilution — do not try to go 1M → 166 µM directly",
      "Step 1: 2 µL 1M DTT + 998 µL nfH₂O = 2 mM DTT",
      "Step 2: 83 µL 2 mM DTT + 917 µL nfH₂O = 166 µM DTT",
      "Mix well after each dilution",
      "3 µL per sample goes into RT MM"
    ],
    usedIn: [3]
  },
  "Figure 3": {
    fullName: "Supernatant Removal Technique",
    box: "Technique — Step 1D", capColor: "Used during cell washes",
    image: "images/figure3-sup-removal.png",
    handling: [
      "Use a 200 µL pipette tip to remove bulk supernatant",
      "Tilt V-bottom plate and aspirate from the side, away from pellet, intersection between plate wall and V-slope",
      "If cell pellet forms a smear, remove the supernatant from the opposite side of the smear to ensure minimal cell loss",
      "Follow up with a 20 µL tip for residual liquid",
      "Minimal supernatant should remain — excess interferes with CPair/Cell binding"
    ],
    usedIn: [1]
  },
  "Figure 4": {
    fullName: "Technique to disrupt cell-bead mix",
    box: "Technique — Step 2", capColor: "Used before kinetic confinement",
    image: "images/figure4-disrupting-cell-based-mix.png",
    handling: [
      "Use a 20 µL pipette tip",
      "Tilt flat-bottom plate and aspirate from the bottom",
      "Dispense around the top, middle and sides of the well",
      "Repeat 20X SLOWLY"
    ],
    usedIn: [2]
  },
    "Figure 5": {
    fullName: "Technique to mix KCB after adding the Cells-Cpair",
    box: "Technique — Step 2", capColor: "Used during kinetic confinement",
    image: "images/figure5-mixing-kcb.png",
    handling: [
      "Set pippeter to 80 \u00B5L",
      "Slowly aspirate from the bottom of the tube",
      "Raise pipette tips out of the liquid",
      "Always dispense liquid above the meniscus",
      "Solution needs to be homogeneous before proceeding to next step, which can be determined when refraction can no longer be observed in the tube.",
      "Avoid introducing bubbles.",
      "Repeat 20X SLOWLY"
    ],
    usedIn: [2]
  },
  "TRB": {
    fullName: "Target RNA barcoding program",
    box: "Thermocycler Programming",
    image: "images/C100_biorad.jpg",
    link: "https://knowledge-base.csgenetics.com/setting-up-the-trb-program",
    handling: [
      "We have C1000 Touch Thermal Cycler from BioRad",
      "Specific Ramp rate is 1°C/s",
      "Verify Total time is 7 min 53 s after the 4°C hold step",
      "Time to 95°C should be 96s",
      "Lid Temperature is 105°C"
    ],
    scaling: {
      title: "TRB Program",
      cols: ["Volume", "Time", "Temperature"],
      rows: [
        ["100 \u00B5L", "7 min 53 seconds", "4°C Hold"],
        ["", "", "95°C - 15 Sec"],
        ["", "", "55°C to 40°C  90 sec decreasing (1°C/6sec)"],
        ["", "", "35°C to 20°C - for 135 sec decreasing (1°C/9sec)"],
        ["", "", "20°C Hold"]
      ]
    },
    usedIn: [3]
  },
  "RT program": {
    fullName: "Reverse transcription program",
    box: "Thermocycler Programming",
    image: "images/C100_biorad.jpg",
    handling: [
      "We have C1000 Touch Thermal Cycler from BioRad",
      "Volume: 20 \u00B5L",
      "Total time approx 40 minutes",
      "Started after end step 3 Barcoding and RNA captured but used in step 5 (Reverse Transcription)",
      "Lid Temperature is 105°C"
    ],
    scaling: {
      title: "RT Program",
      cols: ["Temperature", "Time"],
      rows: [
        ["4°C", "4°C Hold"],
        ["20°C", "2 min"],
        ["30°C", "2 min"],
        ["40°C", "2 min"],
        ["50°C", "15 min"],
        ["55°C", "15 min"],
        ["98°C", "3 min"],
        ["4°C", " Hold"]
      ]
    },
    usedIn: [3,5]
  },
  "RNAH": {
    fullName: "RNase Treatment program",
    box: "Thermocycler Programming",
    image: "images/C100_biorad.jpg",
    handling: [
      "We have C1000 Touch Thermal Cycler from BioRad",
      "Volume: 22 \u00B5L",
      "Total time approx 25 minutes",
      "Used in step 6. RNAseH treatment",
      "Lid Temperature is 105°C"
    ],
    scaling: {
      title: "RNAH Program",
      cols: ["Temperature", "Time"],
      rows: [
        ["4°C", "4°C Hold"],
        ["37°C", "20 min"],
        ["65°C", "5 min"],
        ["4°C", " Hold"]
      ]
    },
    usedIn: [6]
  },
    "3S": {
    fullName: "Second Strand Synthesis program",
    box: "Thermocycler Programming",
    image: "images/C100_biorad.jpg",
    handling: [
      "We have C1000 Touch Thermal Cycler from BioRad",
      "Volume: 32 \u00B5L",
      "Total time approx 25 minutes",
      "Used in step 7. Second strand synthesis",
      "Lid Temperature is 105°C"
    ],
    scaling: {
      title: "3S Program",
      cols: ["Temperature", "Time"],
      rows: [
        ["4°C", "4°C Hold"],
        ["75°C to 20°C", "22 min decreasing (2.5°C/1min)"],
        ["4°C", " Hold"]
      ]
    },
    usedIn: [7]
  },
};
