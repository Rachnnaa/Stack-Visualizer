import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Theme, StackElement } from '../types';
import { 
  Play, RotateCcw, HelpCircle, ArrowRight, ArrowLeft, Plus, Trash2, 
  Eye, ToggleLeft, Activity, Info, Sliders, Volume2, VolumeX, Download, Upload, Sparkles
} from 'lucide-react';

interface SimulatorSectionProps {
  theme: Theme;
}

// Pseudo-code repository for highlighting
const pseudoCodes = {
  push: [
    "function push(value) {",
    "  if (top === maxSize - 1) {",
    "    return 'Stack Overflow';",
    "  }",
    "  top = top + 1;",
    "  stack[top] = value;",
    "  return 'Success';",
    "}"
  ],
  pop: [
    "function pop() {",
    "  if (top === -1) {",
    "    return 'Stack Underflow';",
    "  }",
    "  value = stack[top];",
    "  stack[top] = null;",
    "  top = top - 1;",
    "  return value;",
    "}"
  ],
  peek: [
    "function peek() {",
    "  if (top === -1) {",
    "    return 'Stack Underflow';",
    "  }",
    "  return stack[top];",
    "}"
  ],
  isEmpty: [
    "function isEmpty() {",
    "  return top === -1;",
    "}"
  ],
  isFull: [
    "function isFull() {",
    "  return top === maxSize - 1;",
    "}"
  ]
};

