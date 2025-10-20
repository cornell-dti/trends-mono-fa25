import Semester from "./Semester";
import "./styles.css";
import { COURSES } from "../constants/consts";
import { useState } from "react";
import { makeArray } from "../util";

const CoursePlan = () => {
  const [semesterCount, setSemesterCount] = useState<number>(1);

  const handleNewSemesterClick = () => {
    setSemesterCount(semesterCount + 1);
  };

  return (
    <div>
      <button className="newSemesterButton" onClick={handleNewSemesterClick}>
        + New Semester
      </button>
      <div className="semesterContainer">
        {makeArray(semesterCount).map((sem) => (
          <Semester
            key={sem}
            name={`Semester ${sem + 1}`}
            allCourses={COURSES}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursePlan;
