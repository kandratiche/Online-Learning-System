import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { loginUser } from "../App";

export default function LogInPage() {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e?: React.FormEvent) => {
        if(e) e.preventDefault();

        setError("");

        try {
            const res = await loginUser(formData); 
            const user = res.data.user;

            localStorage.setItem("user", JSON.stringify(user));

            navigate("/home");
        } catch (err: any) {
            console.error(err);            
            const message = err?.response?.data?.message || "Something went wrong. Please try again.";
            setError(message);
        }
    };
    
    const [choose, setChoose] = useState('username');

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="w-100 max-[768px]:w-75 border rounded-xl p-6">
                <p className="text-2xl font-bold mb-5">Mearn</p>
                <hr />
                <p className="text-xl font-bold mt-5">Log In</p>
                <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
                    {choose === "username" && (
                        <>
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                className="input" 
                                placeholder="Enter the username"
                                value={formData.username}
                                onChange={handleChange}    
                            />
        
                            <label htmlFor="pass">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="input" 
                                placeholder="Enter the password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {error && (
                                <p id="password-error" className="text-red-500">
                                    {error}
                                </p>
                            )}
                            <input type="submit" className="btn btn-primary mt-5" value="Log In"/>
                            {/* <p className="text-sm underline  cursor-pointer text-center mt-2" onClick={() => setChoose("email")}>Log in with Email</p> */}
                            <p className="text-sm underline cursor-pointer text-center mt-2" onClick={() => navigate('/')}>Dont have account?</p>
                        </>
                    )}
                    {/* COMING SOON */}
                    {/* {choose === "email" && (
                        <>
                            <label htmlFor="username">Email</label>
                            <input id="email" type="email" name="email" className="input" placeholder="Enter the email"/>
        
                            <label htmlFor="pass">Password</label>
                            <input id="pass" type="password" name="pass" className="input" placeholder="Enter the password" />
                            <p id="password-error" className="hidden mt-5 text-red-500">
        
                            </p>
                            <button className="btn btn-primary mt-5" onClick={() => navigate('/')}>Log In</button>
                            <p className="text-sm underline  cursor-pointer text-center mt-2" onClick={() => setChoose("username")}>Log in with Username</p>
                            <p className="text-sm underline cursor-pointer text-center mt-2" onClick={() => navigate('/sign-up')}>Dont have account?</p>
                        </>
                    )} */}
                </form>
            </div>
        </div>
    )
}