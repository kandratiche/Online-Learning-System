import { useState, useEffect } from "react";
import Certificates from "../components/Certificates";
import CourseProgress from "../components/CourseProgress";
import Header from "../components/Header";
import MyCourses from "../components/MyCourses";
import NavBar from "../components/Navbar";
import WelcomeBack from "../components/WelcomeBack";
import FindCourses from "../components/FindCourses";

export default function HomePage() {
    const [active, setActive] = useState("Dashboard");
    const [user, setUser] = useState(null);

    const items = ["Dashboard", "My Courses", "Certificates"];
    const quickAccessItems = ["Find Courses", "Discussion Forum", "Settings"];

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    console.log(user)

    return (
        <>
            <Header/>
            <div className="homepage-content">
            <div className="homepage-navbar">
                <NavBar active={active} setActive={setActive} items={items} quickAccessItems={quickAccessItems}/>
            </div>
            <div className="homepage-container">
                {active === "Dashboard" && (
                <>
                    <WelcomeBack user={user} setActive={setActive}/>
                    <CourseProgress user={user} />
                </>
                )}
                {active === "My Courses" && <MyCourses user={user} />}
                {active === "Certificates" && <Certificates user={user} />}
                {active === "Find Courses" && <FindCourses user={user}/>}
            </div>
            </div>
        </>
    );
}
