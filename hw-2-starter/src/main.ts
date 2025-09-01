// Homework Assignment: Trends in Web Development
// Now that you have JavaScript down, let's work on TypeScript!
// This assignment will test your knowledge of types, functional programming, string interpolation, and more.
// Each exercise is worth 10 points. 30 points are provided for free.
// Once you have a solution, you can run `pnpm test` to run the sample test cases we have provided.
// This does not guarantee that you will get full credit on the autograder, but it is a good start!
// Let us know if you have any questions or concerns on Ed!

// You should be able to run `pnpm test` in your terminal to run the sample test cases we have provided!

// Exercise 1: Format a Library Catalog (10 points)
/**
 * Input: an array of books with title, author, and genre.
 * Output: an array of books where each title is wrapped in double quotations, author names are in all lowercase, and only 'fiction' genre books are included.
 */
type Book = { title: string; author: string; genre: string };
const formatLibraryCatalog = (books: Book[]): Book[] => {
    // TODO: Your code goes here
};

// Exercise 2: Summarize Customer Purchases (10 points)
/**
 * Input: an array of purchases with purchaseId, userId, and total.
 * Output: an object summarizing total spending per userId.
 */
type Purchase = { purchaseId: number; userId: number; total: number };
const summarizePurchases = (purchases: Purchase[]): { [userId: string]: number } => {
    // TODO: Your code goes here
};

// Exercise 3: Filter High-Quality Articles (10 points)
/**
 * Input: an array of articles with title, topic, and score.
 * Output: an array of strings, each representing articles with a score above 5, formatted as "Title: Topic".
 */
type Article = { title: string; topic: string; score: number };
const filterHighQualityArticles = (articles: Article[]): string[] => {
    // TODO: Your code goes here
};

// Exercise 4: Assess Financial Standing (10 points)
/**
 * Input: an object representing an individual's financial details including name, monthlyIncome, and expenses.
 * Output: 'wealthy' if net income is above 5000, 'stable' if between 2000 (inclusive) and 5000 (exclusive), and 'struggling' otherwise.
 */
type FinancialDetails = { name: string; monthlyIncome: number; expenses: number };
const assessFinancialStanding = (details: FinancialDetails): string => {
    // TODO: Your code goes here
};

// Exercise 5: Craft Greeting Message (10 points)
/**
 * Input: an object with fields for firstName and birthYear.
 * Output: a greeting message using string interpolation, formatted as "Welcome, [firstName]! Your age is [age]."
 * Hint: You can use `new Date().getFullYear()` to get current year.
 */
type GreetingInfo = { firstName: string; birthYear: number };
const craftGreetingMessage = (info: GreetingInfo): string => {
    // TODO: Your code goes here
};

// Exercise 6: Organize Courses by Difficulty (10 points)
/**
 * Input: an array of courses with courseName and difficulty level (easy, medium, hard).
 * Output: an object organizing courses by their difficulty level.
 */
type Course = { courseName: string; difficulty: string };
const organizeCourses = (courses: Course[]): { [difficulty: string]: Course[] } => {
    // TODO: Your code goes here
};

// Exercise 7: Safely Access Deep Properties (10 points)
/**
 * Input: a potentially deeply nested object that could have null or undefined properties.
 * Output: a safely retrieved value from within the nested structure, or "Unavailable" if the path is broken.
 */
type DeeplyNestedObject = { firstLevel?: { secondLevel?: { thirdLevel?: { deepValue?: string } } } };
const safelyAccessDeepProperty = (obj: DeeplyNestedObject): string => {
    // TODO: Your code goes here
};

// Congratulations on completing these exercises!

export {
    formatLibraryCatalog,
    summarizePurchases,
    filterHighQualityArticles,
    assessFinancialStanding,
    craftGreetingMessage,
    organizeCourses,
    safelyAccessDeepProperty,
};
