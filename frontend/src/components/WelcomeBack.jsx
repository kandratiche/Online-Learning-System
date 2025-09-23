import "../styles/welcomeback.css";
import explore_image from "../images/explore-courses.svg"

export default function WelcomeBack() {
    return(
        <div className="welcomeback">
            <h2>Welcome Back, Your Name</h2>
            <p>Let`s explore new courses</p>
            <button className="welcomeback-explore-button">Explore Courses</button>
            <img src={explore_image} alt="explore" className="welcomeback-image"/>
        </div>
    )
}