import {
    sumOfArray,
    filterEvenNumbers,
    reverseString,
    convertToCelsius,
    findDuplicates,
    highestProfitOpportunity,
    isPalindrome,
    transposeMatrix,
    isPrime,
    fibonacci,
} from "./main";
import { expect, test } from "vitest";

// Test for QUESTION 1: Sum of Array
test("sum of array [1, 2, 3, 4, 5] is 15", () => {
    expect(sumOfArray([1, 2, 3, 4, 5])).toBe(15);
});

// Test for QUESTION 2: Filter Even Numbers
test("filter even numbers from [1, 2, 3, 4, 5] results in [2, 4]", () => {
    expect(filterEvenNumbers([1, 2, 3, 4, 5])).toEqual([2, 4]);
});

// Test for QUESTION 3: String Reversal
test('reverse string "JavaScript" results in "tpircSavaJ"', () => {
    expect(reverseString("JavaScript")).toBe("tpircSavaJ");
});

// Test for QUESTION 4: Temperature Converter
test("32 Fahrenheit is 0 Celsius", () => {
    expect(convertToCelsius(32)).toBe(0);
});

// Test for QUESTION 5: Find Duplicate Characters
test('duplicate characters in "programming" are ["g", "m", "r"]', () => {
    expect(findDuplicates("programming")).toEqual(["g", "m", "r"]);
});

// Test for QUESTION 6: Highest Profit Opportunity
test("buy at 1 and sell at 6 in [3, 1, 4, 6, 5]", () => {
    expect(highestProfitOpportunity([3, 1, 4, 6, 5])).toEqual({
        buyIndex: 1,
        sellIndex: 3,
    });
});

// Test for QUESTION 7: Palindrome Checker
test('"racecar" is a palindrome', () => {
    expect(isPalindrome("racecar")).toBe(true);
});

// Test for QUESTION 9: Prime Number Checker
test("7 is prime", () => {
    expect(isPrime(7)).toBe(true);
});

// Test for QUESTION 10: Fibonacci Sequence
test("5th number in Fibonacci sequence is 5", () => {
    expect(fibonacci(5)).toBe(5);
});
