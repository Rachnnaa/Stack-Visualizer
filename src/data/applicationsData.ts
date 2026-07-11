import { ApplicationCard } from '../types';

export const stackApplications: ApplicationCard[] = [
  {
    id: "func-call",
    title: "Function Call Stack",
    description: "Keeps track of active subroutines, return addresses, and local variables during nested or recursive execution frames inside a computer program.",
    illustration: "Call Stack",
    realWorldExample: "Every programming language runtime (e.g., V8 Engine in JS, JVM in Java) maintains a call stack. If a function is called recursively without a base case, it crashes with a 'RangeError: Maximum call stack size exceeded'."
  },
  {
    id: "browser-hist",
    title: "Browser History (Back Button)",
    description: "Your web browser uses two stacks to track history. When you visit a new link, it pushes the page to the 'Back' stack. Clicking back pops it and pushes to the 'Forward' stack.",
    illustration: "Back/Forward Stack",
    realWorldExample: "Navigating from google.com -> wikipedia.org -> github.com. Clicking 'Back' returns you to wikipedia.org by popping github.com from the Back stack."
  },
  {
    id: "undo-redo",
    title: "Undo/Redo Mechanism",
    description: "Most document editors (like VS Code, MS Word, or Figma) save user actions on a stack. Performing 'Undo' pops the last action from the undo stack and plays its inverse, pushing to the redo stack.",
    illustration: "Undo/Redo Stack",
    realWorldExample: "Typing 'Hello', then 'World'. If you press 'Ctrl+Z', 'World' is popped from the undo stack, leaving only 'Hello' on the screen."
  },
  {
    id: "expr-eval",
    title: "Expression Evaluation",
    description: "Compilers and calculators utilize a stack to parse and compute values of complex mathematical expressions written in Infix, Postfix, or Prefix formats.",
    illustration: "Operator/Operand Stack",
    realWorldExample: "When a calculator parses '3 + 4 * 2', it pushes operands to one stack and operators to another to enforce standard BODMAS precedence rules without parentheses errors."
  },
  {
    id: "paren-match",
    title: "Parentheses Matching",
    description: "A vital compiler parsing task. It reads brackets dynamically to ensure code blocks, function calls, and algebraic expressions have symmetrical and correctly nested open and close delimiters.",
    illustration: "Bracket Validator",
    realWorldExample: "Integrated Development Editors (IDEs) highlighting a red squiggly line under an unmatched closing brace '}' inside your source code."
  },
  {
    id: "backtracking",
    title: "Backtracking Algorithms",
    description: "Allows a program to try multiple pathways (like solving a maze, Sudoku, or N-Queens problem) and return to the previous state (backtrack) immediately upon hitting a dead-end.",
    illustration: "Path History Stack",
    realWorldExample: "A maze-solving robot traversing coordinates. If it hits a wall, it pops its last step off the stack to backtrack and explore the alternative junction."
  },
  {
    id: "dfs",
    title: "Depth-First Search (DFS)",
    description: "A fundamental tree and graph traversal algorithm that explores as deep as possible along each branch before backtracking, naturally implemented using a stack.",
    illustration: "Visited Stack",
    realWorldExample: "Social networks discovering deep direct or indirect connections, or crawler search bots crawling subpages deeply before moving to parallel domain routes."
  }
];
