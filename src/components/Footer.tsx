import React from 'react';
import { Theme } from '../types';
import { Layers, Github, Heart, Mail, ExternalLink } from 'lucide-react';

interface FooterProps {
  theme: Theme;
}

export default function Footer({ theme }: FooterProps) {
  const borderClass = theme === 'dark' ? 'border-slate-800' : 'border-slate-200';
  const textClass = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <footer id="about" className={`border-t ${borderClass} pt-16 pb-8 transition-all duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About App */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg text-white">
                <Layers className="h-5 w-5" />
              </div>
              <span className={`text-lg font-bold tracking-tight bg-gradient-to-r ${
                theme === 'dark' ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-700'
              } bg-clip-text text-transparent`}>
                DS Stack Visualizer
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${textClass} max-w-sm`}>
              An interactive virtual laboratory designed to help computer science students visually master the Stack data structure, LIFO operation lifecycle, and complexity characteristics.
            </p>
          </div>

          {/* Col 2: Department / Laboratory */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-500 dark:text-purple-400">
              Laboratory
            </h4>
            <ul className="space-y-2 text-sm">
              <li className={textClass}>Data Structures Lab</li>
              <li className={textClass}>Dept. of Computer Science</li>
              <li className={textClass}>Interactive Engineering</li>
              <li className={textClass}>Visual Learning Unit</li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-500 dark:text-purple-400">
              Developer Info
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Github className="h-4 w-4 text-slate-400" />
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-500 transition-colors inline-flex items-center space-x-1"
                >
                  <span>GitHub Profile</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className={textClass}>rachnasomkunwar12@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className={`border-t ${borderClass} pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-xs ${textClass} space-y-4 sm:space-y-0`}>
          <p>© 2026 DS Stack Visualizer. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Designed for laboratory students with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>using React & Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
