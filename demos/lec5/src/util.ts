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
    const response = await fetch(
      `https://classes.cornell.edu/api/2.0/search/classes.json?roster=FA25&subject=${subject}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    // rejected case
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // successful case
    // retrieving the data
    const data = (await response.json()) as {
      data: {
        classes: ApiCourseData[];
      };
    };

    // find specific course
    const specificCourseData = await data.data.classes.find(
      (course: ApiCourseData) => Number(course.catalogNbr) === catalogNbr
    );

    if (!specificCourseData) {
      console.warn(
        `Course ${subject} ${catalogNbr} not found in Cornell Course Roster API`
      );
      return {};
    }

    const details: Partial<Course> = {};

    if (specificCourseData.description) {
      details.description = specificCourseData.description;
    }

    // TODO: catalogWhenOffered, credits, instructors
    if (specificCourseData.catalogWhenOffered) {
      details.whenOffered = specificCourseData.catalogWhenOffered;
    }

    if (
      specificCourseData.enrollGroups &&
      specificCourseData.enrollGroups.length > 0
    ) {
      details.credits = specificCourseData.enrollGroups[0].unitsMinimum;
    }

    if (
      specificCourseData.enrollGroups &&
      specificCourseData.enrollGroups.length > 0 &&
      specificCourseData.enrollGroups[0].classSections.length > 0 &&
      specificCourseData.enrollGroups[0].classSections[0].meetings.length > 0
    ) {
      details.instructors =
        specificCourseData.enrollGroups[0].classSections[0].meetings[0].instructors;
    }

    return details;
  } catch (err) {
    console.error("Error fetching course details:", err);
    return {};
  }
};
