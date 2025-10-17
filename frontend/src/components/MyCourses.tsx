export default function MyCourses() {
    const courses = [
        { id: 1, name: "React for Beginners", progress: 10 },
        { id: 2, name: "DBMS", progress: 40 },
        { id: 3, name: "Data Science", progress: 35 },
        { id: 4, name: "HTML & CSS", progress: 20 },
        { id: 5, name: "Python Fundamentals", progress: 100 },
    ];

    return (
        <div className="bg-zinc-200 w-315 max-[768px]:w-75 max-[768px]:ml-0 dark:bg-black rounded-xl ml-10 mt-10 p-6">
            <p className="text-2xl font-bold">Your Courses</p>
            <p>{courses.length} Courses found</p>

            <div className="flex flex-col gap-5 mt-5">
                {courses.map((course) => (
                    <div
                    key={course.id}
                    className="flex flex-col max-[768px]:w-61 bg-zinc-100 dark:bg-white dark:text-black p-4 rounded-xl w-300 cursor-pointer transition-all duration-300 hover:scale-99"
                    >
                        <h3 className="font-semibold">{course.name}</h3>
                        <div className="w-full bg-zinc-700 dark:bg-gray-400 h-3 rounded-full mt-2">
                            <div
                            className="bg-zinc-400 dark:bg-black h-3 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                            >
                            </div>
                        </div>
                        <p className="text-sm mt-1">{course.progress}% completed</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
