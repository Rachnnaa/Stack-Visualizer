import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LearnSection from './components/LearnSection';
import SimulatorSection from './components/SimulatorSection';
import ApplicationsSection from './components/ApplicationsSection';
import QuizSection from './components/QuizSection';
import ProblemsSection from './components/ProblemsSection';
import ComplexitySection from './components/ComplexitySection';
import Footer from './components/Footer';
import { Theme } from './types';
import { Layers, ArrowRight, Play, BookOpen, GraduationCap, Sparkles } from 'lucide-react';

export default function App() {
  // Theme state with localStorage fallback
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle hero button scrolling
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-[#0b0c16] text-slate-100' 
        : 'bg-[#f5f7fc] text-slate-900'
    }`}>
      
      {/* Decorative floating ambient particle background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] left-[2%] w-[450px] h-[450px] bg-purple-500/10 dark:bg-purple-600/12 rounded-full blur-[130px] animate-pulse"></div>
        <div className="absolute top-[35%] right-[2%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/12 rounded-full blur-[140px] animate-pulse delay-700"></div>
        <div className="absolute bottom-[5%] left-[15%] w-[400px] h-[400px] bg-indigo-500/10 dark:bg-pink-600/8 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        
        {/* CSS-based floating star-particles */}
        <div className="absolute top-24 left-1/4 w-2.5 h-2.5 bg-purple-500/30 rounded-full animate-float"></div>
        <div className="absolute top-80 right-1/3 w-3.5 h-3.5 bg-blue-500/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-48 left-1/3 w-2 h-2 bg-indigo-500/40 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-96 right-10 w-3 h-3 bg-purple-500/20 rounded-full animate-float" style={{ animationDelay: '4.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Header */}
        <Navbar 
          theme={theme} 
          setTheme={setTheme} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />

        {/* Hero Section */}
        <header id="home" className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Intro copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/10 dark:bg-purple-500/20 rounded-full border border-purple-500/25">
                <GraduationCap className="h-4 w-4 text-purple-500" />
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-300 uppercase tracking-widest">
                  Data Structures Laboratory
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                DS Stack <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Visualizer Platform
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                Learn stack operations, memory representations, and real-time pointer mechanics through highly interactive virtual animations, pseudo-code tracers, and academic testing suites.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => scrollTo('learn')}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700/80 flex items-center space-x-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  <span>Start Learning</span>
                </button>

                <button
                  onClick={() => scrollTo('simulator')}
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-sm rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-purple-500/10 transform hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>Open Simulator</span>
                </button>
              </div>
            </div>

            {/* Right side: Animated micro-illustration stack container */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[320px] p-8 rounded-3xl bg-slate-500/5 border border-slate-500/15 backdrop-blur-md shadow-2xl space-y-4">
                
                <div className="text-center pb-2 border-b border-slate-500/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Interactive Preview Plate
                  </span>
                </div>

                <div className="space-y-2 relative pt-8">
                  {/* PUSH floating pointer arrow on right */}
                  <div className="absolute right-0 top-12 flex flex-col items-center space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold">TOP</span>
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping"></div>
                  </div>

                  {/* 3 stacked visual cards */}
                  <div className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md cursor-help hover:scale-102 transition-transform">
                    Plate 3 (Last In / Top)
                  </div>
                  <div className="w-full h-11 bg-purple-500/80 rounded-xl flex items-center justify-center text-white/90 text-xs font-bold shadow-sm opacity-90 cursor-help hover:scale-102 transition-transform">
                    Plate 2 (Middle)
                  </div>
                  <div className="w-full h-11 bg-purple-400/60 rounded-xl flex items-center justify-center text-white/80 text-xs font-bold shadow-sm opacity-80 cursor-help hover:scale-102 transition-transform">
                    Plate 1 (Bottom)
                  </div>
                </div>

                <div className="w-full border-t-2 border-slate-600/40 text-center pt-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                    Closed Base Container (LIFO)
                  </span>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Learning Section */}
        <LearnSection theme={theme} />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-200 dark:border-slate-800/60"></div>
        </div>

        {/* Interactive Simulator Section */}
        <SimulatorSection theme={theme} />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-200 dark:border-slate-800/60"></div>
        </div>

        {/* Complexity Analysis Section */}
        <ComplexitySection theme={theme} />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-200 dark:border-slate-800/60"></div>
        </div>

        {/* Applications Section */}
        <ApplicationsSection theme={theme} />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-200 dark:border-slate-800/60"></div>
        </div>

        {/* Interactive quiz */}
        <QuizSection theme={theme} />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-200 dark:border-slate-800/60"></div>
        </div>

        {/* Practice Coding Problems */}
        <ProblemsSection theme={theme} />

        {/* Footer */}
        <Footer theme={theme} />
      </div>

    </div>
  );
}
