import { useState } from "react";
import CourseCard from "./CourseCard";
import Dropdown from "./lib/Dropdown";
import SlideToggle from "./lib/SlideToggle";
import { fetchCourseDetails } from "../util";

type SemesterProps = {
  name: string;
  allCourses: Course[];
};

const Semester = ({ name, allCourses }: SemesterProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  // Cache to store course details that have been fetched
  const [courseDetailsCache, setCourseDetailsCache] = useState<
    Record<string, Partial<Course>>
  >({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleAddCourse = async (course: Course) => {
    const courseKey = `${course.subject}-${course.catalogNbr}`;

    // Add the course first with the basic info
    setCourses([...courses, course]);

    // If we're already fetching details for this course, don't fetch again
    if (loading[courseKey]) return;

    // Check if we already have details for this course
    if (!courseDetailsCache[courseKey]) {
      // Set loading state for this course
      setLoading((prev) => ({ ...prev, [courseKey]: true }));

      try {
        // Fetch detailed information from the API
        const details = await fetchCourseDetails(
          course.subject,
          course.catalogNbr
        );

        // Update the cache with the fetched details
        setCourseDetailsCache({
          ...courseDetailsCache,
          [courseKey]: details,
        });

        // Update the course in the courses array with the new details
        setCourses((prev) =>
          prev.map((c) =>
            c.subject === course.subject && c.catalogNbr === course.catalogNbr
              ? { ...c, ...details }
              : c
          )
        );
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        // Clear loading state
        setLoading((prev) => ({ ...prev, [courseKey]: false }));
      }
    } else {
      // If we already have details, use them
      setCourses((prev) =>
        prev.map((c) =>
          c.subject === course.subject && c.catalogNbr === course.catalogNbr
            ? { ...c, ...courseDetailsCache[courseKey] }
            : c
        )
      );
    }
  };

  const handleToggleDetails = (updatedCourse: Course) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.subject === updatedCourse.subject &&
        c.catalogNbr === updatedCourse.catalogNbr
          ? { ...c, showDetails: updatedCourse.showDetails }
          : c
      )
    );
  };

  return (
    <div className="semesterBox">
      <div className="semesterHeader">
        <h2 className="semesterTitle">{name}</h2>
        <SlideToggle label="minimize" onChange={(e) => setIsMinimized(e)} />
      </div>
      {!isMinimized && (
        <>
          <Dropdown options={allCourses} onChange={handleAddCourse} />
          {courses.map((course, index) => {
            const courseKey = `${course.subject}-${course.catalogNbr}`;
            return (
              <CourseCard
                key={`${courseKey}-${index}`}
                course={course}
                onToggleDetails={handleToggleDetails}
                isLoading={loading[courseKey]}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default Semester;
