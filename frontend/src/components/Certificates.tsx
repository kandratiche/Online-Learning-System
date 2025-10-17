export default function Certificates() {

    const courses = [
        { id: 1, name: "React for Beginners", progress: 10 },
        { id: 2, name: "DBMS", progress: 40 },
        { id: 3, name: "Data Science", progress: 35 },
        { id: 4, name: "HTML & CSS", progress: 20 },
        { id: 5, name: "Python Fundamentals", progress: 100 },
    ];

    const filtered = courses.filter((course) => course.progress === 100);

    return(
        <div className="flex flex-col w-315 max-[768px]:w-75 max-[768px]:ml-0 bg-zinc-200 dark:bg-black mt-10 ml-10 p-6 rounded-xl">
            <p className="text-2xl font-bold">Your Certificates</p>
            <div className="flex flex-wrap rounded-xl gap-10 mt-6 w-full">
                {filtered.map((course) => (
                    <div key={course.id} className="flex flex-col flex-wrap justify-between w-75 min-h-50 gap-5 bg-white dark:text-black p-6 rounded-lg">
                        <div className="flex flex-col gap-3">
                            <p className="text-xl font-bold">{course.name}</p>
                            <p className="text-green-500">Completed: 13.10.2025</p>
                        </div>
                        <button className="btn dark:hover:bg-zinc-800">Download</button>
                    </div>
                ))}
            </div>
        </div>
    )
}