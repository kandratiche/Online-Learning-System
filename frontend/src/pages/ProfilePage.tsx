import { useState, useEffect } from "react";
import Header from "../components/Header";

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

export default function ProfilePage() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const dateStr = user?.created_at;
    const date = new Date(dateStr || "2007-02-02T14:32:20.490Z");
        
    const options: Intl.DateTimeFormatOptions = { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
    };

    const formatted = date.toLocaleDateString("en-US", options);


    const enrolledCourses = user?.courses?.length;
    const completedCourses = user?.courses?.filter((c: any) => c.progress === 100).length;

    const [editing, setEditing] = useState(false);
    const [_, setIcon] = useState('some');
    const [modal, setModal] = useState(false);

    return (
        <div className="flex flex-col w-screen h-screen">
            <Header/>
            <div className="flex flex-col items-center p-6 w-full">
                {editing ? (
                    <>
                        <p className="w-fit h-fit text-2xl font-bold p-2 px-4 rounded-xl bg-zinc-200 dark:bg-black">Edit profile</p>
                        <div className="flex flex-col w-315 max-[768px]:w-75 mt-10 bg-zinc-200 dark:bg-black rounded-xl p-6">
                            <div className="flex max-[768px]:flex-col">
                                <div className="avatar h-48">
                                    <div className="w-48 rounded-full">
                                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                                        <button className="btn absolute left-30 bottom-0 w-fit self-end rounded-full mt-10" onClick={() => setIcon('some')}>Edit</button>
                                    </div>
                                </div>
                                <div className="flex flex-col ml-10 max-[768px]:ml-0 max-[768px]:mt-5 gap-5 font-bold">
                                    <div className="flex w-110 max-[768px]:flex-col max-[768px]:w-60 max-[768px]:items-start justify-between items-center">
                                        <p className="max-[768px]:ml-1">Username: </p>
                                        <input className="input" type="text" name="" id="" placeholder="Enter the new username" />
                                    </div>
                                    <div className="flex w-110 max-[768px]:flex-col max-[768px]:w-60 max-[768px]:items-start justify-between items-center">
                                        <p className="max-[768px]:ml-1">Name: </p> 
                                        <input className="input" type="text" name="" id="" value={user?.name} readOnly/>
                                    </div>
                                    <div className="flex w-110 max-[768px]:flex-col max-[768px]:w-60 max-[768px]:items-start justify-between items-center">
                                        <p className="max-[768px]:ml-1">Surname: </p>
                                        <input className="input" type="text" name="" id="" value={user?.surname} readOnly/>
                                    </div>
                                    <div className="flex w-110 max-[768px]:flex-col max-[768px]:w-60 max-[768px]:items-start justify-between items-center">
                                        <p className="max-[768px]:ml-1">Email: </p>
                                        <input className="input" type="text" name="" id="" value={user?.email} readOnly/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-5">
                                <button className="btn w-fit self-end mt-10 bg-red-500 text-white hover:bg-red-700" onClick={() => setEditing(!editing)}>Cancel</button>
                                <button className="btn w-fit self-end mt-10" onClick={() => setModal(true)}>Save</button>
                            </div>
                        </div>
                        {modal && (
                            <div className="absolute top-0 w-screen h-screen bg-[rgba(0,0,0,0.5)]">
                                <article className="absolute bg-zinc-200 dark:bg-zinc-900 p-6 rounded-xl transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] dark:bg-black z-50  transition-all duration-300">
                                    <p>Are you sure?</p>
                                    <div className="flex justify-end gap-5">
                                        <button className="btn w-fit self-end mt-10 bg-red-500 text-white hover:bg-red-700" onClick={() => {setModal(false); setEditing(!editing)}}>Cancel</button>
                                        <button className="btn w-fit self-end mt-10 dark:bg-zinc-600 dark:hover:bg-zinc-700" onClick={() => {setModal(false); setEditing(!editing)}}>Save</button>
                                    </div>
                                </article>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <p className="w-fit h-fit text-2xl font-bold p-2 px-4 rounded-xl bg-zinc-200 dark:bg-black">Profile</p>
                        <div className="flex flex-col w-315 max-[768px]:w-75 mt-10 bg-zinc-200 dark:bg-black rounded-xl p-6">
                            <div className="flex max-[768px]:flex-col">
                                <div className="avatar h-48">
                                    <div className="w-48 rounded-full">
                                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                                    </div>
                                </div>
                                <div className="flex flex-col ml-10 max-[768px]:mt-10 max-[768px]:ml-0 gap-5 font-bold">
                                    <p>Username: {user?.username}</p>
                                    <p>Name: {user?.name}</p>
                                    <p>Surname: {user?.surname}</p>
                                    <p>Email: {user?.email}</p>
                                    <p>Member since: {formatted}</p>
                                </div>
                                <div className="flex flex-col ml-10 max-[768px]:ml-0 max-[768px]:mt-10 gap-5 font-bold">
                                    <p>Enrolled Courses: {enrolledCourses}</p>
                                    <p>Completed Courses: {completedCourses}</p>
                                </div>
                            </div>
                            <button className="btn w-fit self-end mt-10" onClick={() => setEditing(!editing)}>Edit</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}