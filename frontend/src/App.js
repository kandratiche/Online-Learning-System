import './App.css';
import { Routes, Route, Router } from "react-router-dom";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Courses from './pages/Courses';
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001/api" });

export const getCourses = () => API.get("/courses");
export const getCourseById = (_id) => API.get(`/courses/${_id}`);
export const createCourse = (course) => API.post("/courses", course);

export const registerUser = (userData) => API.post("/users/register", userData);
export const getUser = (id) => API.get(`/users/${id}`);
export const updateProgress = (data) => API.put("/users/progress", data);

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/course/:id" element={<Courses />} />
      </Routes>
  );
}

export default App;
