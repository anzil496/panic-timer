import React, { useState, useEffect } from 'react';
import { PanicStage, RoastItem, SurvivalTip } from '../types';
import { ROAST_LIBRARY, STAGE_MESSAGES, SURVIVAL_ADVICE_LIBRARY } from '../data/humorLibrary';
import { soundManager } from '../utils/soundEffects';

interface RoastAndAdviceProps {
  currentStage: PanicStage;
  hoursRemaining: number;
}

export const RoastAndAdvice: React.FC<RoastAndAdviceProps> = ({
  currentStage,
  hoursRemaining,
}) => {
  const [activeTab, setActiveTab] = useState<'roast' | 'advice'>('roast');
  const [currentRoast, setCurrentRoast] = useState<string>('');
  const [roastHistory, setRoastHistory] = useState<string[]>([]);
  const [currentAdvice, setCurrentAdvice] = useState<SurvivalTip | null>(null);
  const [activeRoastCount, setActiveRoastCount] = useState<number>(0);

  // Pick appropriate roast avoiding immediate consecutive repeat
  const pickNewRoast = (isManualClick: boolean = false) => {
    // Collect roasts applicable to current stage + general roasts
    const relevantRoasts = ROAST_LIBRARY.filter(
      (r) => r.stage === currentStage || r.stage === 'general'
    );

    const candidates = relevantRoasts.length > 0 ? relevantRoasts : ROAST_LIBRARY;
    const available = candidates.filter((r) => r.text !== currentRoast);
    const chosen = available.length > 0
      ? available[Math.floor(Math.random() * available.length)].text
      : candidates[0].text;

    setCurrentRoast(chosen);
    setRoastHistory((prev) => [chosen, ...prev.slice(0, 4)]);
    if (isManualClick) {
      setActiveRoastCount((c) => c + 1);
      soundManager.playRoast();
    }
  };

  // Pick appropriate advice
  const pickNewAdvice = (isManualClick: boolean = false) => {
    const list = SURVIVAL_ADVICE_LIBRARY[currentStage] || SURVIVAL_ADVICE_LIBRARY.calm;
    const available = list.filter((a) => !currentAdvice || a.id !== currentAdvice.id);
    const chosen = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : list[0];

    setCurrentAdvice(chosen);
    if (isManualClick) {
      soundManager.playAlert();
    }
  };

  // Auto initialize or update when stage changes
  useEffect(() => {
    pickNewRoast(false);
    pickNewAdvice(false);
  }, [currentStage]);

  return (
    <section id="action-hub-section" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-neutral-800 gap-3">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>⚡</span> Action & Roast Hub
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            A brutally honest friend roasting your excuses while handing you a survival lifeline.
          </p>
        </div>

        {/* Primary Dual Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('roast');
              pickNewRoast(true);
            }}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm tracking-wide transition-all transform active:scale-95 cursor-pointer flex items-center gap-2 shadow-lg ${
              activeTab === 'roast'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-rose-500/25 ring-2 ring-rose-400/50'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
            }`}
          >
            <span>🔥</span>
            <span>ROAST ME</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('advice');
              pickNewAdvice(true);
            }}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm tracking-wide transition-all transform active:scale-95 cursor-pointer flex items-center gap-2 shadow-lg ${
              activeTab === 'advice'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
            }`}
          >
            <span>🧠</span>
            <span>TELL ME WHAT TO DO</span>
          </button>
        </div>
      </div>

      {/* Dynamic Display Area */}
      {activeTab === 'roast' ? (
        <div className="bg-neutral-950/80 rounded-2xl border border-rose-500/30 p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-rose-400 font-bold uppercase tracking-wider mb-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Direct Friend Roast · Stage: {currentStage.replace('_', ' ')}
            </span>
            <span className="text-neutral-500 font-mono-numbers">
              {activeRoastCount > 0 ? `${activeRoastCount} roasts requested` : 'Fresh delivery'}
            </span>
          </div>

          <blockquote className="text-lg sm:text-2xl font-black text-white leading-relaxed tracking-tight my-4">
            "{currentRoast}"
          </blockquote>

          <div className="pt-4 mt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400">
            <span>Need another reality hit? Click "ROAST ME" again.</span>
            <button
              onClick={() => {
                setActiveTab('advice');
                pickNewAdvice(true);
              }}
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 cursor-pointer text-left sm:text-right"
            >
              Okay, I've been roasted enough. Tell me what to do →
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-neutral-950/80 rounded-2xl border border-emerald-500/30 p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase tracking-wider mb-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Tactical Triage Directive · Based on {hoursRemaining.toFixed(1)}h remaining
            </span>
            <span className="text-neutral-400 font-semibold">Actionable Tactic</span>
          </div>

          {currentAdvice && (
            <div className="my-3 space-y-3">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {currentAdvice.title}
              </h3>
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-100 text-sm sm:text-base font-semibold">
                🎯 Core Action: {currentAdvice.action}
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <span className="text-neutral-400 font-medium">Why this works now:</span> {currentAdvice.tactic}
              </p>
            </div>
          )}

          <div className="pt-4 mt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400">
            <span>Practical triage based on your current time window.</span>
            <button
              onClick={() => pickNewAdvice(true)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 cursor-pointer text-left sm:text-right"
            >
              Show another triage strategy ↻
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
