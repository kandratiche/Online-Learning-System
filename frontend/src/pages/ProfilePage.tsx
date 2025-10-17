import { useState } from "react";
import Header from "../components/Header";

export default function ProfilePage() {

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
                                        <input className="input" type="text" name="" id="" value="NAME" readOnly/>
                                    </div>
                                    <div className="flex w-110 max-[768px]:flex-col max-[768px]:w-60 max-[768px]:items-start justify-between items-center">
                                        <p className="max-[768px]:ml-1">Surname: </p>
                                        <input className="input" type="text" name="" id="" value="SURNAME" readOnly/>
                                    </div>
                                    <div className="flex w-110 max-[768px]:flex-col max-[768px]:w-60 max-[768px]:items-start justify-between items-center">
                                        <p className="max-[768px]:ml-1">Age: </p>
                                        <input className="input" type="text" name="" id="" value="AGE" readOnly/>
                                    </div>
                                    <div className="flex w-110 max-[768px]:flex-col max-[768px]:w-60 max-[768px]:items-start justify-between items-center">
                                        <p className="max-[768px]:ml-1">Email: </p>
                                        <input className="input" type="text" name="" id="" value="EMAIL" readOnly/>
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
                                    <p>Username: </p>
                                    <p>Name: </p>
                                    <p>Surname: </p>
                                    <p>Age: </p>
                                    <p>Email: </p>
                                    <p>Member since: 13.10.2025</p>
                                </div>
                                <div className="flex flex-col ml-10 max-[768px]:ml-0 max-[768px]:mt-10 gap-5 font-bold">
                                    <p>Enrolled Courses: 5</p>
                                    <p>Completed Courses: 1</p>
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