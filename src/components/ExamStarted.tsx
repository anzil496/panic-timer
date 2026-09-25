import React from 'react';
import { soundManager } from '../utils/soundEffects';

interface ExamStartedProps {
  subject: string;
  onReset: () => void;
}

export const ExamStarted: React.FC<ExamStartedProps> = ({ subject, onReset }) => {
  return (
    <section className="w-full bg-neutral-900/90 border-2 border-rose-500 rounded-3xl p-6 sm:p-10 md:p-12 text-center shadow-[0_0_50px_rgba(239,68,68,0.25)] animate-subtle-pulse">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black uppercase tracking-widest mb-4">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        Zero Clock Remaining
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display mb-3 text-balance">
        🚨 THE BOSS FIGHT HAS BEGUN
      </h1>

      <p className="text-xl sm:text-2xl font-bold text-rose-300 mb-2">
        Your {subject ? `"${subject}" ` : ''}exam has officially started.
      </p>

      <p className="text-base sm:text-lg text-neutral-300 font-medium max-w-xl mx-auto">
        Good luck, soldier. 🫡 Procrastination is no longer mathematically possible.
      </p>

      {/* Battlefield Rules for Exam Hall */}
      <div className="mt-8 max-w-2xl mx-auto text-left bg-neutral-950/80 rounded-2xl p-5 sm:p-6 border border-neutral-800">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
          <span>🛡️</span> Battlefield Survival Directives
        </h3>

        <ul className="space-y-3 text-xs sm:text-sm text-neutral-200">
          <li className="flex items-start gap-2.5">
            <span className="text-rose-400 font-bold">01.</span>
            <span>
              <strong>The 2-Minute Scan:</strong> Skim the entire exam first. Answer the 3 easiest questions immediately to build confidence.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-rose-400 font-bold">02.</span>
            <span>
              <strong>Immediate Brain Dump:</strong> Jot down your memorized formulas and mnemonics in the margin right now before adrenaline clouds your RAM.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-rose-400 font-bold">03.</span>
            <span>
              <strong>Partial Credit Salvation:</strong> Never leave a question blank. State the relevant principle, formula, and known variables. Professors love pity points.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-rose-400 font-bold">04.</span>
            <span>
              <strong>Ignore The Overachiever:</strong> Do not look at the person who asks for extra paper 15 minutes in. They are either a genius or writing complete gibberish.
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => {
            soundManager.playAlert();
            onReset();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm tracking-wide transition-all cursor-pointer shadow-lg shadow-rose-600/30"
        >
          Set Up Next Exam / Reset
        </button>
      </div>
    </section>
  );
};
