// ═══════════════════════════════════════════════════════════════════════
// QUESTIONS & ORDERING CHALLENGES — Powers Challenge Mode
//
// To add a question, copy any existing object and change the values:
//   q:     "The question text"
//   a:     "The correct answer"
//   wrong: ["Wrong 1", "Wrong 2", "Wrong 3"]   (always exactly 3)
//   diff:  1 (easy), 2 (medium), or 3 (hard)
//   cat:   category tag shown in the UI (e.g. "volume", "thermo", "reagent")
//   hint:  "Hint text shown when user clicks Show Hint"
//   step:  [1]  array of step numbers this question belongs to
//          use [0] for general/overview questions
//
// To add an ordering challenge:
//   q:     "The question"
//   items: ["Correct","Order","Here"]   (the CORRECT order)
//   diff:  1, 2, or 3
//   hint:  "Hint text"
//   steps: [1,2,3]  array of step numbers
// ═══════════════════════════════════════════════════════════════════════

var QUESTIONS = [

  // ─── EASY (diff: 1) ──────────────────────────────────────────────

  {q:"What is the very first sub-step?",a:"Coating flat-bottom plates with 0.1% BSA/dPBS",wrong:["Resuspending CPair","Reconstituting CPM","Preparing KCB MM"],diff:1,cat:"order",hint:"Step 1A \u2014 what do wells need first?",step:[1]},
  {q:"Which step follows Kinetic Confinement?",a:"Barcoding & Capture of Target RNA",wrong:["Reverse Transcription","Post-Capture Clean-up","Cell Priming"],diff:1,cat:"order",hint:"Step 2 \u2192 Step ?. Uses TRB.",step:[2,3]},
  {q:"How many total protocol steps?",a:"14",wrong:["12","16","10"],diff:1,cat:"overview",hint:"Steps 1 through ?",step:[0]},
  {q:"Which phase does PCR1 belong to?",a:"Post-PCR",wrong:["Pre-PCR","Both","Neither"],diff:1,cat:"overview",hint:"Step 10 \u2014 boundary is between 9 and 10.",step:[10]},
  {q:"What does CPM stand for?",a:"Cell Pairing Mix",wrong:["Cell Priming Medium","Capture Probe Mix","Cell Processing Module"],diff:1,cat:"reagent",hint:"Lyophilized reagent in Step 1D.",step:[1]},
  {q:"Sequencing platform?",a:"Illumina",wrong:["Nanopore","PacBio","Ion Torrent"],diff:1,cat:"overview",hint:"UDI adapters from this company.",step:[14]},
  {q:"Minimum cell viability?",a:"\u226590%",wrong:["\u226580%","\u226595%","\u226570%"],diff:1,cat:"detail",hint:"Cell Handling section.",step:[1]},
  {q:"CPair storage temp?",a:"4\u00B0C (Box 1)",wrong:["-20\u00B0C (Box 2)","Room temp","-80\u00B0C"],diff:1,cat:"reagent",hint:"Kit Components \u2014 Box 1.",step:[1]},
  {q:"Which MACS sorting interferes?",a:"Positive sorting",wrong:["Negative sorting","Both","Neither"],diff:1,cat:"detail",hint:"Use _____ sorting only.",step:[1]},
  {q:"Safe stop after Kinetic Confinement?",a:"Dry ice \u226424h or -80\u00B0C \u22644 weeks",wrong:["4\u00B0C overnight","RT 2 hours","-20\u00B0C 1 week"],diff:1,cat:"detail",hint:"Two options: cold solid + freezer.",step:[2]},

  // ─── MEDIUM (diff: 2) ────────────────────────────────────────────

  {q:"KCB MM aliquot per sample?",a:"80 \u00B5L",wrong:["100 \u00B5L","60 \u00B5L","50 \u00B5L"],diff:2,cat:"volume",hint:"Step 1C \u2014 into strip tubes on ice.",step:[1]},
  {q:"BSA concentration for coating plates?",a:"0.1% BSA in dPBS",wrong:["0.04% BSA in dPBS","3.75% BSA in dPBS","7.5% BSA in dPBS"],diff:2,cat:"reagent",hint:"Step 1A \u2014 the thinnest BSA.",step:[1]},
  {q:"Cell concentration for PBMCs?",a:"425 cells/\u00B5L (8,500 total)",wrong:["250 cells/\u00B5L (5,000)","500 cells/\u00B5L (10,000)","1,000 cells/\u00B5L (20,000)"],diff:2,cat:"detail",hint:"Between cell lines (250) and organoids (500).",step:[1]},
{q:"CPM incubation time on ice?",a:"20 min",wrong:["10 min","40 min","5 min"],diff:2,cat:"timing",hint:"Step 1D, after 6 \u00B5L CPM.",step:[1]},  {q:"DB MM volume per sample?",a:"82 \u00B5L",wrong:["75 \u00B5L","100 \u00B5L","60 \u00B5L"],diff:2,cat:"volume",hint:"75.6 + 6.4 = ?",step:[3]},
  {q:"Cell/CPair settling time?",a:"40 min on ice",wrong:["20 min on ice","30 min RT","60 min 4\u00B0C"],diff:2,cat:"timing",hint:"Step 1D final \u2014 vibration-free!",step:[1]},
  {q:"RNaseH volume per sample?",a:"1.5 \u00B5L",wrong:["2 \u00B5L","1 \u00B5L","3 \u00B5L"],diff:2,cat:"volume",hint:"Step 6 \u2014 no mixing needed.",step:[6]},
  {q:"Centrifuge settings for cells?",a:"500 \u00D7 g, 3 min, 4\u00B0C",wrong:["300 \u00D7 g, 5 min, 4\u00B0C","1000 \u00D7 g, 2 min, RT","200 \u00D7 g, 10 min, 4\u00B0C"],diff:2,cat:"detail",hint:"Step 1D washes.",step:[1]},
  {q:"Which reagents must NOT be vortexed?",a:"R2, R3, S2, CPair, and DB",wrong:["R1A, R1B, R1C","S1A and S1B","A1 and A2"],diff:2,cat:"reagent",hint:"Across Steps 1, 3, 7.",step:[1,3,7]},
  {q:"PCR1 cycles for Primary cells?",a:"12 cycles",wrong:["13 cycles","10 cycles","15 cycles"],diff:2,cat:"detail",hint:"Step 10 \u2014 Same as Organoids and PBMCs.",step:[10]},
  {q:"PCR2 cycles for Primary Cells?",a:"7 cycles",wrong:["6 cycles","8 cycles","5 cycles"],diff:2,cat:"detail",hint:"Step 13 \u2014 +1 vs cell lines.",step:[13]},
  {q:"UDI volume in PCR2?",a:"3 \u00B5L",wrong:["5 \u00B5L","2 \u00B5L","1 \u00B5L"],diff:2,cat:"volume",hint:"Step 13 sub-step 2.",step:[13]},
  {q:"Eluate transferred after post-3S clean-up?",a:"28 \u00B5L (from 30 \u00B5L elution)",wrong:["18 \u00B5L (from 20 \u00B5L)","45 \u00B5L (from 50 \u00B5L)","35 \u00B5L (from 40 \u00B5L)"],diff:2,cat:"volume",hint:"Step 9 \u2014 leave ~2 \u00B5L.",step:[9]},
  {q:"CPair volume for 8-sample kit?",a:"170 \u00B5L",wrong:["340 \u00B5L","300 \u00B5L","200 \u00B5L"],diff:2,cat:"volume",hint:"8-sample = 170, so 16 = ?",step:[1]},
  {q:"Washed CPair storage at 4\u00B0C?",a:"1 month",wrong:["1 week","2 weeks","3 months"],diff:2,cat:"detail",hint:"Step 1B reuse note.",step:[1]},
  {q:"RNAH enzyme activity temp?",a:"37\u00B0C, 20 min",wrong:["42\u00B0C, 15 min","37\u00B0C, 30 min","55\u00B0C, 20 min"],diff:2,cat:"thermo",hint:"Step 6 TC program.",step:[6]},
  {q:"Proteinase K volume?",a:"1 \u00B5L",wrong:["1.5 \u00B5L","2 \u00B5L","0.5 \u00B5L"],diff:2,cat:"volume",hint:"Smallest addition.",step:[8]},
  {q:"EtOH wash volume in Step 14?",a:"100 \u00B5L",wrong:["180 \u00B5L","150 \u00B5L","200 \u00B5L"],diff:2,cat:"volume",hint:"Different from Steps 9/12.",step:[14]},
  {q:"RT master mix total volume?",a:"20 \u00B5L",wrong:["22 \u00B5L","10 \u00B5L","32 \u00B5L"],diff:2,cat:"volume",hint:"Sum all components.",step:[3,5]},
  {q:"dPBS added during EA enrichment?",a:"116 \u00B5L",wrong:["100 \u00B5L","150 \u00B5L","200 \u00B5L"],diff:2,cat:"volume",hint:"Step 12B after 15 min.",step:[12]},
  {q:"Coating solution volume per well?",a:"120 \u00B5L",wrong:["100 \u00B5L","150 \u00B5L","200 \u00B5L"],diff:2,cat:"volume",hint:"Step 1A sub-step 1.",step:[1]},
  {q:"For kinetic confinement, Min time on dry ice before -80\u00B0C?",a:"40 minutes",wrong:["20 minutes","60 minutes","30 minutes"],diff:2,cat:"timing",hint:"Same as settling time.",step:[2]},

  // ─── HARD (diff: 3) ──────────────────────────────────────────────

  {q:"TRB ramp 55\u219240\u00B0C?",a:"1\u00B0C per 6 seconds (90s)",wrong:["1\u00B0C/9s","2.5\u00B0C/min","1\u00B0C/3s"],diff:3,cat:"thermo",hint:"First (faster) TRB ramp.",step:[3]},
  {q:"TRB ramp 35\u219220\u00B0C?",a:"1\u00B0C per 9 seconds (135s)",wrong:["1\u00B0C/6s","2.5\u00B0C/min","1\u00B0C/12s"],diff:3,cat:"thermo",hint:"Second (slower) TRB ramp.",step:[3]},
  {q:"3S program ramp rate?",a:"2.5\u00B0C/min (75\u219220\u00B0C in 22 min)",wrong:["1\u00B0C/6s (55\u219240\u00B0C in 90 sec)","1\u00B0C/9s (35\u219220\u00B0C in 135 sec)","5\u00B0C/min"],diff:3,cat:"thermo",hint:"55\u00B0C drop in 22 min.",step:[7]},
  {q:"How is 6\u00D7 CPM prepared?",a:"200 \u00B5L ice-cold dPBS into lyophilized tube, vortex 30s",wrong:["Dilute 1:6 in nfH\u2082O","200 \u00B5L warm dPBS","200 \u00B5L KCB"],diff:3,cat:"reagent",hint:"Step 1D sub-step 5. Powder.",step:[1]},
  {q:"1.5\u00D7 CPM dilution (organoids)?",a:"30 \u00B5L 6\u00D7 + 90 \u00B5L ice-cold dPBS",wrong:["25+100 \u00B5L","20+100 \u00B5L","40+80 \u00B5L"],diff:3,cat:"reagent",hint:"1\u00D7=20+100, 2\u00D7=40+80. 1.5\u00D7=?",step:[1]},
  {q:"Step 12 first binding: supernatant?",a:"KEEP it \u2014 transfer 145 \u00B5L (it's your library!)",wrong:["Discard","More beads on magnet","Freeze"],diff:3,cat:"detail",hint:"Most critical DO NOT DISCARD.",step:[12]},
  {q:"How is 166 \u00B5M DTT prepared?",a:"1M\u21922mM (2+998 \u00B5L), then 2mM\u2192166\u00B5M (83+917 \u00B5L)",wrong:["1M\u2192166\u00B5M directly","1M\u219210mM\u2192166\u00B5M","1M\u21921mM\u2192166\u00B5M"],diff:3,cat:"reagent",hint:"Serial: 2/1000\u00D71M=2mM, 83/1000\u00D72mM=166\u00B5M.",step:[3]},
  {q:"Expected library fragment size?",a:"600\u2013800 bp average",wrong:["300\u2013500 bp","200\u2013400 bp","800\u20131200 bp"],diff:3,cat:"qc",hint:"Analyzed 150\u20131500 bp range.",step:[14]},
  {q:"NextSeq 2000 loading?",a:"1.4 nM",wrong:["600 pM","300 pM","150 pM"],diff:3,cat:"qc",hint:"Only nM value.",step:[14]},
  {q:"NovaSeq X loading?",a:"150 pM",wrong:["300 pM","600 pM","1.4 nM"],diff:3,cat:"qc",hint:"Lowest pM.",step:[14]},
  {q:"AVITI FS loading?",a:"600 pM",wrong:["1.4 nM","300 pM","150 pM"],diff:3,cat:"qc",hint:"Highest pM.",step:[14]},
  {q:"Read 1 cycles for sequencing??",a:"92 cycles",wrong:["100 cycles","150 cycles","50 cycles"],diff:3,cat:"qc",hint:"Longest read.",step:[14]},
  {q:"Read 2 cycles?",a:"26 cycles",wrong:["92 cycles","10 cycles","50 cycles"],diff:3,cat:"qc",hint:"Shorter read.",step:[14]},
  {q:"For how many cycles are Indexes sequenced (each)?",a:"10 cycles each",wrong:["8 cycles each","12 cycles each","6 cycles each"],diff:3,cat:"qc",hint:"I1 = I2.",step:[14]},
  {q:"PhiX spike-in?",a:"2%",wrong:["5%","1%","10%"],diff:3,cat:"qc",hint:"Seq Rec step 4.",step:[14]},
  {q:"Read depth?",a:"30,000 reads/cell",wrong:["20,000","50,000","10,000"],diff:3,cat:"qc",hint:"Seq Rec step 1.",step:[14]},
  {q:"Volume after PK treatment?",a:"33 \u00B5L",wrong:["32 \u00B5L","22 \u00B5L","20 \u00B5L"],diff:3,cat:"volume",hint:"32 (3S) + 1 (K) = ?",step:[8]},
{q:"RT highest temperature?",a:"98\u00B0C, 3 min",wrong:["95\u00B0C, 5 min","85\u00B0C, 2 min","70\u00B0C, 10 min"],diff:3,cat:"thermo",hint:"Heat inactivation step.",step:[5]},  {q:"PK program temps?",a:"37\u00B0C 15 min \u2192 55\u00B0C 10 min",wrong:["37\u00B0C 20min \u2192 65\u00B0C 5min","42\u00B0C 15min \u2192 55\u00B0C 10min","37\u00B0C 10min \u2192 55\u00B0C 15min"],diff:3,cat:"thermo",hint:"Compare: RNAH = 37/20 + 65/5.",step:[8]},
  {q:"Cell washes after CPM incubation?",a:"3 washes (BSA, BSA, no-BSA)",wrong:["2 washes","4 washes","1 wash"],diff:3,cat:"detail",hint:"Two 3.75% BSA, then plain dPBS.",step:[1]},
  {q:"dPBS wash volume in Step 12B?",a:"150 \u00B5L (\u00D72 washes)",wrong:["180 \u00B5L (\u00D73)","200 \u00B5L (\u00D72)","100 \u00B5L (\u00D73)"],diff:3,cat:"volume",hint:"Uses dPBS, not EtOH.",step:[12]},
  {q:"DNA Purification beads in Step 12 first binding?",a:"50 \u00B5L",wrong:["75 \u00B5L","40 \u00B5L","20 \u00B5L"],diff:3,cat:"volume",hint:"Removes large fragments. 2nd = 20 \u00B5L.",step:[12]},
  {q:"How is 0.04% BSA/dPBS prepared?",a:"5 \u00B5L 7.5% BSA + 995 \u00B5L dPBS",wrong:["4+996 \u00B5L","40+960 \u00B5L","0.5+999.5 \u00B5L"],diff:3,cat:"reagent",hint:"(0.04/7.5)\u00D71000 \u2248 5.",step:[1]},

// ─── MECHANISTIC UNDERSTANDING ───────────────────────────────────
  // These test WHY the protocol works, not just WHAT the steps are.

  // -- Why things must be cold --
  {q:"Why must everything before TRB be kept on ice?",a:"KCB contains a heat-activated lysis agent \u2014 warming causes premature lysis before confinement is established",wrong:["To prevent RNA degradation by RNases","To keep the KCB viscosity high","To prevent CPair beads from aggregating"],diff:2,cat:"mechanism",hint:"Think about WHEN lysis should happen vs. when cells are still in low-viscosity buffer.",step:[1,2]},
  {q:"Why is CPM unstable above 4\u00B0C?",a:"The cell-binding molecules degrade or aggregate at higher temperatures, losing their ability to prime cells for CPair binding",wrong:["It contains RNA that degrades at room temperature","The dPBS solvent evaporates above 4\u00B0C","It reacts with atmospheric CO\u2082 when warm"],diff:2,cat:"mechanism",hint:"CPM must insert into or bind the cell membrane. What happens to amphiphilic molecules when they warm up?",step:[1]},
  {q:"Why must cells be paired with CPair BEFORE transfer into KCB?",a:"KCB is too viscous for cells and beads to find each other \u2014 pairing must happen in low-viscosity buffer first",wrong:["KCB would lyse the cells before pairing could occur","CPair beads dissolve in KCB","The DTT in KCB MM would inactivate the cell-binding molecules"],diff:2,cat:"mechanism",hint:"Think about diffusion. Can a cell and a bead 'find' each other in a viscous matrix?",step:[1,2]},

  // -- Why KCB works --
  {q:"What is the primary role of KCB's high viscosity?",a:"Restricting diffusion of mRNA and indexing oligos to maintain single-cell resolution without physical partitions",wrong:["Protecting RNA from degradation","Preventing cells from moving during thermocycling","Keeping the beads suspended evenly"],diff:1,cat:"mechanism",hint:"Kinetic CONFINEMENT \u2014 what is being confined, and from what?",step:[2]},
  {q:"Why does KCB enable 'single-cell' indexing without droplets or wells?",a:"High viscosity creates virtual compartments \u2014 each cell-bead pair's molecules stay local, preventing inter-pair crosstalk",wrong:["The beads physically encapsulate each cell","KCB chemically cross-links mRNA to the nearest bead","Each cell is frozen individually before lysis"],diff:2,cat:"mechanism",hint:"Think about what happens when you release mRNA and oligos into a very thick liquid vs. a thin one.",step:[2]},
  {q:"Why can frozen cell-CPair samples in KCB be stored at -80\u00B0C for weeks without quality loss?",a:"KCB has cryoprotective properties that prevent ice crystal damage to paired cell-bead complexes",wrong:["The cells are already lysed so RNA is protected","The -80\u00B0C temperature alone is sufficient for any buffer","CPair beads shield the cells from freezing damage"],diff:2,cat:"mechanism",hint:"The preprint specifically mentions KCB's 'cryoprotective effect.' What do cryoprotectants do?",step:[2]},

  // -- Why TRB ramp rates matter --
  {q:"What happens during the 95\u00B0C step in the TRB program?",a:"Cells lyse and indexing oligonucleotides are released from CPair beads",wrong:["Reverse transcription begins","The KCB viscosity is permanently set","CPair beads are demagnetized"],diff:2,cat:"mechanism",hint:"Two things happen simultaneously at high temperature: one to the cell, one to the bead.",step:[3]},
  {q:"Why is the TRB ramp-down (55\u219240\u00B0C) slow and controlled, not instant?",a:"The gradual cooling allows poly(dT) indexing oligos to hybridize to mRNA poly(A) tails at optimal annealing temperatures",wrong:["Fast cooling would crack the tube from thermal shock","The beads need time to re-magnetize","Slow cooling prevents KCB from solidifying unevenly"],diff:3,cat:"mechanism",hint:"What happens when complementary DNA/RNA sequences are slowly cooled through their melting temperature?",step:[3]},
  {q:"Why is the second TRB ramp (35\u219220\u00B0C) SLOWER than the first (55\u219240\u00B0C)?",a:"Lower temperatures favor more stable but slower hybridization \u2014 extra time allows remaining oligo-mRNA pairs to anneal",wrong:["The thermocycler physically cannot cool faster at lower temperatures","KCB becomes more viscous at lower temperatures, requiring gradual adjustment","Faster cooling below 35\u00B0C would shear the indexing oligonucleotides"],diff:3,cat:"mechanism",hint:"1\u00B0C/6s (first ramp) vs 1\u00B0C/9s (second ramp). Why give more time per degree at lower temps?",step:[3]},
  {q:"Why are TRB ramp rates thermocycler-specific?",a:"Different thermocyclers have different thermal masses and heating elements, so actual vs. programmed ramp rates can diverge",wrong:["Each thermocycler brand uses a different tube format","The lid temperature varies between models","Older thermocyclers cannot reach 95\u00B0C"],diff:2,cat:"mechanism",hint:"CS Genetics provides a specific link for thermocycler ramp speed verification. Why would this matter?",step:[3]},

  // -- Why DTT is added fresh --
  {q:"Why is DTT added fresh to KCB, DB, and WA rather than pre-mixed in the kit?",a:"DTT oxidizes over time in solution \u2014 adding it fresh ensures an active reducing environment when needed",wrong:["DTT is too expensive to include in the kit","Pre-mixed DTT would react with the plastic tubes during shipping","DTT must be at a specific temperature when added"],diff:2,cat:"mechanism",hint:"DTT is a reducing agent. What happens to reducing agents over weeks in solution at any temperature?",step:[1,3]},

  // -- Why you cannot vortex certain reagents --
  {q:"Why must CPair never be vortexed?",a:"Vortexing could shear the indexing oligonucleotides off the bead surface or fragment the beads, destroying barcodes",wrong:["Vortexing would heat the beads above 4\u00B0C","The beads would permanently clump together","Vortexing introduces RNases from the air"],diff:2,cat:"mechanism",hint:"CPair beads carry ~50,000 unique barcode oligos on their surface. What does mechanical shearing do to surface-attached DNA?",step:[1]},
  {q:"Why must DB not be vortexed?",a:"DB contains capture beads with surface-attached oligos \u2014 vortexing could damage the oligos or fragment the beads",wrong:["Vortexing would create foam that interferes with the magnet","DB is a detergent that would create permanent bubbles","The DTT in DB MM is sensitive to agitation"],diff:2,cat:"mechanism",hint:"Same reason as CPair \u2014 DB also contains beads. What are those beads for?",step:[3]},
  {q:"Why CAN you vortex R1A, R1B, R1C, S1A, and S1B?",a:"These are soluble enzyme/primer mixes without bead-attached oligos \u2014 shearing forces don't damage them",wrong:["They are stored in special shear-resistant tubes","Vortexing activates the enzymes","They contain detergent that prevents shearing"],diff:2,cat:"mechanism",hint:"Compare: what's different about these reagents vs. CPair and DB? Think about what's in solution vs. on a surface.",step:[3,7]},

  // -- Why washes matter --
  {q:"Why are there THREE washes after CPM incubation (two BSA, then no-BSA)?",a:"Remove unbound CPM (which would block CPair binding sites), then remove BSA itself (which could interfere with pairing)",wrong:["Each wash removes a different contaminant from the cells","Three washes are standard for any cell protocol","The BSA washes fix CPM to the membrane"],diff:3,cat:"mechanism",hint:"If free CPM molecules carry over to the pairing step, what would they do to CPair bead binding sites?",step:[1]},
  {q:"Why does the final cell wash use plain dPBS (no BSA)?",a:"Residual BSA could coat cell surfaces and block CPM-CPair binding during the pairing step",wrong:["BSA interferes with the KCB viscosity","BSA would be detected as contaminating protein in sequencing","The cells need to equilibrate to a BSA-free environment before freezing"],diff:3,cat:"mechanism",hint:"BSA is a large sticky protein. If it coats the cell surface after CPM priming, what happens when CPair tries to bind?",step:[1]},

  // -- Size selection logic --
  {q:"In Step 12, why does the FIRST bead binding remove large fragments while your library stays in the supernatant?",a:"A low bead ratio (0.5\u00D7) preferentially captures only the largest DNA fragments, leaving smaller library fragments in solution",wrong:["The beads are size-selective and only bind fragments >1000 bp","Large fragments are magnetic and stick to the beads","The first beads are a different type than the second beads"],diff:3,cat:"mechanism",hint:"SPRI bead ratio determines the size cutoff. Low ratio = only big fragments bind. Your library is the right size to stay free.",step:[12]},
  {q:"Why is the size selection double-sided (two sequential bead bindings)?",a:"First binding removes large contaminants (genomic DNA, artifacts). Second binding captures your library while leaving small contaminants (primer dimers) behind.",wrong:["Two bindings give twice the DNA yield","The first binding is a quality check before the real capture","Each binding captures a different strand of the double-stranded library"],diff:3,cat:"mechanism",hint:"Think: what's TOO BIG (genomic DNA) and what's TOO SMALL (primer dimers)? Two cuts = one window.",step:[12]},

  // -- Why Proteinase K is needed --
  {q:"Why is Proteinase K treatment needed after Second Strand Synthesis?",a:"To digest proteins (including the binding molecules connecting cell to bead) and release the cDNA from the bead complex",wrong:["To remove histone proteins from the DNA","To digest residual S1A/S1B enzymes that would interfere with PCR","To fragment the cDNA to the correct library size"],diff:2,cat:"mechanism",hint:"At this point, your cDNA is still physically attached to CPair beads via protein linkages. How do you free it?",step:[8]},

  // -- Why second strand synthesis uses random priming --
  {q:"Why does second strand synthesis use random-location priming instead of a specific primer?",a:"Random priming creates unique start sites (5S) for each molecule, enabling PCR duplicate detection without UMIs",wrong:["Specific primers would only capture a subset of genes","Random primers are cheaper than specific ones","It compensates for incomplete reverse transcription"],diff:3,cat:"mechanism",hint:"The preprint explains that 5S coordinates replace UMIs for deduplication. How does a unique start site identify a PCR duplicate?",step:[7]},

  // -- Why positive MACS sorting interferes --
  {q:"Why does positive MACS sorting interfere with the assay but negative sorting doesn't?",a:"Positive sorting coats cells with antibody-conjugated beads that could sterically block CPM/CPair binding to the cell surface",wrong:["Positive sorting damages cell membranes","The magnetic beads from MACS interfere with CPair's paramagnetism","Positive sorting selects for dead cells"],diff:3,cat:"mechanism",hint:"In positive sorting, target cells get coated with magnetic particles. What does that do to the cell surface accessibility?",step:[1]},

  // -- Practical understanding --
  {q:"Why must the 40-minute settling step be vibration-free?",a:"Vibrations would prevent cells and CPair beads from settling together to the bottom and forming stable 1:1 pairs",wrong:["Vibrations would lyse the fragile cells","KCB would mix unevenly with vibration","The CPM coating would detach from vibrated cells"],diff:1,cat:"mechanism",hint:"Gravity is pulling cells and beads to the bottom of the flat-bottom well. What disrupts gravity settling?",step:[1]},
  {q:"Why are flat-bottom plates used for cell-CPair pairing (not V-bottom)?",a:"Flat bottom provides a larger settling area so cells and beads spread out, reducing the chance of multiple cells settling on the same bead",wrong:["V-bottom plates would crack during the freezing step","Flat bottoms are easier to pipette from","V-bottom plates are not compatible with the plate magnet"],diff:2,cat:"mechanism",hint:"Think about geometry: in a V-bottom, everything concentrates at one point. In flat-bottom, things spread out. Which favors 1:1 pairing?",step:[1]},
  {q:"Why is reverse pipetting recommended for KCB?",a:"KCB is extremely viscous \u2014 standard pipetting creates an air gap that causes bubbles, while reverse pipetting pre-fills the tip eliminating the air gap",wrong:["Reverse pipetting is more accurate for all viscous liquids","Standard pipetting would shear the KCB polymer chains","The thermocycler cannot read tubes with bubbles"],diff:2,cat:"mechanism",hint:"In standard pipetting, the first stroke draws in air. In viscous liquid, that air becomes trapped bubbles. Reverse pipetting avoids this how?",step:[1]},
  {q:"Why must there be no visible refraction in the KCB-cell mixture before freezing?",a:"Visible refraction indicates inhomogeneous mixing \u2014 some regions would have wrong viscosity, compromising kinetic confinement",wrong:["Refraction means the solution has crystallized","Light refraction damages the indexing oligonucleotides","Refraction indicates the DTT has not been properly mixed"],diff:2,cat:"mechanism",hint:"Refraction = two liquids with different densities not fully mixed. If confinement depends on uniform viscosity, what happens in a thin patch?",step:[2]},
  {q:"Why do you mix KCB by aspirating from the BOTTOM and dispensing ABOVE the meniscus?",a:"This creates a folding action that mixes viscous liquid without trapping air bubbles inside the solution",wrong:["It prevents the beads from settling at the bottom","The top of the liquid is warmer and needs to be mixed down","This technique generates less static electricity"],diff:2,cat:"mechanism",hint:"If you aspirate and dispense at the same depth in thick liquid, you just push liquid around in a circle. How do you actually fold layers?",step:[2]},
];


