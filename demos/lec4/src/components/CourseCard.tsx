type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => (
  <div className="courseCard">
    <p className="courseCode">
      {course.subject} {course.catalogNbr}
    </p>
    <p className="courseTitle">{course.titleShort}</p>
  </div>
);

export default CourseCard;
