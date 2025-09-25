import { useState, useEffect } from "react";
import "../styles/findcourses.css";
import { getCourses, enrollCourse } from "../App";
import { useNavigate } from "react-router-dom";

export default function FindCourses() {

    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [searchCourse, setSearchCourse] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(courses);

    useEffect(() => {
        getCourses()
            .then((res) => setCourses(res.data))
            .catch((err) => console.error("Error fetching courses:", err));
    }, [])


    const openCourse = async (courseId) => {
        try {
        const res = await enrollCourse(user._id, courseId);

        const updatedUser = res.data.user;

        localStorage.setItem("user", JSON.stringify(updatedUser));

        navigate(`/course/${courseId}`);
        } catch (err) {
        console.error("Error enrolling:", err);
        alert(err.response?.data?.message || "Could not enroll in this course");
        }
    };

    const calculateProgress = (courseId) => {
        const userCourse = user?.courses.find(c => c.course_id === courseId);
        if (!userCourse || typeof userCourse.progress !== "number") return 0;

        return userCourse.progress; 
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchCourse.toLowerCase())
    );

    console.log("filt",filteredCourses);

    return (
        <div className="find-courses-container">
            <h2>Search Course</h2>
            <input 
                className="find-courses-search-bar"
                type="text" 
                onChange={(e) => setSearchCourse(e.target.value)}
                placeholder="Enter the course name"
            />
            <div className="find-courses-courses">
                {filteredCourses.map((course) => {
                    const progress = calculateProgress(course._id);
                    return(
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
                        >
                        </div>
                        </div>
                            <p>{progress}% completed</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}