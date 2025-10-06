import { useState, useEffect } from "react";
import "../styles/settings.css";

export default function Settings() {

    const themeNow = localStorage.getItem('theme');
    const [theme, setTheme] = useState(themeNow);
    
    useEffect(() => {
        document.body.className = ""; 
        localStorage.setItem('theme', theme || 'light');
        document.body.classList.add(`${theme}-theme`);
    }, [theme]);

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <p>Theme: {theme}</p>
            <div className="radio-group">
                <label className="radio-option">
                    <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} />
                    <span className="custom-radio"></span>
                    Light
                </label>

                <label className="radio-option">
                    <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
                    <span className="custom-radio"></span>
                    Dark
                </label>
            </div>
        </div>
    );
}
