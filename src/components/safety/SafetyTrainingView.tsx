import React, { useState } from 'react';
import {
  Award,
  Play,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SafetyTrainingModule } from '../../types';
import { AudioReaderButton } from '../common/AudioReaderButton';

export const SafetyTrainingView: React.FC = () => {
  const { trainingModules, completeTrainingModule, language, t } = useApp();

  const [activeModule, setActiveModule] = useState<SafetyTrainingModule | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleStartModule = (mod: SafetyTrainingModule) => {
    setActiveModule(mod);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  const handleQuizSubmit = () => {
    if (activeModule && selectedAnswer !== null) {
      setQuizSubmitted(true);
      const isCorrect = selectedAnswer === activeModule.quiz[0].correctIndex;
      if (isCorrect) {
        completeTrainingModule(activeModule.id, 100);
      }
    }
  };

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-2 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-600">
          <Award size={14} />
          <span>Vayra Academy</span>
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          {t.safety.safetyTraining}
        </h2>
        <p className="text-xs text-slate-500">
          Watch 60-second micro-videos, pass the 1-question quiz, and unlock verified profile badges.
        </p>
      </div>

      {/* Module Player Modal */}
      {activeModule && (
        <div className="bg-white rounded-3xl p-4 shadow-xl border border-slate-200 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
              {activeModule.category}
            </span>
            <button
              onClick={() => setActiveModule(null)}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Close Module
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center">
            <img
              src={activeModule.thumbnail}
              alt="Video Preview"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-slate-950/40 flex flex-col items-center justify-center text-white">
              <div className="w-12 h-12 rounded-full bg-sky-600 flex items-center justify-center shadow-lg shadow-sky-600/50 mb-2">
                <Play size={22} className="ml-0.5" />
              </div>
              <span className="text-xs font-bold">Watch Video (2:00 min)</span>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              {activeModule.title[language] || activeModule.title.en}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {activeModule.description[language] || activeModule.description.en}
            </p>
          </div>

          {/* Interactive Quiz Box */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <HelpCircle size={15} className="text-sky-600" />
              <span>Micro Certification Quiz</span>
            </div>

            <p className="text-xs font-semibold text-slate-800">
              {activeModule.quiz[0].question[language] || activeModule.quiz[0].question.en}
            </p>

            <div className="space-y-1.5">
              {(activeModule.quiz[0].options[language] || activeModule.quiz[0].options.en).map(
                (opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === activeModule.quiz[0].correctIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => !quizSubmitted && setSelectedAnswer(idx)}
                      className={`touch-target w-full p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        quizSubmitted
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold'
                            : isSelected
                            ? 'border-red-500 bg-red-100 text-red-900'
                            : 'border-slate-200 bg-white text-slate-500'
                          : isSelected
                          ? 'border-sky-500 bg-sky-50 text-sky-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                }
              )}
            </div>

            {!quizSubmitted ? (
              <button
                disabled={selectedAnswer === null}
                onClick={handleQuizSubmit}
                className="touch-target w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-300 text-white text-xs font-bold shadow-md active:scale-95"
              >
                Submit Answer
              </button>
            ) : (
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-700" />
                  <span>Badge Earned & Verified on Profile!</span>
                </div>
                <button
                  onClick={() => setActiveModule(null)}
                  className="text-emerald-800 underline text-[11px]"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modules List */}
      <div className="space-y-3">
        {trainingModules.map((mod) => (
          <div
            key={mod.id}
            onClick={() => handleStartModule(mod)}
            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 hover:border-sky-300 transition-all cursor-pointer flex items-center gap-3.5"
          >
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
              <img
                src={mod.thumbnail}
                alt={mod.title.en}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <Play size={18} className="fill-white" />
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-700 uppercase">
                  {mod.category}
                </span>
                {mod.completed && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={11} />
                    Certified
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 truncate mt-0.5">
                {mod.title[language] || mod.title.en}
              </h3>

              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                {mod.description[language] || mod.description.en}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
