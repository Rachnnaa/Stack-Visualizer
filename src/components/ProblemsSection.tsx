import React, { useState } from 'react';
import { practiceProblems } from '../data/problemsData';
import { Theme } from '../types';
import { HelpCircle, Code, ChevronRight, CheckCircle, Award } from 'lucide-react';

interface ProblemsSectionProps {
  theme: Theme;
}

export default function ProblemsSection({ theme }: ProblemsSectionProps) {
  const [activeProb, setActiveProb] = useState(practiceProblems[0].id);
  const [showHint, setShowHint] = useState(false);
  const [showSol, setShowSol] = useState(false);

  const currentProblem = practiceProblems.find(p => p.id === activeProb) || practiceProblems[0];

  const cardBgClass = theme === 'dark' ? 'glass-card' : 'glass-card-light shadow-md';
  const textTitleClass = theme === 'dark' ? 'text-white' : 'text-slate-800';
  const textSubClass = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <section id="problems" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Practice <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Problems</span>
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-500">
          Solve structured algorithm problems using stack architectures. Includes progressive hints and complete programmatic solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation panel of problems */}
        <div className="lg:col-span-4 space-y-3">
          {practiceProblems.map((prob) => {
            let difficultyColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            if (prob.difficulty === 'Medium') {
              difficultyColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            } else if (prob.difficulty === 'Hard') {
              difficultyColor = 'text-rose-500 bg-rose-500/10 border-rose-500/20';
            }

            return (
              <button
                key={prob.id}
                onClick={() => {
                  setActiveProb(prob.id);
                  setShowHint(false);
                  setShowSol(false);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  activeProb === prob.id
                    ? theme === 'dark'
                      ? 'bg-purple-600/10 border-purple-500 text-white'
                      : 'bg-purple-100 border-purple-300 text-purple-900 font-semibold shadow-sm'
                    : theme === 'dark'
                    ? 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/40'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold truncate">{prob.title}</h4>
                  <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border mt-1 ${difficultyColor}`}>
                    {prob.difficulty}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </button>
            );
          })}
        </div>

        {/* Selected problem workspace */}
        <div className={`lg:col-span-8 p-8 rounded-2xl ${cardBgClass} space-y-6`}>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                currentProblem.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  : currentProblem.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
              }`}>
                {currentProblem.difficulty} Difficulty
              </span>
            </div>
            <h3 className={`text-2xl font-bold mt-2 ${textTitleClass}`}>
              {currentProblem.title}
            </h3>
          </div>

          <p className={`text-sm sm:text-base leading-relaxed ${textSubClass}`}>
            {currentProblem.description}
          </p>

          {/* Expected output block */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/60 font-mono text-xs sm:text-sm">
            <span className="text-[10px] text-purple-400 uppercase font-bold tracking-wider block mb-2">Expected Input & Output:</span>
            <pre className="text-slate-300 whitespace-pre-line leading-relaxed">{currentProblem.expectedOutput}</pre>
          </div>

          {/* Buttons for Hint & Solution */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center space-x-1.5 cursor-pointer border transition-colors ${
                showHint
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                  : 'bg-slate-800/50 hover:bg-slate-800 text-white border-slate-700/80'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
            </button>

            <button
              onClick={() => setShowSol(!showSol)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center space-x-1.5 cursor-pointer border transition-colors ${
                showSol
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                  : 'bg-purple-600 hover:bg-purple-700 text-white border-purple-500/20'
              }`}
            >
              <Code className="h-4 w-4" />
              <span>{showSol ? 'Hide Reference Solution' : 'View Reference Solution'}</span>
            </button>
          </div>

          {/* Hint Area */}
          {showHint && (
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-1">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block">
                💡 Practice Hint:
              </span>
              <p className={`text-xs sm:text-sm leading-relaxed ${textSubClass}`}>
                {currentProblem.hint}
              </p>
            </div>
          )}

          {/* Solution Area with formatted mock code editor */}
          {showSol && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-500 font-bold uppercase tracking-wider flex items-center space-x-1">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Verified JavaScript Solution:</span>
                </span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 font-mono text-xs sm:text-sm overflow-x-auto">
                <pre className="text-emerald-400 leading-relaxed">{currentProblem.solution}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
