import React, { useState } from 'react';
import { TriageTopic } from '../types';
import { soundManager } from '../utils/soundEffects';

interface EmergencySurvivalPlanProps {
  productiveMs: number;
}

export const EmergencySurvivalPlan: React.FC<EmergencySurvivalPlanProps> = ({ productiveMs }) => {
  const [topics, setTopics] = useState<TriageTopic[]>([
    {
      id: 't-1',
      name: 'High-Yield Core Chapter / Most Frequent Exam Questions',
      priority: 'must_know',
      estimatedMinutes: 45,
      done: false,
    },
    {
      id: 't-2',
      name: 'Key Formulas, Definitions & Reaction Mechanisms',
      priority: 'must_know',
      estimatedMinutes: 30,
      done: false,
    },
    {
      id: 't-3',
      name: 'Last Year Past Paper (Speed-Run Model Answers)',
      priority: 'quick_skim',
      estimatedMinutes: 30,
      done: false,
    },
    {
      id: 't-4',
      name: 'Obscure Chapter 11 Subsections (Low Exam Probability)',
      priority: 'skip',
      estimatedMinutes: 0,
      done: false,
    },
  ]);

  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicPriority, setNewTopicPriority] = useState<'must_know' | 'quick_skim' | 'skip'>('must_know');

  const addTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    const newTopic: TriageTopic = {
      id: `t-${Date.now()}`,
      name: newTopicName.trim(),
      priority: newTopicPriority,
      estimatedMinutes: newTopicPriority === 'must_know' ? 40 : newTopicPriority === 'quick_skim' ? 20 : 0,
      done: false,
    };

    setTopics([...topics, newTopic]);
    setNewTopicName('');
    soundManager.playTick();
  };

  const toggleDone = (id: string) => {
    setTopics(topics.map((t) => {
      if (t.id === id) {
        if (!t.done) soundManager.playAlert();
        return { ...t, done: !t.done };
      }
      return t;
    }));
  };

  const removeTopic = (id: string) => {
    setTopics(topics.filter((t) => t.id !== id));
    soundManager.playTick();
  };

  const productiveMinutes = Math.floor(productiveMs / (1000 * 60));
  const mustKnowCount = topics.filter((t) => t.priority === 'must_know').length;
  const recommendedMinutesPerTopic = mustKnowCount > 0 ? Math.floor(productiveMinutes / mustKnowCount) : 0;

  return (
    <section id="triage-section" className="w-full bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-neutral-800 gap-2">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>🛡️</span> Emergency Triage Planner
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Divide your actual productive study hours across your highest-value topics. Stop pretending you can study everything.
          </p>
        </div>

        {productiveMinutes > 0 && mustKnowCount > 0 && (
          <div className="text-xs font-mono-numbers bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
            Triage pacing: <span className="font-extrabold">{recommendedMinutesPerTopic} mins</span> / must-know topic
          </div>
        )}
      </div>

      {/* Add New Topic Form */}
      <form onSubmit={addTopic} className="flex flex-col sm:flex-row gap-2.5 mb-5">
        <input
          type="text"
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
          placeholder="Add chapter or concept (e.g. Thermodynamics, Cell Division)..."
          className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-rose-500/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-600 outline-none transition-colors"
        />

        <div className="flex items-center gap-2">
          <select
            value={newTopicPriority}
            onChange={(e) => setNewTopicPriority(e.target.value as 'must_know' | 'quick_skim' | 'skip')}
            className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-200 outline-none [color-scheme:dark]"
          >
            <option value="must_know">🟢 Must Know (80/20)</option>
            <option value="quick_skim">🟡 Quick Skim</option>
            <option value="skip">🔴 Bail Out / Skip</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer border border-neutral-700 whitespace-nowrap"
          >
            + Add Topic
          </button>
        </div>
      </form>

      {/* Topics List */}
      <div className="space-y-2.5">
        {topics.map((t) => {
          return (
            <div
              key={t.id}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all ${
                t.done
                  ? 'bg-neutral-950/40 border-neutral-800/60 opacity-50'
                  : t.priority === 'must_know'
                  ? 'bg-neutral-950/80 border-emerald-500/30'
                  : t.priority === 'quick_skim'
                  ? 'bg-neutral-950/80 border-amber-500/30'
                  : 'bg-neutral-950/80 border-rose-500/20'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                <button
                  type="button"
                  onClick={() => toggleDone(t.id)}
                  aria-label={t.done ? "Mark incomplete" : "Mark complete"}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    t.done
                      ? 'bg-emerald-500 border-emerald-400 text-neutral-950'
                      : 'border-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  {t.done && (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                <div className="truncate">
                  <span className={`text-xs sm:text-sm font-semibold truncate block ${t.done ? 'line-through text-neutral-500' : 'text-neutral-100'}`}>
                    {t.name}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                    {t.priority === 'must_know' && (
                      <span className="text-emerald-400 font-bold uppercase">Must Know</span>
                    )}
                    {t.priority === 'quick_skim' && (
                      <span className="text-amber-400 font-bold uppercase">Quick Skim Only</span>
                    )}
                    {t.priority === 'skip' && (
                      <span className="text-rose-400 font-bold uppercase">Bail Out / Skip</span>
                    )}
                    {t.priority === 'must_know' && recommendedMinutesPerTopic > 0 && (
                      <>
                        <span>·</span>
                        <span className="font-mono-numbers font-medium text-neutral-300">~{recommendedMinutesPerTopic}m target</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeTopic(t.id)}
                className="text-neutral-500 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                title="Remove topic"
                aria-label="Remove topic"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
        <span className="italic">
          Rule of Triage: Every minute spent mourning what you didn't study is a mark lost on what you could review.
        </span>
        <button
          onClick={() => {
            setTopics([
              { id: 't-1', name: 'Past Exam 3-Year Recurring Questions', priority: 'must_know', estimatedMinutes: 40, done: false },
              { id: 't-2', name: 'Formula & Equation Sheet Speed-Run', priority: 'must_know', estimatedMinutes: 25, done: false },
              { id: 't-3', name: 'Definitions & Key Diagram Labels', priority: 'quick_skim', estimatedMinutes: 20, done: false },
            ]);
            soundManager.playTick();
          }}
          className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
        >
          Reset Template
        </button>
      </div>
    </section>
  );
};
