import express, { Express } from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

import {
  fetchAllSemesters,
  addSemester,
  fetchCoursesForSemester,
  addCourseToSemester,
  deleteCourseFromSemester,
  addCourseToDB,
  fetchAllCourses
} from "./firebaseUtils";
import { Course } from "./types";

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// GET
app.get("/api/", async (req, res) => {
  res.send("Hello world!");
});

// POST
app.post("/api/", async (req, res) => {
  try {
    const key = req.body.key;
    if (!key) {
      // 400 Bad Request as client did not supply key
      return res.status(400).json({ error: "key not found" });
    }
    console.log(key);
    // Do something with the key
    res.json({ message: `Hello, world! Your key was ${key}` });
  } catch (e) {
    res.status(500).json({ error: "An unknown error occurred" });
  }
});

// course-specific API routes

// POST courses from Cornell API for a particular subject
app.post("/api/courses/:semester/:subject", async (req, res) => {
  try {
    const { semester, subject } = req.params;

    if (!semester || !subject) {
      // 400 Bad Request
      return res
        .status(400)
        .json({ error: "Semester and subject are required" });
    }

    // Call Cornell API
    const response = await axios.get(
      `https://classes.cornell.edu/api/2.0/search/classes.json?roster=${semester}&subject=${subject}`
    );

    const data = response.data as {
      data: {
        classes: any[];
      };
    };

    const courses = data.data.classes;

    if (!courses || courses.length === 0) {
      // 404 Not Found
      return res.status(404).json({
        error: `No courses found for ${subject} in semester ${semester}`
      });
    }

    // Add all courses to the database
    const addedCourses: Partial<Course>[] = [];

    for (const courseData of courses) {
      // Extract relevant information
      const course: Partial<Course> = {
        subject: courseData.subject,
        catalogNbr: Number(courseData.catalogNbr),
        titleShort: courseData.titleShort
      };

      if (courseData.description) {
        course.description = courseData.description;
      }

      if (courseData.enrollGroups && courseData.enrollGroups.length > 0) {
        course.credits = courseData.enrollGroups[0].unitsMinimum;
      }

      if (courseData.catalogWhenOffered) {
        course.whenOffered = courseData.catalogWhenOffered;
      }

      // Get instructors from the first meeting
      if (
        courseData.enrollGroups?.length > 0 &&
        courseData.enrollGroups[0].classSections?.length > 0 &&
        courseData.enrollGroups[0].classSections[0].meetings?.length > 0
      ) {
        course.instructors =
          courseData.enrollGroups[0].classSections[0].meetings[0].instructors;
      }

      // Add to database
      const courseId = await addCourseToDB(course);

      if (courseId) {
        addedCourses.push(course);
      }
    }

    res.status(201).json({
      message: `Successfully added ${addedCourses.length} courses`,
      courses: addedCourses
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error fetching course details:", e.message);
      // 502 Bad Gateway for upstream/API errors, 500 otherwise
      if (e.message?.includes("Network") || e.message?.includes("timeout")) {
        res.status(502).json({ error: e.message });
      } else {
        res.status(500).json({ error: e.message });
      }
    } else {
      console.error("Error fetching course details:", e);
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// GET all semesters
app.get("/api/semesters", async (req, res) => {
  try {
    const semesters = await fetchAllSemesters();
    res.json(semesters);
  } catch (e) {
    res.status(500).json({ error: "An unknown error occurred" });
  }
});

// POST create a new semester
app.post("/api/semesters", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      // 400 Bad Request
      return res.status(400).json({ error: "Semester name is required" });
    }
    const semesterId = await addSemester(name);
    if (!semesterId) {
      // 500 Internal Server Error (something failed on server)
      return res.status(500).json({ error: "Failed to create semester" });
    }
    res.status(201).json({ id: semesterId, name });
  } catch (e) {
    res.status(500).json({ error: "An unknown error occurred" });
  }
});

// GET all courses for a specific semester
app.get("/api/semesters/:semesterId/courses", async (req, res) => {
  try {
    const { semesterId } = req.params;
    const courses = await fetchCoursesForSemester(semesterId);
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: "An unknown error occurred" });
  }
});

// POST add a course to a semester
app.post("/api/semesters/:semesterId/courses", async (req, res) => {
  try {
    const { semesterId } = req.params;
    const course = req.body;
    if (!course.subject || !course.catalogNbr || !course.titleShort) {
      // 400 Bad Request
      return res
        .status(400)
        .json({
          error: "Course must have subject, catalogNbr, and titleShort"
        });
    }
    const courseId = await addCourseToSemester(semesterId, course);
    if (!courseId) {
      // 500 Internal Server Error
      return res.status(500).json({ error: "Failed to add course" });
    }
    res.status(201).json({ id: courseId, ...course });
  } catch (e) {
    res.status(500).json({ error: "An unknown error occurred" });
  }
});

// DELETE a course from a semester
app.delete("/api/semesters/:semesterId/courses/:courseId", async (req, res) => {
  try {
    const { semesterId, courseId } = req.params;
    const success = await deleteCourseFromSemester(semesterId, courseId);
    if (!success) {
      // 404 Not Found if trying to delete a non-existent course
      return res.status(404).json({ error: "Failed to delete course" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "An unknown error occurred" });
  }
});

// GET all courses in Courses collection
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await fetchAllCourses();
    res.status(200).json(courses);
  } catch (e) {
    res.status(500).json({ error: "An unknown error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
