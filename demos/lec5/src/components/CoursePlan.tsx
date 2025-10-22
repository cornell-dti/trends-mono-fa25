import Semester from "./Semester";
import "./styles.css";
import { COURSES } from "../constants/consts";
import { useEffect, useState } from "react";
import { makeArray } from "../util";

const CoursePlan = () => {
  const [semesterCount, setSemesterCount] = useState<number>(1);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  const handleNewSemesterClick = () => {
    setSemesterCount(semesterCount + 1);
  };

  useEffect(() => {
    const fetchCourses = () => COURSES;
    setAllCourses(fetchCourses());
  }, []);

  return (
    <div>
      <button className="newSemesterButton" onClick={handleNewSemesterClick}>
        + New Semester
      </button>
      <div className="semesterContainer">
        {makeArray(semesterCount).map(sem => (
          <Semester
            key={`Semester ${sem + 1}`}
            name={`Semester ${sem + 1}`}
            allCourses={allCourses}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursePlan;
