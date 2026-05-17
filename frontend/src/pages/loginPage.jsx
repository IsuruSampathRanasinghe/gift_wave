import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function login() {
    try {
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/api/users/login",
            {
                email: email,
                password: password
            }
        );

        localStorage.setItem("token", response.data.token)
        toast.success("Login successful");
        const user = response.data.user;

        /*
        if (!user) {
            alert(response.data.message);
            return;
        }
            */

        if (user.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/");
        }

    } catch (e) {
        console.error("Login failed: ", e);
        toast.error("Login failed. Please check your credentials");
    }
}

    return (
        <div
            className="w-screen h-screen bg-cover bg-center flex relative overflow-hidden"
            style={{ backgroundImage: `url(${bg})` }}
        >

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

            {/* Left Side */}
            <div className="w-full lg:w-1/2 h-full flex justify-center items-center z-10 px-5">

                <div className="w-full max-w-[500px] py-8 px-10 rounded-[35px] bg-white/10 border border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]">

                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">

                        <img
                            src="/logo.png"
                            alt="Gift Wave Logo"
                            className="w-[130px] h-[90px] object-contain drop-shadow-2xl"
                        />

                        <h1 className="text-5xl font-black text-white tracking-wide mt-4">
                            Gift Wave
                        </h1>

                        <p className="text-white/70 mt-3 text-lg text-center">
                            Welcome back! Please login to continue.
                        </p>

                    </div>

                    {/* Form */}
                    <div className="flex flex-col gap-4">

                        {/* Email */}
                        <div>
                            <label className="text-white text-sm font-medium mb-2 block">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className="w-full h-[48px] px-5 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-accent focus:bg-white/25 transition-all duration-300"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-white text-sm font-medium mb-2 block">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="w-full h-[48px] px-5 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-accent focus:bg-white/25 transition-all duration-300"
                            />
                        </div>

                        {/* Options */}
                        <div className="flex justify-between items-center text-sm">

                            <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                                <input type="checkbox" className="accent-accent" />
                                Remember me
                            </label>

                            <button className="text-accent hover:text-pink-300 transition-all">
                                Forgot Password?
                            </button>

                        </div>

                        {/* Login Button */}
                        <button
                            onClick={login}
                            className="w-full h-[48px] rounded-2xl bg-accent text-white font-bold text-lg shadow-lg hover:scale-[1.02] hover:shadow-pink-500/40 active:scale-[0.98] transition-all duration-300"
                        >
                            Login
                        </button>

                        {/* Register Link */}
                        <p className="text-center text-white/70 mt-2">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/register"
                                className="text-accent font-semibold hover:text-pink-300 transition-all"
                            >
                                Create Account
                            </Link>
                        </p>

                    </div>

                    {/* Footer */}
                    <p className="text-center text-white/50 mt-8 text-sm">
                        © 2026 Gift Wave. All rights reserved.
                    </p>

                </div>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex w-1/2 h-full items-center justify-center z-10 px-10">

                <div className="max-w-[500px]">

                    <h2 className="text-white text-6xl font-black leading-tight">
                        Delivering
                        <span className="text-accent"> Happiness </span>
                        Through Gifts
                    </h2>

                    <p className="text-white/70 text-lg mt-6 leading-relaxed">
                        Manage your gift distribution business with a modern,
                        elegant, and powerful platform built for the future.
                    </p>

                </div>

            </div>
        </div>
    );
}