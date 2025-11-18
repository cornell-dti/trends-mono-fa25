/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc, // preferred in latest versions of firebase
  updateDoc,
  getDoc, // preferred in new versions of firebase
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Course } from "./types";

// Get all semesters and their courses
export const fetchAllSemesters = async (): Promise<
  {
    name: string;
    semNum: number;
    id: string;
  }[]
> => {
  try {
    const collectionRef = collection(db, "semesters");
    const docRef = await getDocs(collectionRef); //snapshot of all docs
    return docRef.docs.map((doc) => ({
      id: doc.id,
      semNum: doc.data().semNum,
      name: doc.data().name,
    }));
  } catch (e) {
    console.error("Error fetching semesters:", e);
    return [];
  }
};

// Add a new semester
export const addSemester = async (name: string): Promise<string | null> => {
  try {
    // Extract semester number from the name
    const semNum = parseInt(name.match(/\d+/)?.[0] || "0", 10);

    const docRef = await addDoc(collection(db, "semesters"), {
      name,
      semNum
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding semester:", e);
    return null;
  }
};

// Get all courses for a semester
export const fetchCoursesForSemester = async (
  semesterId: string
): Promise<Course[]> => {
  try {
    const collectionRef = collection(db, `semesters/${semesterId}/courses`);
    const docRef = await getDocs(collectionRef);
    return docRef.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Course)
    );
  } catch (e) {
    console.error(`Error fetching courses for semester ${semesterId}:`, e);
    return [];
  }
};

// Add a course to a semester
export const addCourseToSemester = async (
  semesterId: string,
  course: Course
): Promise<string | null> => {
  try {
    // If the course already has an ID from the Courses collection, use it
    if (!course.id) {
      console.error("Course must have an ID to add to semester");
      return null;
    }

    // Use setDoc with the course's existing ID instead of auto-generating a new one
    const courseDocRef = doc(db, `semesters/${semesterId}/courses`, course.id);
    await setDoc(courseDocRef, course);
    return course.id;
  } catch (e) {
    console.error("Error adding course to semester:", e);
    return null;
  }
};

// Delete a course from a semester
export const deleteCourseFromSemester = async (
  semesterId: string,
  courseId: string
): Promise<boolean> => {
  try {
    const courseDocRef = doc(db, `semesters/${semesterId}/courses`, courseId);
    await deleteDoc(courseDocRef);
    return true;
  } catch (e) {
    console.error("Error deleting course from semester:", e);
    return false;
  }
};

// Add a course to the courses collection
export const addCourseToDB = async (course: any): Promise<string | null> => {
  try {
    const coursesCollection = collection(db, "Courses");
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
    const coursesCollection = collection(db, "Courses");
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
