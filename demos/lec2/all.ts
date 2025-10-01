// 1. Basic Types and Variables
let age: number = 25;            // number type
let firstName: string = 'Chris';       // string type
let isStudent: boolean = true;    // boolean type

// Union type allows variable to be one of multiple types
const addressLine: string | number | undefined = '123'; // or 123

// 2. Arrays and Tuples
// Array of numbers
let scores: number[] = [85, 90, 78];

// Tuple allows mixed types in a fixed-length array
let person: [string, number] = ['Bob', 30];

// 3. Functions
// Function with parameters and return type
function greet(userName: string): string {
    return `Hello, ${userName}`;
}

// Arrow function with inferred return type. Try hovering!
const multiply = (a: number, b: number) => a * b;

console.log(greet(firstName));  // Outputs: Hello, Chris
console.log(multiply(5, 4));  // Outputs: 20

// 4. Objects and Interfaces
// Defining a custom object shape using a type
type Car = {
    brand: string;
    model: string;
    year: number;
};

// NOTE: interfaces are kind of similar as well and actually preferred.

// Object adhering to Car type
const myCar: Car = {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020
};

console.log(`My car is a ${myCar.year} ${myCar.brand} ${myCar.model}`);

// 5. Union and Intersection Types
// Union type: A variable can be of one of two types
type Circle = { radius: number; };
type Rectangle = { length: number, width: number; };

// Intersection: Combining two types to create a new one
type Shape = Circle | Rectangle;

// Function with type guards to handle different shapes
const getArea = (shape: Shape): number => {
    if ('radius' in shape) {   // Narrowing to Circle type. Since everything stripped after compilation!
        return Math.PI * shape.radius ** 2;
    } else {                   // Narrowing to Rectangle type
        return shape.length * shape.width;
    }
};

console.log(getArea({ radius: 10 }));  // Outputs: 314.16 (Circle area)
console.log(getArea({ length: 5, width: 7 }));  // Outputs: 35 (Rectangle area)

// 6. Optional and Default Parameters
// Function with optional and default parameters
const introduce = (userName: string, github: string = 'no-github'): string =>
    github ? `Hi, I'm ${userName}. My GitHub is @${github}` : `Hi, I'm ${userName} and I have no GitHub 😢 .`;

console.log(introduce('Savannah'));  // Outputs: Hi, I'm Savannah. My GitHub is @no-github
console.log(introduce('Simon', 'Destaq'));  // Outputs: Hi, I'm Simon. My GitHub is @Destaq

// 7. Type Assertions
// TypeScript infers the type of "something" as unknown
let something: unknown = 'This is a string';

// We can use type assertion to inform TypeScript of the actual type.
// ERROR if we don't use type assertion.
let strLength: number = (something as string).length;

console.log(`Length of string: ${strLength}`);  // Outputs: 16

// What if we use any?
let anotherSomething: any = 'This is a string';
let anotherStrLength: number = anotherSomething.length; // any on hover

// 8. Generics
// Generic function that works with any type
const echo = <T>(arg: T): T => arg;

console.log(echo<string>('Hello!'));  // Outputs: Hello!
console.log(echo<number>(123));  // Outputs: 123

// 9. Enums
// Enum to define a set of named constants
enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue'
}

// Using the enum to set a variable
let favoriteColor: Color = Color.Green;
console.log(`My favorite color is ${favoriteColor}`);  // Outputs: My favorite color is green

// 10. Nullish Coalescing and Optional Chaining
// Nullish coalescing operator (??) provides a default value when the value is null or undefined
let userAddress: string | null = null;
let displayAddress: string = userAddress ?? 'No address provided';
console.log(displayAddress);  // Outputs: No address provided

// Optional chaining (?.) allows safe access to properties on potentially null or undefined objects
let userProfile: { location?: { city: string; }; } = {};
console.log(userProfile?.location?.city ?? 'Location not available');  // Outputs: Location not available

// 14. Literal Types and Type Aliases
// Literal type restricts a variable to specific values
type TrafficLight = 'Red' | 'Yellow' | 'Green';

let signal: TrafficLight = 'Red';  // Only 'Red', 'Yellow', or 'Green' allowed — try changing this!
