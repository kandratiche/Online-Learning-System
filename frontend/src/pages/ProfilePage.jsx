import "../styles/profilepage.css"
import Header from "../components/Header";
import ProfileComponent from "../components/ProfileComponent";

export default function ProfilePage() {
    return(
        <>
            <Header/>
            <div className="profile-page">
                <ProfileComponent/>
            </div>
        </>
    )
}