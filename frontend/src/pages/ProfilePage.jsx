import "../styles/profilepage.css"
import Header from "../components/Header";
import ProfileComponent from "../components/ProfileComponent";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    console.log(user)

    return(
        <>
            <Header/>
            <div className="profile-page">
                <ProfileComponent user={user}/>
            </div>
        </>
    )
}