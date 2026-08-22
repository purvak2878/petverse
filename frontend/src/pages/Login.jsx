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

    const [notification, setNotification] = useState({
        show: false,
        type: "",
        title: "",
        message: "",
    });


    // =========================================
    // SHOW NOTIFICATION
    // =========================================

    const showNotification = (
        type,
        title,
        message
    ) => {

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
                "https://petverse-backend-9odi.onrender.com/api/users/login",
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


            loginUser(data);


            console.log(
                "LOGIN SUCCESSFUL:",
                data
            );


            showNotification(
                "success",
                "Welcome back! 🐾",
                "You have successfully logged in."
            );


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

            if (
                registerData.password !==
                registerData.confirm
            ) {

                throw new Error(
                    "Passwords do not match."
                );
            }


            const response = await fetch(
                "https://petverse-backend-9odi.onrender.com/api/users/register",
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


            setRegisterData({
                name: "",
                email: "",
                password: "",
                confirm: "",
            });


            setIsSignUp(false);


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

            max-md:min-h-screen
            max-md:h-auto
            max-md:overflow-y-auto
            max-md:overflow-x-hidden
            max-md:flex-col
            max-md:items-stretch
            max-md:py-6
        ">


            {/* =====================================
                PAW BACKGROUND
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

                    max-md:top-4
                    max-md:left-4
                    max-md:w-9
                    max-md:h-9
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
                LEFT DOG + TEXT SECTION
                DESKTOP UNCHANGED
                MOBILE POSITION KEPT
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

                max-md:relative
                max-md:left-auto
                max-md:top-auto
                max-md:w-full
                max-md:h-auto
                max-md:min-h-0
                max-md:z-10
                max-md:order-1
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

                    max-md:max-w-full
                    max-md:h-auto
                    max-md:px-5
                    max-md:pt-4
                    max-md:pb-2
                    max-md:justify-start
                ">


                    {/* =================================
                        LOGO
                    ================================== */}

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

                                max-md:h-20
                                max-md:translate-y-0
                                max-md:translate-x-0
                            "
                        />

                    </div>


                    {/* =================================
                        DOG
                    ================================== */}

                    <div className="
                        relative
                        w-[350px]
                        h-[360px]
                        flex
                        items-end
                        justify-center

                        max-md:w-[280px]
                        max-md:h-[245px]
                        max-md:mt-1
                    ">


                        {/* SHADOW */}

                        <div
                            className="
                                absolute
                                bottom-4
                                w-[210px]
                                h-[28px]
                                rounded-[50%]
                                bg-slate-400/35
                                blur-md

                                max-md:bottom-2
                                max-md:w-[165px]
                                max-md:h-[20px]
                            "
                            style={{
                                animation:
                                    "petverseShadow 3.5s ease-in-out infinite",
                            }}
                        />


                        {/* DOG */}

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

                                max-md:w-[320px]
                                max-md:h-[280px]
                            "
                            style={{
                                animation:
                                    "petverseDogFloat 3.5s ease-in-out infinite",
                            }}
                        />

                    </div>


                    {/* =================================
                        TAGLINE
                    ================================== */}

                    <div className="text-center">

                        <h1 className="
                            text-[38px]
                            leading-[1.12]
                            font-extrabold
                            text-slate-800
                            -translate-y-10

                            max-md:text-[27px]
                            max-md:leading-[1.05]
                            max-md:translate-y-1
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

                            max-md:text-sm
                            max-md:translate-y-1
                            max-md:mb-3
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
                RIGHT SIDE / LOGIN CARD
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

                max-md:min-h-0
                max-md:w-full
                max-md:px-3
                max-md:py-4
                max-md:items-center
                max-md:justify-center
                max-md:order-2
            ">


                {/* =================================
                    REVERSIBLE CARD

                    IMPORTANT:
                    MOBILE ALSO KEEPS TWO HALVES
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

                    max-md:w-[calc(100vw-24px)]
                    max-md:max-w-[390px]
                    max-md:h-[500px]
                    max-md:rounded-2xl
                    max-md:shadow-xl
                ">


                    {/* =================================
                        REGISTER FORM PANEL
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

                            max-md:px-3

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

                                max-md:text-base
                            ">
                                Register
                            </h2>


                            {/* SOCIAL */}

                            <div className="
                                flex
                                gap-3
                                my-4

                                max-md:gap-2
                                max-md:my-3
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
                                text-center

                                max-md:text-[8px]
                                max-md:mb-3
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

                                        max-md:px-2.5
                                        max-md:py-2
                                        max-md:text-[9px]
                                        max-md:mb-2
                                        max-md:rounded-lg
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

                                        max-md:px-2.5
                                        max-md:py-2
                                        max-md:text-[9px]
                                        max-md:mb-2
                                        max-md:rounded-lg
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

                                        max-md:px-2.5
                                        max-md:py-2
                                        max-md:text-[9px]
                                        max-md:mb-2
                                        max-md:rounded-lg
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

                                        max-md:px-2.5
                                        max-md:py-2
                                        max-md:text-[9px]
                                        max-md:mb-3
                                        max-md:rounded-lg
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

                                        max-md:py-2
                                        max-md:text-[9px]
                                    "
                                >
                                    REGISTER
                                </button>

                            </form>


                            <p className="
                                text-xs
                                text-gray-400
                                mt-5
                                text-center

                                max-md:text-[8px]
                                max-md:mt-3
                            ">

                                Already have an account?

                                {" "}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsSignUp(false)
                                    }
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
                        LOGIN FORM PANEL
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

                            max-md:px-3

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

                                max-md:text-base
                            ">
                                Login
                            </h2>


                            {/* SOCIAL */}

                            <div className="
                                flex
                                gap-3
                                my-4

                                max-md:gap-2
                                max-md:my-3
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
                                text-center

                                max-md:text-[8px]
                                max-md:mb-3
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

                                        max-md:px-2.5
                                        max-md:py-2
                                        max-md:text-[9px]
                                        max-md:mb-2
                                        max-md:rounded-lg
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

                                        max-md:px-2.5
                                        max-md:py-2
                                        max-md:text-[9px]
                                        max-md:mb-1
                                        max-md:rounded-lg
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

                                        max-md:text-[7px]
                                        max-md:mb-3
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

                                        max-md:py-2
                                        max-md:text-[9px]
                                    "
                                >
                                    LOGIN
                                </button>

                            </form>


                            <p className="
                                text-xs
                                text-gray-400
                                mt-5
                                text-center

                                max-md:text-[8px]
                                max-md:mt-3
                            ">

                                Don't have an account?

                                {" "}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsSignUp(true)
                                    }
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
                        PURPLE REVERSIBLE PANEL
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

                            max-md:px-3

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

                                    max-md:text-xl
                                    max-md:mb-2
                                " />


                                <h1 className="
                                    text-2xl
                                    font-bold
                                    mb-3

                                    max-md:text-base
                                    max-md:mb-2
                                ">
                                    Welcome Back!
                                </h1>


                                <p className="
                                    text-sm
                                    text-white/85
                                    leading-relaxed
                                    mb-6

                                    max-md:text-[8px]
                                    max-md:leading-4
                                    max-md:mb-3
                                ">
                                    To keep connected with PetVerse,
                                    please sign in with your personal info.
                                </p>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsSignUp(false)
                                    }
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

                                        max-md:px-5
                                        max-md:py-1.5
                                        max-md:text-[8px]
                                        max-md:border
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

                                    max-md:text-xl
                                    max-md:mb-2
                                " />


                                <h1 className="
                                    text-2xl
                                    font-bold
                                    mb-3

                                    max-md:text-base
                                    max-md:mb-2
                                ">
                                    Hello, Friend!
                                </h1>


                                <p className="
                                    text-sm
                                    text-white/85
                                    leading-relaxed
                                    mb-6

                                    max-md:text-[8px]
                                    max-md:leading-4
                                    max-md:mb-3
                                ">
                                    Enter your details and start your
                                    adoption journey with us today.
                                </p>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsSignUp(true)
                                    }
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

                                        max-md:px-5
                                        max-md:py-1.5
                                        max-md:text-[8px]
                                        max-md:border
                                    "
                                >
                                    REGISTER
                                </button>
                            </>

                        )}

                    </div>

                </div>


                {/* =====================================
                    NOTIFICATION
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

                        max-md:fixed
                        max-md:left-4
                        max-md:right-4
                        max-md:top-4
                        max-md:w-auto
                        max-md:max-w-none

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

                                max-md:max-w-full
                                max-md:px-4
                                max-md:py-3

                                ${
                                notification.type === "success"
                                    ? "bg-white/95 border-emerald-200"
                                    : "bg-white/95 border-red-200"
                            }
                            `}
                        >

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

                                    max-md:w-8
                                    max-md:h-8
                                    max-md:text-sm

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
   SOCIAL ICON
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

            max-md:w-7
            max-md:h-7
            max-md:text-[9px]
        ">
            {children}
        </span>

    );
}


export default Login;