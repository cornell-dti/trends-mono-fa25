interface Person {
  name: string;
  age: number;
}

interface Course {
  startDate: string;
  endDate: string;
  code: string;
  professor: Person;
}

const somePerson: Person = {
  name: "Ryan",
  age: 19,
};

const someCourse: Course = {
  startDate: "Sep 27, 2025",
  endDate: "Dec 16, 2025",
  code: "Info 1998",
  professor: somePerson,
};

interface Movie {
  length: number;
  review: {
    text: string;
    rating: number;
  };
}

const someFunction = (a: number, b: string): string => {
  return "Hello, World" + a + b;
};

// interface with nested declarations

interface Book {
  title: string;
  author: {
    firstName: string;
    lastName: string;
  };
  yearPublished: number;
  genres: string[];
  available: boolean;
  ratings: {
    average: number;
    count: number;
  };
}

interface Rating {
  average: number;
  count: number;
}

interface Author {
  firstName: string;
  lastName: string;
}

// interface with modular types

interface Book {
  title: string;
  author: Author;
  yearPublished: number;
  genres: string[];
  available: boolean;
  ratings: Rating;
}

// assigning a type to an object

const book = {
  title: "The Pragmatic Programmer",
  author: {
    firstName: "Andrew",
    lastName: "Hunt",
  },
  yearPublished: 1999,
  genres: ["programming", "software engineering"],
  available: true,
  ratings: {
    average: 4.5,
    count: 2150,
  },
};

const typedBook: Book = {
  title: "The Pragmatic Programmer",
  author: {
    firstName: "Andrew",
    lastName: "Hunt",
  },
  yearPublished: 1999,
  genres: ["programming", "software engineering"],
  available: true,
  ratings: {
    average: 4.5,
    count: 2150,
  },
};

// optional fields

interface OptionalRatingBook {
  title: string;
  author: Author;
  yearPublished: number;
  genres: string[];
  available: boolean;
  ratings?: Rating;
  // optional, can be undefined
}

const optionalRating: OptionalRatingBook = {
  title: "The Pragmatic Programmer",
  author: {
    firstName: "Andrew",
    lastName: "Hunt",
  },
  yearPublished: 1999,
  genres: ["programming", "software engineering"],
  available: true,
};

// optional parameter + optional field in returned object

const greetUser = (name?: string): void => {
  if (name) {
    console.log(`Hello, ${name}!`);
  } else {
    console.log("Hello, Guest!");
  }
};

const createBook = (
  title: string,
  author: Author,
  pubYear: number,
  genres: string[],
  available: boolean,
  ratings?: Rating
): OptionalRatingBook => {
  return {
    title: title,
    author: author,
    yearPublished: pubYear,
    genres: genres,
    available: available,
    ratings: ratings,
  };
};

// let InvalidCourse: Course = {
//   startDate: "Aug 27, 2025",
//   endDate: "Dec 16, 2025",
//   code: "CS 2800",
// };
// this will cause an error because field professor is missing

// ambiguous types

async function unsafeGetBook(): Promise<void> {
  const response = await fetch("https://fakeapi.com/books/1");

  // type is unknown
  const data: any = await response.json();

  // May throw if title doesn't exist
  console.log("Title (unsafe):", data.title);
}

async function getBookFromApi(): Promise<void> {
  const response = await fetch("https://fakeapi.com/books/1");

  const data = await response.json(); // any

  // May throw if isbn doesn't exist
  console.log("Title (unsafe):", data.isbn);
}

// type narrowing function

function isBook(obj: any): obj is Book {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.title === "string" &&
    typeof obj.author === "object" &&
    typeof obj.author.firstName === "string" &&
    typeof obj.author.lastName === "string" &&
    typeof obj.yearPublished === "number" &&
    Array.isArray(obj.genres) &&
    typeof obj.available === "boolean"
  );
}

if (isBook(book)) {
  // the special type narrowing function will tell typescript that book is guaranteed to be of type Book
  // you can use a similar 'parameter is X' syntax to create your own type checkers
}

// example of unknown being used
// most frequently seen in error handling

function parseJson(jsonString: string): any {
  try {
    const result = JSON.parse(jsonString);
    return result;
  } catch (error: unknown) {
    // Narrow the error before using it
    if (error instanceof SyntaxError) {
      console.error("Invalid JSON:", error.message);
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    } else {
      console.error("Something went wrong, but it's not an Error:", error);
    }

    return null;
  }
}

// object and array destructuring
const [a, b] = [1, 2];
// a = 1, b = 2

const someMovie: Movie = {
  length: 100,
  review: {
    text: "Really good",
    rating: 5,
  },
};

const {
  length: movieLength,
  review: { text, rating },
} = someMovie;

// here, movieLength = 100, text = 'really good', and rating = 5
