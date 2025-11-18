// Traditional function declaration
function add(a, b) {
    return a + b;
}

// Arrow function equivalent
const addArrow = (a, b) => {
    return a + b;
};

// Arrow function with implicit return (for single expressions)
const addArrowImplicit = (a, b) => a + b;

console.log('Traditional function:', add(2, 3));
console.log('Arrow function:', addArrow(2, 3));
console.log('Implicit return arrow function:', addArrowImplicit(2, 3));

// Function with default parameters
const greet = (name = 'Guest') => `Hello, ${name}!`;

console.log(greet());
console.log(greet('Alice'));

// Higher-order function example
const applyOperation = (x, y, operation) => operation(x, y);

console.log('Apply operation (add):', applyOperation(5, 3, add));
console.log(
    'Apply operation (multiply):',
    applyOperation(5, 3, (a, b) => a * b)
);

function pow(base, exponent) {
    let result = 1;
    for (let i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}

const result = ((base, exponent) => {
    let result = 1;
    for (let i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
})(2, 8);

const myfunc = (x, y) => {
    const sum = x + y;
    return `The sum is ${sum}`;
};

// Immediately Invoked Function Expression (IIFE)
const result = myfunc(5, 7);

console.log('IIFE result:', result); // or we could just run this directly (e.g. <head> script)

/**
 * Advanced function concepts — interesting but not required.
 * Ask me about these in OH if you are curious.
 */

// Currying example
// Currying is the technique of converting a function that takes multiple arguments
// into a sequence of functions that each take a single argument

// Traditional curried function
function multiply(a) {
    return function(b) {
        return a * b;
    };
}

// Arrow function curried equivalent
const multiplyArrow = (a) => (b) => a * b;

console.log('Curried multiply:', multiply(3)(4));
console.log('Curried multiply with arrow:', multiplyArrow(3)(4));

// Practical currying example: Creating specialized functions
const addTax = (taxRate) => (price) => price * (1 + taxRate);

const addNYTax = addTax(0.08875); // New York City tax rate
const addCATax = addTax(0.0725); // California tax rate 😎 (still high)

console.log('Price with NY tax:', addNYTax(100).toFixed(2));
console.log('Price with CA tax:', addCATax(100).toFixed(2));

// Closure example
const createCounter = () => {
    let count = 0;
    return () => {
        count++;
        return count;
    };
};

const counter = createCounter();
console.log('Counter:', counter()); // 1 🤯
console.log('Counter:', counter()); // 2 🤯🤯
console.log('Counter:', counter()); // 3 🤯🤯🤯
