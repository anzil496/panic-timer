import React from 'react';
import { ExamInputs } from '../types';

interface ExamSettingsProps {
  inputs: ExamInputs;
  onChange: (newInputs: Partial<ExamInputs>) => void;
  onSetPreset: (presetKey: 'tomorrow_morning' | 'tonight' | 'in_4_hours' | 'in_45_mins' | 'just_started') => void;
}

export const ExamSettings: React.FC<ExamSettingsProps> = ({
  inputs,
  onChange,
  onSetPreset,
}) => {
  const handleSleepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange({ sleepHours: isNaN(val) ? 0 : Math.max(0, Math.min(24, val)) });
  };

  const getSleepRoast = (hours: number) => {
    if (hours === 0) return '💀 Full Zombie Mode (0h). Brain cell sacrifice in progress.';
    if (hours < 4) return '⚡ Danger Nap territory. Prepare for maximum delirium.';
    if (hours <= 6) return '☕ Surviving on caffeine, anxiety, and a prayer.';
    if (hours <= 8) return '🎯 The responsible sweet spot (if you actually study).';
    return '🛌 Living in luxury. Are you sure you have an exam?';
  };

  return (
    <section className="w-full bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-neutral-800/80 gap-3">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Exam Target & Schedule
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure your exam timing and required sleep to reveal your genuine productive window.
          </p>
        </div>

        {/* Quick test scenarios */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider mr-1">Presets:</span>
          <button
            onClick={() => onSetPreset('tomorrow_morning')}
            className="text-xs px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/80 transition-colors cursor-pointer"
          >
            Tomorrow 9 AM
          </button>
          <button
            onClick={() => onSetPreset('in_4_hours')}
            className="text-xs px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/80 transition-colors cursor-pointer"
          >
            In 4 Hours
          </button>
          <button
            onClick={() => onSetPreset('in_45_mins')}
            className="text-xs px-2.5 py-1 rounded-md bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 border border-amber-800/60 transition-colors cursor-pointer"
          >
            Panic (45m)
          </button>
          <button
            onClick={() => onSetPreset('just_started')}
            className="text-xs px-2.5 py-1 rounded-md bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-800/60 transition-colors cursor-pointer"
          >
            Boss Fight (0m)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Subject Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="exam-subject" className="text-xs font-semibold text-neutral-300">
            Subject / Exam Name
          </label>
          <input
            id="exam-subject"
            type="text"
            value={inputs.subject}
            onChange={(e) => onChange({ subject: e.target.value })}
            placeholder="e.g. Calculus II, Anatomy"
            className="w-full bg-neutral-950 border border-neutral-800 focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 transition-colors outline-none"
          />
        </div>

        {/* Exam Date */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="exam-date" className="text-xs font-semibold text-neutral-300">
            Exam Date
          </label>
          <input
            id="exam-date"
            type="date"
            value={inputs.date}
            onChange={(e) => onChange({ date: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-800 focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 transition-colors outline-none [color-scheme:dark]"
          />
        </div>

        {/* Exam Start Time */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="exam-time" className="text-xs font-semibold text-neutral-300">
            Exam Starts
          </label>
          <input
            id="exam-time"
            type="time"
            value={inputs.time}
            onChange={(e) => onChange({ time: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-800 focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 rounded-xl px-3.5 py-2.5 text-sm text-neutral-100 transition-colors outline-none [color-scheme:dark]"
          />
        </div>

        {/* Planned Sleep Duration */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="exam-sleep" className="text-xs font-semibold text-neutral-300">
              Planned Sleep (Hours)
            </label>
            <span className="text-xs font-bold text-rose-400 font-mono-numbers">
              {inputs.sleepHours} {inputs.sleepHours === 1 ? 'hr' : 'hrs'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="exam-sleep"
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={inputs.sleepHours}
              onChange={handleSleepChange}
              className="w-20 bg-neutral-950 border border-neutral-800 focus:border-rose-500/80 focus:ring-1 focus:ring-rose-500/50 rounded-xl px-3 py-2 text-sm text-center text-neutral-100 font-mono-numbers transition-colors outline-none"
            />
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={inputs.sleepHours}
              onChange={handleSleepChange}
              aria-label="Planned sleep slider"
              className="flex-1 accent-rose-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Sleep commentary */}
      <div className="mt-3 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
        <span className="italic">{getSleepRoast(inputs.sleepHours)}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange({ sleepHours: 0 })}
            className="hover:text-rose-300 transition-colors text-[11px] underline underline-offset-2 cursor-pointer"
          >
            0h (All-nighter)
          </button>
          <span>·</span>
          <button
            onClick={() => onChange({ sleepHours: 4 })}
            className="hover:text-amber-300 transition-colors text-[11px] underline underline-offset-2 cursor-pointer"
          >
            4h (Power nap)
          </button>
          <span>·</span>
          <button
            onClick={() => onChange({ sleepHours: 7 })}
            className="hover:text-emerald-300 transition-colors text-[11px] underline underline-offset-2 cursor-pointer"
          >
            7h (Standard)
          </button>
        </div>
      </div>
    </section>
  );
};
