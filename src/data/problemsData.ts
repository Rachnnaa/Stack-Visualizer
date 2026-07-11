import { PracticeProblem } from '../types';

export const practiceProblems: PracticeProblem[] = [
  {
    id: 1,
    title: "Reverse a String using Stack",
    difficulty: "Easy",
    description: "Write an algorithm to reverse a given string using the LIFO properties of a Stack. For example, if the input is 'HELLO', the output should be 'OLLEH'.",
    hint: "Push each character of the string onto the stack one by one. Once all characters are pushed, pop them off until the stack is empty to assemble the reversed string.",
    expectedOutput: "Input: 'STRUCTURE' -> Output: 'ERUTCURTS'",
    solution: `// Pseudo-code Solution
function reverseString(str) {
    let stack = new Stack();
    
    // Step 1: Push all characters onto stack
    for (let i = 0; i < str.length; i++) {
        stack.push(str[i]);
    }
    
    let reversedStr = "";
    
    // Step 2: Pop characters from stack and build result
    while (!stack.isEmpty()) {
        reversedStr += stack.pop();
    }
    
    return reversedStr;
}`
  },
  {
    id: 2,
    title: "Balanced Parentheses Checker",
    difficulty: "Medium",
    description: "Given an expression string containing brackets '(', ')', '{', '}', '[' and ']', check whether the brackets are balanced. An expression is balanced if open brackets are closed by the same type of brackets in correct order.",
    hint: "Iterate through the string. Push open brackets onto the stack. For a closing bracket, check if it matches the bracket type at the top of the stack. If it does, pop it. If there's a mismatch or the stack is empty, it's unbalanced.",
    expectedOutput: "Input: '{[()]}' -> Output: Balanced (True)\nInput: '{[(])}' -> Output: Unbalanced (False)",
    solution: `// Pseudo-code Solution
function isBalanced(expr) {
    let stack = new Stack();
    
    for (let i = 0; i < expr.length; i++) {
        let char = expr[i];
        
        if (char == '(' || char == '{' || char == '[') {
            stack.push(char);
        } else if (char == ')' || char == '}' || char == ']') {
            if (stack.isEmpty()) return false;
            
            let top = stack.pop();
            if (char == ')' && top != '(') return false;
            if (char == '}' && top != '{') return false;
            if (char == ']' && top != '[') return false;
        }
    }
    
    return stack.isEmpty(); // Balanced if stack is clean at the end
}`
  },
  {
    id: 3,
    title: "Infix to Postfix Conversion",
    difficulty: "Hard",
    description: "Convert a standard arithmetic infix expression (like 'A + B * C') into postfix expression ('A B C * +') using a stack. Follow operator precedence: '(' > '*', '/' > '+', '-'.",
    hint: "Use a stack to store operators. Push operators to the stack based on precedence rules. When a higher or equal precedence operator is on the stack, pop elements until the condition is cleared, then push the current operator. Operands go directly to the output string.",
    expectedOutput: "Input: 'A+B*(C^D-E)' -> Output: 'ABCD^E-*+'",
    solution: `// Pseudo-code Solution
function infixToPostfix(infix) {
    let stack = new Stack();
    let result = "";
    
    function precedence(op) {
        if (op == '+' || op == '-') return 1;
        if (op == '*' || op == '/') return 2;
        if (op == '^') return 3;
        return 0;
    }

    for (let i = 0; i < infix.length; i++) {
        let char = infix[i];

        // If operand, add to result
        if (isAlphaNumeric(char)) {
            result += char;
        } 
        // If '(', push
        else if (char == '(') {
            stack.push(char);
        } 
        // If ')', pop until '(' is found
        else if (char == ')') {
            while (!stack.isEmpty() && stack.peek() != '(') {
                result += stack.pop();
            }
            stack.pop(); // remove '('
        } 
        // Operator scanned
        else {
            while (!stack.isEmpty() && precedence(char) <= precedence(stack.peek())) {
                result += stack.pop();
            }
            stack.push(char);
        }
    }

    while (!stack.isEmpty()) {
        result += stack.pop();
    }

    return result;
}`
  }
];
