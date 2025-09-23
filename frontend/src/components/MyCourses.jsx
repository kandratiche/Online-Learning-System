import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourses } from "../App";

import "../styles/mycourses.css";

export default function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then((res) => setCourses(res.data));
  }, []);

  const openCourse = (_id) => {
    navigate(`/course/${_id}`);
  };

  const calculateProgress = (lessons) => {
    if (!lessons || lessons.length === 0) return 0;
    const completed = lessons.filter((l) => l.completed).length;
    return Math.round((completed / lessons.length) * 100);
  };

  return (
        <div className="mycourses">
            <h3>My Courses</h3>
            <div className="mycourses-list">
                {courses && courses.length > 0 ? (
                    courses.map((course) => {
                    const progress = calculateProgress(course.lessons);
                    return (
                        <div
                        key={course._id}
                        className="mycourse-card"
                        onClick={() => openCourse(course._id)}
                        >
                        <h3>{course.title}</h3>
                        <div className="mycourse-progress-bar">
                            <div
                            className="mycourse-progress"
                            style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p>{progress}% completed</p>
                        </div>
                    );
                    })
                ) : (
                    <p className="mycourse-waiting">No courses available</p>
                )}
            </div>
        </div>
    );
}
