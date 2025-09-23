import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/coursePage.css"
import Header from "../components/Header";

export default function CoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
    fetch(`http://localhost:5001/api/courses/${id}`)
        .then(res => res.json())
        .then(data => setCourse(data));
    }, []);



    if (!course) return <h2>Loading...</h2>;

    return (
        <>
            <Header/>
            <div className="coursepage-container">
                <div className="coursepage-information">
                    <h1>{course.title}</h1>
                    <h3><strong>Language:</strong> {course.language}</h3>
                    <h3><strong>About the course:</strong></h3><p className="coursepage-information-bio">{course.bio}</p>
                    <div className="coursepage-lessons">
                        {Array.isArray(course.lessons) && course.lessons.length > 0 ? (
                            course.lessons.map((lesson, i) => (
                            <div key={i} className={`coursepage-lesson-${lesson.completed ? "completed" : "not-completed"}`}>
                                <h3 className="coursepage-lesson-chapter">Chapter {i+1}</h3>
                                <p className="coursepage-lesson-chapter-name">{lesson.title ?? `Lesson ${i + 1}`}</p>
                            </div>
                            ))
                        ) : (
                            <p>No lessons available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
