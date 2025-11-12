import { useState } from "react";

type CourseCardProps = {
  course: Course;
  onToggleDetails?: (course: Course) => void;
  onHandleDelete: (course: Course) => void;
  isLoading?: boolean;
};

const CourseCard = ({
  course,
  onToggleDetails,
  onHandleDelete,
  isLoading = false,
}: CourseCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = () => {
    const newShowDetails = !showDetails;
    setShowDetails(newShowDetails);
    if (onToggleDetails) {
      onToggleDetails({ ...course, showDetails: newShowDetails });
    }
  };

  const handleDeleteClick = () => {
    onHandleDelete(course);
  };

  return (
    <div className="courseCard">
      <div className="courseHeader">
        <p className="courseCode">
          {course.subject} {course.catalogNbr}
        </p>
        <p className="courseTitle">{course.titleShort}</p>
        <button className="detailsToggle" onClick={handleDetailsClick}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
        <button className="deleteButton" onClick={handleDeleteClick}>
          Delete Course
        </button>
      </div>

      {showDetails && (
        <div className="courseDetails">
          {isLoading ? (
            <p className="loading-message">Loading course details...</p>
          ) : (
            <>
              {course.credits !== undefined && (
                <p className="courseCredits">
                  <strong>Credits:</strong> {course.credits}
                </p>
              )}
              {course.description && (
                <p className="courseDescription">
                  <strong>Description:</strong> {course.description}
                </p>
              )}
              {course.whenOffered && (
                <p className="courseOffering">
                  <strong>When Offered:</strong> {course.whenOffered}
                </p>
              )}
              {course.instructors && course.instructors.length > 0 && (
                <div>
                  <p>
                    <strong>Instructors:</strong>
                  </p>
                  <ul className="instructorsList">
                    {course.instructors.map((instructor, index) => (
                      <li key={index}>
                        {instructor.firstName} {instructor.lastName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!isLoading &&
                !course.description &&
                !course.credits &&
                !course.whenOffered &&
                (!course.instructors || course.instructors.length === 0) && (
                  <p className="no-data-message">
                    No additional details available for this course.
                  </p>
                )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseCard;
