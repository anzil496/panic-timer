import React from 'react';
import { CalculatedValues } from '../types';

interface StatsGridProps {
  calc: CalculatedValues;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ calc }) => {
  const {
    timeLeftFormatted,
    productiveFormatted,
    sleepFormatted,
    panicStartFormatted,
    isPanicActive,
    productiveMs,
    stage,
  } = calc;

  const isZeroProductive = productiveMs === 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {/* 1. TIME LEFT */}
      <div className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1.5">
            <span>⏳</span> TIME LEFT
          </span>
          <span className="text-[10px] text-neutral-500 font-mono-numbers">gross</span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-numbers tracking-tight">
            {timeLeftFormatted}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Total clock time remaining
          </div>
        </div>
      </div>

      {/* 2. PRODUCTIVE TIME */}
      <div className={`flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition-colors ${
        isZeroProductive
          ? 'bg-rose-950/20 border-rose-800/60'
          : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700'
      }`}>
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1.5">
            <span>📚</span> PRODUCTIVE TIME
          </span>
          {isZeroProductive && (
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">DEFICIT</span>
          )}
        </div>
        <div>
          <div className={`text-2xl sm:text-3xl font-extrabold font-mono-numbers tracking-tight ${
            isZeroProductive ? 'text-rose-400' : 'text-emerald-400'
          }`}>
            {productiveFormatted}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1 font-medium">
            after sleep deduction
          </div>
        </div>
      </div>

      {/* 3. SLEEP */}
      <div className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1.5">
            <span>😴</span> SLEEP
          </span>
          <span className="text-[10px] text-neutral-500 font-mono-numbers">deducted</span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-300 font-mono-numbers tracking-tight">
            {sleepFormatted}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Non-negotiable recovery
          </div>
        </div>
      </div>

      {/* 4. PANIC BEGINS */}
      <div className={`flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition-colors ${
        isPanicActive
          ? 'bg-rose-950/30 border-rose-600/70'
          : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700'
      }`}>
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1.5">
            <span>🚨</span> PANIC BEGINS
          </span>
          {isPanicActive ? (
            <span className="text-[10px] font-bold text-rose-300 animate-pulse">ACTIVE NOW</span>
          ) : (
            <span className="text-[10px] text-amber-400">Final 20%</span>
          )}
        </div>
        <div>
          <div className={`text-2xl sm:text-3xl font-extrabold font-mono-numbers tracking-tight ${
            isPanicActive ? 'text-rose-400' : 'text-amber-400'
          }`}>
            {panicStartFormatted}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            {isPanicActive ? 'You are in the panic zone!' : 'Minimum 30m buffer'}
          </div>
        </div>
      </div>
    </div>
  );
};
