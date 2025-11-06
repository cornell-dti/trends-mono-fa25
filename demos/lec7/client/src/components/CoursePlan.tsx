import Semester from "./Semester";
import "./styles.css";
import { useEffect, useState } from "react";
import {
  getAllSemesters,
  createSemester,
  getAllCourses,
  populateCoursesFromCornell,
} from "../util";

const CoursePlan = () => {
  const [semesters, setSemesters] = useState<{ id: string; name: string }[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [semester, setSemester] = useState("SP25");
  const [subject, setSubject] = useState("CS");
  const [isPopulating, setIsPopulating] = useState(false);
  const [populateMessage, setPopulateMessage] = useState("");

  const handleNewSemesterClick = async () => {
    const newSemesterName = `Semester ${semesters.length + 1}`;
    const newSemester = await createSemester(newSemesterName);
    if (newSemester) {
      setSemesters([...semesters, newSemester]);
    }
  };

  const handlePopulateCourses = async () => {
    setIsPopulating(true);
    setPopulateMessage("");

    const result = await populateCoursesFromCornell(semester, subject);
    setPopulateMessage(result.message);

    if (result.success) {
      // Refresh the courses list
      const coursesData = await getAllCourses();
      setAllCourses(coursesData);
    }

    setIsPopulating(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [semestersData, coursesData] = await Promise.all([
        getAllSemesters(),
        getAllCourses(),
      ]);
      setSemesters(semestersData);
      setAllCourses(coursesData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Populate Courses from Cornell API</h3>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "10px" }}>
          <label>
            Semester:
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="e.g., SP25"
              style={{ marginLeft: "5px", padding: "5px" }}
            />
          </label>
          <label>
            Subject:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., CS"
              style={{ marginLeft: "5px", padding: "5px" }}
            />
          </label>
          <button
            onClick={handlePopulateCourses}
            disabled={isPopulating}
            style={{ padding: "5px 15px" }}
          >
            {isPopulating ? "Populating..." : "Populate Courses"}
          </button>
        </div>
        {populateMessage && (
          <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
            {populateMessage}
          </div>
        )}
      </div>

      <button className="newSemesterButton" onClick={handleNewSemesterClick}>
        + New Semester
      </button>
      <div className="semesterContainer">
        {semesters.map((semester) => (
          <Semester
            key={semester.id}
            id={semester.id}
            name={semester.name}
            allCourses={allCourses}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursePlan;
