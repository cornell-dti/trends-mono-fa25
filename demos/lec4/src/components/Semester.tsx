import { useState } from "react";
import CourseCard from "./CourseCard";
import Dropdown from "./lib/Dropdown";
import SlideToggle from "./lib/SlideToggle";

type SemesterProps = {
  name: string;
  allCourses: Course[];
};

const Semester = ({ name, allCourses }: SemesterProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const handleCourseSelection = (course: Course) => {
    setCourses([...courses, course]);
  };

  return (
    <div className="semesterBox">
      <div className="semesterHeader">
        <h2 className="semesterTitle">{name}</h2>
        {/* Activity 2: Add a slide toggle that minimizes the dropdown and all listed courses. */}
        <SlideToggle
          label={"minimize"}
          onChange={(toggle) => setIsMinimized(toggle)}
        />
      </div>
      {!isMinimized && (
        <>
          <Dropdown options={allCourses} onChange={handleCourseSelection} />
          {courses.map((course) => (
            <CourseCard course={course} />
          ))}
        </>
      )}
    </div>
  );
};

export default Semester;
