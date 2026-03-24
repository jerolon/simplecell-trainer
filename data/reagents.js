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
    handling: [
      "Do NOT vortex \u2014 tap tube on bench, then pipette 10\u00D7",
      "Avoid warming with hands",
      "Pellet is small and slides \u2014 be careful on magnet",
      "Unused washed CPair: 4\u00B0C for up to 1 month"
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
    box: "Box 1 (\u221220\u00B0C)", capColor: "Black cap",
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
  }
};
