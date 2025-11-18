// Object Destructuring
const obj = { a: 1, b: 2, c: 3 };
const { a, b: secondProp, d = 4 } = obj;

console.log([a, secondProp, d].join(", "));

// Nested object destructuring
const nestedObj = {
    x:{ y: 10, z: 20 },
    w: 30
};
const {
    x: { y, z: depth },
} = nestedObj;

console.log([y, depth].join(", "));

// Array Destructuring
const arr = [1, 2, 3, 4, 5];
let [first, , third, ...rest] = arr;
console.log([first, third, rest].join("---"));

// Destructuring in function parameters
function printPersonInfo({ name, age }) {
    console.log(`${name} is ${age} years old.`);
}

printPersonInfo({ name: "Alice", age: 30 });

// Combining spread and destructuring
const obj2 = { ...obj, b: 4, d: 5 };
console.log(obj2);

// Multiple return values using destructuring
function getMinMax(numbers) {
    return [Math.min(...numbers), Math.max(...numbers)];
}
const [min, max] = getMinMax([3, 1, 4, 1, 5, 9, 2, 6]);
console.log([min, max].join(", "));
