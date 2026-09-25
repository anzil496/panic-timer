export type PanicStage =
  | 'calm'          // > 6 hours
  | 'focus'         // 3 - 6 hours
  | 'warning'       // 1 - 3 hours
  | 'panic'         // < 1 hour
  | 'extreme_panic' // < 15 minutes
  | 'exam_started'; // <= 0 seconds

export interface ExamInputs {
  date: string;
  time: string;
  sleepHours: number;
  subject: string;
  baselineTimestamp: number;
}

export interface CalculatedValues {
  examDate: Date;
  now: Date;
  msRemaining: number;
  secondsRemaining: number;
  isStarted: boolean;
  plannedSleepMs: number;
  productiveMs: number;
  panicWindowMs: number;
  panicStartDate: Date;
  isPanicActive: boolean;
  stage: PanicStage;
  procrastinationRatio: number;
  formattedCountdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalHours: number;
    displayString: string;
    padHours: string;
    padMinutes: string;
    padSeconds: string;
  };
  timeLeftFormatted: string;
  productiveFormatted: string;
  sleepFormatted: string;
  panicStartFormatted: string;
  examStartFormatted: string;
}

export interface RoastItem {
  id: string;
  text: string;
  stage: PanicStage | 'general';
}

export interface SurvivalTip {
  id: string;
  title: string;
  stage: PanicStage;
  action: string;
  tactic: string;
}

export interface TriageTopic {
  id: string;
  name: string;
  priority: 'must_know' | 'quick_skim' | 'skip';
  estimatedMinutes: number;
  done: boolean;
}
