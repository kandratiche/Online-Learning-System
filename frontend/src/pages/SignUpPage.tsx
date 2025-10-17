import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../App";

export default function SignUpPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        surname: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        name: "",
        surname: "",
        email: "",
        password: "",
    });

    const [tip, setTip] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            console.log("userdata: ", formData)
            await registerUser(formData);
            navigate("/log-in");
        } catch (err: any) {
            console.error(err);

            const message = err?.response?.data?.message || "Something went wrong. Please try again.";

            setErrors((prev) => ({
                ...prev,
                password: message,
            }));
        }
    };

    const checkInputs = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = { username: "", name: "", surname: "", email: "", password: "" };
        let hasError = false;

        const { username, name, surname, email, password } = formData;

        if (!username || !name || !surname || !email || !password) {
            newErrors.password = "Please fill out all fields.";
            hasError = true;
        }

        if (email && !/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
            newErrors.email = "Please enter a valid email.";
            hasError = true;
        }

        if (password && (password.length < 8 || password.length > 32)) {
            newErrors.password = "Password must be between 8 and 32 characters.";
            hasError = true;
        } else if (password && !/[A-Z]/.test(password)) {
            newErrors.password = "Password must contain at least one uppercase letter.";
            hasError = true;
        } else if (password && !/[0-9]/.test(password)) {
            newErrors.password = "Password must contain at least one number.";
            hasError = true;
        }

        setErrors(newErrors);

        if (!hasError) handleSubmit();
    };

    return (
    <div className="flex w-screen h-screen justify-center items-center">
        <div className="w-100 max-[768px]:w-75 border rounded-xl p-6">
            <p className="text-2xl font-bold mb-5">Mearn</p>
            <hr />
            <p className="text-xl font-bold mt-5">Sign Up</p>
            <form className="flex flex-col gap-2 mt-5" onSubmit={checkInputs}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    className="input"
                    placeholder="Enter the username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <p className="text-red-500">{errors.username}</p>}

                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}

                <label htmlFor="surname">Surname</label>
                <input
                    id="surname"
                    type="text"
                    name="surname"
                    className="input"
                    placeholder="Enter your surname"
                    value={formData.surname}
                    onChange={handleChange}
                />
                {errors.surname && <p className="text-red-500">{errors.surname}</p>}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <div className="flex items-center relative group">
                <label htmlFor="password">Password</label>
                <div
                    className="flex w-5 h-5 bg-zinc-400 text-white rounded-full items-center justify-center ml-2 cursor-pointer"
                    onMouseEnter={() => setTip(true)}
                    onMouseLeave={() => setTip(false)}
                >
                    ?
                </div>
                {tip && (
                    <div className="absolute left-8 bottom-full mb-1 w-56 text-sm bg-black text-white p-2 rounded-md transition-opacity duration-300 z-10">
                    <p className="font-semibold">Password must contain:</p>
                    <ul className="list-disc ml-4 mt-1">
                        <li>8–32 characters</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one number</li>
                    </ul>
                    </div>
                )}
                </div>

                <input
                    id="password"
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Enter the password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}

                <button type="submit" className="btn btn-primary mt-5">
                Sign Up
                </button>

                <p
                className="text-sm text-center underline cursor-pointer mt-2"
                onClick={() => navigate("/log-in")}
                >
                Already have an account?
                </p>
            </form>
        </div>
    </div>
    );
}
