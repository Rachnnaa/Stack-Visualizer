export interface MCQ {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export interface PracticeProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  hint: string;
  expectedOutput: string;
  solution: string; // pseudo-code or visual solution
}

export interface ApplicationCard {
  id: string;
  title: string;
  description: string;
  illustration: string; // keyword or custom representation
  realWorldExample: string;
}

export interface StackElement {
  id: string; // unique ID for animations
  value: string | number;
  isNew?: boolean;
  isPopping?: boolean;
  isPeeked?: boolean;
}

export type Theme = 'light' | 'dark';
