import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/courseprogress.css";

export default function CourseProgress() {

    const navigate = useNavigate();
    const [user] = useState(() => JSON.parse(localStorage.getItem("user")))
    const [toContinue, setToContinue] = useState([]);

    useEffect(() => {

        const fetchToContinue = async () => {
            if(!user?.courses) return;

            const toContinueCourses = user.courses.filter((c) => c.progress !== 100);

            const toCont = await Promise.all(
                toContinueCourses.map(async (course) => {
                    try {
                        
                        const res = await axios.get(
                            `http://localhost:5001/api/courses/${course.course_id}`
                        );

                        return {
                            id: course.course_id,
                            title: res.data.title,
                            progress: course.progress,
                        }

                    } catch (error) {
                        console.log("Error fetching course:", error);
                        return null;
                    }
                })
            )

            setToContinue(toCont.filter(Boolean));
        }

        fetchToContinue();

    })

    const openCourse = (_id) => {
        navigate(`/course/${_id}`);
    };

    return(
        <div className="course-progress">
            <h2>Continue learning</h2>
            <div className="course-progress-cards">
                {toContinue.map((course) => (
                    <div key={course.id} className="course-card">
                        <h3>{course.title}</h3>
                        <p>Progress: {course.progress}%</p>
                        <button className="course-card-button" onClick={() => openCourse(course.id)}>Continue</button>
                        <div className="progress-bar">
                            <div className="progress" style={{width: `${course.progress}%`}}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}