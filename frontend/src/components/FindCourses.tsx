import { useState } from "react";

export default function FindCourses() {

    const [searchTerm, setSearchTerm] = useState("");

    const courses = [
        { id: 1, name: "React for Beginners", progress: 10 },
        { id: 2, name: "DBMS", progress: 40 },
        { id: 3, name: "Data Science", progress: 35 },
        { id: 4, name: "HTML & CSS", progress: 20 },
        { id: 5, name: "Python Fundamentals", progress: 100 },
    ];

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className="w-315 max-[768px]:w-75 max-[768px]:ml-0 bg-zinc-200 dark:bg-black mt-10 ml-10 p-6 rounded-xl">
            <p className="text-2xl font-bold">Find Courses</p>
            <input 
                type="text" 
                placeholder="Type course name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input mt-5 text-black dark:text-white" 
                />
            <div className="mt-5 flex flex-col gap-3">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                            <div
                            key={course.id}
                            className="bg-zinc-100 dark:bg-white dark:text-black p-3 rounded-lg flex justify-between items-center cursor-pointer 
                                        transition-all duration-300 hover:scale-99 hover:bg-zinc-300"
                            >
                                <p>{course.name}</p>
                                <span className="text-sm text-gray-400 inline md:hidden">{course.progress}%</span>
                                <span className="text-sm text-gray-400 hidden md:inline">Your progress: {course.progress}%</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 italic">No courses found</p>
                    )}
            </div>
        </div>
    )
}