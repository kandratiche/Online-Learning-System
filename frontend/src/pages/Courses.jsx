import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/coursePage.css";
import Header from "../components/Header";
import axios from "axios";

export default function CoursePage() {
const { id } = useParams(); 
const [course, setCourse] = useState(null);
const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/api/courses/${id}`);
        const courseData = await res.json();

        const userCourse = user?.courses?.find(c => c.course_id === courseData._id);
        if (userCourse) {


          courseData.lessons = courseData.lessons.map((lesson, i) => ({
          ...lesson,
          completed: userCourse?.lessons?.[i]?.completed || false,
        }));

        } else {
          console.log("⚠️ No progress found for this course in user.courses");
        }

        setCourse(courseData);
      } catch (err) {
        console.error("❌ Error fetching course:", err);
      }
    };
  fetchCourse();
  }, [id, user]);


const complete = async (lessonIndex) => {
  try {
    const res = await axios.post(`${process.env.API_URL}/api/users/progress`, {
      userId: user._id,      
      courseId: course._id,  
      lessonIndex
    });

    localStorage.setItem("user", JSON.stringify(res.data.user));

    setCourse(prev => {
      const updated = { ...prev };
      updated.lessons[lessonIndex].completed = true;
      return updated;
    });
  } catch (err) {
    console.error("❌ Error completing lesson:", err.response?.data || err);
    alert(err.response?.data?.message || "Server error");
  }
  };

if (!course) return <h2>Loading...</h2>;

return (
  <>
    <Header />
    <div className="coursepage-container">
      <div className="coursepage-information">
        <h1>{course.title}</h1>
        <h3>
          <strong>Language:</strong> {course.language}
        </h3>
        <h3>
          <strong>About the course:</strong>
        </h3>
        <p className="coursepage-information-bio">{course.bio}</p>
        <div className="coursepage-lessons">
          {Array.isArray(course.lessons) && course.lessons.length > 0 ? (
            course.lessons.map((lesson, i) => (
              <div 
                onClick={() => complete(i)} 
                key={i} 
                className={`coursepage-lesson-${lesson.completed ? "completed" : "not-completed"}`}
                >
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
