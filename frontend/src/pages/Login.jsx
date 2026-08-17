import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../utils/auth";

import {
    FaFacebookF,
    FaGooglePlusG,
    FaLinkedinIn,
    FaPaw,
    FaArrowLeft,
} from "react-icons/fa";

import PawBackground from "../components/PawBackground";
import dogImage from "../assets/images/sitting-dog.png";
import logo from "../assets/images/petverse_logo_1.png";


function Login() {

    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });

    // =========================================
    // NOTIFICATION STATE
    // =========================================

    const [notification, setNotification] = useState({
        show: false,
        type: "",
        title: "",
        message: "",
    });


    // =========================================
    // SHOW NOTIFICATION
    // =========================================

    const showNotification = (type, title, message) => {

        setNotification({
            show: true,
            type,
            title,
            message,
        });

        setTimeout(() => {

            setNotification({
                show: false,
                type: "",
                title: "",
                message: "",
            });

        }, 3500);
    };


    // =========================================
    // LOGIN INPUT
    // =========================================

    const handleLoginChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });

    };


    // =========================================
    // REGISTER INPUT
    // =========================================

    const handleRegisterChange = (e) => {

        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });

    };


    // =========================================
    // LOGIN
    // =========================================

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:9090/api/users/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email: loginData.email,
                        password: loginData.password,
                    }),
                }
            );


            const contentType =
                response.headers.get("content-type");


            let data;


            if (
                contentType &&
                contentType.includes("application/json")
            ) {

                data = await response.json();

            } else {

                data = await response.text();

            }


            if (!response.ok) {

                throw new Error(
                    typeof data === "string"
                        ? data
                        : "Invalid email or password"
                );

            }


            // Save JWT + user
            loginUser(data);


            console.log(
                "LOGIN SUCCESSFUL:",
                data
            );


            // Show success notification
            showNotification(
                "success",
                "Welcome back! 🐾",
                "You have successfully logged in."
            );


            // Small delay so user can see notification
            setTimeout(() => {
                navigate("/");
            }, 1000);


        } catch (error) {

            console.error(
                "Login failed:",
                error
            );


            showNotification(
                "error",
                "Login failed",
                error.message ||
                "Invalid email or password."
            );
        }
    };


    // =========================================
    // REGISTER
    // =========================================

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            // Password confirmation
            if (
                registerData.password !==
                registerData.confirm
            ) {

                throw new Error(
                    "Passwords do not match."
                );

            }


            const response = await fetch(
                "http://localhost:9090/api/users/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name: registerData.name,
                        email: registerData.email,
                        password: registerData.password,
                    }),
                }
            );


            const data =
                await response.text();


            if (!response.ok) {

                throw new Error(
                    data ||
                    "Registration failed."
                );

            }


            console.log(
                "REGISTER SUCCESSFUL"
            );


            // Clear registration form
            setRegisterData({
                name: "",
                email: "",
                password: "",
                confirm: "",
            });


            // Switch to login
            setIsSignUp(false);


            // Show success notification
            showNotification(
                "success",
                "Account created! 🐾",
                "Your PetVerse account has been created. Please login."
            );


        } catch (error) {

            console.error(
                "Registration failed:",
                error
            );


            showNotification(
                "error",
                "Registration failed",
                error.message ||
                "Something went wrong."
            );
        }
    };


    return (

        <div className="
            relative
            min-h-screen
            w-full
            overflow-hidden
            bg-slate-50
            flex
            items-center
        ">


            {/* =====================================
                PAW PRINT BACKGROUND
            ====================================== */}

            <PawBackground />


            {/* =====================================
                BACK TO HOME
            ====================================== */}

            <button
                onClick={() => navigate("/")}
                className="
                    absolute
                    top-6
                    left-6
                    z-50
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-white/90
                    text-slate-600
                    shadow-md
                    hover:bg-violet-600
                    hover:text-white
                    hover:-translate-x-1
                    transition-all
                    duration-200
                "
                aria-label="Back to Home"
            >
                <FaArrowLeft className="text-sm" />
            </button>


            {/* =====================================
                DOG ANIMATION
            ====================================== */}

            <style>
                {`

                    @keyframes petverseDogFloat {

                        0%, 100% {
                            transform: translateY(0px);
                        }

                        50% {
                            transform: translateY(-8px);
                        }

                    }


                    @keyframes petverseShadow {

                        0%, 100% {
                            transform: scale(1);
                            opacity: 0.35;
                        }

                        50% {
                            transform: scale(0.88);
                            opacity: 0.2;
                        }

                    }

                `}
            </style>


            {/* =====================================
                LEFT INTRO / DOG SECTION
            ====================================== */}

            <section className="
                absolute
                left-0
                top-0
                w-[42%]
                h-full
                z-10
                flex
                items-center
                justify-center
            ">

                <div className="
                    relative
                    w-full
                    max-w-[470px]
                    h-full
                    px-8
                    flex
                    flex-col
                    items-center
                    justify-center
                ">


                    {/* LOGO */}

                    <div className="
                        flex
                        items-center
                        gap-2
                        text-2xl
                        font-extrabold
                        text-slate-800
                        mb-2
                    ">

                        <img
                            src={logo}
                            alt="PetVerse"
                            className="
                                h-40
                                object-contain
                                translate-y-2
                                -translate-x-2
                            "
                        />

                    </div>


                    {/* DOG */}

                    <div className="
                        relative
                        w-[350px]
                        h-[360px]
                        flex
                        items-end
                        justify-center
                    ">


                        {/* Ground shadow */}

                        <div
                            className="
                                absolute
                                bottom-4
                                w-[210px]
                                h-[28px]
                                rounded-[50%]
                                bg-slate-400/35
                                blur-md
                            "
                            style={{
                                animation:
                                    "petverseShadow 3.5s ease-in-out infinite",
                            }}
                        />


                        {/* Dog */}

                        <img
                            src={dogImage}
                            alt="Sitting dog"
                            className="
                                relative
                                z-10
                                w-[500px]
                                h-[440px]
                                object-contain
                                drop-shadow-xl
                            "
                            style={{
                                animation:
                                    "petverseDogFloat 3.5s ease-in-out infinite",
                            }}
                        />

                    </div>


                    {/* TAGLINE */}

                    <div className="text-center">

                        <h1 className="
                            text-[38px]
                            leading-[1.12]
                            font-extrabold
                            text-slate-800
                            -translate-y-10
                        ">

                            Because every

                            <br />

                            <span className="text-pink-600">
                                paw
                            </span>

                            {" "}deserves a home.

                        </h1>


                        <p className="
                            text-lg
                            font-medium
                            text-slate-500
                            -translate-y-4
                        ">

                            Adopt. Love. Repeat.

                            <span className="
                                ml-2
                                text-pink-500
                                text-2xl
                            ">
                                ♡
                            </span>

                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================
                RIGHT SIDE
            ====================================== */}

            <div className="
                relative
                z-20
                min-h-screen
                w-full
                flex
                items-center
                justify-end
                pr-[6%]
                pl-[38%]
            ">


                {/* =================================
                    LOGIN / REGISTER CARD
                ================================== */}

                <div className="
                    relative
                    w-full
                    max-w-[820px]
                    h-[560px]
                    rounded-3xl
                    shadow-2xl
                    overflow-hidden
                    bg-white
                ">


                    {/* =================================
                        REGISTER FORM
                    ================================== */}

                    <div
                        className={`
                            absolute
                            top-0
                            left-0
                            w-1/2
                            h-full
                            bg-white
                            flex
                            items-center
                            justify-center
                            px-10
                            transition-all
                            duration-700
                            ease-in-out

                            ${
                            isSignUp
                                ? "translate-x-full opacity-100 z-20"
                                : "translate-x-0 opacity-0 z-0 pointer-events-none"
                        }
                        `}
                    >

                        <div className="
                            w-full
                            max-w-xs
                            flex
                            flex-col
                            items-center
                        ">


                            <h2 className="
                                text-2xl
                                font-bold
                                text-gray-800
                                mb-1
                            ">
                                Register
                            </h2>


                            {/* SOCIAL ICONS */}

                            <div className="
                                flex
                                gap-3
                                my-4
                            ">

                                <SocialIcon>
                                    <FaFacebookF />
                                </SocialIcon>

                                <SocialIcon>
                                    <FaGooglePlusG />
                                </SocialIcon>

                                <SocialIcon>
                                    <FaLinkedinIn />
                                </SocialIcon>

                            </div>


                            <p className="
                                text-xs
                                text-gray-400
                                mb-5
                            ">
                                or use your email for registration
                            </p>


                            <form
                                onSubmit={handleRegister}
                                className="
                                    w-full
                                    flex
                                    flex-col
                                    items-center
                                "
                            >

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    required
                                    className="
                                        w-full
                                        bg-slate-100
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        mb-3
                                        outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />


                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    required
                                    className="
                                        w-full
                                        bg-slate-100
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        mb-3
                                        outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />


                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                    className="
                                        w-full
                                        bg-slate-100
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        mb-3
                                        outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />


                                <input
                                    type="password"
                                    name="confirm"
                                    placeholder="Confirm Password"
                                    value={registerData.confirm}
                                    onChange={handleRegisterChange}
                                    required
                                    className="
                                        w-full
                                        bg-slate-100
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        mb-5
                                        outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />


                                <button
                                    type="submit"
                                    className="
                                        w-full
                                        py-3
                                        rounded-full
                                        text-white
                                        text-sm
                                        font-semibold
                                        tracking-wide
                                        bg-gradient-to-r
                                        from-violet-600
                                        to-pink-500
                                        shadow-lg
                                        shadow-violet-300/50
                                        hover:-translate-y-0.5
                                        active:translate-y-0
                                        transition
                                    "
                                >
                                    REGISTER
                                </button>

                            </form>


                            <p className="
                                text-xs
                                text-gray-400
                                mt-5
                            ">

                                Already have an account?

                                {" "}

                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(false)}
                                    className="
                                        font-semibold
                                        text-violet-600
                                        hover:underline
                                    "
                                >
                                    Login
                                </button>

                            </p>

                        </div>

                    </div>


                    {/* =================================
                        LOGIN FORM
                    ================================== */}

                    <div
                        className={`
                            absolute
                            top-0
                            left-0
                            w-1/2
                            h-full
                            bg-white
                            flex
                            items-center
                            justify-center
                            px-10
                            transition-all
                            duration-700
                            ease-in-out

                            ${
                            isSignUp
                                ? "translate-x-full opacity-0 z-0 pointer-events-none"
                                : "translate-x-0 opacity-100 z-20"
                        }
                        `}
                    >

                        <div className="
                            w-full
                            max-w-xs
                            flex
                            flex-col
                            items-center
                        ">


                            <h2 className="
                                text-2xl
                                font-bold
                                text-gray-800
                                mb-1
                            ">
                                Login
                            </h2>


                            {/* SOCIAL ICONS */}

                            <div className="
                                flex
                                gap-3
                                my-4
                            ">

                                <SocialIcon>
                                    <FaFacebookF />
                                </SocialIcon>

                                <SocialIcon>
                                    <FaGooglePlusG />
                                </SocialIcon>

                                <SocialIcon>
                                    <FaLinkedinIn />
                                </SocialIcon>

                            </div>


                            <p className="
                                text-xs
                                text-gray-400
                                mb-5
                            ">
                                or use your account
                            </p>


                            <form
                                onSubmit={handleLogin}
                                className="
                                    w-full
                                    flex
                                    flex-col
                                    items-center
                                "
                            >

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                    className="
                                        w-full
                                        bg-slate-100
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        mb-3
                                        outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />


                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                    className="
                                        w-full
                                        bg-slate-100
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        mb-2
                                        outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />


                                <a
                                    href="#forgot"
                                    className="
                                        self-end
                                        text-xs
                                        text-gray-400
                                        hover:text-violet-600
                                        mb-5
                                    "
                                >
                                    Forgot your password?
                                </a>


                                <button
                                    type="submit"
                                    className="
                                        w-full
                                        py-3
                                        rounded-full
                                        text-white
                                        text-sm
                                        font-semibold
                                        tracking-wide
                                        bg-gradient-to-r
                                        from-violet-600
                                        to-pink-500
                                        shadow-lg
                                        shadow-violet-300/50
                                        hover:-translate-y-0.5
                                        active:translate-y-0
                                        transition
                                    "
                                >
                                    LOGIN
                                </button>

                            </form>


                            <p className="
                                text-xs
                                text-gray-400
                                mt-5
                            ">

                                Don't have an account?

                                {" "}

                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(true)}
                                    className="
                                        font-semibold
                                        text-violet-600
                                        hover:underline
                                    "
                                >
                                    Register
                                </button>

                            </p>

                        </div>

                    </div>


                    {/* =================================
                        SLIDING PURPLE PANEL
                    ================================== */}

                    <div
                        className={`
                            absolute
                            top-0
                            h-full
                            w-1/2
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            px-10
                            text-white
                            bg-gradient-to-br
                            from-violet-600
                            via-fuchsia-500
                            to-pink-500
                            transition-all
                            duration-700
                            ease-in-out
                            z-30

                            ${
                            isSignUp
                                ? "left-0"
                                : "left-1/2"
                        }
                        `}
                    >

                        {isSignUp ? (

                            <>

                                <FaPaw className="
                                    text-3xl
                                    mb-3
                                    opacity-80
                                " />

                                <h1 className="
                                    text-2xl
                                    font-bold
                                    mb-3
                                ">
                                    Welcome Back!
                                </h1>

                                <p className="
                                    text-sm
                                    text-white/85
                                    leading-relaxed
                                    mb-6
                                ">
                                    To keep connected with PetVerse,
                                    please sign in with your personal info.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(false)}
                                    className="
                                        px-10
                                        py-2.5
                                        rounded-full
                                        border-2
                                        border-white
                                        text-sm
                                        font-semibold
                                        tracking-wide
                                        hover:bg-white/10
                                        transition
                                    "
                                >
                                    LOGIN
                                </button>

                            </>

                        ) : (

                            <>

                                <FaPaw className="
                                    text-3xl
                                    mb-3
                                    opacity-80
                                " />

                                <h1 className="
                                    text-2xl
                                    font-bold
                                    mb-3
                                ">
                                    Hello, Friend!
                                </h1>

                                <p className="
                                    text-sm
                                    text-white/85
                                    leading-relaxed
                                    mb-6
                                ">
                                    Enter your details and start your
                                    adoption journey with us today.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(true)}
                                    className="
                                        px-10
                                        py-2.5
                                        rounded-full
                                        border-2
                                        border-white
                                        text-sm
                                        font-semibold
                                        tracking-wide
                                        hover:bg-white/10
                                        transition
                                    "
                                >
                                    REGISTER
                                </button>

                            </>

                        )}

                    </div>

                </div>


                {/* =====================================
                    PETVERSE NOTIFICATION
                    APPEARS BELOW LOGIN CARD
                ====================================== */}

                <div
                    className={`
                        absolute
                        z-50
                        right-[6%]
                        top-[calc(50%+300px)]
                        w-[820px]
                        max-w-[calc(100vw-40px)]
                        flex
                        justify-center
                        pointer-events-none
                        transition-all
                        duration-500
                        ${
                        notification.show
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-3"
                    }
                    `}
                >

                    {notification.show && (

                        <div
                            className={`
                                w-full
                                max-w-[520px]
                                rounded-2xl
                                px-5
                                py-4
                                shadow-xl
                                border
                                backdrop-blur-md
                                flex
                                items-center
                                gap-4

                                ${
                                notification.type === "success"
                                    ? "bg-white/95 border-emerald-200"
                                    : "bg-white/95 border-red-200"
                            }
                            `}
                        >

                            {/* Notification Icon */}

                            <div
                                className={`
                                    flex-shrink-0
                                    w-10
                                    h-10
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                    font-bold
                                    text-lg

                                    ${
                                    notification.type === "success"
                                        ? "bg-emerald-500"
                                        : "bg-red-500"
                                }
                                `}
                            >

                                {notification.type === "success"
                                    ? "✓"
                                    : "✕"}

                            </div>


                            {/* Notification Text */}

                            <div className="text-left">

                                <h3 className="
                                    font-bold
                                    text-slate-800
                                    text-sm
                                ">
                                    {notification.title}
                                </h3>

                                <p className="
                                    text-xs
                                    text-slate-500
                                    mt-1
                                ">
                                    {notification.message}
                                </p>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}


/* =========================================
   SOCIAL ICON COMPONENT
========================================= */

function SocialIcon({ children }) {

    return (

        <span className="
            w-9
            h-9
            rounded-full
            border
            border-slate-300
            flex
            items-center
            justify-center
            text-gray-500
            hover:border-violet-400
            hover:text-violet-600
            transition
            text-sm
            cursor-pointer
        ">
            {children}
        </span>

    );
}


export default Login;