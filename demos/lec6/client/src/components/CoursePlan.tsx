import Semester from "./Semester";
import "./styles.css";
import { COURSES } from "../constants/consts";
import { useEffect, useState } from "react";
import { makeArray } from "../util";
import { API_KEY } from "../environment";

const CoursePlan = () => {
  const [semesterCount, setSemesterCount] = useState<number>(1);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  const handleNewSemesterClick = () => {
    setSemesterCount(semesterCount + 1);
  };

  useEffect(() => {
    // BAD PRACTICE
    const demo = fetch("http://localhost:8080/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ key: "secret" }),
    }).then((res) => res.json());
    console.log(demo);
    //-----------------------
    const fetchCourses = () => COURSES;
    setAllCourses(fetchCourses());
  }, []);

  return (
    <div>
      <button className="newSemesterButton" onClick={handleNewSemesterClick}>
        + New Semester
      </button>
      <div className="semesterContainer">
        {makeArray(semesterCount).map((sem) => (
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
