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
  {q:"BSA concentration for coating plates?",a:"0.1% BSA in dPBS",wrong:["0.04% BSA","3.75% BSA","7.5% BSA"],diff:2,cat:"reagent",hint:"Step 1A \u2014 the thinnest BSA.",step:[1]},
  {q:"Cell concentration for PBMCs?",a:"425 cells/\u00B5L (8,500 total)",wrong:["250 cells/\u00B5L (5,000)","500 cells/\u00B5L (10,000)","1,000 cells/\u00B5L (20,000)"],diff:2,cat:"detail",hint:"Between cell lines (250) and organoids (500).",step:[1]},
  {q:"CPM incubation time on ice?",a:"20 minutes",wrong:["10 min","40 min","5 min"],diff:2,cat:"timing",hint:"Step 1D, after 6 \u00B5L CPM.",step:[1]},
  {q:"DB MM volume per sample?",a:"82 \u00B5L",wrong:["75 \u00B5L","100 \u00B5L","60 \u00B5L"],diff:2,cat:"volume",hint:"75.6 + 6.4 = ?",step:[3]},
  {q:"Cell/CPair settling time?",a:"40 min on ice",wrong:["20 min on ice","30 min RT","60 min 4\u00B0C"],diff:2,cat:"timing",hint:"Step 1D final \u2014 vibration-free!",step:[1]},
  {q:"RNaseH volume per sample?",a:"1.5 \u00B5L",wrong:["2 \u00B5L","1 \u00B5L","3 \u00B5L"],diff:2,cat:"volume",hint:"Step 6 \u2014 no mixing needed.",step:[6]},
  {q:"Centrifuge settings for cells?",a:"500 \u00D7 g, 3 min, 4\u00B0C",wrong:["300 \u00D7 g, 5 min, 4\u00B0C","1000 \u00D7 g, 2 min, RT","200 \u00D7 g, 10 min, 4\u00B0C"],diff:2,cat:"detail",hint:"Step 1D washes.",step:[1]},
  {q:"Which reagents must NOT be vortexed?",a:"R2, R3, S2, CPair, and DB",wrong:["R1A, R1B, R1C","S1A and S1B","A1 and A2"],diff:2,cat:"reagent",hint:"Across Steps 1, 3, 7.",step:[1,3,7]},
  {q:"PCR1 cycles for cell lines?",a:"12 cycles",wrong:["13","10","15"],diff:2,cat:"detail",hint:"Step 10 \u2014 fewer than PBMCs.",step:[10]},
  {q:"PCR2 cycles for PBMCs?",a:"7 cycles",wrong:["6","8","5"],diff:2,cat:"detail",hint:"Step 13 \u2014 +1 vs cell lines.",step:[13]},
  {q:"UDI volume in PCR2?",a:"3 \u00B5L",wrong:["5 \u00B5L","2 \u00B5L","1 \u00B5L"],diff:2,cat:"volume",hint:"Step 13 sub-step 2.",step:[13]},
  {q:"Eluate transferred after post-3S clean-up?",a:"28 \u00B5L (from 30 \u00B5L elution)",wrong:["18 \u00B5L (from 20 \u00B5L)","45 \u00B5L (from 50 \u00B5L)","35 \u00B5L (from 40 \u00B5L)"],diff:2,cat:"volume",hint:"Step 9 \u2014 leave ~2 \u00B5L.",step:[9]},
  {q:"CPair volume for 16-sample kit?",a:"340 \u00B5L",wrong:["170 \u00B5L","300 \u00B5L","200 \u00B5L"],diff:2,cat:"volume",hint:"8-sample = 170, so 16 = ?",step:[1]},
  {q:"Washed CPair storage at 4\u00B0C?",a:"1 month",wrong:["1 week","2 weeks","3 months"],diff:2,cat:"detail",hint:"Step 1B reuse note.",step:[1]},
  {q:"RNAH enzyme activity temp?",a:"37\u00B0C for 20 min",wrong:["42\u00B0C 15 min","37\u00B0C 30 min","55\u00B0C 20 min"],diff:2,cat:"thermo",hint:"Step 6 TC program.",step:[6]},
  {q:"Proteinase K volume?",a:"1 \u00B5L",wrong:["1.5 \u00B5L","2 \u00B5L","0.5 \u00B5L"],diff:2,cat:"volume",hint:"Smallest addition.",step:[8]},
  {q:"EtOH wash volume in Step 14?",a:"100 \u00B5L",wrong:["180 \u00B5L","150 \u00B5L","200 \u00B5L"],diff:2,cat:"volume",hint:"Different from Steps 9/12.",step:[14]},
  {q:"RT master mix total volume?",a:"20 \u00B5L",wrong:["22 \u00B5L","10 \u00B5L","32 \u00B5L"],diff:2,cat:"volume",hint:"Sum all components.",step:[3,5]},
  {q:"dPBS added during EA enrichment?",a:"116 \u00B5L",wrong:["100 \u00B5L","150 \u00B5L","200 \u00B5L"],diff:2,cat:"volume",hint:"Step 12B after 15 min.",step:[12]},
  {q:"Coating solution volume per well?",a:"120 \u00B5L",wrong:["100 \u00B5L","150 \u00B5L","200 \u00B5L"],diff:2,cat:"volume",hint:"Step 1A sub-step 1.",step:[1]},
  {q:"Min time on dry ice before -80\u00B0C?",a:"40 minutes",wrong:["20 min","60 min","30 min"],diff:2,cat:"timing",hint:"Same as settling time.",step:[2]},

  // ─── HARD (diff: 3) ──────────────────────────────────────────────

  {q:"TRB ramp 55\u219240\u00B0C?",a:"1\u00B0C per 6 seconds (90s)",wrong:["1\u00B0C/9s","2.5\u00B0C/min","1\u00B0C/3s"],diff:3,cat:"thermo",hint:"First (faster) TRB ramp.",step:[3]},
  {q:"TRB ramp 35\u219220\u00B0C?",a:"1\u00B0C per 9 seconds (135s)",wrong:["1\u00B0C/6s","2.5\u00B0C/min","1\u00B0C/12s"],diff:3,cat:"thermo",hint:"Second (slower) TRB ramp.",step:[3]},
  {q:"3S program ramp rate?",a:"2.5\u00B0C/min (75\u219220\u00B0C in 22 min)",wrong:["1\u00B0C/6s","1\u00B0C/9s","5\u00B0C/min"],diff:3,cat:"thermo",hint:"55\u00B0C drop in 22 min.",step:[7]},
  {q:"How is 6\u00D7 CPM prepared?",a:"200 \u00B5L ice-cold dPBS into lyophilized tube, vortex 30s",wrong:["Dilute 1:6 in nfH\u2082O","200 \u00B5L warm dPBS","200 \u00B5L KCB"],diff:3,cat:"reagent",hint:"Step 1D sub-step 5. Powder.",step:[1]},
  {q:"1.5\u00D7 CPM dilution (organoids)?",a:"30 \u00B5L 6\u00D7 + 90 \u00B5L ice-cold dPBS",wrong:["25+100 \u00B5L","20+100 \u00B5L","40+80 \u00B5L"],diff:3,cat:"reagent",hint:"1\u00D7=20+100, 2\u00D7=40+80. 1.5\u00D7=?",step:[1]},
  {q:"Step 12 first binding: supernatant?",a:"KEEP it \u2014 transfer 145 \u00B5L (it's your library!)",wrong:["Discard","More beads on magnet","Freeze"],diff:3,cat:"detail",hint:"Most critical DO NOT DISCARD.",step:[12]},
  {q:"How is 166 \u00B5M DTT prepared?",a:"1M\u21922mM (2+998 \u00B5L), then 2mM\u2192166\u00B5M (83+917 \u00B5L)",wrong:["1M\u2192166\u00B5M directly","1M\u219210mM\u2192166\u00B5M","1M\u21921mM\u2192166\u00B5M"],diff:3,cat:"reagent",hint:"Serial: 2/1000\u00D71M=2mM, 83/1000\u00D72mM=166\u00B5M.",step:[3]},
  {q:"Expected library fragment size?",a:"600\u2013800 bp average",wrong:["300\u2013500 bp","200\u2013400 bp","800\u20131200 bp"],diff:3,cat:"qc",hint:"Analyzed 150\u20131500 bp range.",step:[14]},
  {q:"NextSeq 2000 loading?",a:"1.4 nM",wrong:["600 pM","300 pM","150 pM"],diff:3,cat:"qc",hint:"Only nM value.",step:[14]},
  {q:"NovaSeq X loading?",a:"150 pM",wrong:["300 pM","600 pM","1.4 nM"],diff:3,cat:"qc",hint:"Lowest pM.",step:[14]},
  {q:"AVITI FS loading?",a:"600 pM",wrong:["1.4 nM","300 pM","150 pM"],diff:3,cat:"qc",hint:"Highest pM.",step:[14]},
  {q:"Read 1 cycles?",a:"92 cycles",wrong:["100","150","50"],diff:3,cat:"qc",hint:"Longest read.",step:[14]},
  {q:"Read 2 cycles?",a:"26 cycles",wrong:["92","10","50"],diff:3,cat:"qc",hint:"Shorter read.",step:[14]},
  {q:"Index cycles (each)?",a:"10 cycles each",wrong:["8 each","12 each","6 each"],diff:3,cat:"qc",hint:"I1 = I2.",step:[14]},
  {q:"PhiX spike-in?",a:"2%",wrong:["5%","1%","10%"],diff:3,cat:"qc",hint:"Seq Rec step 4.",step:[14]},
  {q:"Read depth?",a:"30,000 reads/cell",wrong:["20,000","50,000","10,000"],diff:3,cat:"qc",hint:"Seq Rec step 1.",step:[14]},
  {q:"Volume after PK treatment?",a:"33 \u00B5L",wrong:["32 \u00B5L","22 \u00B5L","20 \u00B5L"],diff:3,cat:"volume",hint:"32 (3S) + 1 (K) = ?",step:[8]},
  {q:"RT highest temperature?",a:"98\u00B0C for 3 min",wrong:["95\u00B0C 5 min","85\u00B0C 2 min","70\u00B0C 10 min"],diff:3,cat:"thermo",hint:"Heat inactivation step.",step:[5]},
  {q:"PK program temps?",a:"37\u00B0C 15 min \u2192 55\u00B0C 10 min",wrong:["37\u00B0C 20min \u2192 65\u00B0C 5min","42\u00B0C 15min \u2192 55\u00B0C 10min","37\u00B0C 10min \u2192 55\u00B0C 15min"],diff:3,cat:"thermo",hint:"Compare: RNAH = 37/20 + 65/5.",step:[8]},
  {q:"Cell washes after CPM incubation?",a:"3 washes (BSA, BSA, no-BSA)",wrong:["2 washes","4 washes","1 wash"],diff:3,cat:"detail",hint:"Two 3.75% BSA, then plain dPBS.",step:[1]},
  {q:"dPBS wash volume in Step 12B?",a:"150 \u00B5L (\u00D72 washes)",wrong:["180 \u00B5L (\u00D73)","200 \u00B5L (\u00D72)","100 \u00B5L (\u00D73)"],diff:3,cat:"volume",hint:"Uses dPBS, not EtOH.",step:[12]},
  {q:"DNA Purification beads in Step 12 first binding?",a:"50 \u00B5L",wrong:["75 \u00B5L","40 \u00B5L","20 \u00B5L"],diff:3,cat:"volume",hint:"Removes large fragments. 2nd = 20 \u00B5L.",step:[12]},
  {q:"How is 0.04% BSA/dPBS prepared?",a:"5 \u00B5L 7.5% BSA + 995 \u00B5L dPBS",wrong:["4+996 \u00B5L","40+960 \u00B5L","0.5+999.5 \u00B5L"],diff:3,cat:"reagent",hint:"(0.04/7.5)\u00D71000 \u2248 5.",step:[1]},
];


