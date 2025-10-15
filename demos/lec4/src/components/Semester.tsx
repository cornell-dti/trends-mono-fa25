import CourseCard from "./CourseCard";

type SemesterProps = {
  name: string;
  allCourses: Course[];
};

const Semester = ({ name, allCourses }: SemesterProps) => {
  return (
    <div className="semesterBox">
      <div className="semesterHeader">
        <h2 className="semesterTitle">{name}</h2>
        {/* Activity 2: Add a slide toggle that minimizes the dropdown and all listed courses. */}
      </div>
      <CourseCard course={allCourses[0]} />
    </div>
  );
};

export default Semester;