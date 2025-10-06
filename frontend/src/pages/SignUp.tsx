import "../styles/signuppage.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { registerUser } from "../App"

export default function SingUp() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert("Account created successfully!");
            navigate("/log-in");
        } catch (err) {
            console.error(err);
            alert("Error creating account");
        }
    };

    return(
        <div className="signup-page">
            <div className="signup-container">
                <h1>Mearn</h1>
                <hr />
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="email">Your Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Your Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input type="submit" value="Sign Up" />
                </form>
                <p onClick={() => navigate("/log-in")} className="signup-have-account">
                    Already have account?
                </p>
            </div>
        </div>
    )
}