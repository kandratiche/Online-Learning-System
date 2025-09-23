import "../styles/courseprogress.css";

export default function CourseProgress() {

    const courses = [
        {
            id: 1,
            title: "React for Beginners",
            progress: 70
        },
        {
            id: 2,
            title: "Advanced JavaScript",
            progress: 45
        }
    ];

    return(
        <div className="course-progress">
            <h2>Continue learning</h2>
            <div className="course-progress-cards">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <h3>{course.title}</h3>
                        <p>Progress: {course.progress}%</p>
                        <button className="course-card-button">Continue</button>
                        <div className="progress-bar">
                            <div className="progress" style={{width: `${course.progress}%`}}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}