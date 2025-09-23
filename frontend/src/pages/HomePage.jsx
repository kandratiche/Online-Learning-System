import Certificates from "../components/Certificates";
import CourseProgress from "../components/CourseProgress";
import Header from "../components/Header";
import MyCourses from "../components/MyCourses";
import NavBar from "../components/Navbar";
import WelcomeBack from "../components/WelcomeBack";
import { useState } from "react";

export default function HomePage() {

    const [active, setActive] = useState("Dashboard");

    const items = ["Dashboard", "My Courses", "Certificates"];

    return(
        <>
            <Header/>
            <div className="homepage-content">
                <div className="homepage-navbar">
                    <NavBar active={active} setActive={setActive} items={items}/>
                </div>
                <div className="homepage-container">
                    {active === "Dashboard" && (
                        <>                        
                            <WelcomeBack/>
                            <CourseProgress/>
                        </>
                    )}
                    {active === "My Courses" && (
                        <>
                            <MyCourses/>
                        </>
                    )}
                    {active === "Certificates" && (
                        <>
                            <Certificates/>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}