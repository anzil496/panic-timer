/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ExamInputs, CalculatedValues } from './types';
import { calculateExamState, getInitialExamInputs } from './utils/calculator';
import { Header } from './components/Header';
import { ExamSettings } from './components/ExamSettings';
import { CountdownHero } from './components/CountdownHero';
import { StatsGrid } from './components/StatsGrid';
import { PanicMeter } from './components/PanicMeter';
import { RealityCheck } from './components/RealityCheck';
import { ProcrastinationTracker } from './components/ProcrastinationTracker';
import { RoastAndAdvice } from './components/RoastAndAdvice';
import { EmergencySurvivalPlan } from './components/EmergencySurvivalPlan';
import { ExamStarted } from './components/ExamStarted';

export default function App() {
  const [inputs, setInputs] = useState<ExamInputs>(() => {
    // Attempt to load from localStorage if available, otherwise default
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('panic_timer_inputs');
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            baselineTimestamp: parsed.baselineTimestamp || Date.now(),
          };
        }
      } catch {
        // Fallback
      }
    }
    return getInitialExamInputs();
  });

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [calc, setCalc] = useState<CalculatedValues>(() =>
    calculateExamState(inputs, new Date())
  );

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('panic_timer_inputs', JSON.stringify(inputs));
    } catch {
      // Ignore
    }
  }, [inputs]);

  // Master 1-second clock loop
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCalc(calculateExamState(inputs, now));
    }, 1000);

    return () => clearInterval(timer);
  }, [inputs]);

  // Handle inputs modification
  const handleInputsChange = useCallback((newPartial: Partial<ExamInputs>) => {
    setInputs((prev) => {
      const updated = { ...prev, ...newPartial };
      // Recalculate immediately for instant responsiveness
      setCalc(calculateExamState(updated, new Date()));
      return updated;
    });
  }, []);

  // Quick preset loader
  const handleSetPreset = useCallback(
    (presetKey: 'tomorrow_morning' | 'tonight' | 'in_4_hours' | 'in_45_mins' | 'just_started') => {
      const now = new Date();
      let targetDate = new Date(now);
      let sleep = 7;

      if (presetKey === 'tomorrow_morning') {
        targetDate.setDate(now.getDate() + 1);
        targetDate.setHours(9, 0, 0, 0);
        sleep = 7;
      } else if (presetKey === 'tonight') {
        targetDate.setHours(23, 59, 0, 0);
        if (targetDate.getTime() <= now.getTime()) {
          targetDate.setDate(now.getDate() + 1);
        }
        sleep = 6;
      } else if (presetKey === 'in_4_hours') {
        targetDate = new Date(now.getTime() + 4 * 60 * 60 * 1000);
        sleep = 1.5;
      } else if (presetKey === 'in_45_mins') {
        targetDate = new Date(now.getTime() + 45 * 60 * 1000);
        sleep = 0;
      } else if (presetKey === 'just_started') {
        targetDate = new Date(now.getTime() - 10 * 1000); // 10 seconds ago
        sleep = 0;
      }

      const year = targetDate.getFullYear();
      const month = String(targetDate.getMonth() + 1).padStart(2, '0');
      const day = String(targetDate.getDate()).padStart(2, '0');
      const hours = String(targetDate.getHours()).padStart(2, '0');
      const minutes = String(targetDate.getMinutes()).padStart(2, '0');

      const updated: ExamInputs = {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}`,
        sleepHours: sleep,
        subject: inputs.subject || 'Final Exam',
        baselineTimestamp: now.getTime(),
      };

      setInputs(updated);
      setCalc(calculateExamState(updated, now));
    },
    [inputs.subject]
  );

  const handleResetToDefaults = useCallback(() => {
    const fresh = getInitialExamInputs();
    setInputs(fresh);
    setCalc(calculateExamState(fresh, new Date()));
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Formatted local current time string
  const currentTimeFormatted = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(currentTime);

  const hoursRemaining = calc.msRemaining / (1000 * 60 * 60);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-200">
      {/* Top Bar navigation */}
      <Header
        currentTimeFormatted={currentTimeFormatted}
        onScrollTo={scrollToSection}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Title and Subtitle */}
        <div className="text-center pt-2 pb-1">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-display">
            PanicTimer
          </h1>
          <p className="text-base sm:text-lg font-medium text-neutral-400 mt-1">
            How much time do you <span className="text-rose-400 font-bold underline underline-offset-4">REALLY</span> have left?
          </p>
        </div>

        {/* Exam Configuration Form */}
        <ExamSettings
          inputs={inputs}
          onChange={handleInputsChange}
          onSetPreset={handleSetPreset}
        />

        {/* Countdown Hero or Exam Started State */}
        {calc.isStarted ? (
          <ExamStarted
            subject={inputs.subject}
            onReset={() => handleSetPreset('tomorrow_morning')}
          />
        ) : (
          <>
            <CountdownHero calc={calc} subject={inputs.subject} />
            <StatsGrid calc={calc} />
          </>
        )}

        {/* Panic Meter Stage Indicator */}
        <PanicMeter
          currentStage={calc.stage}
          hoursRemaining={hoursRemaining}
        />

        {/* Reality Check Section */}
        <RealityCheck calc={calc} sleepHours={inputs.sleepHours} />

        {/* Procrastination & Time Budget Tracker */}
        <ProcrastinationTracker calc={calc} sleepHours={inputs.sleepHours} />

        {/* Action & Roast Hub: "ROAST ME" & "TELL ME WHAT TO DO" */}
        <RoastAndAdvice
          currentStage={calc.stage}
          hoursRemaining={hoursRemaining}
        />

        {/* Emergency Triage & Chapter Prioritization */}
        <EmergencySurvivalPlan productiveMs={calc.productiveMs} />
      </main>

      {/* Clean, respectful footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-8 px-4 text-center text-xs text-neutral-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-neutral-300 font-display">PanicTimer</span>
            <span>·</span>
            <span>Brutally honest exam procrastination calculator</span>
          </div>
          <div className="text-neutral-400">
            Calculated 100% locally in your browser. Now close this tab and go study.
          </div>
        </div>
      </footer>
    </div>
  );
}
