import "../styles/profilecomponent.css"
import profileImage from "../images/profile-example.webp"

export default function ProfileComponent({ user }) {

    const enrolledCourses = user?.courses?.length;
    const completedCourses = user?.courses?.filter((c) => c.progress === 100).length;


    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-details">
                    <img src={profileImage} alt="Profile" className="profile-image"/>
                    <div className="profile-info">
                        <div>
                            <p><strong>Name:</strong> {user?.name || "Guest"}</p>
                            <p><strong>Email:</strong> {user?.email || ""}</p>
                            <p><strong>Bio:</strong> Empty yet</p>
                        </div>
                        <div>
                            <p><strong>Enrolled courses:</strong> {enrolledCourses}</p>
                            <p><strong>Completed courses:</strong> {completedCourses}</p>
                        </div>
                    </div>
                    <button className="profile-edit-button">Edit Profile</button>
                </div>
        </div>
    )
}