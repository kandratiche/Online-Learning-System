import "../styles/welcomeback.css";
import explore_image from "../images/explore-courses.svg"

export default function WelcomeBack({ user }) {

    if(!user){
        return(
            <div className="welcomeback">
                <h2>Welcome Back, Guest</h2>
                <p>Let`s explore new courses</p>
                <button className="welcomeback-explore-button">Explore Courses</button>
                <img src={explore_image} alt="explore" className="welcomeback-image"/>
            </div>
        )
    }

    return(
        <div className="welcomeback">
            <h2>Welcome Back, {user.name}</h2>
            <p>Let`s explore new courses</p>
            <button className="welcomeback-explore-button">Explore Courses</button>
            <img src={explore_image} alt="explore" className="welcomeback-image"/>
        </div>
    )
}