import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

/**
 * Makes an array with the integers from 0 (inclusive) to n (exclusive).
 * @param n The size of the array with numbers from [0..n-1]. Requires n >= 0.
 */
export const makeArray = (n: number) =>
  Array.from({ length: n }).map((_, index) => index);

interface ApiCourseData {
  description?: string;
  catalogNbr: string | number;
  catalogWhenOffered?: string;
  enrollGroups: ApiEnrollGroup[];
}

interface ApiEnrollGroup {
  unitsMinimum: number;
  classSections: ApiClassSection[];
}

interface ApiClassSection {
  meetings: ApiMeeting[];
}

interface ApiMeeting {
  instructors: Instructor[];
}

/**
 * Fetches detailed course information from the Cornell API
 * @param subject The course subject code (e.g., "CS")
 * @param catalogNbr The course catalog number (e.g., 1110)
 */
export const fetchCourseDetails = async (
  subject: string,
  catalogNbr: number
): Promise<Partial<Course>> => {
  try {
    // Properly format the API URL according to Cornell's documentation
    // Format: https://<HOST>/api/<VERSION>/<method>.<responseFormat>?parameters
    const response = await axios.get(
      `https://classes.cornell.edu/api/2.0/search/classes.json?roster=SP25&subject=${subject}`
    );

    const data = response.data as {
      data: {
        classes: ApiCourseData[];
      };
    };

    const key = "I love web development!";
    const postResponse = await axios.post("http://localhost:8080/api/", {
      key
    });
    const postResponseText = postResponse.data.message;

    // Find the specific course in the API response by matching the catalogNbr
    const courseData = data.data.classes.find(
      (course: ApiCourseData) => Number(course.catalogNbr) === catalogNbr
    );

    if (!courseData) {
      console.warn(`Course ${subject} ${catalogNbr} not found in API response`);
      return {};
    }

    // Extract the relevant information
    const details: Partial<Course> = {};

    // Get description
    if (courseData.description) {
      details.description = `${postResponseText} ${courseData.description}`;
    }

    // Get credits from the first enroll group
    if (courseData.enrollGroups && courseData.enrollGroups.length > 0) {
      details.credits = courseData.enrollGroups[0].unitsMinimum;
    }

    // Get when offered information
    if (courseData.catalogWhenOffered) {
      details.whenOffered = courseData.catalogWhenOffered;
    }

    // Get instructors from the first meeting of the first class section of the first enroll group
    if (
      courseData.enrollGroups.length > 0 &&
      courseData.enrollGroups[0].classSections.length > 0 &&
      courseData.enrollGroups[0].classSections[0].meetings.length > 0
    ) {
      details.instructors =
        courseData.enrollGroups[0].classSections[0].meetings[0].instructors;
    }

    return details;
  } catch (error) {
    console.error("Error fetching course details:", error);
    return {};
  }
};

// API utility functions for interacting with the server

/**
 * Fetches all semesters from the server
 */
export const getAllSemesters = async (): Promise<{
  id: string;
  name: string;
  semNum: number;
}[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/semesters`);
    return response.data;
  } catch (error) {
    console.error("Error fetching semesters:", error);
    return [];
  }
};

/**
 * Creates a new semester on the server
 */
export const createSemester = async (
  name: string
): Promise<{ id: string; name: string } | null> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/semesters`, { name });
    return response.data;
  } catch (error) {
    console.error("Error creating semester:", error);
    return null;
  }
};

/**
 * Fetches all courses for a specific semester
 */
export const getCoursesForSemester = async (
  semesterId: string
): Promise<Course[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/semesters/${semesterId}/courses`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses for semester:", error);
    return [];
  }
};

/**
 * Adds a course to a semester
 */
export const addCourseToSemester = async (
  semesterId: string,
  course: Course
): Promise<Course | null> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/semesters/${semesterId}/courses`,
      course
    );
    return response.data;
  } catch (error) {
    console.error("Error adding course to semester:", error);
    return null;
  }
};

/**
 * Deletes a course from a semester
 */
export const deleteCourseFromSemester = async (
  semesterId: string,
  courseId: string
): Promise<boolean> => {
  try {
    await axios.delete(
      `${API_BASE_URL}/semesters/${semesterId}/courses/${courseId}`
    );
    return true;
  } catch (error) {
    console.error("Error deleting course from semester:", error);
    return false;
  }
};

/**
 * Updates the details visibility for a course in a semester
 */
export const updateCourseDetailsVisibility = async (
  semesterId: string,
  courseId: string,
  showDetails: boolean
): Promise<boolean> => {
  try {
    await axios.patch(
      `${API_BASE_URL}/semesters/${semesterId}/courses/${courseId}/details`,
      {
        showDetails
      }
    );
    return true;
  } catch (error) {
    console.error("Error updating course details:", error);
    return false;
  }
};

/**
 * Fetches all courses from the courses database
 */
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all courses:", error);
    return [];
  }
};

/**
 * Populates the database with courses from Cornell API for a given semester and subject
 */
export const populateCoursesFromCornell = async (
  semester: string,
  subject: string
): Promise<{ success: boolean; message: string; count?: number }> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/courses/${semester}/${subject}`
    );
    return {
      success: true,
      message: response.data.message,
      count: response.data.courses?.length || 0
    };
  } catch (error) {
    console.error("Error populating courses:", error);
    return {
      success: false,
      message:
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Failed to populate courses"
    };
  }
};
