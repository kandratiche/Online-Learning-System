import { useNavigate } from "react-router-dom"

export default function Header() {
    
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");


    if(!user) {
        return (
            <header className="flex w-ful max-[768px]:p-5 h-16 bg-zinc-200 dark:bg-black items-center">
                <p className="text-2xl font-bold max-[768px]:ml-0 ml-15 cursor-pointer" onClick={() => navigate('/home')}>Mearn</p>
                <ul className="flex gap-10 ml-65 max-[768px]:hidden">
                    <li className="text-lg cursor-pointer transition-all duration-300 hover:scale-95" onClick={() => navigate('/home')}>Home</li>
                    <li className="text-lg cursor-pointer transition-all duration-300 hover:scale-95">All Courses</li>
                </ul>
                <div className="absolute max-[768px]:right-5 right-15 p-2 px-4 rounded-xl bg-white text-black cursor-pointer transition-all duration-300 hover:scale-95"
                    onClick={() => navigate('/profile')}>
                    Guest
                </div>
            </header>
        )
    }
    
    
    return (
        <header className="flex w-ful max-[768px]:p-5 h-16 bg-zinc-200 dark:bg-black items-center">
            <p className="text-2xl font-bold max-[768px]:ml-0 ml-15 cursor-pointer" onClick={() => navigate('/home')}>Mearn</p>
            <ul className="flex gap-10 ml-65 max-[768px]:hidden">
                <li className="text-lg cursor-pointer transition-all duration-300 hover:scale-95" onClick={() => navigate('/home')}>Home</li>
                <li className="text-lg cursor-pointer transition-all duration-300 hover:scale-95">All Courses</li>
            </ul>
            <div className="absolute max-[768px]:right-5 right-15 p-2 px-4 rounded-xl bg-white text-black cursor-pointer transition-all duration-300 hover:scale-95"
                onClick={() => navigate('/profile')}>
                {user.username}
            </div>
        </header>
    )
}