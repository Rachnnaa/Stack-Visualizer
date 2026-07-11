import React from 'react';
import { Layers, HelpCircle, AlertTriangle, Cpu, TrendingUp } from 'lucide-react';
import { Theme } from '../types';

interface LearnSectionProps {
  theme: Theme;
}

export default function LearnSection({ theme }: LearnSectionProps) {
  const cardBgClass = theme === 'dark' ? 'glass-card' : 'glass-card-light shadow-md';
  const textTitleClass = theme === 'dark' ? 'text-white' : 'text-slate-800';
  const textSubClass = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <section id="learn" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Understanding the <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Stack</span> Data Structure
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-500">
          A fundamental linear data structure essential for managing program execution, parsing, and backtracking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-16">
        {/* Core Concepts */}
        <div className={`p-8 rounded-2xl ${cardBgClass} space-y-6`}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className={`text-2xl font-bold ${textTitleClass}`}>What is a Stack?</h3>
          </div>
          <p className={textSubClass}>
            A <strong>Stack</strong> is a linear data structure that follows a particular order in which the operations are performed. The order is <strong>LIFO (Last In First Out)</strong> or <strong>FILO (First In Last Out)</strong>.
          </p>
          <p className={textSubClass}>
            Think of a stack of dinner plates in a cafeteria. You place a plate on the top (Push), and the plate that was placed last is the first one to be taken off (Pop). Similarly, the plate placed first is at the bottom and is only accessed when all others above it have been removed.
          </p>

          <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
            <h4 className={`font-semibold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-800'} flex items-center space-x-2`}>
              <span>💡 Key Principle: LIFO</span>
            </h4>
            <p className={`mt-1 text-sm ${textSubClass}`}>
              The element inserted last is the first one to be deleted. Any element inserted before can only be removed after all subsequent insertions have been popped out.
            </p>
          </div>
        </div>

        {/* Visual LIFO Representation */}
        <div className={`p-8 rounded-2xl ${cardBgClass} flex flex-col justify-center items-center h-full`}>
          <h4 className={`text-lg font-bold mb-6 ${textTitleClass}`}>LIFO Concept Diagram</h4>
          <div className="w-full max-w-sm flex flex-col items-center space-y-3 relative">
            
            {/* Legend / Info arrows */}
            <div className="absolute -left-12 top-6 flex flex-col items-center space-y-1">
              <div className="px-2 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20">PUSH</div>
              <div className="w-px h-10 bg-emerald-500/40 relative">
                <div className="absolute bottom-0 -left-[3px] w-1.5 h-1.5 border-r border-b border-emerald-500 transform rotate-45"></div>
              </div>
            </div>

            <div className="absolute -right-12 top-6 flex flex-col items-center space-y-1">
              <div className="px-2 py-1 text-xs font-semibold bg-rose-500/10 text-rose-500 rounded border border-rose-500/20">POP</div>
              <div className="w-px h-10 bg-rose-500/40 relative">
                <div className="absolute top-0 -left-[3px] w-1.5 h-1.5 border-l border-t border-rose-500 transform rotate-45"></div>
              </div>
            </div>

            {/* Visual Stack plates */}
            <div className="w-full h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md transform hover:scale-[1.02] transition-transform cursor-pointer">
              Top Element (Last In)
            </div>
            <div className="w-full h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white/95 font-bold shadow-sm transform hover:scale-[1.02] transition-transform cursor-pointer opacity-90">
              Middle Element
            </div>
            <div className="w-full h-12 bg-purple-400 rounded-xl flex items-center justify-center text-white/90 font-bold shadow-sm transform hover:scale-[1.02] transition-transform cursor-pointer opacity-80">
              Middle Element
            </div>
            <div className="w-full h-12 bg-purple-300 rounded-xl flex items-center justify-center text-white/80 font-bold shadow-sm transform hover:scale-[1.02] transition-transform cursor-pointer opacity-70">
              Bottom Element (First In)
            </div>

            <div className="w-full border-t-4 border-slate-600 mt-2 text-center pt-2">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Stack Base (Closed End)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overflow & Underflow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className={`p-6 rounded-2xl border-l-4 border-rose-500 ${cardBgClass}`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-rose-500/10 text-rose-500 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h4 className={`text-xl font-bold ${textTitleClass}`}>Stack Overflow</h4>
          </div>
          <p className={`text-sm leading-relaxed ${textSubClass}`}>
            This condition occurs when we attempt to <strong>Push</strong> a new element onto a stack that has already reached its <strong>maximum limit</strong> or maximum capacity.
          </p>
          <div className="mt-4 p-3 bg-rose-500/5 rounded-lg border border-rose-500/15">
            <span className="text-xs font-mono text-rose-500 uppercase font-bold tracking-wider block mb-1">Trigger Condition:</span>
            <code className="text-xs font-mono text-slate-500 block">if (top == maxSize - 1) &#123; print("Stack Overflow"); &#125;</code>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border-l-4 border-amber-500 ${cardBgClass}`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h4 className={`text-xl font-bold ${textTitleClass}`}>Stack Underflow</h4>
          </div>
          <p className={`text-sm leading-relaxed ${textSubClass}`}>
            This condition occurs when we attempt to <strong>Pop</strong> or <strong>Peek</strong> an element from a stack that is currently <strong>empty</strong> (contains zero elements).
          </p>
          <div className="mt-4 p-3 bg-amber-500/5 rounded-lg border border-amber-500/15">
            <span className="text-xs font-mono text-amber-500 uppercase font-bold tracking-wider block mb-1">Trigger Condition:</span>
            <code className="text-xs font-mono text-slate-500 block">if (top == -1) &#123; print("Stack Underflow"); &#125;</code>
          </div>
        </div>
      </div>

      {/* Memory representation & complexity analysis summary */}
      <div className={`p-8 rounded-2xl ${cardBgClass} mb-16`}>
        <h3 className={`text-2xl font-bold mb-6 ${textTitleClass} flex items-center space-x-2`}>
          <Cpu className="h-6 w-6 text-indigo-500" />
          <span>Memory Representation</span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className={`text-lg font-semibold mb-2 ${textTitleClass}`}>1. Sequential (Array-based)</h4>
            <p className={`text-sm leading-relaxed ${textSubClass} mb-4`}>
              In this representation, elements are stored in contiguous memory locations. It is efficient but has a <strong>static size</strong> which must be predefined at compilation/initialization time.
            </p>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block mb-2">// Array Representation</span>
              <div className="flex space-x-1 justify-center font-mono">
                <div className="w-12 h-10 border border-slate-700 flex flex-col items-center justify-center bg-slate-800/40 rounded">
                  <span className="text-xs text-white">Item 0</span>
                  <span className="text-[9px] text-slate-500">idx 0</span>
                </div>
                <div className="w-12 h-10 border border-slate-700 flex flex-col items-center justify-center bg-slate-800/40 rounded">
                  <span className="text-xs text-white">Item 1</span>
                  <span className="text-[9px] text-slate-500">idx 1</span>
                </div>
                <div className="w-12 h-10 border border-slate-700 flex flex-col items-center justify-center bg-slate-800/40 rounded">
                  <span className="text-xs text-white">Item 2</span>
                  <span className="text-[9px] text-slate-500">idx 2</span>
                </div>
                <div className="w-12 h-10 border-dashed border-2 border-slate-700 flex flex-col items-center justify-center rounded text-slate-600">
                  <span className="text-xs">Empty</span>
                  <span className="text-[9px]">idx 3</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className={`text-lg font-semibold mb-2 ${textTitleClass}`}>2. Dynamic (Linked List-based)</h4>
            <p className={`text-sm leading-relaxed ${textSubClass} mb-4`}>
              In this representation, each node contains a value and a pointer reference to the next node. Stacks implemented via linked lists can <strong>grow and shrink dynamically</strong> without a strict predetermined capacity.
            </p>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block mb-2">// Linked List Representation</span>
              <div className="flex items-center space-x-2 justify-center font-mono">
                <div className="px-2 py-1.5 border border-slate-700 bg-slate-800/40 rounded text-center">
                  <div className="text-xs text-white">TOP</div>
                  <div className="text-[8px] text-purple-400">Node (Head)</div>
                </div>
                <span className="text-slate-500">→</span>
                <div className="px-2 py-1.5 border border-slate-700 bg-slate-800/40 rounded text-center">
                  <div className="text-xs text-white">Node 2</div>
                  <div className="text-[8px] text-slate-500">Node</div>
                </div>
                <span className="text-slate-500">→</span>
                <div className="px-2 py-1.5 border border-slate-700 bg-slate-800/40 rounded text-center">
                  <div className="text-xs text-slate-400">NULL</div>
                  <div className="text-[8px] text-slate-600">Tail</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
