import { PanicStage, RoastItem, SurvivalTip } from '../types';

export const STAGE_MESSAGES: Record<PanicStage, string[]> = {
  calm: [
    "You have plenty of time. Which means you'll probably start in 5 hours.",
    "Your textbook is still optimistic about your future.",
    "There is absolutely no reason to panic. Yet.",
    "You have enough time to study. Please don't use this information irresponsibly.",
    "Your future self is begging you not to watch a 4-hour video essay about ancient bread.",
    "The syllabus is calm. The slides are unopened. Life is serene and dangerously deceptive.",
    "You could actually master this chapter right now. Or you could color-code your calendar again.",
    "Statistical anomaly: you have adequate preparation time. Do not let your brain find out.",
    "Right now, you are one responsible decision away from a calm night. Don't blow it.",
  ],
  focus: [
    "You could start studying now. Wild concept, I know.",
    "Your exam is approaching faster than your motivation.",
    "Maybe stop reorganizing your desk and open the syllabus.",
    "You've entered the 'I'll start after one more video' phase.",
    "That coffee isn't studying for you. You actually have to read.",
    "Your brain is currently convincing you that cleaning your keyboard is exam prep.",
    "The time for leisurely highlighting has passed. It's triage hour.",
    "You have just enough time to look competent if you stop looking at memes right now.",
    "You are currently burning through the golden hours. Treat them with respect.",
  ],
  warning: [
    "This is no longer procrastination. This is a lifestyle choice.",
    "The syllabus has noticed your absence.",
    "You have entered the 'I can learn the entire syllabus in one sitting' era.",
    "Your future self would like to file a complaint.",
    "Every minute you spend calculating your time is a minute you aren't memorizing formulas.",
    "You are now running on pure adrenaline, spite, and caffeinated delusion.",
    "If you open TikTok right now, you are officially waving the white flag.",
    "Two chapters in one hour? You're about to test the limits of human cognition.",
    "Your notes are looking at you with deep, sorrowful concern.",
  ],
  panic: [
    "🚨 PANIC MODE. Close everything that isn't related to the exam.",
    "You have entered the academic emergency department.",
    "Stop calculating how much time you have and USE IT.",
    "Your remaining study time is now measured in snacks.",
    "Memorize the definitions. Memorize the graphs. Do not ask 'why', just remember 'what'.",
    "This is not a drill. Close 47 browser tabs immediately.",
    "Speed-reading lecture summaries like they're breaking news.",
    "Every sentence you read in the next 30 minutes is worth 2 marks on the test.",
    "You are in full survival mode. Silence your phone or throw it into another room.",
  ],
  extreme_panic: [
    "You are no longer preparing. You are negotiating with fate.",
    "At this point, memorize the important stuff and pray to whatever deity handles exam papers.",
    "The syllabus has won. Salvage what you can.",
    "Become the main character. Channel the energy of someone who totally studied for weeks.",
    "Look at the formulas one last time. Lock them into temporary RAM.",
    "Take three slow breaths. A panicked brain forgets what 2 + 2 is.",
    "Pack your pens, student ID, and dignity. It's time.",
  ],
  exam_started: [
    "THE EXAM HAS STARTED.",
    "Well. You can't procrastinate anymore.",
    "The boss fight has begun.",
    "May the questions be from the chapters you actually studied.",
    "Write something for every single question. Partial credit is your best friend.",
    "Do not panic if question 1 looks like hieroglyphics. Skip to question 2.",
  ],
};

