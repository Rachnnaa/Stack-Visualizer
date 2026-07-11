import React, { useState } from 'react';
import { stackApplications } from '../data/applicationsData';
import { Theme } from '../types';
import { BookOpen, HelpCircle, Code, Play } from 'lucide-react';

interface ApplicationsSectionProps {
  theme: Theme;
}

export default function ApplicationsSection({ theme }: ApplicationsSectionProps) {
  const [selectedApp, setSelectedApp] = useState(stackApplications[0].id);
  const [demoInput, setDemoInput] = useState('');
  const [demoStack, setDemoStack] = useState<string[]>([]);
  const [demoResult, setDemoResult] = useState<string | null>(null);

  const activeAppObj = stackApplications.find(a => a.id === selectedApp) || stackApplications[0];

  // mini interactive demo handler for Bracket Matcher
  const handleBracketCheck = (val: string) => {
    setDemoInput(val);
    const stack: string[] = [];
    let isBalanced = true;
    for (let char of val) {
      if (char === '(' || char === '[' || char === '{') {
        stack.push(char);
      } else if (char === ')' || char === ']' || char === '}') {
        if (stack.length === 0) {
          isBalanced = false;
          break;
        }
        const last = stack.pop();
        if (
          (char === ')' && last !== '(') ||
          (char === ']' && last !== '[') ||
          (char === '}' && last !== '{')
        ) {
          isBalanced = false;
          break;
        }
      }
    }
    setDemoStack([...stack]);
    if (val.length === 0) {
      setDemoResult(null);
    } else {
      setDemoResult(isBalanced && stack.length === 0 ? 'Balanced' : 'Unbalanced');
    }
  };

  // mini interactive demo for Undo/Redo
  const [textVal, setTextVal] = useState('');
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    setUndoStack(prev => [...prev, textVal]); // push previous to undo stack
    setTextVal(nextVal);
    setRedoStack([]); // clear redo stack on new action
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(prevStack => prevStack.slice(0, -1));
    setRedoStack(prevRedo => [...prevRedo, textVal]); // push current to redo
    setTextVal(prev);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(prevRedo => prevRedo.slice(0, -1));
    setUndoStack(prevUndo => [...prevUndo, textVal]); // push current to undo
    setTextVal(next);
  };

  const cardBgClass = theme === 'dark' ? 'glass-card' : 'glass-card-light shadow-md';
  const textTitleClass = theme === 'dark' ? 'text-white' : 'text-slate-800';
  const textSubClass = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <section id="applications" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Real-World <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Applications</span>
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-500">
          Click on any application card to see the theoretical details and experiment with interactive mini-visualizers of stacks at work!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Apps Navigation Rail (Left side, 4/12 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {stackApplications.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                setSelectedApp(app.id);
                setDemoInput('');
                setDemoStack([]);
                setDemoResult(null);
              }}
              className={`w-full text-left p-4 rounded-xl transition-all border cursor-pointer flex items-center space-x-3 ${
                selectedApp === app.id
                  ? theme === 'dark'
                    ? 'bg-purple-600/15 border-purple-500 text-purple-200 shadow-md shadow-purple-500/10'
                    : 'bg-purple-100 border-purple-300 text-purple-900 font-medium'
                  : theme === 'dark'
                  ? 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/40 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                selectedApp === app.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{app.title}</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{app.illustration}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected App Detailed Card (Right side, 7/12 cols) */}
        <div className={`lg:col-span-7 p-8 rounded-2xl ${cardBgClass} flex flex-col justify-between`}>
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono px-2 py-1 bg-purple-500/10 text-purple-500 dark:text-purple-400 rounded-md font-bold uppercase tracking-wider">
                {activeAppObj.illustration}
              </span>
              <h3 className={`text-2xl font-bold mt-2 ${textTitleClass}`}>
                {activeAppObj.title}
              </h3>
            </div>

            <p className={`text-base leading-relaxed ${textSubClass}`}>
              {activeAppObj.description}
            </p>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-1">
              <h4 className="text-sm font-bold text-blue-500 dark:text-blue-400 flex items-center space-x-1">
                <Code className="h-4 w-4" />
                <span>Real-world Case Study:</span>
              </h4>
              <p className={`text-sm ${textSubClass}`}>
                {activeAppObj.realWorldExample}
              </p>
            </div>

            {/* Interactive Area depending on application */}
            <div className="border-t border-slate-200 dark:border-slate-800/60 pt-6 mt-6">
              <h4 className={`text-sm font-bold mb-3 ${textTitleClass} flex items-center space-x-1.5`}>
                <Play className="h-4 w-4 text-purple-500" />
                <span>Interactive Laboratory Simulation:</span>
              </h4>

              {selectedApp === 'paren-match' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs text-slate-500">Enter brackets to test balancing: (e.g. &#123;[()]&#125;)</label>
                    <input
                      type="text"
                      value={demoInput}
                      onChange={(e) => handleBracketCheck(e.target.value)}
                      placeholder="Type brackets here..."
                      className="px-4 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-800 bg-white/5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {demoInput && (
                    <div className="grid grid-cols-2 gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
                      <div>
                        <span className="text-xs text-slate-400 block mb-1">Live Validation Stack:</span>
                        <div className="flex items-center space-x-1 font-mono">
                          {demoStack.length === 0 ? (
                            <span className="text-xs text-slate-500 italic">Stack Empty</span>
                          ) : (
                            demoStack.map((char, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded text-sm"
                              >
                                {char}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block mb-1">Result:</span>
                        <span className={`text-sm font-bold ${
                          demoResult === 'Balanced' ? 'text-emerald-500' : 'text-rose-500'
                        }`}>
                          {demoResult}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedApp === 'undo-redo' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs text-slate-500">Type text into the editor simulation:</label>
                    <input
                      type="text"
                      value={textVal}
                      onChange={handleType}
                      placeholder="Start typing text..."
                      className="px-4 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-800 bg-white/5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={handleUndo}
                      disabled={undoStack.length === 0}
                      className="px-4 py-2 text-xs font-semibold bg-purple-500 hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors cursor-pointer"
                    >
                      ↺ Undo (Stack Size: {undoStack.length})
                    </button>
                    <button
                      onClick={handleRedo}
                      disabled={redoStack.length === 0}
                      className="px-4 py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors cursor-pointer"
                    >
                      ↻ Redo (Stack Size: {redoStack.length})
                    </button>
                  </div>

                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
                    <span className="text-xs text-slate-400 block mb-1">History Stack Visualized:</span>
                    <div className="flex space-x-2 text-xs font-mono">
                      <div className="flex-1 bg-slate-800/30 p-2 rounded border border-slate-700/30">
                        <span className="text-[10px] text-purple-400 uppercase font-bold block mb-1">Undo Stack:</span>
                        {undoStack.length === 0 ? 'Empty' : undoStack.map((item, i) => `"${item}"`).join(' → ')}
                      </div>
                      <div className="flex-1 bg-slate-800/30 p-2 rounded border border-slate-700/30">
                        <span className="text-[10px] text-blue-400 uppercase font-bold block mb-1">Redo Stack:</span>
                        {redoStack.length === 0 ? 'Empty' : redoStack.map((item, i) => `"${item}"`).join(' → ')}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedApp !== 'paren-match' && selectedApp !== 'undo-redo' && (
                <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 text-center">
                  <p className="text-sm text-slate-400 italic">
                    The core simulator section contains the main fully-animated execution visualizer. Go to the simulator above to push, pop, and inspect operations in real-time!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
