import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../App";

interface Course {
    id: string;
    title: string;
    progress: number;
}

interface User {
    id: string;
    avatar: string;
    username: string;
    name: string;
    surname: string;
    email: string;
    created_at: string;
    courses: Course[];
}

export default function ProfilePage() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [editing, setEditing] = useState(false);
    const [usernameInput, setUsernameInput] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (!id) return;

        getUser(id)
            .then((res) => {
            setUser(res.data);
            setUsernameInput(res.data.username);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleSave = async () => {
        if (!id) return;

        const formData = new FormData();
        formData.append("username", usernameInput);
        if (avatarFile) {
            formData.append("avatar", avatarFile);
        }

        try {
            const updated = await updateUser(id, formData);
            setUser(updated.data);
            setEditing(!editing);
        } catch (err) {
            console.error(err);
        }
    };

    const dateStr = user?.created_at;
    const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    : "";

    const enrolledCourses = user?.courses?.length;
    const completedCourses = user?.courses?.filter((c) => c.progress === 100).length;

    return (
        <div className="flex flex-col w-screen h-screen">
            <Header />
            <div className="flex flex-col items-center p-6 w-full">
            {editing ? (
                <>
                <p className="w-fit text-2xl font-bold p-2 px-4 rounded-xl bg-zinc-200 dark:bg-black">
                    Edit profile
                </p>
                <div className="flex flex-col w-315 max-[768px]:w-75 mt-10 bg-zinc-200 dark:bg-black rounded-xl p-6">
                    <div className="flex max-[768px]:flex-col">
                        <div className="avatar h-48">
                            <div className="w-48 rounded-full relative">
                                <img
                                    src={
                                    avatarFile
                                        ? URL.createObjectURL(avatarFile)
                                        : user?.avatar
                                    }
                                />
                            </div>
                            <label className="btn absolute left-30 bottom-0 w-fit self-end rounded-full">
                                Edit
                                <input
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                    e.target.files && setAvatarFile(e.target.files[0])
                                }
                                />
                            </label>
                        </div>
                        <div className="flex flex-col ml-10 max-[768px]:ml-0 max-[768px]:mt-5 gap-5 font-bold">
                            <div className="flex justify-between items-center max-[768px]:flex-col max-[768px]:items-start">
                                <p>Username:</p>
                                <input
                                    className="input ml-1 max-[786px]:ml-0 max-[786px]:mt-1"
                                    type="text"
                                    value={usernameInput}
                                    onChange={(e) => setUsernameInput(e.target.value)}
                                    placeholder="Enter the new username"
                                />
                            </div>
                            <p>Name: {user?.name}</p>
                            <p>Surname: {user?.surname}</p>
                            <p>Email: {user?.email}</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-5 mt-5">
                        <button
                            className="btn bg-red-500 text-white hover:bg-red-700"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </button>
                        <button className="btn" onClick={() => setModal(true)}>
                            Save
                        </button>
                    </div>
                </div>

                {modal && (
                    <div className="absolute top-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
                        <article className="bg-zinc-200 dark:bg-zinc-900 p-6 rounded-xl dark:bg-black">
                            <p>Are you sure?</p>
                            <div className="flex justify-end gap-5 mt-3">
                                <button
                                    className="btn bg-red-500 text-white hover:bg-red-700"
                                    onClick={() => setModal(false)}
                                >
                                    Cancel
                                </button>
                                <button className="btn" onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        </article>
                    </div>
                )}
                </>
            ) : (
                <>
                <p className="w-fit text-2xl font-bold p-2 px-4 rounded-xl bg-zinc-200 dark:bg-black">
                    Profile
                </p>
                <div className="flex flex-col w-315 max-[768px]:w-75 mt-10 bg-zinc-200 dark:bg-black rounded-xl p-6">
                    <div className="flex max-[768px]:flex-col">
                        <div className="avatar h-48">
                            <div className="w-48 rounded-full">
                                <img src={user?.avatar} />
                            </div>
                        </div>
                        <div className="flex flex-col ml-10 max-[768px]:ml-0 max-[768px]:mt-10 gap-5 font-bold">
                            <p>Username: {user?.username}</p>
                            <p>Name: {user?.name}</p>
                            <p>Surname: {user?.surname}</p>
                            <p>Email: {user?.email}</p>
                            <p>Member since: {formattedDate}</p>
                            <p>Enrolled Courses: {enrolledCourses}</p>
                            <p>Completed Courses: {completedCourses}</p>
                        </div>
                    </div>
                    <button
                        className="btn w-fit self-end mt-10"
                        onClick={() => setEditing(!editing)}
                        >
                        Edit
                    </button>
                </div>
                </>
            )}
            </div>
        </div>
    );
}
