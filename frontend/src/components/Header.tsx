import { useNavigate } from "react-router-dom";
import "../styles/header.css"

export default function Header() {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const goToHome = () => {
        navigate("/home");
    };

    const goToAllCourses = () => {
        navigate("/courses");
    }

    const goToProfile = () => {
        navigate("/profile");
    };

    if (!user) {
        return(
            <header className="app-header">
                <h1 className="app-header-company">Mearn</h1>
                <p className="app-header-info" onClick={goToHome}>Home</p>
                <p className="app-header-info">Courses</p>
                <p className="app-header-info">Support</p>
                <div className="app-header-profile" onClick={goToProfile}>
                    <p>Guest</p>
                </div>
            </header>
        )
    }

    return (
        <header className="app-header">
            <h1 className="app-header-company">Mearn</h1>
            <p className="app-header-info" onClick={goToHome}>Home</p>
            <p className="app-header-info" onClick={goToAllCourses}>Courses</p>
            <p className="app-header-info">Support</p>
            <div className="app-header-profile" onClick={goToProfile}>
                <p>{user.name}</p>
            </div>
        </header>
    );
}