var ORDERING_CHALLENGES = [
  {q:"Order the major pre-PCR phases:",items:["Cell Priming & Pairing","Kinetic Confinement","Barcoding & RNA Capture","Post-Capture Clean-up","Reverse Transcription"],diff:1,hint:"Steps 1\u21925",steps:[1,2,3,4,5]},
  {q:"Order the enzymatic reactions:",items:["Reverse Transcription","RNaseH Treatment","Second Strand Synthesis","Proteinase K Treatment"],diff:2,hint:"cDNA \u2192 destroy RNA \u2192 dsDNA \u2192 release",steps:[5,6,7,8]},
  {q:"Order the post-PCR steps:",items:["Amplification PCR","Enrichment Beads Prep","Size Selection & Enrichment","Indexing PCR","Post-Indexing Clean-up"],diff:2,hint:"Amplify\u2192Beads\u2192Select\u2192Index\u2192Clean",steps:[10,11,12,13,14]},
  {q:"Order the Cell Priming sub-steps:",items:["Coat plates","Prepare CPair","Prepare KCB MM","Prime cells with CPM","Pair cells with CPair"],diff:3,hint:"1A\u21921B\u21921C\u21921D",steps:[1]},
  {q:"Order the 7 thermocycler programs:",items:["TRB","RT","RNAH","3S","PK","PCR1","PCR2"],diff:2,hint:"Barcode\u2192RT\u2192RNaseH\u21922nd\u2192PK\u2192Amp\u2192Index",steps:[3,5,6,7,8,10,13]},
  {q:"Order the 3 cell wash buffers (Step 1D):",items:["dPBS + 3.75% BSA","dPBS + 3.75% BSA (repeat)","dPBS only (no BSA)"],diff:3,hint:"Two high-BSA, then plain.",steps:[1]},
];
