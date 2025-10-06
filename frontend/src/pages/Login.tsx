import "../styles/loginpage.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { loginUser } from "../App"

export default function Login() {

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
            const res = await loginUser(formData); 
            const user = res.data.user;

            localStorage.setItem("user", JSON.stringify(user));

            alert("Logged in successfully");
            navigate("/home");
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    };

    return(
        <div className="login-page">
            <div className="login-container">
                <h1>Mearn</h1>
                <hr />
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
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
                <input type="submit" value="Log In" />
                </form>
                <p
                    onClick={() => navigate("/")}
                    className="login-have-account"
                >
                    Don’t have account?
                </p>
            </div>
        </div>
    )
}