export const ROAST_LIBRARY: RoastItem[] = [
  // Calm stage roasts
  {
    id: 'r-calm-1',
    stage: 'calm',
    text: "You had 10 hours. You spent 9 of them calculating how much time you had.",
  },
  {
    id: 'r-calm-2',
    stage: 'calm',
    text: "You opened your notes, sighed deeply, and immediately checked your phone. Incredible stamina.",
  },
  {
    id: 'r-calm-3',
    stage: 'calm',
    text: "You've spent more time adjusting your study playlist than actually looking at page 1.",
  },
  {
    id: 'r-calm-4',
    stage: 'calm',
    text: "You just downloaded a 200-page PDF and felt a sudden wave of accomplishment as if downloading counts as reading.",
  },
  {
    id: 'r-calm-5',
    stage: 'calm',
    text: "Your highlighters have seen more action today than your prefrontal cortex.",
  },

  // Focus stage roasts
  {
    id: 'r-foc-1',
    stage: 'focus',
    text: "You're currently convincing yourself that watching a 10-minute recap video is equivalent to 14 weeks of lectures.",
  },
  {
    id: 'r-foc-2',
    stage: 'focus',
    text: "You promised yourself you'd start at the top of the hour. It is now 12 minutes past the hour.",
  },
  {
    id: 'r-foc-3',
    stage: 'focus',
    text: "You just reorganised your desktop folders into alphabetical order. The professor will definitely test you on that.",
  },
  {
    id: 'r-foc-4',
    stage: 'focus',
    text: "Reading the same slide three times without processing a single syllable is not studying, bestie.",
  },
  {
    id: 'r-foc-5',
    stage: 'focus',
    text: "You are currently calculating the absolute bare minimum grade you need to pass the module.",
  },

  // Warning stage roasts
  {
    id: 'r-warn-1',
    stage: 'warning',
    text: "You are now at the stage of cramming where you say 'it probably won't be on the exam' about 80% of the syllabus.",
  },
  {
    id: 'r-warn-2',
    stage: 'warning',
    text: "Your brain is attempting a high-speed data download over dial-up emotional bandwidth.",
  },
  {
    id: 'r-warn-3',
    stage: 'warning',
    text: "You just made eye contact with a formula you've never seen in your entire life.",
  },
  {
    id: 'r-warn-4',
    stage: 'warning',
    text: "Thinking 'I should have started yesterday' produces exactly zero exam marks.",
  },
  {
    id: 'r-warn-5',
    stage: 'warning',
    text: "You're reading summaries of summaries. Soon you'll just be studying the vibes of the subject.",
  },

  // Panic & Extreme Panic stage roasts
  {
    id: 'r-pan-1',
    stage: 'panic',
    text: "You are attempting to cram four months of academic curriculum into the duration of an extended lunch break.",
  },
  {
    id: 'r-pan-2',
    stage: 'panic',
    text: "Clicking 'Roast Me' while your exam starts in under an hour is bold psychological warfare against yourself.",
  },
  {
    id: 'r-pan-3',
    stage: 'panic',
    text: "Your handwriting is about to degrade into seismograph readings.",
  },
  {
    id: 'r-pan-4',
    stage: 'panic',
    text: "At this rate, you aren't taking the exam. You're participating in an unsolicited diagnostic test of your luck.",
  },
  {
    id: 'r-pan-5',
    stage: 'panic',
    text: "Put the phone down. Literally put it in a drawer right now. I am a timer and even I am disappointed.",
  },

  // General roasts
  {
    id: 'r-gen-1',
    stage: 'general',
    text: "You've refreshed this countdown 14 times as if watching the numbers shrink will magically transfer knowledge into your brain.",
  },
  {
    id: 'r-gen-2',
    stage: 'general',
    text: "The syllabus didn't get longer; your procrastination window just collapsed.",
  },
  {
    id: 'r-gen-3',
    stage: 'general',
    text: "You planned 8 hours of sleep like you're on a spa retreat before final exams.",
  },
];

