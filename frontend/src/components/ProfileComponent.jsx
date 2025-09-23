import "../styles/profilecomponent.css"
import profileImage from "../images/profile-example.webp"

export default function ProfileComponent() {
    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-details">
                <img src={profileImage} alt="Profile" className="profile-image"/>
                <p><strong>Name:</strong> Your Name</p>
                <p><strong>Age:</strong> 18</p>
                <p><strong>Email:</strong></p>
                <p><strong>Bio:</strong> A brief bio about yourself.</p>
                <button className="profile-edit-button">Edit Profile</button>
            </div>
        </div>
    )
}