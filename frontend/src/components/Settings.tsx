import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    username: string;
    name: string;
    surname: string;
    email: string;
} 

export default function Settings() {

    const navigate = useNavigate();

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "night"
    );

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        const savedUser = localStorage.getItem("user");
        if(savedUser) setUser(JSON.parse(savedUser));

    }, [theme]);

    const handleLogOut = () => {
        if(user) {
            localStorage.removeItem("user");
        }
        navigate("/");
    };

    return (
        <div className="flex flex-col h-fit w-315 max-[768px]:w-75 max-[768px]:ml-0 bg-zinc-200 dark:bg-black dark:text-white rounded-xl p-6 mt-10 ml-10">
            <p className="text-2xl font-bold">Settings</p>
            <p className="mt-5 font-bold">Change Theme</p>

            <div className="mt-5 flex gap-5 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="theme"
                        value="light"
                        className="radio"
                        checked={theme === "light"}
                        onChange={() => setTheme("light")}
                    />
                    <span>Light</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="theme"
                        value="dark"
                        className="radio"
                        checked={theme === "night"}
                        onChange={() => setTheme("night")}
                    />
                    <span>Dark</span>
                </label>
            </div>
            <button className="btn btn-error w-fit mt-6" onClick={handleLogOut}>Log Out</button>
        </div>
        );
    }
