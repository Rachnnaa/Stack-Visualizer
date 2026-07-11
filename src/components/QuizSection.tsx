import React, { useState, useEffect, useRef } from 'react';
import { quizQuestions } from '../data/quizData';
import { Theme } from '../types';
import { Award, RotateCcw, AlertCircle, CheckCircle2, XCircle, Timer, BarChart } from 'lucide-react';

interface QuizSectionProps {
  theme: Theme;
}

export default function QuizSection({ theme }: QuizSectionProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (quizFinished) return;
    
    // reset timer for each question
    setTimeLeft(30);
    
    // start interval
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // timer expired: auto submit
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx, quizFinished]);

  const handleTimeOut = () => {
    setSelectedAns(-1); // special index for timeout
    setHasSubmitted(true);
  };

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedAns(idx);
  };

  const handleSubmit = () => {
    if (selectedAns === null || hasSubmitted) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setHasSubmitted(true);
    if (selectedAns === quizQuestions[currentIdx].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAns(null);
      setHasSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAns(null);
    setHasSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const currentQuestion = quizQuestions[currentIdx];
  const cardBgClass = theme === 'dark' ? 'glass-card' : 'glass-card-light shadow-md';
  const textTitleClass = theme === 'dark' ? 'text-white' : 'text-slate-800';
  const textSubClass = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <section id="quiz" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Interactive <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Stack Quiz</span>
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-500">
          Validate your stack knowledge with 20 conceptual multiple-choice questions designed for the Data Structures Lab.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {!quizFinished ? (
          <div className={`p-8 rounded-2xl ${cardBgClass} relative overflow-hidden`}>
            
            {/* Top info and Timer progress bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800/40">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono font-bold text-purple-500 uppercase tracking-wider">
                Question {currentIdx + 1} of {quizQuestions.length}
              </span>
              <div className="flex items-center space-x-2 text-sm font-mono text-slate-500">
                <Timer className="h-4 w-4 text-purple-400 animate-pulse" />
                <span className={timeLeft <= 5 ? 'text-rose-500 font-bold' : ''}>{timeLeft}s</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800/60 h-2 rounded-full mb-8">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <h3 className={`text-lg sm:text-xl font-bold mb-6 ${textTitleClass}`}>
              {currentQuestion.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, idx) => {
                let optionStyle = theme === 'dark'
                  ? 'bg-slate-900/40 hover:bg-slate-800/40 border-slate-800 text-slate-300'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700';

                if (selectedAns === idx && !hasSubmitted) {
                  optionStyle = theme === 'dark'
                    ? 'bg-purple-600/10 border-purple-500 text-purple-300 font-medium'
                    : 'bg-purple-100 border-purple-300 text-purple-950 font-medium';
                }

                if (hasSubmitted) {
                  if (idx === currentQuestion.correctAnswer) {
                    optionStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold';
                  } else if (selectedAns === idx) {
                    optionStyle = 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-semibold';
                  } else {
                    optionStyle = theme === 'dark' ? 'bg-slate-900/20 border-slate-800 text-slate-500 opacity-60' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasSubmitted}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {hasSubmitted && idx === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 ml-2" />
                    )}
                    {hasSubmitted && selectedAns === idx && idx !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions / Explanation */}
            {hasSubmitted ? (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 space-y-1">
                  <span className="text-xs font-mono font-bold text-purple-500 uppercase tracking-wider block">
                    Explanation:
                  </span>
                  <p className={`text-xs sm:text-sm leading-relaxed ${textSubClass}`}>
                    {currentQuestion.explanation}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-sm rounded-xl hover:from-blue-600 hover:to-purple-700 shadow-md transform hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    {currentIdx < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={selectedAns === null}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl hover:from-purple-600 hover:to-indigo-700 shadow-md transition-all cursor-pointer"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={`p-8 rounded-2xl ${cardBgClass} text-center space-y-6`}>
            <div className="mx-auto w-16 h-16 bg-purple-500/10 text-purple-500 flex items-center justify-center rounded-2xl shadow-inner">
              <Award className="h-10 w-10" />
            </div>

            <h3 className={`text-2xl font-bold ${textTitleClass}`}>
              Quiz Completed!
            </h3>

            <p className="text-slate-500">
              You scored <span className="text-purple-500 font-extrabold text-2xl">{score}</span> out of <span className="font-semibold text-lg">{quizQuestions.length}</span> questions.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/30 max-w-sm mx-auto border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block mb-1">Performance Feedback:</span>
              <span className="text-sm font-semibold text-purple-300">
                {score === quizQuestions.length
                  ? '🏆 Perfect! You are a Stack Master!'
                  : score >= 16
                  ? '🌟 Excellent! High conceptual understanding.'
                  : score >= 10
                  ? '👍 Good job! Review explanations to patch minor gaps.'
                  : '📚 Keep studying! Re-run simulator tutorials.'}
              </span>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 flex items-center space-x-2 shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Restart Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
