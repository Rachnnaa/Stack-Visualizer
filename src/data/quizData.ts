import { MCQ } from '../types';

export const quizQuestions: MCQ[] = [
  {
    id: 1,
    question: "What type of data structure is a Stack?",
    options: ["First In First Out (FIFO)", "Last In First Out (LIFO)", "First In Last Out (FILO)", "Both B and C"],
    correctAnswer: 3,
    explanation: "A stack operates on the LIFO (Last In First Out) principle, which is also sometimes referred to as FILO (First In Last Out)."
  },
  {
    id: 2,
    question: "Which of the following operations adds an element to the top of the stack?",
    options: ["Pop", "Push", "Peek", "Enqueue"],
    correctAnswer: 1,
    explanation: "The 'Push' operation is used to insert a new element onto the top of the stack."
  },
  {
    id: 3,
    question: "What condition occurs when one tries to push an element into a stack that is already full?",
    options: ["Stack Underflow", "Stack Overflow", "Stack Garbage", "Stack Out of Bounds"],
    correctAnswer: 1,
    explanation: "Stack Overflow occurs when you attempt to add an element to a stack that has reached its maximum defined capacity."
  },
  {
    id: 4,
    question: "What condition occurs when one tries to pop an element from an empty stack?",
    options: ["Stack Overflow", "Stack Underflow", "Null Pointer Exception", "Stack Empty Error"],
    correctAnswer: 1,
    explanation: "Stack Underflow occurs when an attempt is made to pop or remove an element from a stack that contains no elements (is empty)."
  },
  {
    id: 5,
    question: "What is the time complexity of the Push operation in an array-based stack implementation?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctAnswer: 0,
    explanation: "Inserting an element at the top of a stack (Push) takes constant time, O(1), because the index of the top element is tracked directly and updated in a single step."
  },
  {
    id: 6,
    question: "What is the function of the Peek() or Top() operation?",
    options: ["Removes the top element from the stack", "Inserts an element to the stack", "Retrieves the top element without removing it", "Clears the entire stack"],
    correctAnswer: 2,
    explanation: "The Peek() operation returns the value of the top element of the stack without removing it, leaving the stack unchanged."
  },
  {
    id: 7,
    question: "Which of the following is NOT a direct application of a Stack?",
    options: ["Undo/Redo mechanism in text editors", "Evaluating arithmetic expressions", "Browser history tracking (Back button)", "Level-Order traversal (BFS) of a binary tree"],
    correctAnswer: 3,
    explanation: "BFS (Breadth-First Search) or Level-Order traversal uses a Queue, while DFS (Depth-First Search) and pre-order/in-order traversals use a Stack."
  },
  {
    id: 8,
    question: "If we push the elements 'A', 'B', 'C' in that order into an empty stack, which element will be popped first?",
    options: ["A", "B", "C", "None of the above"],
    correctAnswer: 2,
    explanation: "Since the stack is a LIFO data structure, the last element pushed ('C') is at the top and will be the first one popped."
  },
  {
    id: 9,
    question: "How is the 'Top' pointer initialized in a 0-indexed array implementation of a stack when it is empty?",
    options: ["0", "1", "-1", "Null"],
    correctAnswer: 2,
    explanation: "In a 0-indexed array, 'Top' is typically initialized to -1. When the first element is pushed, 'Top' is incremented to 0, which points to the first array index."
  },
  {
    id: 10,
    question: "What is the time complexity to search for an element in a stack of size N?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 2,
    explanation: "Searching for an arbitrary element requires popping and inspecting up to all N elements in the worst case, resulting in O(n) time complexity."
  },
  {
    id: 11,
    question: "Which algorithm uses stack for backtracking?",
    options: ["Kruskal's algorithm", "Depth-First Search (DFS)", "Dijkstra's algorithm", "Prim's algorithm"],
    correctAnswer: 1,
    explanation: "Depth-First Search (DFS) uses a stack (either the system call stack or an explicit stack structure) to backtrack and visit adjacent unvisited nodes."
  },
  {
    id: 12,
    question: "What is the space complexity of a stack of capacity N?",
    options: ["O(1)", "O(n)", "O(n²)", "O(2^n)"],
    correctAnswer: 1,
    explanation: "The space complexity is O(n) since the memory allocated is directly proportional to the maximum capacity N of elements that the stack can hold."
  },
  {
    id: 13,
    question: "Which of the following notation types is evaluated directly using a single stack?",
    options: ["Infix", "Postfix (Reverse Polish Notation)", "Prefix", "Both B and C"],
    correctAnswer: 3,
    explanation: "Both Postfix (Reverse Polish) and Prefix expressions can be evaluated directly using a single stack by scanning operators and operands in a single pass."
  },
  {
    id: 14,
    question: "What happens in a function call stack when recursive calls are infinite?",
    options: ["The stack becomes empty", "Stack Overflow (Segment Fault)", "Stack Underflow", "None of the above"],
    correctAnswer: 1,
    explanation: "Infinite recursion adds nested function call frames to the call stack indefinitely until it runs out of memory, triggering a Stack Overflow."
  },
  {
    id: 15,
    question: "An expression '((A+B)*C' is checked for balanced parentheses using a stack. What will be the state of the stack when scanning is complete?",
    options: ["Empty", "Contains one '('", "Contains one ')'", "Contains 'A+B'"],
    correctAnswer: 1,
    explanation: "Scanning matches each ')' with a popped '(' from the stack. Here, we push two '(' and find only one ')', leaving one '(' unmatched on the stack."
  },
  {
    id: 16,
    question: "Can a stack be implemented using a linked list? If so, where are elements pushed and popped?",
    options: ["No, stacks must be contiguous array blocks", "Yes, at the tail/end of the linked list", "Yes, at the head/beginning of the linked list", "Yes, at arbitrary positions"],
    correctAnswer: 2,
    explanation: "Yes, a stack can be implemented with a linked list. Pushing and popping are performed at the head of the linked list to maintain O(1) time complexity."
  },
  {
    id: 17,
    question: "If a stack size is 4, and we perform: Push(10), Push(20), Pop(), Push(30), Push(40), Pop(), Push(50). What is the current Top element?",
    options: ["50", "40", "30", "20"],
    correctAnswer: 0,
    explanation: "Trace: Push(10) -> [10]; Push(20) -> [10, 20]; Pop() -> [10] (20 removed); Push(30) -> [10, 30]; Push(40) -> [10, 30, 40]; Pop() -> [10, 30] (40 removed); Push(50) -> [10, 30, 50]. Top is 50."
  },
  {
    id: 18,
    question: "Which of the following real-world systems behaves exactly like a stack?",
    options: ["A queue of people at a checkout counter", "A stack of plates in a cafeteria buffet", "A playlist playing in sequential shuffle mode", "Files being transferred over a network"],
    correctAnswer: 1,
    explanation: "A stack of plates represents a LIFO system: clean plates are added (pushed) to the top, and diners take (pop) plates off the top."
  },
  {
    id: 19,
    question: "What is the time complexity of the isEmpty() operation?",
    options: ["O(1)", "O(n)", "O(log n)", "O(c)"],
    correctAnswer: 0,
    explanation: "Checking whether a stack is empty requires a simple constant-time comparison (e.g., top == -1), which runs in O(1) time."
  },
  {
    id: 20,
    question: "In standard notation, which of the following represents infix evaluation converted to postfix: A + B * C?",
    options: ["A B C * +", "A B + C *", "+ A * B C", "A B * C +"],
    correctAnswer: 0,
    explanation: "Due to operator precedence, multiplication is evaluated first. A + (B * C) becomes A + (B C *) which converts to the postfix string 'A B C * +'."
  }
];
