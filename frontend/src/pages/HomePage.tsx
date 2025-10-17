import Dashboard from "../components/Dashboard";
import FindCourses from "../components/FindCourses";
import Header from "../components/Header";
import MyCourses from "../components/MyCourses";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Settings from "../components/Settings";
import Support from "../components/Support";
import Certificates from "../components/Certificates";
import Discussion from "../components/Discussion";

export default function HomePage() {

    const [activeItem, setActiveItem] = useState("Dashboard");

    const menuItems = [
        "Dashboard",
        "My Courses",
        "Find Courses",
        "Certificates",
        "Discussion Forum",
        "Support",
        "Settings",
    ];

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