export default function SimulatorSection({ theme }: SimulatorSectionProps) {
  // Simulator configurations
  const [maxSize, setMaxSize] = useState<number>(5);
  const [stack, setStack] = useState<StackElement[]>([]);
  const [topIndex, setTopIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>('');
  
  // Custom statistics & tracking
  const [pushCount, setPushCount] = useState<number>(0);
  const [popCount, setPopCount] = useState<number>(0);
  const [peekCount, setPeekCount] = useState<number>(0);
  const [execTime, setExecTime] = useState<string>('0.00ms');
  const [animationSpeed, setAnimationSpeed] = useState<number>(1000); // ms per step
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Execution state & animations
  const [activeCodeBlock, setActiveCodeBlock] = useState<'push' | 'pop' | 'peek' | 'isEmpty' | 'isFull'>('push');
  const [highlightLine, setHighlightLine] = useState<number>(-1);
  const [stepsLog, setStepsLog] = useState<{ id: string; text: string; type: 'info' | 'success' | 'warning' | 'step' }[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Tutorial Mode State
  const [tutorialStep, setTutorialStep] = useState<number>(-1);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);

  // Audio Context Ref for synthesizers
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Helper: show transient toast notification
  const triggerToast = (text: string, type: 'success' | 'error' | 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(prev => prev?.text === text ? null : prev);
    }, 4000);
  };

  // Sound Synthesizer via Web Audio API
  const playSound = (type: 'push' | 'pop' | 'error' | 'success' | 'peek') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'push') {
        // High rising pitch slide
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'pop') {
        // Lower falling pitch slide
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(550, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'peek') {
        // Neutral dual beep
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'error') {
        // Low buzzy error warning sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'success') {
        // Happy high chord
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (err) {
      console.warn("Web Audio playing failed", err);
    }
  };

  // Handle stack capacity adjustments
  const handleSizeChange = (newSize: number) => {
    if (isAnimating) return;
    if (newSize < 2 || newSize > 10) {
      triggerToast("Stack size must be between 2 and 10", "error");
      return;
    }
    setMaxSize(newSize);
    setStack([]);
    setTopIndex(-1);
    setStepsLog([{ id: 'init', text: `Stack initialized with maximum capacity = ${newSize}.`, type: 'info' }]);
    triggerToast(`Capacity resized to ${newSize} elements`, "info");
  };

  // Custom step-by-step helper with animation delays
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Add step helper to execution log panel
  const logStep = (text: string, type: 'info' | 'success' | 'warning' | 'step') => {
    setStepsLog(prev => [...prev, { id: Math.random().toString(), text, type }]);
  };

  // PUSH Action Implementation
  const runPush = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnimating) return;
    
    const value = inputValue.trim();
    if (!value) {
      triggerToast("Please enter a valid element value", "error");
      playSound('error');
      return;
    }

    setIsAnimating(true);
    setActiveCodeBlock('push');
    setStepsLog([]);
    const startTime = performance.now();

    // Step 1: Check Overflow
    setHighlightLine(1);
    logStep("Step 1: Evaluating Stack capacity constraints...", "step");
    await sleep(animationSpeed);

    if (topIndex === maxSize - 1) {
      setHighlightLine(2);
      logStep("CRITICAL WARNING: Stack Overflow triggered! (top == maxSize - 1)", "warning");
      playSound('error');
      triggerToast("Stack Overflow! Cannot insert more elements.", "error");
      await sleep(animationSpeed);
      setHighlightLine(-1);
      setIsAnimating(false);
      const endTime = performance.now();
      setExecTime(`${(endTime - startTime).toFixed(2)}ms`);
      return;
    }

    // Step 2: Increment Top
    setHighlightLine(4);
    logStep(`Incrementing Top pointer index tracker... [Old Top: ${topIndex}, New Top: ${topIndex + 1}]`, "step");
    playSound('peek');
    const newTop = topIndex + 1;
    await sleep(animationSpeed);

    // Step 3: Write element to top index
    setHighlightLine(5);
    logStep(`Inserting element "${value}" at memory index ${newTop}...`, "step");
    playSound('push');

    const newElement: StackElement = {
      id: Math.random().toString(),
      value: value,
      isNew: true
    };

    setStack(prev => {
      const next = [...prev];
      next[newTop] = newElement;
      return next;
    });
    setTopIndex(newTop);
    setPushCount(p => p + 1);
    await sleep(animationSpeed);

    // Step 4: Complete
    setHighlightLine(6);
    logStep(`Success! Element "${value}" pushed successfully into the Stack.`, "success");
    playSound('success');
    setInputValue('');
    await sleep(animationSpeed);

    // clear helper highlight
    setStack(prev => prev.map(el => el ? { ...el, isNew: false } : el));
    setHighlightLine(-1);
    setIsAnimating(false);

    const endTime = performance.now();
    setExecTime(`${(endTime - startTime).toFixed(2)}ms`);
  };

  // POP Action Implementation
  const runPop = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveCodeBlock('pop');
    setStepsLog([]);
    const startTime = performance.now();

    // Step 1: Check Underflow
    setHighlightLine(1);
    logStep("Step 1: Check for Underflow (if stack contains items)...", "step");
    await sleep(animationSpeed);

    if (topIndex === -1) {
      setHighlightLine(2);
      logStep("CRITICAL WARNING: Stack Underflow triggered! (top == -1)", "warning");
      playSound('error');
      triggerToast("Stack Underflow! Stack is empty.", "error");
      await sleep(animationSpeed);
      setHighlightLine(-1);
      setIsAnimating(false);
      const endTime = performance.now();
      setExecTime(`${(endTime - startTime).toFixed(2)}ms`);
      return;
    }

    // Step 2: Retrieve Top item
    setHighlightLine(4);
    const elementToPop = stack[topIndex];
    logStep(`Fetching top element value: "${elementToPop.value}" at position ${topIndex}...`, "step");
    playSound('peek');
    
    // Set popping animation status
    setStack(prev => prev.map((el, i) => i === topIndex ? { ...el, isPopping: true } : el));
    await sleep(animationSpeed);

    // Step 3: Remove and nullify
    setHighlightLine(5);
    logStep(`Deleting index value and decrementing Top pointer...`, "step");
    playSound('pop');

    const poppedVal = elementToPop.value;
    const newTop = topIndex - 1;

    setStack(prev => {
      const next = [...prev];
      // remove the item
      next.splice(topIndex, 1);
      return next;
    });
    setTopIndex(newTop);
    setPopCount(p => p + 1);
    await sleep(animationSpeed);

    // Step 4: Finished
    setHighlightLine(7);
    logStep(`Success! Removed and popped "${poppedVal}" from the Stack.`, "success");
    playSound('success');
    triggerToast(`Popped element: ${poppedVal}`, "success");
    await sleep(animationSpeed);

    setHighlightLine(-1);
    setIsAnimating(false);

    const endTime = performance.now();
    setExecTime(`${(endTime - startTime).toFixed(2)}ms`);
  };

  // PEEK Action Implementation
  const runPeek = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveCodeBlock('peek');
    setStepsLog([]);
    const startTime = performance.now();

    // Step 1: Check underflow
    setHighlightLine(1);
    logStep("Step 1: Check for empty stack bounds...", "step");
    await sleep(animationSpeed);

    if (topIndex === -1) {
      setHighlightLine(2);
      logStep("WARNING: Stack is empty! Peek operation cancelled.", "warning");
      playSound('error');
      triggerToast("Underflow: Stack is empty.", "error");
      await sleep(animationSpeed);
      setHighlightLine(-1);
      setIsAnimating(false);
      const endTime = performance.now();
      setExecTime(`${(endTime - startTime).toFixed(2)}ms`);
      return;
    }

    // Step 2: Highlight top element
    setHighlightLine(4);
    logStep(`Inspecting top memory element value at index ${topIndex}...`, "step");
    playSound('peek');

    setStack(prev => prev.map((el, i) => i === topIndex ? { ...el, isPeeked: true } : el));
    await sleep(animationSpeed);

    const peekValue = stack[topIndex].value;
    logStep(`Top element detected: "${peekValue}"`, "success");
    playSound('success');
    triggerToast(`Top element: ${peekValue}`, "success");
    setPeekCount(p => p + 1);
    await sleep(animationSpeed);

    // Clear peek status
    setStack(prev => prev.map(el => el ? { ...el, isPeeked: false } : el));
    setHighlightLine(-1);
    setIsAnimating(false);

    const endTime = performance.now();
    setExecTime(`${(endTime - startTime).toFixed(2)}ms`);
  };

  // isEmpty Action Implementation
  const runIsEmpty = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveCodeBlock('isEmpty');
    setStepsLog([]);
    const startTime = performance.now();

    setHighlightLine(1);
    logStep("Evaluating if Stack is empty (checking condition top == -1)...", "step");
    playSound('peek');
    await sleep(animationSpeed);

    const empty = topIndex === -1;
    logStep(`Evaluation output: isEmpty() = ${empty ? 'TRUE' : 'FALSE'}`, empty ? 'success' : 'info');
    playSound('success');
    triggerToast(`isEmpty() = ${empty ? 'True (Empty)' : 'False'}`, "info");
    await sleep(animationSpeed);

    setHighlightLine(-1);
    setIsAnimating(false);
    const endTime = performance.now();
    setExecTime(`${(endTime - startTime).toFixed(2)}ms`);
  };

  // isFull Action Implementation
  const runIsFull = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveCodeBlock('isFull');
    setStepsLog([]);
    const startTime = performance.now();

    setHighlightLine(1);
    logStep(`Evaluating if Stack is full (top == maxSize - 1 [${topIndex} == ${maxSize - 1}])...`, "step");
    playSound('peek');
    await sleep(animationSpeed);

    const full = topIndex === maxSize - 1;
    logStep(`Evaluation output: isFull() = ${full ? 'TRUE' : 'FALSE'}`, full ? 'success' : 'info');
    playSound('success');
    triggerToast(`isFull() = ${full ? 'True (Full)' : 'False'}`, "info");
    await sleep(animationSpeed);

    setHighlightLine(-1);
    setIsAnimating(false);
    const endTime = performance.now();
    setExecTime(`${(endTime - startTime).toFixed(2)}ms`);
  };

  // Clear & reset everything
  const runReset = () => {
    if (isAnimating) return;
    setStack([]);
    setTopIndex(-1);
    setPushCount(0);
    setPopCount(0);
    setPeekCount(0);
    setHighlightLine(-1);
    setStepsLog([{ id: 'reset', text: "Stack cleared and pointers reset.", type: 'info' }]);
    triggerToast("Stack fully reset", "info");
    playSound('pop');
  };

  // Push some random items instantly for demonstration
  const handleRandomPush = () => {
    if (topIndex === maxSize - 1 || isAnimating) return;
    const randomItems = ['25', '42', '12', '99', '57', '84', '30'];
    const randomVal = randomItems[Math.floor(Math.random() * randomItems.length)];
    setInputValue(randomVal);
    // trigger push
    setTimeout(() => {
      document.getElementById('push-button')?.click();
    }, 50);
  };

  // EXPORT STACK AS JSON
  const exportStackState = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        maxSize,
        elements: stack.map(el => el?.value || null),
        topIndex,
        counters: { pushCount, popCount, peekCount }
      }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `stack_state_${maxSize}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast("Stack exported successfully as JSON!", "success");
  };

  // IMPORT STACK STATE FROM JSON
  const handleJsonImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = e.target.files?.[0];
    if (!file) return;

    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (typeof parsed.maxSize === 'number' && Array.isArray(parsed.elements)) {
          setMaxSize(parsed.maxSize);
          const newElements = parsed.elements.map((val: any) => ({
            id: Math.random().toString(),
            value: String(val)
          }));
          setStack(newElements);
          setTopIndex(parsed.topIndex ?? newElements.length - 1);
          if (parsed.counters) {
            setPushCount(parsed.counters.pushCount || 0);
            setPopCount(parsed.counters.popCount || 0);
            setPeekCount(parsed.counters.peekCount || 0);
          }
          triggerToast("Stack state imported successfully!", "success");
          playSound('success');
        } else {
          throw new Error("Invalid schema");
        }
      } catch (err) {
        triggerToast("Failed to parse JSON file schema", "error");
        playSound('error');
      }
    };
  };

  // Tutorial Steps
  const tutorialSteps = [
    {
      title: "Welcome to DS Stack Simulator!",
      content: "This is a virtual laboratory designed to teach you Stacks interactively. Let's do a quick tour of key modules."
    },
    {
      title: "Set Your Capacity",
      content: "Adjust the maximum stack size using the '+' and '-' size controllers. This creates the empty vertical slot layout below."
    },
    {
      title: "Perform Push / Pop / Peek",
      content: "Enter a number, string, or click 'Random', then click Push. Watch the visual block fly in, and the moving 'Top' arrow point directly to it!"
    },
    {
      title: "Synchronized Code Tracing",
      content: "The algorithm code on the right automatically highlights lines as they execute, letting you link theory with physical step-by-step logs."
    },
    {
      title: "Speed and Sounds",
      content: "Slow down animations using the slider, toggle bleep-bloop Audio synthesizers, and click Export to save your stack as a JSON schema!"
    }
  ];

  const handleNextTutorial = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(s => s + 1);
    } else {
      setTutorialStep(-1);
      setIsTutorialOpen(false);
    }
  };

  const cardBgClass = theme === 'dark' ? 'glass-card' : 'glass-card-light shadow-md';
  const textTitleClass = theme === 'dark' ? 'text-white' : 'text-slate-800';
  const textSubClass = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <section id="simulator" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl z-50 text-sm font-semibold flex items-center space-x-2 border ${
              toastMessage.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : toastMessage.type === 'error'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-purple-500/10 border-purple-500/30 text-purple-400'
            }`}
          >
            <Sparkles className="h-4 w-4 animate-spin" />
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tutorial Overlay Card */}
      {isTutorialOpen && tutorialStep >= 0 && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`max-w-md w-full p-6 rounded-2xl ${
              theme === 'dark' ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-800'
            } shadow-2xl space-y-4`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-purple-500 uppercase">
                Tutorial Step {tutorialStep + 1} of {tutorialSteps.length}
              </span>
              <button 
                onClick={() => { setIsTutorialOpen(false); setTutorialStep(-1); }}
                className="text-slate-400 hover:text-white text-sm cursor-pointer"
              >
                ✕ Skip
              </button>
            </div>
            <h4 className="text-lg font-bold">{tutorialSteps[tutorialStep].title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{tutorialSteps[tutorialStep].content}</p>
            <div className="flex justify-end">
              <button
                onClick={handleNextTutorial}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                {tutorialStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next →'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Interactive <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Simulator</span> & Code Engine
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-500">
          Set your capacity limit, execute stack operations, and trace underlying memory structures in absolute synchronicity.
        </p>
        
        {/* Tutorial Starter button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => { setIsTutorialOpen(true); setTutorialStep(0); }}
            className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Info className="h-4 w-4" />
            <span>How does this Simulator work?</span>
          </button>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN (Control Console + Visualization) - 8/12 cols */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Controls console */}
          <div className={`p-6 rounded-2xl ${cardBgClass} space-y-6`}>
            
            {/* Top row controls: Size adjust, Audio, Import/Export */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/60 pb-5">
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-semibold ${textTitleClass}`}>Max Stack Capacity:</span>
                <div className="flex items-center bg-slate-900/50 rounded-lg p-1 border border-slate-800">
                  <button
                    onClick={() => handleSizeChange(maxSize - 1)}
                    disabled={isAnimating || maxSize <= 2}
                    className="p-1 px-2.5 text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-mono text-purple-400 font-bold">{maxSize}</span>
                  <button
                    onClick={() => handleSizeChange(maxSize + 1)}
                    disabled={isAnimating || maxSize >= 10}
                    className="p-1 px-2.5 text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Extras toggles */}
              <div className="flex items-center space-x-2">
                
                {/* Audio synth toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer border ${
                    soundEnabled
                      ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                      : 'bg-slate-800/40 border-slate-700/30 text-slate-500'
                  }`}
                  title={soundEnabled ? "Mute sound effects" : "Enable laboratory bleep/bloop synthesis"}
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>

                {/* Import State file */}
                <label className="p-2 rounded-lg border bg-slate-800/40 border-slate-700/30 text-slate-400 hover:text-white cursor-pointer flex items-center" title="Import stack JSON state file">
                  <Upload className="h-4 w-4" />
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleJsonImport}
                    className="hidden"
                  />
                </label>

                {/* Export State file */}
                <button
                  onClick={exportStackState}
                  className="p-2 rounded-lg border bg-slate-800/40 border-slate-700/30 text-slate-400 hover:text-white cursor-pointer"
                  title="Export current stack to JSON file"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Middle row: Push, Pop, Peek, display indicators */}
            <form onSubmit={runPush} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  maxLength={10}
                  value={inputValue}
                  disabled={isAnimating}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value (e.g. 25, HELLO)"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 text-sm disabled:opacity-50"
                />
                
                <button
                  type="button"
                  onClick={handleRandomPush}
                  disabled={isAnimating || topIndex === maxSize - 1}
                  className="px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs rounded-xl font-bold flex items-center cursor-pointer transition-colors"
                >
                  Random
                </button>
              </div>

              {/* Action buttons list */}
              <div className="flex flex-wrap gap-2">
                <button
                  id="push-button"
                  type="submit"
                  disabled={isAnimating}
                  className="flex-1 min-w-[80px] py-3 bg-gradient-to-r from-blue-500 to-purple-600 disabled:opacity-50 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer transition-all"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Push</span>
                </button>

                <button
                  type="button"
                  onClick={runPop}
                  disabled={isAnimating}
                  className="flex-1 min-w-[80px] py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Pop</span>
                </button>

                <button
                  type="button"
                  onClick={runPeek}
                  disabled={isAnimating}
                  className="flex-1 min-w-[80px] py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Peek</span>
                </button>
              </div>
            </form>

            {/* Bottom Row Actions: isEmpty, isFull, Reset */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800/40">
              <button
                type="button"
                onClick={runIsEmpty}
                disabled={isAnimating}
                className="px-3.5 py-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700/30 disabled:opacity-40 cursor-pointer"
              >
                isEmpty()
              </button>
              <button
                type="button"
                onClick={runIsFull}
                disabled={isAnimating}
                className="px-3.5 py-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700/30 disabled:opacity-40 cursor-pointer"
              >
                isFull()
              </button>
              <button
                type="button"
                onClick={runReset}
                disabled={isAnimating}
                className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/25 disabled:opacity-40 ml-auto cursor-pointer flex items-center space-x-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Stack</span>
              </button>
            </div>
          </div>

          {/* Graphical Visualization Area */}
          <div className={`p-8 rounded-2xl ${cardBgClass} flex flex-col md:flex-row gap-8 relative overflow-hidden`}>
            
            {/* Visual pointers/arrow column (left/side in md view) */}
            <div className="flex-1 flex flex-col justify-center items-center relative min-h-[300px] border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800/60 pb-6 md:pb-0 md:pr-6">
              
              {/* Vertical outer frame representing physical memory slots of maxSize */}
              <div className="w-full max-w-[200px] flex flex-col-reverse justify-start border-4 border-slate-600 rounded-b-2xl border-t-0 p-2 space-y-2 relative min-h-[280px]">
                
                {/* Pointer pointer markers on the left of the container */}
                <div className="absolute -left-12 bottom-0 top-0 w-8 flex flex-col-reverse justify-start py-2 space-y-2 select-none">
                  {Array.from({ length: maxSize }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-12 flex items-center justify-end pr-2 text-[10px] font-mono text-slate-500"
                    >
                      <span>[{idx}]</span>
                    </div>
                  ))}
                </div>

                {/* Moving Arrow Marker */}
                <AnimatePresence>
                  {topIndex >= 0 && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -left-20 flex items-center space-x-1"
                      style={{
                        // calculate offset dynamically
                        bottom: `${topIndex * 56 + 18}px`
                      }}
                    >
                      <span className="text-xs font-mono font-bold text-purple-500">TOP</span>
                      <ArrowRight className="h-4 w-4 text-purple-500 animate-pulse-ring rounded-full p-0.5" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* If empty state background label */}
                {topIndex === -1 && (
                  <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider italic">
                      Empty Stack Slot
                    </span>
                  </div>
                )}

                {/* Loop elements up to maxSize */}
                {Array.from({ length: maxSize }).map((_, idx) => {
                  const element = stack[idx];
                  
                  // Empty container visualizer slot
                  if (!element) {
                    return (
                      <div
                        key={`empty-${idx}`}
                        className="w-full h-12 border border-dashed border-slate-300 dark:border-slate-800 rounded-lg flex items-center justify-center opacity-40 select-none"
                      >
                        <span className="text-[10px] font-mono text-slate-600">null</span>
                      </div>
                    );
                  }

                  // Render block with beautiful dynamic CSS statuses
                  let blockStyle = 'from-purple-500 to-indigo-600 border-purple-500 text-white';
                  if (element.isNew) {
                    blockStyle = 'from-emerald-500 to-teal-600 border-emerald-400 text-white shadow-lg ring-2 ring-emerald-500/20';
                  } else if (element.isPopping) {
                    blockStyle = 'from-rose-500 to-pink-600 border-rose-500 text-white scale-95 opacity-50';
                  } else if (element.isPeeked) {
                    blockStyle = 'from-amber-400 to-orange-500 border-amber-300 text-slate-900 shadow-xl ring-4 ring-amber-500/40';
                  }

                  return (
                    <motion.div
                      key={element.id}
                      initial={{ scale: 0.8, opacity: 0, y: -20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.7, opacity: 0, y: 40 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className={`w-full h-12 bg-gradient-to-tr border rounded-xl flex items-center justify-center font-bold shadow-md relative ${blockStyle}`}
                    >
                      <span className="truncate px-2 text-sm">{element.value}</span>
                      
                      {/* Flag labels inside the items */}
                      {idx === topIndex && (
                        <span className="absolute right-2 top-1 text-[8px] font-mono font-bold bg-white/20 px-1 rounded uppercase">
                          TOP
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom text explanation */}
              <div className="mt-4 text-center">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">
                  {topIndex === -1 ? 'Empty (underflow bounds)' : `Top Index Position: ${topIndex}`}
                </span>
              </div>
            </div>

            {/* Step-by-Step execution history block */}
            <div className="flex-1 flex flex-col justify-between min-h-[300px]">
              <div className="space-y-4">
                <h4 className={`text-sm font-bold uppercase tracking-wider text-purple-500 dark:text-purple-400 flex items-center space-x-1.5`}>
                  <Activity className="h-4 w-4" />
                  <span>Real-time Step Logs</span>
                </h4>

                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/60 font-mono text-xs space-y-2 h-[220px] overflow-y-auto">
                  {stepsLog.length === 0 ? (
                    <span className="text-slate-500 italic block">Ready. Execute an operation to inspect execution cycles...</span>
                  ) : (
                    stepsLog.map((log) => {
                      let logColor = 'text-slate-300';
                      if (log.type === 'success') logColor = 'text-emerald-400 font-bold';
                      else if (log.type === 'warning') logColor = 'text-rose-400 font-extrabold';
                      else if (log.type === 'step') logColor = 'text-purple-300';

                      return (
                        <div key={log.id} className="leading-relaxed border-b border-slate-800/30 pb-1.5">
                          {log.type === 'step' && <span className="text-purple-500 font-bold">▶ </span>}
                          {log.type === 'warning' && <span className="text-rose-500 font-bold">⚠ </span>}
                          {log.type === 'success' && <span className="text-emerald-500 font-bold">✔ </span>}
                          <span className={logColor}>{log.text}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Simulator Metrics Dashboard footer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-200 dark:border-slate-800/40 text-center select-none">
                <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-800/60">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Push Ops</span>
                  <span className={`text-sm font-mono font-bold ${textTitleClass}`}>{pushCount}</span>
                </div>
                <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-800/60">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Pop Ops</span>
                  <span className={`text-sm font-mono font-bold ${textTitleClass}`}>{popCount}</span>
                </div>
                <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-800/60">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Peek Ops</span>
                  <span className={`text-sm font-mono font-bold ${textTitleClass}`}>{peekCount}</span>
                </div>
                <div className="bg-slate-800/30 p-2 rounded-lg border border-slate-800/60">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Exec Time</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">{execTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Algorithm Pseudocode + Speed slider) - 4/12 cols */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Animation Delay Controls panel */}
          <div className={`p-6 rounded-2xl ${cardBgClass} space-y-4`}>
            <h4 className={`text-sm font-bold uppercase tracking-wider text-purple-500 dark:text-purple-400 flex items-center space-x-1.5`}>
              <Sliders className="h-4 w-4" />
              <span>Speed & Timing Control</span>
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-slate-500">
                <span>Fast</span>
                <span>Normal</span>
                <span>Debug Slow</span>
              </div>
              <input
                type="range"
                min="300"
                max="2500"
                step="100"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="w-full h-1 bg-purple-500 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs font-mono text-purple-400">
                <span>Interval:</span>
                <span>{(animationSpeed / 1000).toFixed(1)}s per step</span>
              </div>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className={`p-6 rounded-2xl ${cardBgClass} space-y-4 relative overflow-hidden`}>
            <div className="flex justify-between items-center">
              <h4 className={`text-sm font-bold uppercase tracking-wider text-purple-500 dark:text-purple-400`}>
                Algorithm Tracing
              </h4>
              <span className="text-[10px] font-mono bg-purple-500/10 px-2 py-0.5 rounded text-purple-400 uppercase tracking-wider font-bold">
                {activeCodeBlock}
              </span>
            </div>

            {/* Pseudo Code Viewer */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-900/80 font-mono text-xs overflow-x-auto min-h-[190px]">
              {pseudoCodes[activeCodeBlock].map((line, index) => {
                const isActive = highlightLine === index;
                return (
                  <div
                    key={index}
                    className={`px-2 py-1 rounded transition-colors whitespace-pre ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-300 border-l-2 border-purple-500 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    <span className="inline-block w-4 text-slate-600 text-[10px] select-none text-right mr-3">{index + 1}</span>
                    <span>{line}</span>
                  </div>
                );
              })}
            </div>

            {/* Interactive algorithm tabs */}
            <div className="grid grid-cols-2 gap-1.5 pt-2 select-none">
              {(['push', 'pop', 'peek', 'isEmpty', 'isFull'] as const).map((block) => (
                <button
                  key={block}
                  onClick={() => {
                    if (isAnimating) return;
                    setActiveCodeBlock(block);
                    setHighlightLine(-1);
                  }}
                  className={`px-2 py-1.5 rounded-lg text-[10px] font-mono border transition-colors cursor-pointer ${
                    activeCodeBlock === block
                      ? theme === 'dark'
                        ? 'bg-purple-500/15 border-purple-500/50 text-purple-300'
                        : 'bg-purple-100 border-purple-300 text-purple-800 font-semibold'
                      : theme === 'dark'
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500 hover:text-slate-300'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {block}()
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
