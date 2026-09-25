import React from 'react';
import { CalculatedValues } from '../types';

interface RealityCheckProps {
  calc: CalculatedValues;
  sleepHours: number;
}

export const RealityCheck: React.FC<RealityCheckProps> = ({ calc, sleepHours }) => {
  const {
    msRemaining,
    productiveMs,
    stage,
  } = calc;

  const grossHours = (msRemaining / (1000 * 60 * 60)).toFixed(1);
  const netHours = (productiveMs / (1000 * 60 * 60)).toFixed(1);

  // Dynamic reality check conclusion
  const getConclusion = () => {
    if (productiveMs === 0) {
      return {
        verdict: 'Mathematical Deficit Alert 🚨',
        body: `Your planned sleep (${sleepHours}h) exceeds or equals your remaining clock time (${grossHours}h). You have literally ZERO hours of study time unless you reduce your sleep.`,
        callToAction: 'Adjust your sleep slider, or accept your status as an academic martyr.',
        alertLevel: 'danger',
      };
    }

    if (stage === 'calm') {
      return {
        verdict: 'The "Plenty of Time" Illusion 🕒',
        body: `That's enough time to make genuine progress and master 2 to 3 major chapters—provided you don't spend the first 4 hours watching YouTube tutorials on "How to study like a Harvard student".`,
        callToAction: 'Pick one difficult topic right now and finish it before dinner.',
        alertLevel: 'calm',
      };
    }

    if (stage === 'focus') {
      return {
        verdict: 'The Slipping Window ⏳',
        body: `You have ${netHours} hours of honest preparation left. That's sufficient to secure a respectable pass if you stop leisurely highlighting and start doing past exam questions.`,
        callToAction: 'Put your phone in another room. Seriously.',
        alertLevel: 'focus',
      };
    }

    if (stage === 'warning') {
      return {
        verdict: 'The Redline Era ⚠️',
        body: `You have only ${netHours} hours. This is no longer the time to "understand the deep philosophy of the discipline". This is formula memorization and diagram speed-sketching.`,
        callToAction: 'Cut the bottom 30% of the syllabus from your mind. Salvage the core.',
        alertLevel: 'warning',
      };
    }

    return {
      verdict: 'Code Red Academic Emergency 🚨',
      body: `You have less than an hour. The textbook is a relic of your former hopes. Focus solely on 5 key formulas and 5 core definitions.`,
      callToAction: 'Now stop reading this website and go study.',
      alertLevel: 'panic',
    };
  };

  const conclusion = getConclusion();

  return (
    <section id="reality-check-section" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span>🧐</span> Reality Check
        </h2>
        <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
          Brutally Honest Truth
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left: The Math equation */}
        <div className="bg-neutral-950/80 rounded-2xl p-5 sm:p-6 border border-neutral-800/80 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
              The Reality Breakdown
            </div>

            <div className="space-y-3 font-mono-numbers">
              <div className="flex items-center justify-between text-sm sm:text-base py-1 border-b border-neutral-800">
                <span className="text-neutral-400 font-sans">Total time until exam:</span>
                <span className="font-extrabold text-white">{grossHours} hours</span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base py-1 border-b border-neutral-800">
                <span className="text-neutral-400 font-sans">Deducted for sleep:</span>
                <span className="font-extrabold text-indigo-300">- {sleepHours} hours</span>
              </div>
              <div className="flex items-center justify-between text-base sm:text-lg py-2 font-bold bg-neutral-900/70 px-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-200 font-sans">Actual study time:</span>
                <span className={`${productiveMs === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {netHours} hours
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 text-xs text-neutral-400 border-t border-neutral-800/60 italic">
            "Your brain treats the gross hours as study time. Math does not care about your feelings."
          </div>
        </div>

        {/* Right: The Friend Roast & Action Directive */}
        <div className={`rounded-2xl p-5 sm:p-6 border flex flex-col justify-between ${
          conclusion.alertLevel === 'danger'
            ? 'bg-rose-950/30 border-rose-600/60 text-rose-200'
            : conclusion.alertLevel === 'panic'
            ? 'bg-rose-950/20 border-rose-800/50 text-rose-100'
            : conclusion.alertLevel === 'warning'
            ? 'bg-orange-950/20 border-orange-800/50 text-orange-100'
            : 'bg-neutral-950/80 border-neutral-800 text-neutral-200'
        }`}>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Friend Advice
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white mb-2">
              {conclusion.verdict}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-300">
              {conclusion.body}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-current/15 flex items-center gap-2">
            <span className="text-lg">👉</span>
            <p className="text-xs sm:text-sm font-bold text-white">
              {conclusion.callToAction}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
