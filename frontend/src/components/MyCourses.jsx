import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../styles/mycourses.css";

export default function MyCourses() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!user?.courses || user.courses.length === 0) {
      setCourses([]); 
      return;
    }

    Promise.all(
      user.courses.map(c =>
        axios.get(`${process.env.REACT_APP_API_URL}/api/courses/${c.course_id}`)
      )
    )
      .then(responses => {
        setCourses(responses.map(r => r.data));
      })
      .catch(err => console.error(err));
  }, [user]);



  const openCourse = (_id) => {
    navigate(`/course/${_id}`);
  };

  const calculateProgress = (courseId) => {
    const userCourse = user?.courses.find(c => c.course_id === courseId);
    if (!userCourse || typeof userCourse.progress !== "number") return 0;

    return userCourse.progress; 
  };
  return (
    <div className="mycourses">
      <h2>My Courses</h2>
      <div className="mycourses-list">
        {courses && courses.length > 0 ? (
          courses.map((course) => {
            const progress = calculateProgress(course._id);
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
          <p className="mycourse-waiting">You haven’t enrolled in any courses yet</p>
        )}
      </div>
    </div>
  );
}
