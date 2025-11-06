/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc, // preferred in latest versions of firebase
  updateDoc, // preferred in new versions of firebase
} from "firebase/firestore";
import { db } from "./firebase";
import { Course } from "./types";

// Get all semesters and their courses
export const fetchAllSemesters = async (): Promise<
  {
    name: string;
    id: string;
  }[]
> => {
  return [];
};

// Add a new semester
export const addSemester = async (name: string): Promise<string | null> => {
  return null;
};

// Get all courses for a semester
export const fetchCoursesForSemester = async (
  semesterId: string
): Promise<Course[]> => {
  return [];
};

// Add a course to a semester
export const addCourseToSemester = async (
  semesterId: string,
  course: Course
): Promise<string | null> => {
  return null;
};

// Delete a course from a semester
export const deleteCourseFromSemester = async (
  semesterId: string,
  courseId: string
): Promise<boolean> => {
  return false;
};

// Update course notes
export const updateCourseNotes = async (
  semesterId: string,
  courseId: string,
  notes: string
): Promise<boolean> => {
  return false;
};

// Update course details to show or hide
export const updateCourseDetails = async (
  semesterId: string,
  courseId: string,
  showDetails: boolean
): Promise<boolean> => {
  return false;
};

// Add a course to the courses collection
export const addCourseToDB = async (course: any): Promise<string | null> => {
  try {
    const coursesCollection = collection(db, "courses");
    const docRef = await addDoc(coursesCollection, course);
    return docRef.id;
  } catch (error) {
    console.error("Error adding course to DB:", error);
    return null;
  }
};

// Get all courses from the courses collection
export const fetchAllCourses = async (): Promise<Partial<Course>[]> => {
  try {
    const coursesCollection = collection(db, "courses");
    const querySnapshot = await getDocs(coursesCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Partial<Course>[];
  } catch (error) {
    console.error("Error fetching all courses:", error);
    return [];
  }
};
