import Dashboard from "../components/Dashboard";
import FindCourses from "../components/FindCourses";
import Header from "../components/Header";
import MyCourses from "../components/MyCourses";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Settings from "../components/Settings";
import Support from "../components/Support";
import Certificates from "../components/Certificates";
import Discussion from "../components/Discussion";

export default function HomePage() {

    const [activeItem, setActiveItem] = useState("Dashboard");
    const [user, setUser] = useState(null);

    const menuItems = [
        "Dashboard",
        "My Courses",
        "Find Courses",
        "Certificates",
        "Discussion Forum",
        "Support",
        "Settings",
    ];

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);
    
    console.log(user);

    return(
        <div className="flex flex-col h-screen w-screen">
            <Header/>
            <div className="flex max-[768px]:flex-col max-[768px]:items-center">
                <Navbar menuItems={menuItems} activeItem={activeItem} setActiveItem={setActiveItem}/>
                {activeItem === "Dashboard" && <Dashboard/>}
                {activeItem === "My Courses" && <MyCourses/>}
                {activeItem === "Find Courses" && <FindCourses/>}
                {activeItem === "Certificates" && <Certificates/>}
                {activeItem === "Discussion Forum" && <Discussion/>}
                {activeItem === "Support" && <Support/>}
                {activeItem === "Settings" && <Settings/>}
            </div>
        </div>
    )
}