import React from 'react';
import { Theme } from '../types';
import { Award, Zap, ShieldAlert, BookOpen } from 'lucide-react';

interface ComplexitySectionProps {
  theme: Theme;
}

export default function ComplexitySection({ theme }: ComplexitySectionProps) {
  const cardBgClass = theme === 'dark' ? 'glass-card' : 'glass-card-light shadow-md';
  const textTitleClass = theme === 'dark' ? 'text-white' : 'text-slate-800';
  const textSubClass = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  const complexityData = [
    { op: 'Push', time: 'O(1)', space: 'O(1)', desc: 'Inserting at the top of stack only updates the element index pointer. No element shifts are required.' },
    { op: 'Pop', time: 'O(1)', space: 'O(1)', desc: 'Removing the top element decrements the top index tracker. Constant-time deletion.' },
    { op: 'Peek', time: 'O(1)', space: 'O(1)', desc: 'Reads the element directly from the current Top index. Direct pointer lookup.' },
    { op: 'Display', time: 'O(n)', space: 'O(1)', desc: 'Requires traversing and outputting all current elements from top to bottom.' },
    { op: 'Search', time: 'O(n)', space: 'O(1)', desc: 'In the worst case, must pop and inspect all elements in the stack sequentially.' },
  ];

  return (
    <section id="complexity" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Complexity <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Analysis</span>
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-500">
          A definitive handbook of theoretical time and space bounds of various stack operations inside memory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Left Side: Interactive Table (2/3 cols on lg) */}
        <div className={`lg:col-span-2 p-6 sm:p-8 rounded-2xl ${cardBgClass} overflow-x-auto`}>
          <h3 className={`text-lg sm:text-xl font-bold mb-6 ${textTitleClass}`}>
            Stack Operations Bounds Table
          </h3>
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-mono font-bold uppercase text-purple-500 dark:text-purple-400">
                <th className="py-3 px-4">Operation</th>
                <th className="py-3 px-4">Time Complexity</th>
                <th className="py-3 px-4">Space Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
              {complexityData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-500/5 transition-colors">
                  <td className="py-4 px-4">
                    <span className={`font-mono font-bold ${textTitleClass}`}>{row.op}()</span>
                  </td>
                  <td className="py-4 px-4 font-mono font-semibold text-emerald-500 dark:text-emerald-400">
                    {row.time}
                  </td>
                  <td className="py-4 px-4 font-mono text-blue-500 dark:text-blue-400">
                    {row.space}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side: Analytical breakdown summary */}
        <div className={`p-6 sm:p-8 rounded-2xl ${cardBgClass} space-y-6 flex flex-col justify-between`}>
          <div className="space-y-4">
            <h4 className={`text-lg font-bold ${textTitleClass} flex items-center space-x-2`}>
              <Zap className="h-5 w-5 text-purple-500" />
              <span>Why is Stack O(1)?</span>
            </h4>
            <p className={`text-sm leading-relaxed ${textSubClass}`}>
              Unlike generic arrays where insertions at arbitrary positions force subsequent elements to shift memory addresses (resulting in linear O(n) delay), stack operations are strictly restricted to the <strong>Top element index</strong>.
            </p>
            <p className={`text-sm leading-relaxed ${textSubClass}`}>
              We read, write, and decrement elements exclusively by using the static tracker value <code>Top</code>, which functions as an instant index lookup.
            </p>
          </div>

          <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/15">
            <span className="text-xs font-mono text-purple-500 uppercase tracking-wider font-bold block mb-1">
              🎓 Lab Assignment Tip:
            </span>
            <span className={`text-xs ${textSubClass}`}>
              Always mention in exams that stacks provide highly optimized constant-time O(1) performance, making them ideal buffers for system execution.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
