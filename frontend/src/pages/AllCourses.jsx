import Header from "../components/Header";
import "../styles/allcourses.css";
import { getCourses, enrollCourse } from "../App";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllCourses() {

    const navigate = useNavigate()

    const [courses, setCourses] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));


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


    return(
        <>
            <Header/>
            <div className="allcourses-page">
                <div className="allcourses-container">
                    <h2>All Courses</h2>
                    {courses && courses.length > 0 ? (
                        courses.map((course) => (
                        <div key={course._id} className="allcourses-card">
                            <h3>{course.title}</h3>
                            <p><b>Language:</b> {course.language}</p>
                            <p>{course.description}</p>
                            <p><b>Lessons:</b> {course.lessons?.length || 0}</p>
                            <button onClick={() => openCourse(course._id)} className="allcourses-card-start">Start the course</button>
                        </div>
                        ))
                    ) : (
                        <p className="allcourses-waiting">No courses available</p>
                    )}
                </div>
            </div>
        </>
    )
}