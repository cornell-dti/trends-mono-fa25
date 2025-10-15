import Semester from "./Semester";
import "./styles.css";
import { COURSES } from "../constants/consts";
import { useState } from "react";

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
        {/* 
          Activity 1: Add functionality to button to create new semester on click.
          Each new semester should be named "Semester i", where i is the next integer.
          The first semester should be "Semester 1".
          You may want to leverage `makeArray` in util.ts and map over it.
          makeArray(5) = [0, 1, 2, 3, 4]
        */}
        <Semester name={"Semester 1"} allCourses={COURSES} />
      </div>
    </div>
  );
};

export default CoursePlan;