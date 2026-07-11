import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Layers } from 'lucide-react';
import { Theme } from '../types';

interface NavbarProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ theme, setTheme, activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'learn', label: 'Learn Stack' },
    { id: 'simulator', label: 'Simulator' },
    { id: 'applications', label: 'Applications' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'problems', label: 'Practice' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-slate-950/45 backdrop-blur-md border-b border-white/5 py-3 shadow-xl'
            : 'bg-white/45 backdrop-blur-md border-b border-slate-200/40 py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="p-2 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl shadow-md text-white">
              <Layers className="h-6 w-6" />
            </div>
            <span className={`text-xl font-bold tracking-tight bg-gradient-to-r ${
              theme === 'dark' ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-700'
            } bg-clip-text text-transparent`}>
              DS Stack Visualizer
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? theme === 'dark'
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : 'bg-purple-100 text-purple-700 font-semibold'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors ml-4 cursor-pointer ${
                theme === 'dark'
                  ? 'text-amber-400 hover:bg-slate-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                theme === 'dark' ? 'text-amber-400' : 'text-slate-600'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg cursor-pointer ${
                theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className={`md:hidden px-4 pt-2 pb-4 space-y-1 shadow-lg border-b transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-slate-200'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                activeSection === item.id
                  ? theme === 'dark'
                    ? 'bg-purple-500/10 text-purple-400 font-semibold'
                    : 'bg-purple-100 text-purple-700 font-semibold'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
