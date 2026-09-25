import React, { useState } from 'react';
import { soundManager } from '../utils/soundEffects';

interface HeaderProps {
  currentTimeFormatted: string;
  onScrollTo: (sectionId: string) => void;
  onResetToDefaults: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTimeFormatted,
  onScrollTo,
  onResetToDefaults,
}) => {
  const [soundActive, setSoundActive] = useState(soundManager.enabled);

  const toggleSound = () => {
    soundManager.enabled = !soundActive;
    setSoundActive(!soundActive);
    if (!soundActive) {
      soundManager.playAlert();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl font-extrabold tracking-tight text-white hover:text-rose-400 transition-colors font-display"
          >
            PanicTimer<span className="text-rose-500">.</span>
          </a>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          <button
            onClick={() => onScrollTo('countdown-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Countdown
          </button>
          <button
            onClick={() => onScrollTo('panic-meter-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Panic Meter
          </button>
          <button
            onClick={() => onScrollTo('reality-check-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Reality Check
          </button>
          <button
            onClick={() => onScrollTo('action-hub-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Roast & Advice
          </button>
          <button
            onClick={() => onScrollTo('triage-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Triage Plan
          </button>
        </nav>

        {/* Zone 3: Live current time + sound toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono-numbers">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-400">Local:</span>
            <span className="font-semibold text-neutral-100">{currentTimeFormatted}</span>
          </div>

          <button
            onClick={toggleSound}
            title={soundActive ? 'Mute audio' : 'Enable audio'}
            aria-label={soundActive ? 'Mute audio' : 'Enable audio'}
            className="p-2 text-xs font-medium rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {soundActive ? (
              <>
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span className="hidden lg:inline text-[11px]">Sound On</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
                <span className="hidden lg:inline text-[11px]">Muted</span>
              </>
            )}
          </button>

          <button
            onClick={onResetToDefaults}
            title="Reset to default tomorrow 9 AM test"
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors cursor-pointer border border-neutral-700"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
};
