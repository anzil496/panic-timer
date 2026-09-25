import { CalculatedValues, ExamInputs, PanicStage } from '../types';

export function calculateExamState(inputs: ExamInputs, now: Date = new Date()): CalculatedValues {
  // Construct exam DateTime safely
  let examDate: Date;
  try {
    const [year, month, day] = inputs.date.split('-').map(Number);
    const [hours, minutes] = inputs.time.split(':').map(Number);
    examDate = new Date(year, month - 1, day, hours, minutes, 0, 0);
  } catch {
    examDate = new Date(now.getTime() + 10 * 60 * 60 * 1000);
  }

  // Safety fallback if invalid date
  if (isNaN(examDate.getTime())) {
    examDate = new Date(now.getTime() + 10 * 60 * 60 * 1000);
  }

  const nowMs = now.getTime();
  const examMs = examDate.getTime();
  const msRemaining = Math.max(0, examMs - nowMs);
  const secondsRemaining = Math.floor(msRemaining / 1000);
  const isStarted = examMs <= nowMs;

  // Planned sleep in ms
  const safeSleepHours = Math.max(0, Math.min(24, Number(inputs.sleepHours) || 0));
  const plannedSleepMs = safeSleepHours * 60 * 60 * 1000;

  // Available productive time = max(0, timeUntilExam - plannedSleep)
  const productiveMs = Math.max(0, msRemaining - plannedSleepMs);

  // Panic Window: max(20% of remaining time, 30 minutes)
  // If exam has less than 30 mins remaining, panic window is min(msRemaining, 30 mins)
  const thirtyMinutesMs = 30 * 60 * 1000;
  const panicWindowMs = isStarted
    ? 0
    : Math.max(0.2 * msRemaining, Math.min(msRemaining, thirtyMinutesMs));

  const panicStartDate = new Date(examMs - panicWindowMs);
  const isPanicActive = !isStarted && nowMs >= panicStartDate.getTime();

  // Stage classification based on time remaining:
  // > 6 hours: CALM
  // 3 - 6 hours: FOCUS
  // 1 - 3 hours: WARNING
  // < 1 hour: PANIC
  // < 15 minutes: extreme_panic (sub-tier for extra urgency)
  // <= 0: exam_started
  let stage: PanicStage;
  const hoursRemaining = msRemaining / (1000 * 60 * 60);

  if (isStarted) {
    stage = 'exam_started';
  } else if (msRemaining <= 15 * 60 * 1000) {
    stage = 'extreme_panic';
  } else if (hoursRemaining < 1) {
    stage = 'panic';
  } else if (hoursRemaining < 3) {
    stage = 'warning';
  } else if (hoursRemaining <= 6) {
    stage = 'focus';
  } else {
    stage = 'calm';
  }

  // Procrastination indicator:
  // Measure the fraction of the total window (from baseline/set point to exam time) that has elapsed.
  // If baseline is not set or invalid, use (now - (exam - totalInitialSpan))
  const baseline = inputs.baselineTimestamp || (examMs - 24 * 60 * 60 * 1000);
  const totalWindow = Math.max(1000, examMs - baseline);
  const elapsed = Math.max(0, nowMs - baseline);
  const procrastinationRatio = Math.min(1, Math.max(0, elapsed / totalWindow));

  // Countdown breakdowns
  const totalSec = Math.floor(msRemaining / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const totalHours = Math.floor(totalSec / 3600);

  // Format countdown string: if days > 0: "DD:HH:MM:SS", else "HH:MM:SS"
  const padH = String(totalHours).padStart(2, '0');
  const padM = String(minutes).padStart(2, '0');
  const padS = String(seconds).padStart(2, '0');
  const displayString = days > 0
    ? `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${padM}m ${padS}s`
    : `${padH}:${padM}:${padS}`;

  // Format productive time
  const prodTotalSec = Math.floor(productiveMs / 1000);
  const prodHours = Math.floor(prodTotalSec / 3600);
  const prodMinutes = Math.floor((prodTotalSec % 3600) / 60);
  const productiveFormatted = `${String(prodHours).padStart(2, '0')}h ${String(prodMinutes).padStart(2, '0')}m`;

  // Time left formatted (e.g. "09h 47m" or "2d 04h")
  const timeLeftFormatted = days > 0
    ? `${days}d ${hours}h ${minutes}m`
    : `${String(totalHours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;

  // Sleep formatted
  const sleepFormatted = safeSleepHours % 1 === 0 ? `${safeSleepHours}h` : `${safeSleepHours.toFixed(1)}h`;

  // Panic start formatted in local time
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const panicStartFormatted = isStarted
    ? 'Passed'
    : timeFormatter.format(panicStartDate);

  // Exam start formatted
  const isToday = examDate.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = examDate.toDateString() === tomorrow.toDateString();

  let examStartPrefix = '';
  if (isToday) {
    examStartPrefix = 'Today at ';
  } else if (isTomorrow) {
    examStartPrefix = 'Tomorrow at ';
  } else {
    examStartPrefix = new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(examDate) + ' at ';
  }
  const examStartFormatted = examStartPrefix + timeFormatter.format(examDate);

  return {
    examDate,
    now,
    msRemaining,
    secondsRemaining,
    isStarted,
    plannedSleepMs,
    productiveMs,
    panicWindowMs,
    panicStartDate,
    isPanicActive,
    stage,
    procrastinationRatio,
    formattedCountdown: {
      days,
      hours,
      minutes,
      seconds,
      totalHours,
      displayString,
      padHours: padH,
      padMinutes: padM,
      padSeconds: padS,
    },
    timeLeftFormatted,
    productiveFormatted,
    sleepFormatted,
    panicStartFormatted,
    examStartFormatted,
  };
}

// Generate smart initial exam settings for a first-time user:
// Defaults to tomorrow morning at 09:00 AM, with 7 hours of sleep
export function getInitialExamInputs(): ExamInputs {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');

  // Baseline timestamp is right now (to calculate procrastination % accurately)
  return {
    date: `${year}-${month}-${day}`,
    time: '09:00',
    sleepHours: 7,
    subject: 'Final Exam',
    baselineTimestamp: now.getTime(),
  };
}
