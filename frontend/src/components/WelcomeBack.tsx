import "../styles/welcomeback.css";
import exploreImage from "../images/explore-courses.svg"

export default function WelcomeBack({ user, setActive }) {

    if(!user){
        return(
            <div className="welcomeback">
                <h2>Welcome Back, Guest</h2>
                <p>Let`s explore new courses</p>
                <button onClick={() => setActive("Find Courses")} className="welcomeback-explore-button">Explore Courses</button>
                <img src={exploreImage} alt="explore" className="welcomeback-image"/>
            </div>
        )
    }

    return(
        <div className="welcomeback">
            <h2>Welcome Back, {user.name}</h2>
            <p>Let`s explore new courses</p>
            <button onClick={() => setActive("Find Courses")} className="welcomeback-explore-button">Explore Courses</button>
            <img src={exploreImage} alt="explore" className="welcomeback-image"/>
        </div>
    )
}