var ORDERING_CHALLENGES = [
  {q:"Order the major pre-PCR phases:",items:["Cell Priming & Pairing","Kinetic Confinement","Barcoding & RNA Capture","Post-Capture Clean-up","Reverse Transcription"],diff:1,hint:"Steps 1\u21925",steps:[1,2,3,4,5]},
  {q:"Order the enzymatic reactions:",items:["Reverse Transcription","RNaseH Treatment","Second Strand Synthesis","Proteinase K Treatment"],diff:2,hint:"cDNA \u2192 destroy RNA \u2192 dsDNA \u2192 release",steps:[5,6,7,8]},
  {q:"Order the post-PCR steps:",items:["Amplification PCR","Enrichment Beads Prep","Size Selection & Enrichment","Indexing PCR","Post-Indexing Clean-up"],diff:2,hint:"Amplify\u2192Beads\u2192Select\u2192Index\u2192Clean",steps:[10,11,12,13,14]},
  {q:"Order the Cell Priming sub-steps:",items:["Coat plates","Prepare CPair","Prepare KCB MM","Prime cells with CPM","Pair cells with CPair"],diff:3,hint:"1A\u21921B\u21921C\u21921D",steps:[1]},
  {q:"Order the 7 thermocycler programs:",items:["TRB","RT","RNAH","3S","PK","PCR1","PCR2"],diff:2,hint:"Barcode\u2192RT\u2192RNaseH\u21922nd\u2192PK\u2192Amp\u2192Index",steps:[3,5,6,7,8,10,13]},
  {q:"Order the 3 cell wash buffers (Step 1D):",items:["dPBS + 3.75% BSA","dPBS + 3.75% BSA (repeat)","dPBS only (no BSA)"],diff:3,hint:"Two high-BSA, then plain.",steps:[1]},
];
