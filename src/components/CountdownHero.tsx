import React from 'react';
import { CalculatedValues } from '../types';

interface CountdownHeroProps {
  calc: CalculatedValues;
  subject: string;
}

export const CountdownHero: React.FC<CountdownHeroProps> = ({ calc, subject }) => {
  const { formattedCountdown, examStartFormatted, stage, msRemaining } = calc;

  // Visual cues based on panic stage
  const getStageTheme = () => {
    switch (stage) {
      case 'calm':
        return {
          glowClass: 'glow-calm border-emerald-500/30 bg-emerald-950/15',
          accentText: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          stageName: '🟢 CALM ZONE',
          headline: 'You have breathing room. Do not squander it.',
        };
      case 'focus':
        return {
          glowClass: 'glow-focus border-amber-500/30 bg-amber-950/15',
          accentText: 'text-amber-400',
          badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          stageName: '🟡 FOCUS ZONE',
          headline: 'The window of easy preparation is narrowing.',
        };
      case 'warning':
        return {
          glowClass: 'glow-warning border-orange-500/40 bg-orange-950/20',
          accentText: 'text-orange-400',
          badgeBg: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
          stageName: '🟠 WARNING ZONE',
          headline: 'Cramming threshold reached. Cut non-essentials.',
        };
      case 'panic':
      case 'extreme_panic':
        return {
          glowClass: 'glow-panic border-rose-500/50 bg-rose-950/25 animate-subtle-pulse',
          accentText: 'text-rose-400',
          badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
          stageName: stage === 'extreme_panic' ? '🚨 MAXIMUM PANIC (<15m)' : '🚨 PANIC ZONE',
          headline: 'Emergency triage. Formulas and definitions only.',
        };
      default:
        return {
          glowClass: 'border-neutral-800 bg-neutral-900/40',
          accentText: 'text-neutral-100',
          badgeBg: 'bg-neutral-800 text-neutral-300 border-neutral-700',
          stageName: 'BOSS FIGHT',
          headline: 'Exam in session.',
        };
    }
  };

  const theme = getStageTheme();

  return (
    <section
      id="countdown-section"
      className={`relative w-full rounded-3xl border transition-all duration-700 p-6 sm:p-8 md:p-12 text-center overflow-hidden ${theme.glowClass}`}
    >
      {/* Background ambient gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 -z-10 bg-[radial-gradient(circle_at_50%_40%,currentColor,transparent_70%)] text-rose-500"
        aria-hidden="true"
      />

      {/* Stage status indicator */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${theme.badgeBg}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
          {theme.stageName}
        </span>
        {subject && (
          <span className="text-xs font-medium text-neutral-400 border border-neutral-800 bg-neutral-900/70 px-2.5 py-1 rounded-full">
            {subject}
          </span>
        )}
      </div>

      {/* Massive Tabular Countdown */}
      <div className="my-2 sm:my-4">
        {formattedCountdown.days > 0 ? (
          <div className="flex items-baseline justify-center flex-wrap gap-2 sm:gap-4 font-mono-numbers">
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white">
                {String(formattedCountdown.days).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-1">Days</span>
            </div>
            <span className="text-4xl sm:text-6xl text-neutral-600 font-light">:</span>
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white">
                {String(formattedCountdown.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-1">Hours</span>
            </div>
            <span className="text-4xl sm:text-6xl text-neutral-600 font-light">:</span>
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white">
                {formattedCountdown.padMinutes}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-1">Mins</span>
            </div>
            <span className="text-4xl sm:text-6xl text-neutral-600 font-light">:</span>
            <div className="flex flex-col items-center">
              <span className={`text-5xl sm:text-7xl md:text-8xl font-black tracking-tight ${theme.accentText}`}>
                {formattedCountdown.padSeconds}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-1">Secs</span>
            </div>
          </div>
        ) : (
          <div className="flex items-baseline justify-center gap-1 sm:gap-3 font-mono-numbers">
            <div className="flex flex-col items-center">
              <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white">
                {formattedCountdown.padHours}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-1">Hours</span>
            </div>
            <span className="text-5xl sm:text-7xl md:text-8xl text-neutral-600 font-light self-center pb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white">
                {formattedCountdown.padMinutes}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-1">Minutes</span>
            </div>
            <span className="text-5xl sm:text-7xl md:text-8xl text-neutral-600 font-light self-center pb-4">:</span>
            <div className="flex flex-col items-center">
              <span className={`text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter ${theme.accentText}`}>
                {formattedCountdown.padSeconds}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-1">Seconds</span>
            </div>
          </div>
        )}
      </div>

      {/* Subtitle */}
      <p className="text-base sm:text-lg font-medium text-neutral-300 mt-2">
        until your exam
      </p>

      {/* Exam exact start details */}
      <div className="mt-4 pt-4 border-t border-neutral-800/80 inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-400">
        <span className="font-semibold text-neutral-200">
          Exam starts {examStartFormatted}
        </span>
        <span className="hidden sm:inline text-neutral-600">·</span>
        <span className="italic text-neutral-400">{theme.headline}</span>
      </div>
    </section>
  );
};
