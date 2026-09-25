import React from 'react';
import { CalculatedValues } from '../types';

interface ProcrastinationTrackerProps {
  calc: CalculatedValues;
  sleepHours: number;
}

export const ProcrastinationTracker: React.FC<ProcrastinationTrackerProps> = ({ calc, sleepHours }) => {
  const {
    msRemaining,
    productiveMs,
    plannedSleepMs,
    panicWindowMs,
    procrastinationRatio,
    timeLeftFormatted,
    productiveFormatted,
    sleepFormatted,
  } = calc;

  const totalGrossMs = Math.max(1000, msRemaining);
  const productivePct = Math.min(100, Math.round((productiveMs / totalGrossMs) * 100));
  const sleepPct = Math.min(100, Math.round((plannedSleepMs / totalGrossMs) * 100));
  const panicPct = Math.min(100, Math.round((panicWindowMs / totalGrossMs) * 100));
  const wastedPct = Math.round(procrastinationRatio * 100);

  return (
    <section className="w-full bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-neutral-800 gap-2">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>📊</span> Procrastination Tracker
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Visual breakdown of how your remaining hours are realistically budgeted.
          </p>
        </div>
        <div className="text-xs font-mono-numbers text-neutral-400">
          Elapsed timeline: <span className="font-bold text-neutral-200">{wastedPct}% slipped by</span>
        </div>
      </div>

      {/* Visual Proportional Time Bar */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-400">
          <span>Time Composition</span>
          <span className="font-mono-numbers">100% of clock time until exam</span>
        </div>

        <div className="h-6 w-full bg-neutral-950 rounded-xl overflow-hidden p-1 border border-neutral-800 flex gap-1 items-center">
          {/* Productive time segment */}
          {productivePct > 0 && (
            <div
              style={{ width: `${productivePct}%` }}
              className="h-full bg-emerald-500 rounded-lg transition-all duration-500 flex items-center justify-center text-[10px] font-extrabold text-neutral-950 truncate px-1"
              title={`Productive Study: ${productivePct}%`}
            >
              {productivePct > 15 ? `${productivePct}% Study` : ''}
            </div>
          )}

          {/* Sleep time segment */}
          {sleepPct > 0 && (
            <div
              style={{ width: `${sleepPct}%` }}
              className="h-full bg-indigo-600 rounded-lg transition-all duration-500 flex items-center justify-center text-[10px] font-extrabold text-white truncate px-1"
              title={`Planned Sleep: ${sleepPct}%`}
            >
              {sleepPct > 15 ? `${sleepPct}% Sleep` : ''}
            </div>
          )}

          {/* Panic window segment */}
          {panicPct > 0 && (
            <div
              style={{ width: `${panicPct}%` }}
              className="h-full bg-rose-500/80 rounded-lg transition-all duration-500 flex items-center justify-center text-[10px] font-extrabold text-white truncate px-1"
              title={`Panic Zone: ${panicPct}%`}
            >
              {panicPct > 12 ? 'Panic' : ''}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 text-neutral-400 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span>Productive Study ({productivePct}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600" />
            <span>Reserved Sleep ({sleepPct}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
            <span>Panic Zone (min 20% / 30m)</span>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-1">
            Total Clock Remaining
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono-numbers">
            {timeLeftFormatted}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Ticks down every single second
          </p>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-1">
            Genuine Study Window
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono-numbers">
            {productiveFormatted}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            After {sleepFormatted} dedicated to sleep
          </p>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-1">
            Panic Threshold
          </div>
          <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono-numbers">
            {Math.round(panicWindowMs / (60 * 1000))} mins
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Final danger sprint before exam starts
          </p>
        </div>
      </div>
    </section>
  );
};
