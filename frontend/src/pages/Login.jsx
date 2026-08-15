import { useState } from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaPaw } from "react-icons/fa";

function Login() {
    const [isSignUp, setIsSignUp] = useState(false);

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });

    const handleLoginChange = (e) =>
        setLoginData({ ...loginData, [e.target.name]: e.target.value });

    const handleRegisterChange = (e) =>
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // TODO: replace this block with your actual login API call.
        // Keep the alert (or swap for a nicer toast) inside the
        // `.then(...)` success handler once you wire up the real request.
        alert("Logged in successfully!");
        setLoginData({ email: "", password: "" });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirm) {
            alert("Passwords don't match.");
            return;
        }
        // TODO: replace this block with your actual register API call.
        alert("User registered successfully!");
        setRegisterData({ name: "", email: "", password: "", confirm: "" });
        setIsSignUp(false); // drop them onto the Login panel after registering
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4 py-10">

            <div className="relative w-full max-w-[820px] min-h-[560px] mx-auto rounded-3xl shadow-2xl overflow-hidden bg-white">

                {/* REGISTER form */}
                <div
                    className={`absolute top-0 left-0 w-1/2 h-full bg-white flex items-center justify-center px-10 transition-all duration-700 ease-in-out ${
                        isSignUp
                            ? "translate-x-full opacity-100 z-20"
                            : "translate-x-0 opacity-0 z-0 pointer-events-none"
                    }`}
                >
                    <div className="w-full max-w-xs flex flex-col items-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">Register</h2>
                        <div className="flex gap-3 my-4">
                            <SocialIcon><FaFacebookF /></SocialIcon>
                            <SocialIcon><FaGooglePlusG /></SocialIcon>
                            <SocialIcon><FaLinkedinIn /></SocialIcon>
                        </div>
                        <p className="text-xs text-gray-400 mb-5">or use your email for registration</p>

                        <form onSubmit={handleRegisterSubmit} className="w-full flex flex-col items-center">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={registerData.name}
                                onChange={handleRegisterChange}
                                required
                                className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-violet-400"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                                className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-violet-400"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                                className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-violet-400"
                            />
                            <input
                                type="password"
                                name="confirm"
                                placeholder="Confirm Password"
                                value={registerData.confirm}
                                onChange={handleRegisterChange}
                                required
                                className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm mb-5 outline-none focus:ring-2 focus:ring-violet-400"
                            />

                            <button
                                type="submit"
                                className="w-full py-3 rounded-full text-white text-sm font-semibold tracking-wide bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-300/50 hover:-translate-y-0.5 active:translate-y-0 transition"
                            >
                                REGISTER
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 mt-5">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setIsSignUp(false)}
                                className="font-semibold text-violet-600 hover:underline"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>

                {/* LOGIN form */}
                <div
                    className={`absolute top-0 left-0 w-1/2 h-full bg-white flex items-center justify-center px-10 transition-all duration-700 ease-in-out ${
                        isSignUp
                            ? "translate-x-full opacity-0 z-0 pointer-events-none"
                            : "translate-x-0 opacity-100 z-20"
                    }`}
                >
                    <div className="w-full max-w-xs flex flex-col items-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">Login</h2>
                        <div className="flex gap-3 my-4">
                            <SocialIcon><FaFacebookF /></SocialIcon>
                            <SocialIcon><FaGooglePlusG /></SocialIcon>
                            <SocialIcon><FaLinkedinIn /></SocialIcon>
                        </div>
                        <p className="text-xs text-gray-400 mb-5">or use your account</p>

                        <form onSubmit={handleLoginSubmit} className="w-full flex flex-col items-center">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                                className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-violet-400"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                                className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm mb-2 outline-none focus:ring-2 focus:ring-violet-400"
                            />
                            <a href="#forgot" className="self-end text-xs text-gray-400 hover:text-violet-600 mb-5">
                                Forgot your password?
                            </a>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-full text-white text-sm font-semibold tracking-wide bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-300/50 hover:-translate-y-0.5 active:translate-y-0 transition"
                            >
                                LOGIN
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 mt-5">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setIsSignUp(true)}
                                className="font-semibold text-violet-600 hover:underline"
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </div>

                {/* sliding colored overlay — a single panel that slides
                    left/right and swaps its message, so only one card
                    (Welcome Back / Hello Friend) is ever on screen */}
                <div
                    className={`absolute top-0 h-full w-1/2 flex flex-col items-center justify-center text-center px-10 text-white bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 transition-all duration-700 ease-in-out z-30 ${
                        isSignUp ? "left-0" : "left-1/2"
                    }`}
                >
                    {isSignUp ? (
                        <>
                            <FaPaw className="text-3xl mb-3 opacity-80" />
                            <h1 className="text-2xl font-bold mb-3">Welcome Back!</h1>
                            <p className="text-sm text-white/85 leading-relaxed mb-6">
                                To keep connected with PetVerse, please sign in with your personal info.
                            </p>
                            <button
                                type="button"
                                onClick={() => setIsSignUp(false)}
                                className="px-10 py-2.5 rounded-full border-2 border-white text-sm font-semibold tracking-wide hover:bg-white/10 transition"
                            >
                                LOGIN
                            </button>
                        </>
                    ) : (
                        <>
                            <FaPaw className="text-3xl mb-3 opacity-80" />
                            <h1 className="text-2xl font-bold mb-3">Hello, Friend!</h1>
                            <p className="text-sm text-white/85 leading-relaxed mb-6">
                                Enter your details and start your adoption journey with us today.
                            </p>
                            <button
                                type="button"
                                onClick={() => setIsSignUp(true)}
                                className="px-10 py-2.5 rounded-full border-2 border-white text-sm font-semibold tracking-wide hover:bg-white/10 transition"
                            >
                                REGISTER
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

function SocialIcon({ children }) {
    return (
        <span className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-gray-500 hover:border-violet-400 hover:text-violet-600 transition text-sm cursor-pointer">
            {children}
        </span>
    );
}

export default Login;