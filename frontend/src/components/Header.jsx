import { useNavigate } from "react-router-dom";
import "../styles/header.css"

export default function Header() {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    const goToProfile = () => {
        navigate("/profile");
    };

    return (
        <header className="app-header">
            <h1 className="app-header-company">Mearn</h1>
            <p className="app-header-info" onClick={goToHome}>Home</p>
            <p className="app-header-info">Courses</p>
            <p className="app-header-info">Support</p>
            <div className="app-header-profile" onClick={goToProfile}>
                <p>Your Name</p>
            </div>
        </header>
    );
}