export const SURVIVAL_ADVICE_LIBRARY: Record<PanicStage, SurvivalTip[]> = {
  calm: [
    {
      id: 'adv-calm-1',
      title: 'The Reverse-Audit Triage',
      stage: 'calm',
      action: 'Open past exam papers first, not page 1 of Chapter 1.',
      tactic: 'Look at the last 3 years of exams. Identify the 4 topics that appear EVERY SINGLE YEAR. Master those before you touch anything obscure.',
    },
    {
      id: 'adv-calm-2',
      title: 'The 50/10 Focus Protocol',
      stage: 'calm',
      action: 'Set a 50-minute phone-in-another-room timer right now.',
      tactic: 'With multiple hours left, high-intensity uninterrupted blocks will save your grade. Ten minutes of deep focus beats two hours of distracted scrolling.',
    },
    {
      id: 'adv-calm-3',
      title: 'Sleep Protection Contract',
      stage: 'calm',
      action: 'Protect your planned sleep at all costs.',
      tactic: 'An exhausted brain makes 40% more careless errors on multiple choice and calculations. Study intensely now so you can sleep without guilt.',
    },
  ],
  focus: [
    {
      id: 'adv-foc-1',
      title: 'The 80/20 Rule (Pareto Sprint)',
      stage: 'focus',
      action: 'Pick the 2 highest-value topics. Ignore everything else for now.',
      tactic: '80% of exam marks come from 20% of core concepts. If you understand the major theorems and primary definitions, you secure the passing baseline.',
    },
    {
      id: 'adv-foc-2',
      title: 'Active Recall, Zero Re-reading',
      stage: 'focus',
      action: 'Close your notes and write everything you remember on blank paper.',
      tactic: 'Re-reading gives a false feeling of mastery. Active testing is uncomfortable, but it wires information directly into short-term recall.',
    },
    {
      id: 'adv-foc-3',
      title: 'Bail-Out List Creation',
      stage: 'focus',
      action: 'Explicitly mark 1 or 2 low-yield chapters you refuse to study.',
      tactic: 'Accepting you will not get 100% relieves paralyzing anxiety. Focus all remaining bandwidth on scoring 85% of what you actually attempt.',
    },
  ],
  warning: [
    {
      id: 'adv-warn-1',
      title: 'Emergency Formula & Definition Sheet',
      stage: 'warning',
      action: 'Handwrite every critical formula, constant, and key definition on ONE sheet.',
      tactic: 'Writing it by hand engages motor memory. You have 1-3 hours: memorising 15 key formulas will earn you partial credit on almost every quantitative question.',
    },
    {
      id: 'adv-warn-2',
      title: 'Solved Examples Speed-Run',
      stage: 'warning',
      action: 'Do not try to solve problems from scratch. Read solved model answers.',
      tactic: 'Study the steps in the textbook solutions. Learn the pattern: Given → Formula → Substitution → Answer with units.',
    },
    {
      id: 'adv-warn-3',
      title: 'Kill All Digital Friction',
      stage: 'warning',
      action: 'Turn on Do Not Disturb and airplane mode right now.',
      tactic: 'A single WhatsApp ping costs 8 minutes of cognitive refocusing. You do not have 8 minutes to spare.',
    },
  ],
  panic: [
    {
      id: 'adv-pan-1',
      title: 'High-Yield Formula Dump Prep',
      stage: 'panic',
      action: 'Memorize 3-5 crucial formulas to write down the second the exam begins.',
      tactic: 'The moment the proctor says "you may start", write these formulas in the margins of your paper before exam stress wipes your memory.',
    },
    {
      id: 'adv-pan-2',
      title: 'Stop Reading New Content',
      stage: 'panic',
      action: 'Do NOT open an unfamiliar chapter right now.',
      tactic: 'Learning brand new concepts in under 60 minutes only induces panic. Reinforce what you already 60% know so you do not drop easy marks.',
    },
    {
      id: 'adv-pan-3',
      title: 'Physiological Reset',
      stage: 'panic',
      action: 'Drink water, wash your face with cold water, and use the restroom now.',
      tactic: 'Physical discomfort in the exam hall ruins concentration. Handle bodily maintenance now.',
    },
  ],
  extreme_panic: [
    {
      id: 'adv-ext-1',
      title: 'The Emergency Brain Dump',
      stage: 'extreme_panic',
      action: 'Close your eyes for 60 seconds and breathe 4 seconds in, 6 seconds out.',
      tactic: 'High cortisol blocks the hippocampus (memory retrieval). Calming your nervous system is literally worth 10 marks right now.',
    },
    {
      id: 'adv-ext-2',
      title: 'Do Not Talk to Other Students',
      stage: 'extreme_panic',
      action: 'Avoid people discussing what they studied outside the exam hall.',
      tactic: 'Hearing someone mention a theorem you do not recognize will trigger panic spiral. Put headphones on or stand alone.',
    },
    {
      id: 'adv-ext-3',
      title: 'The Partial Credit Mindset',
      stage: 'extreme_panic',
      action: 'Remember: an incomplete answer gets points; a blank answer gets zero.',
      tactic: 'Always write down the formula, the given variables, and your reasoning even if you cannot finish the math.',
    },
  ],
  exam_started: [
    {
      id: 'adv-started-1',
      title: 'In-Exam Protocol: The 2-Minute Scan',
      stage: 'exam_started',
      action: 'Skim the entire exam paper from front to back before picking up your pen.',
      tactic: 'Find the 3 easiest questions first. Answering them immediately builds momentum and eliminates test anxiety.',
    },
    {
      id: 'adv-started-2',
      title: 'Strict Time Allocation',
      stage: 'exam_started',
      action: 'Allocate minutes proportional to marks (e.g. 1 mark = 1.2 minutes).',
      tactic: 'If a 5-mark question takes longer than 6 minutes, write down your best guess, circle it, and move on. Never leave high-mark questions unattempted at the end.',
    },
  ],
};
