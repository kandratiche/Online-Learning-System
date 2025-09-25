import './App.css';
import { Routes, Route, Router } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Courses from './pages/Courses';
import axios from "axios";
import SingUp from './pages/SignUp';
import Login from './pages/Login';
import AllCourses from './pages/AllCourses';

const API = axios.create({ baseURL: "http://localhost:5001/api" });

export const getCourses = () => API.get("/courses");
export const getCourseById = (_id) => API.get(`/courses/${_id}`);
export const createCourse = (course) => API.post("/courses", course);

export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);
export const getUser = (id) => API.get(`/users/${id}`);
export const updateProgress = (data) => API.put("/users/progress", data);
export const enrollCourse = (userId, courseId) =>  API.post("/users/enroll", { userId, courseId });


function App() {
  return (
      <Routes>
        <Route path='/log-in' element={<Login />} />
        <Route path='/sign-up' element={<SingUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/course/:id" element={<Courses />} />
        <Route path='/courses' element={<AllCourses/>} />
      </Routes>
  );
}

export default App;
