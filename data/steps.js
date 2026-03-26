// ═══════════════════════════════════════════════════════════════════════
// STEPS — The 14 protocol steps for Study Mode
// 
// Each step has: id, name, duration, phase ("pre"/"post"), icon, color,
//   summary, details[], criticalNotes[]
// Optional: reagentTable, masterMixes[], thermoProgram
//
// To add images to a detail section, add:  image: "images/your-file.png"
// Then upload the image to the images/ folder in your GitHub repo.
// ═══════════════════════════════════════════════════════════════════════

var STEPS = [
  {
    id: 1, name: "Cell Priming & Pairing", duration: "1h 45min", phase: "pre",
    icon: "\u{1F9EB}", color: "#4ade80",
    summary: "Coat plates, prepare CPair beads, make KCB master mix, prime cells with CPM, pair cells with CPair beads in flat-bottom plates.",
    reagentTable: {
      title: "Reagent Preparations",
      rows: [
        ["0.1% BSA/dPBS", "47 \u00B5L 7.5% BSA + 3,463 \u00B5L dPBS", "Ice"],
        ["3.75% BSA/dPBS", "2 mL 7.5% BSA + 2 mL dPBS", "Ice"],
        ["0.04% BSA/dPBS", "5 \u00B5L 7.5% BSA + 995 \u00B5L dPBS", "Ice"],
        ["1M DTT", "0.154 g DTT + 1 mL nfH\u2082O", "Ice"],
      ]
    },
    masterMixes: [
      { name: "KCB MM", per1: "73.6 \u00B5L KCB + 6.4 \u00B5L 1M DTT = 80 \u00B5L", per8: "736 + 64 \u00B5L (+25% excess)", note: "Aliquot 80 \u00B5L/sample into strip tubes on ice. Viscous \u2014 reverse pipette slowly!" }
    ],
    details: [
      { sub: "1A", title: "Coating Flat-Bottom Plates",
        image: "images/step1a-coating.png",
        steps: [
        "Add 120 \u00B5L cold dPBS + 0.1% BSA per well (1 well/sample). No bubbles at bottom.",
        "Incubate \u22651 min at 4\u00B0C",
        "Remove at 120 \u00B5L, then 10 \u00B5L to get all excess \u2014 residual liquid interferes with assay",
        "Store coated plates at 4\u00B0C until use"
      ]},
      { sub: "1B", title: "CPair Preparation",
        image: "images/step1b-cpair.png",
        steps: [
        "Tap tube on bench (never vortex). Pipette at 150 \u00B5L, 10\u00D7 until homogeneous. Avoid warming with hands.  Do not let solution sit for more than 30 sec before next step",
        "Transfer to 1.5 mL tube: 170 \u00B5L (8-sample kit) or 340 \u00B5L (16-sample kit)",
        "Magnet 1 min RT \u2192 remove sup (150 / 300 \u00B5L). Pellet is small \u2014 slides down!",
        "Wash: off magnet \u2192 +300 \u00B5L cold dPBS, pipette 5\u00D7 \u2192 magnet 1 min \u2192 remove 300 \u00B5L",
        "Resuspend: +150 \u00B5L (8) or 300 \u00B5L (16) cold dPBS, pipette 10\u00D7",
        "Into pre-coated wells: 20 \u00B5L CPair (Primary Tissue) or 15 \u00B5L CPair + 5 \u00B5L dPBS (Cell Lines)",
        "Cover, store at 4\u00B0C \u2014 do not freeze. Unused washed CPair good for 1 month at 4\u00B0C."
      ]},
      { sub: "1C", title: "KCB Master Mix Prep", image: "images/step1d-kcb.png", steps: [
        "Quick spin KCB. Mix with pipette at 600 \u00B5L (8) or 900 \u00B5L (16) until homogeneous",
        "KCB is extremely viscous \u2014 pipette VERY slowly. No bubbles! Use reverse pipetting.",
        "Prepare KCB MM: 73.6 \u00B5L KCB + 6.4 \u00B5L 1M DTT per sample. Mix slowly.",
        "Aliquot 80 \u00B5L KCB MM per tube into strip tubes, place on ice"
      ]},
      { sub: "1D", title: "Cell Priming",
        image: "images/step1d-workflow.png",
        steps: [
        "Cells: 250 cells/\u00B5L (cell lines, 5K total), 425/\u00B5L (PBMCs, 8.5K), 500/\u00B5L (organoids, 10K) in 20 \u00B5L dPBS+0.04% BSA",
        "Reconstitute CPM: +200 \u00B5L ice-cold dPBS \u2192 vortex 30s \u2192 quick spin = 6\u00D7 CPM",
        "Dilute: 1\u00D7 (20 \u00B5L 6\u00D7+100 \u00B5L dPBS) cell lines/PBMCs | 1.5\u00D7 (30+90) organoids | 2\u00D7 (40+80) primary",
        "Add 6 \u00B5L diluted CPM to cells in V-bottom, mix 5\u00D7 at 20 \u00B5L. Incubate on ice 20 min.",
        "Wash 1: +175 \u00B5L dPBS+3.75% BSA \u2192 mix 5\u00D7 at 150 \u00B5L \u2192 500\u00D7g, 3 min, 4\u00B0C \u2192 remove sup (see Figure 3 for technique)",
        "Wash 2: +200 \u00B5L dPBS+3.75% BSA \u2192 spin \u2192 remove sup (see Figure 3 for technique)",
        "Wash 3: +200 \u00B5L dPBS (NO BSA) \u2192 spin \u2192 remove all sup (see Figure 3 for technique) + residual with 20 \u00B5L tip",
        "Resuspend in 20 \u00B5L cold dPBS, mix 10\u00D7",
        "Transfer to flat-bottom with CPair. Mix 20\u00D7 at 20 \u00B5L \u2014 tilt plate, aspirate bottom/sides, dispense top",
        "Cover. Settle 40 min on ice \u2014 VIBRATION-FREE!"
      ]}
    ],
    criticalNotes: [
      "Never vortex CPair \u2014 pipette only. Avoid warming tube with hands.",
      "CPM unstable above 4\u00B0C \u2014 use within 15 min. Aliquot unused 6\u00D7 CPM into 30 \u00B5L portions at -80\u00B0C.",
      "Cell viability must be \u226590%. Count after filtering.",
      "MACS: negative sorting ONLY \u2014 positive sorting interferes.",
      "KCB: extremely viscous \u2014 reverse pipetting, go very slowly."
    ]
  },
  {
    id: 2, name: "Kinetic Confinement", duration: "45 min", phase: "pre",
    icon: "\u2744\uFE0F", color: "#60a5fa",
    summary: "Disrupt settled cell-bead mix, combine with viscous KCB master mix, flash-freeze on dry ice.",
    details: [
      { sub: null, title: "Procedure",
        image: "images/step2-cells2kcb.png",
        steps: [
        "After 40 min: set pipette to 20 \u00B5L, mix 20\u00D7 slowly \u2014 tilt plate, aspirate from bottom, dispense around well (technique in Figure 4)",
        "Proceed immediately \u2014 transfer full volume (40\u201350 \u00B5L) Cells-CPair \u2192 80 \u00B5L KCB MM",
        "Set pipette to 80 \u00B5L. Mix 15\u00D7 \u2014 aspirate bottom, raise tips OUT of liquid, dispense ABOVE meniscus (technique in Figure 5)",
        "Must be homogeneous (no refraction). Avoid bubbles.",
        "Seal tubes. Immediately submerge fully in dry ice \u226540 min."
      ]}
    ],
    criticalNotes: [
      "If >8 samples: work ONE strip tube at a time",
      "Safe stop: dry ice \u226424h | after \u226540 min dry ice \u2192 -80\u00B0C \u22644 weeks",
      "Do NOT allow samples to thaw during transfer"
    ]
  },
  {
    id: 3, name: "Barcoding & RNA Capture", duration: "45 min", phase: "pre",
    icon: "\u{1F9EC}", color: "#f472b6",
    summary: "Prepare master mixes, run TRB on frozen samples, add DB to capture barcoded RNA on beads.",
    reagentTable: { title: "Reagent Setup", rows: [
      ["DB","4\u00B0C \u2192 ice","Do NOT vortex"],
      ["R1A, R1B, R1C","-20\u00B0C \u2192 ice","Vortex before use"],
      ["R2, R3","-20\u00B0C \u2192 ice","Do NOT vortex"],
      ["WA","-20\u00B0C \u2192 RT","Vortex to dissolve"],
      ["WB","4\u00B0C \u2192 RT","\u2014"]
    ]},
    masterMixes: [
      { name: "DB MM", per1: "75.6 \u00B5L DB + 6.4 \u00B5L DTT = 82 \u00B5L", per8: "756 + 64 \u00B5L (+25%)", note: "On ice." },
      { name: "WA MM", per1: "153.6 \u00B5L WA + 6.4 \u00B5L DTT = 160 \u00B5L", per8: "1,536 + 64 \u00B5L (+25%)", note: "At RT." },
      { name: "RT MM (20 \u00B5L)", per1: "R1A 4 + R1B 2 + R1C 10 + R2 0.75 + R3 0.25 + 166\u00B5M DTT 3", per8: "\u00D78 (+10%)", note: "On ice. Vortex R1A/B/C only." }
    ],
    thermoProgram: { name: "TRB", vol: "100 \u00B5L", time: "6\u201310 min", steps: "95\u00B0C 15s \u2192 55\u219240\u00B0C (1\u00B0C/6s = 90s) \u2192 35\u219220\u00B0C (1\u00B0C/9s = 135s) \u2192 20\u00B0C hold" },
    details: [
      { sub: null, title: "DTT & Master Mix Prep", steps: [
        "Start TRB. Only the 4°C hold",
        "166 \u00B5M DTT: 2 \u00B5L 1M \u2192 998 \u00B5L nfH\u2082O = 2 mM. Then 83 \u00B5L 2mM \u2192 917 \u00B5L nfH\u2082O = 166 \u00B5M.",
        "Prepare DB, WA, and RT MM (R1A, R1B, R1C, R2, R3) per tables.",
        "Quick spin DB reagent and mix thoroughly with pipette 10X so the beads are homogeneous. DO NOT VORTEX. Prepare DB MM as described. Place on ice until use",
        "Ensure precipitate has dissolved by vortexing WA. Quick spin and prepare WA MM. Store at ROOM TEMPERATURE until use.",
        "Mix each 10\u00D7. Place unused reagents back into noted storage conditions after preparing each mix.",
        "Vortex R1A, R1B and R1C. DO NOT vortex R2 and R3. Quick spin all R reagents. Prepare RT MM and mix up and down 10X. Store on ice until use and place the R reagents back"
      ]},
      { sub: null, title: "Barcoding", steps: [
        "Transfer frozen samples (Cells + CPair + KCB MM) directly from dry ice \u2192 thermocycler \u2192 run TRB",
        "When done: proceed immediately at RT",
        "Mix DB MM 10\u00D7 to resuspend. Add 82 \u00B5L DB MM per sample in 8-strip tube.",
        "Set pipette to 120 \u00B5L, mix 10\u00D7 with Figure 5 technique, but only 10X",
        "Magnet 5 min until clear. Start RT program."
      ]}
    ],
    criticalNotes: [
      "TRB ramp rates CRITICAL \u2014 verify thermocycler",
      "Use freshly made 1M DTT solution or the frozen 1M DTT drom Step 1",
      "Vortex WA, R1A, R1B and R1C",
      "Do NOT vortex DB, R2 nor R3",
      "Proceed immediately after TRB"
    ]
  },
  {
    id: 4, name: "Post-Capture Bead Clean-up", duration: "10 min", phase: "pre",
    icon: "\u{1F9F9}", color: "#a78bfa",
    summary: "Wash beads: WA off-magnet, then 2\u00D7 WB on-magnet.",
    details: [{ sub: null, title: "Procedure", steps: [
      "With tubes On magnet: carefully remove 180 \u00B5L sup without disturbing or touching the beads \u2192 remove ~20 \u00B5L residual",
      "Tubes Off magnet: +160 \u00B5L WA MM. Pipette 10\u00D7 at 120 \u00B5L to resuspend without introducing bubbles. Some clumping might occur. Be sure to completely resuspend beads before proceeding",
      "Tubes on Magnet 2 min until clear \u2192 remove 160 \u00B5L \u2192 remove ~10 \u00B5L residual without touching any beads",
      "Keeping tubes On magnet: +180 \u00B5L WB \u2192 Incubate 30 sec \u2192 Remove all: first 180 \u00B5L and then 10 \u00B5L",
      "Repeat WB wash (2 total). Do NOT let beads dry. Proceed immediatly"
    ]}],
    criticalNotes: ["Do NOT let beads dry \u2014 proceed to RT immediately",
                   "Some clumping might be noticed when resuspending beads with WA. Be sure to completely resuspend beads"]
  },
  {
    id: 5, name: "Reverse Transcription", duration: "45 min", phase: "pre",
    icon: "\u{1F504}", color: "#fbbf24",
    summary: "Add RT master mix to cleaned beads on ice, run RT program.",
    thermoProgram: { name: "RT", vol: "20 \u00B5L", time: "~40 min", steps: "20\u00B0C 2min \u2192 30\u00B0C 2min \u2192 40\u00B0C 2min \u2192 50\u00B0C 15min \u2192 55\u00B0C 15min \u2192 98\u00B0C 3min \u2192 4\u00B0C hold" },
    details: [{ sub: null, title: "Procedure", steps: [
      "Remove from magnet \u2192 place on ice. Add 20 \u00B5L RT MM to each tube with washed beads.",
      "Pipette 15\u00D7 at 15 \u00B5L. Careful not introduce bubbles. If clumps: mix 10\u201320\u00D7 more.",
      "Seal tubes with lids, run RT program. Volume = 20 \u00B5L. Runtime approx 40 minutes."
    ]}],
    criticalNotes: ["Lid 105\u00B0C for ALL programs","Keep mixing until clumps break"]
  },
  {
    id: 6, name: "RNaseH Treatment", duration: "30 min", phase: "pre",
    icon: "\u2702\uFE0F", color: "#fb923c",
    summary: "Add RNaseH to digest RNA strand of RNA:cDNA hybrids.",
    thermoProgram: { name: "RNAH", vol: "22 \u00B5L", time: "~25 min", steps: "37\u00B0C 20min \u2192 65\u00B0C 5min \u2192 4\u00B0C hold" },
    details: [{ sub: null, title: "Procedure", steps: [
      "Remove from TC \u2192 ice. Start RNAH. Quick spin.",
      "Add 1.5 \u00B5L H (RNaseH). No mixing needed.",
      "Seal, run RNAH. Volume = 22 \u00B5L."
    ]}],
    criticalNotes: ["No mixing required after adding RNaseH"]
  },
  {
    id: 7, name: "Second Strand Synthesis", duration: "30 min", phase: "pre",
    icon: "\u{1F9EA}", color: "#34d399",
    summary: "Add 3S master mix to generate double-stranded cDNA.",
    masterMixes: [{ name: "3S MM (10 \u00B5L)", per1: "S1A 6.7 + S1B 2.7 + S2 0.6 \u00B5L", per8: "S1A 59 + S1B 23.8 + S2 5.3 (+10%)", note: "Vortex S1A, S1B. Do NOT vortex S2." }],
    thermoProgram: { name: "3S", vol: "32 \u00B5L", time: "22\u201325 min", steps: "75\u00B0C \u2192 20\u00B0C ramp (2.5\u00B0C/min = 22 min) \u2192 4\u00B0C hold" },
    details: [{ sub: null, title: "Procedure", steps: [
      "Vortex S1A + S1B (S1A precipitates!). Do NOT vortex S2.",
      "Prepare 3S MM. Mix 10\u00D7.",
      "On ice: add 10 \u00B5L 3S MM. Mix 15\u00D7 at 20 \u00B5L.",
      "Seal, run 3S. Volume = 32 \u00B5L."
    ]}],
    criticalNotes: ["S1A precipitates \u2014 vortex until dissolved"]
  },
  {
    id: 8, name: "Proteinase K Treatment", duration: "30 min", phase: "pre",
    icon: "\u{1F513}", color: "#e879f9",
    summary: "Add Proteinase K to release cDNA from beads.",
    thermoProgram: { name: "PK", vol: "33 \u00B5L", time: "~25 min", steps: "37\u00B0C 15min \u2192 55\u00B0C 10min \u2192 4\u00B0C hold" },
    details: [{ sub: null, title: "Procedure", steps: [
      "Remove \u2192 ice. Start PK.",
      "Add 1 \u00B5L K. Mix 10\u00D7 at 20 \u00B5L.",
      "Run PK. Volume = 33 \u00B5L."
    ]}],
    criticalNotes: []
  },
  {
    id: 9, name: "Post-3S Clean-up (SPRI)", duration: "25 min", phase: "pre",
    icon: "\u{1F4A7}", color: "#38bdf8",
    summary: "SPRI purification. 80% EtOH \u00D73. Elute 30 \u00B5L \u2192 transfer 28 \u00B5L.",
    details: [{ sub: null, title: "Procedure (RT)", steps: [
      "+20 \u00B5L nfH\u2082O. +75 \u00B5L DNA Purification beads. Mix 10\u00D7.",
      "5 min RT \u2192 magnet 2 min \u2192 remove 105 \u00B5L",
      "Wash \u00D73: +180 \u00B5L 80% EtOH \u2192 1 min \u2192 remove all",
      "Dry pellet to matte (2\u20135 min).",
      "Off magnet: +30 \u00B5L nfH\u2082O. 5 min RT. (Make Amp PCR MM now!)",
      "Magnet 2 min \u2192 transfer 28 \u00B5L to new tube."
    ]}],
    criticalNotes: ["Fresh 80% EtOH with ddH\u2082O","Use 5-min elution to prep Amp PCR MM"]
  },
  {
    id: 10, name: "Amplification PCR (PCR1)", duration: "30 min", phase: "post",
    icon: "\u{1F4C8}", color: "#f97316",
    summary: "PCR amplify cDNA. 12 cy (cell lines) or 13 cy (PBMCs).",
    masterMixes: [{ name: "Amp PCR MM (12 \u00B5L)", per1: "A1 10 + A2 2 \u00B5L", per8: "A1 88 + A2 17.6 (+10%)", note: "\u26A0 Keep A1 for PCR2!" }],
    thermoProgram: { name: "PCR1", vol: "40 \u00B5L", time: "25\u201330 min", steps: "98\u00B0C 45s \u2192 [98\u00B0C 15s \u2192 60\u00B0C 30s \u2192 72\u00B0C 30s] \u00D7 12/13 \u2192 72\u00B0C 1min \u2192 4\u00B0C" },
    details: [{ sub: null, title: "Procedure", steps: [
      "Set PCR1: 12 cy (cell lines) or 13 (PBMCs)",
      "Mix MM 15\u00D7. On ice: +12 \u00B5L MM to 28 \u00B5L eluate. Mix 5\u00D7.",
      "Seal, run PCR1. Volume = 40 \u00B5L."
    ]}],
    criticalNotes: ["Keep A1 for Step 13!","Safe stop: -20\u00B0C \u22643 days"]
  },
  {
    id: 11, name: "Enrichment Beads Prep", duration: "10 min", phase: "post",
    icon: "\u{1F9F2}", color: "#a3e635",
    summary: "Dilute EA 1:1 with dPBS. Aliquot 17 \u00B5L/sample.",
    masterMixes: [{ name: "Diluted EA", per1: "10 \u00B5L EA + 10 \u00B5L dPBS", per8: "88 + 88 (+10%)", note: "Aliquot 17 \u00B5L/sample at RT." }],
    details: [{ sub: null, title: "Procedure", steps: [
      "Vortex EA, pipette 10\u00D7. Dilute 1:1 with dPBS. Mix 10\u00D7.",
      "Aliquot 17 \u00B5L diluted EA per sample. RT."
    ]}],
    criticalNotes: []
  },
  {
    id: 12, name: "Size Selection & Enrichment", duration: "1h", phase: "post",
    icon: "\u{1F3AF}", color: "#ec4899",
    summary: "Double-sided SPRI size selection, then EA bead enrichment.",
    details: [
      { sub: "12A", title: "Size Selection (RT)", steps: [
        "+60 \u00B5L nfH\u2082O. +50 \u00B5L beads. Mix 10\u00D7. 5 min RT.",
        "\u26A0 KEEP 145 \u00B5L SUPERNATANT \u2192 new tubes",
        "+20 \u00B5L beads to sup. Mix. 5 min. Magnet \u2192 discard sup.",
        "Wash \u00D73: +180 \u00B5L 80% EtOH. Dry 1\u20133 min.",
        "Elute: +19 \u00B5L nfH\u2082O \u2192 5 min \u2192 transfer 17 \u00B5L"
      ]},
      { sub: "12B", title: "Library Enrichment", steps: [
        "17 \u00B5L eluate + 17 \u00B5L diluted EA. Mix 10\u00D7.",
        "Incubate 15 min RT \u2014 mix 10\u00D7 every 5 min!",
        "+116 \u00B5L dPBS. Mix 10\u00D7. Magnet \u2192 remove all.",
        "Wash \u00D72: +150 \u00B5L dPBS \u2192 1 min \u2192 remove",
        "Off magnet: +27 \u00B5L nfH\u2082O = Enriched Library."
      ]}
    ],
    criticalNotes: [
      "\u26A0 KEEP supernatant after 1st binding \u2014 it IS your library!",
      "1st beads = remove large. 2nd beads = capture library.",
      "Mix 10\u00D7 every 5 min during EA incubation."
    ]
  },
  {
    id: 13, name: "Indexing PCR (PCR2)", duration: "20 min", phase: "post",
    icon: "\u{1F3F7}\uFE0F", color: "#8b5cf6",
    summary: "Add Illumina UDI indexes. Amplify with A1. 6/7 cycles.",
    thermoProgram: { name: "PCR2", vol: "40 \u00B5L", time: "15\u201320 min", steps: "98\u00B0C 45s \u2192 [98\u00B0C 15s \u2192 60\u00B0C 30s \u2192 72\u00B0C 30s] \u00D7 6/7 \u2192 72\u00B0C 1min \u2192 4\u00B0C" },
    details: [{ sub: null, title: "Procedure", steps: [
      "Set PCR2: 6 cy (cell lines) or 7 (PBMCs)",
      "Add 3 \u00B5L UDI to 27 \u00B5L Enriched Library. RECORD INDEX!",
      "Add 10 \u00B5L A1. Mix 15\u00D7 at 30 \u00B5L. Run PCR2."
    ]}],
    criticalNotes: ["6 cy cell lines, 7 cy PBMCs","Record index \u2192 sample mapping!"]
  },
  {
    id: 14, name: "Post-Indexing Clean-up & QC", duration: "25 min", phase: "post",
    icon: "\u2705", color: "#22d3ee",
    summary: "Final SPRI (100 \u00B5L EtOH washes). Library QC & sequencing.",
    details: [
      { sub: "14A", title: "Final Clean-up (RT)", steps: [
        "+10 \u00B5L nfH\u2082O. +40 \u00B5L beads. Mix. 5 min.",
        "Magnet \u2192 remove 70 \u00B5L",
        "Wash \u00D73: +100 \u00B5L 80% EtOH (NOT 180!)",
        "Dry 2\u20135 min. Elute: +20 \u00B5L nfH\u2082O \u2192 5 min \u2192 transfer 18 \u00B5L",
        "Store: 4\u00B0C \u226424h | -20\u00B0C long-term"
      ]},
      { sub: "14B", title: "Library QC & Sequencing", steps: [
        "1 \u00B5L on TapeStation or Fragment Analyzer. Expected: 600\u2013800 bp.",
        "Quantify by qPCR.",
        "Load: AVITI 600 pM | NextSeq 2000 1.4 nM | NovaSeq 6000 300 pM | NovaSeq X 150 pM",
        "2% PhiX spike-in",
        "R1 92cy \u00B7 I1 10cy \u00B7 I2 10cy \u00B7 R2 26cy",
        "30,000 reads/cell. Output: Count Matrix + Assay QC."
      ]}
    ],
    criticalNotes: ["100 \u00B5L EtOH washes here (NOT 180 \u00B5L)","Output: Count Matrix + Assay QC"]
  }
];

// Library structure and sequencer loading data (used in Study Mode header)
var LIBRARY_STRUCTURE = [
  {name:"Seq Adapter 2",read:"",color:"#8b5cf6"},
  {name:"Index 2 (i5)",read:"Read 4",color:"#ec4899"},
  {name:"CSGX Barcode",read:"",color:"#f97316"},
  {name:"Constant",read:"",color:"#fbbf24"},
  {name:"PolyT Capture",read:"R2 (26cy)",color:"#4ade80"},
  {name:"mRNA/cDNA Insert",read:"R1 (92cy)",color:"#60a5fa"},
  {name:"cDNA Priming",read:"",color:"#34d399"},
  {name:"Index 1 (i7)",read:"Read 3",color:"#f472b6"},
  {name:"Seq Adapter 1",read:"",color:"#a78bfa"},
];

var SEQUENCER_TABLE = [
  {name:"AVITI FS",loading:"600 pM"},
  {name:"NextSeq 2000",loading:"1.4 nM"},
  {name:"NovaSeq 6000",loading:"300 pM"},
  {name:"NovaSeq X",loading:"150 pM"},
];
