import { expect, test } from "vitest";
import {
    formatLibraryCatalog,
    summarizePurchases,
    filterHighQualityArticles,
    assessFinancialStanding,
    craftGreetingMessage,
    organizeCourses,
    safelyAccessDeepProperty,
} from "./main.ts";

// Exercise 1 Tests
test("formatLibraryCatalog should format and filter books", () => {
    expect(
        formatLibraryCatalog([
            { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "fiction" },
            { title: "Brief Answers to the Big Questions", author: "Stephen Hawking", genre: "non-fiction" },
        ])
    ).toEqual([{ title: "\"The Great Gatsby\"", author: "f. scott fitzgerald", genre: "fiction" }]);
});

// Exercise 2 Tests
test("summarizePurchases should summarize purchases by userId", () => {
    expect(
        summarizePurchases([
            { purchaseId: 1, userId: 1, total: 100 },
            { purchaseId: 2, userId: 1, total: 150 },
            { purchaseId: 3, userId: 2, total: 200 },
        ])
    ).toEqual({ "1": 250, "2": 200 });
});

// Exercise 3 Tests
test("filterHighQualityArticles should filter and format articles", () => {
    expect(
        filterHighQualityArticles([
            { title: "Understanding TypeScript", topic: "Programming", score: 7 },
            { title: "Introduction to Cooking", topic: "Cooking", score: 4 },
        ])
    ).toEqual(["Understanding TypeScript: Programming"]);
});

// Exercise 4 Tests
test("assessFinancialStanding should classify financial status", () => {
    expect(assessFinancialStanding({ name: "Jane", monthlyIncome: 7000, expenses: 1000 })).toEqual("wealthy");
    expect(assessFinancialStanding({ name: "Doe", monthlyIncome: 3000, expenses: 500 })).toEqual("stable");
    expect(assessFinancialStanding({ name: "John", monthlyIncome: 1500, expenses: 1000 })).toEqual("struggling");
});

// Exercise 5 Tests
test("craftGreetingMessage should create greeting message correctly", () => {
    const currentYear = new Date().getFullYear();
    expect(craftGreetingMessage({ firstName: "Alice", birthYear: 1990 })).toEqual(
        `Welcome, Alice! Your age is ${currentYear - 1990}.`
    );
});

// Exercise 6 Tests
test("organizeCourses should organize courses by difficulty", () => {
    expect(
        organizeCourses([
            { courseName: "Introduction to TypeScript", difficulty: "easy" },
            { courseName: "Advanced Cooking Techniques", difficulty: "hard" },
        ])
    ).toEqual({
        easy: [{ courseName: "Introduction to TypeScript", difficulty: "easy" }],
        hard: [{ courseName: "Advanced Cooking Techniques", difficulty: "hard" }],
    });
});

// Exercise 7 Tests
test("safelyAccessDeepProperty should return the correct value or 'Unavailable'", () => {
    expect(
        safelyAccessDeepProperty({
            firstLevel: { secondLevel: { thirdLevel: { deepValue: "Found Me!" } } },
        })
    ).toEqual("Found Me!");
    expect(safelyAccessDeepProperty({})).toEqual("Unavailable");
});
