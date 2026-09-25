import React from 'react';
import { PanicStage } from '../types';

interface PanicMeterProps {
  currentStage: PanicStage;
  hoursRemaining: number;
}

export const PanicMeter: React.FC<PanicMeterProps> = ({ currentStage, hoursRemaining }) => {
  const stages = [
    {
      key: 'calm',
      name: 'CALM',
      color: 'emerald',
      emoji: '🟢',
      threshold: '> 6 hours',
      desc: 'Optimal window. Low anxiety, high potential.',
      isActive: currentStage === 'calm',
      accentBorder: 'border-emerald-500',
      activeBg: 'bg-emerald-950/40 text-emerald-200 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]',
      inactiveBg: 'bg-neutral-900/40 text-neutral-400 border-neutral-800 opacity-60',
    },
    {
      key: 'focus',
      name: 'FOCUS',
      color: 'amber',
      emoji: '🟡',
      threshold: '3–6 hours',
      desc: 'Prime triage zone. Drop side-quests, open syllabus.',
      isActive: currentStage === 'focus',
      accentBorder: 'border-amber-500',
      activeBg: 'bg-amber-950/40 text-amber-200 border-amber-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]',
      inactiveBg: 'bg-neutral-900/40 text-neutral-400 border-neutral-800 opacity-60',
    },
    {
      key: 'warning',
      name: 'WARNING',
      color: 'orange',
      emoji: '🟠',
      threshold: '1–3 hours',
      desc: 'High adrenaline. Memorize formulas, discard theory.',
      isActive: currentStage === 'warning',
      accentBorder: 'border-orange-500',
      activeBg: 'bg-orange-950/40 text-orange-200 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]',
      inactiveBg: 'bg-neutral-900/40 text-neutral-400 border-neutral-800 opacity-60',
    },
    {
      key: 'panic',
      name: 'PANIC',
      color: 'rose',
      emoji: '🔴',
      threshold: '< 1 hour',
      desc: 'Defcon 1. Temporary memory dump & prayer.',
      isActive: currentStage === 'panic' || currentStage === 'extreme_panic',
      accentBorder: 'border-rose-500',
      activeBg: 'bg-rose-950/40 text-rose-200 border-rose-500 shadow-[0_0_25px_rgba(239,68,68,0.3)]',
      inactiveBg: 'bg-neutral-900/40 text-neutral-400 border-neutral-800 opacity-60',
    },
  ];

  // Visual gauge fill percentage based on inverted urgency
  // >6h = 25%, 3-6h = 50%, 1-3h = 75%, <1h = 100%
  let meterProgress = 25;
  if (currentStage === 'focus') meterProgress = 50;
  if (currentStage === 'warning') meterProgress = 75;
  if (currentStage === 'panic' || currentStage === 'extreme_panic') meterProgress = 100;

  return (
    <section id="panic-meter-section" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-neutral-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>🌡️</span> Panic Meter
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Four psychological escalation zones. As time drops, interface urgency climbs.
          </p>
        </div>
        <div className="text-xs font-mono-numbers text-neutral-400">
          Current: <span className="font-bold text-neutral-200">{hoursRemaining.toFixed(2)} hours remaining</span>
        </div>
      </div>

      {/* Progress Bar Gauge */}
      <div className="mb-6">
        <div className="h-3 w-full bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-800 flex">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              currentStage === 'calm'
                ? 'bg-emerald-500 w-1/4'
                : currentStage === 'focus'
                ? 'bg-gradient-to-r from-emerald-500 to-amber-500 w-2/4'
                : currentStage === 'warning'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 w-3/4'
                : 'bg-gradient-to-r from-orange-500 to-rose-600 w-full animate-pulse'
            }`}
            style={{ width: `${meterProgress}%` }}
          />
        </div>
      </div>

      {/* Four Stage Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stages.map((stage) => {
          return (
            <div
              key={stage.key}
              className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between ${
                stage.isActive ? stage.activeBg : stage.inactiveBg
              }`}
            >
              {stage.isActive && (
                <div className="absolute -top-2.5 right-3 bg-neutral-950 border border-current text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                  CURRENT STAGE
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">{stage.emoji}</span>
                  <span className="text-xs font-mono-numbers font-semibold opacity-80">
                    {stage.threshold}
                  </span>
                </div>
                <h3 className="text-base font-extrabold tracking-tight">
                  {stage.name}
                </h3>
                <p className="text-xs mt-1.5 opacity-90 leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-current/15 text-[11px] font-medium flex items-center justify-between">
                <span>Status:</span>
                <span className="font-semibold">
                  {stage.isActive ? 'Active' : 'Standby'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
