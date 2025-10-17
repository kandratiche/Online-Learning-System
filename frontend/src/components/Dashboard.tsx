import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  progress: number;
}
interface User {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  created_at: string;
  courses: Course[];
}

export default function Dashboard() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = (localStorage.getItem("user"));
        if(savedUser) setUser(JSON.parse(savedUser));
    }, [])

    const courses = [
        { id: 1, name: "React for Beginners", progress: 10 },
        { id: 2, name: "DBMS", progress: 40 },
        { id: 3, name: "Data Science", progress: 35 },
        { id: 4, name: "HTML & CSS", progress: 20 },
        { id: 5, name: "Python Fundamentals", progress: 100 },
    ];

    const notCompletedCourses = courses.filter((course) => course.progress < 100);

    return (
        <div className="flex flex-col max-[768px]:items-center max-[768px]:ml-0 ml-10 mt-10 dark:text-white">
            <div className="w-315 max-[768px]:w-75 max-[768px]:flex max-[768px]:flex-col rounded-xl p-6 bg-zinc-200 dark:bg-black">
                <p className="text-2xl font-bold">Welcome Back, {user ? ( user?.username ) : ("Guest")}</p>
                <p className="text-lg mt-5">Let's explore new courses!</p>
                <button className="bg-white text-black py-2 px-3 mt-5 rounded-lg cursor-pointer transition-all duration-300 hover:scale-98 hover:bg-zinc-100">Explore Courses</button>
            </div>
            <div className="w-315 max-[768px]:w-75 rounded-xl mt-10 p-6 bg-zinc-200 dark:bg-black">
                <p className="text-2xl font-bold">Continue learning!</p>
                <div className="flex flex-wrap w-full mt-6 gap-5">
                    {notCompletedCourses.map((course) => (
                        <div key={course.id} className="w-97 p-6 flex flex-col border-1 rounded-xl">
                            <p className="text-lg font-bold">{course.name}</p>
                            <div className="w-full bg-gray-700 h-3 rounded-full mt-2">
                                <div
                                className="bg-white h-3 rounded-full transition-all duration-500"
                                style={{ width: `${course.progress}%` }}
                                >
                                </div>
                            </div>
                            <p className="mt-3">{course.progress}% completed</p>
                            <button className="bg-white text-black mt-3 rounded-lg py-1 cursor-pointer transition-all duration-300 hover:scale-98 hover:bg-zinc-100">Continue</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}