import { Route, Routes } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import { useEffect } from 'react'

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });


export const getCourses = () => API.get("/api/courses");
export const getCourseById = (_id: string) => API.get(`/api/courses/${_id}`);
export const createCourse = (course: Object) => API.post("/api/courses", course);

export const registerUser = (userData: Object) => API.post("/api/users/register", userData);
export const loginUser = (userData: Object) => API.post("/api/users/login", userData);
export const getUser = (id: string) => API.get(`/api/users/${id}`);
export const updateUser = (id: string, data: FormData) => API.put(`/api/users/${id}`, data);
export const updateProgress = (data: any) => API.put("/api/users/progress", data);
export const enrollCourse = (userId: string, courseId: string) =>  API.post("/api/users/enroll", { userId, courseId });

function App() {

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    document.body.classList.add(`${theme}-theme`);
  })

  return (
    <Routes>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/' element={<SignUpPage/>}/>
      <Route path='/log-in' element={<LogInPage/>}/>
      <Route path="/profile/:id" element={<ProfilePage/>}/>
    </Routes>
  )
}

export default App
