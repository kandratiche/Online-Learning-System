import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function LogInPage() {

    const navigate = useNavigate();
    const [choose, setChoose] = useState('username');

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="w-100 max-[768px]:w-75 border rounded-xl p-6">
                <p className="text-2xl font-bold mb-5">Mearn</p>
                <hr />
                <p className="text-xl font-bold mt-5">Log In</p>
                <form className="flex flex-col gap-2 mt-5">
                    {choose === "username" && (
                        <>
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" name="username" className="input" placeholder="Enter the username"/>
        
                            <label htmlFor="pass">Password</label>
                            <input id="pass" type="password" name="pass" className="input" placeholder="Enter the password" />
                            <p id="password-error" className="hidden mt-5 text-red-500">
        
                            </p>
                            <button className="btn btn-primary mt-5" onClick={() => navigate('/')}>Log In</button>
                            <p className="text-sm underline  cursor-pointer text-center mt-2" onClick={() => setChoose("email")}>Log in with Email</p>
                            <p className="text-sm underline cursor-pointer text-center mt-2" onClick={() => navigate('/sign-up')}>Dont have account?</p>
                        </>
                    )}
                    {choose === "email" && (
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
                    )}
                    
                </form>
            </div>
        </div>
    )
}