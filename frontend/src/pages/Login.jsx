import { useState } from "react";
import { useNavigate } from "react-router-dom";
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


    /* =========================
       LOGIN INPUT
    ========================== */

    const handleLoginChange = (e) =>
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });


    /* =========================
       REGISTER INPUT
    ========================== */

    const handleRegisterChange = (e) =>
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });


    /* =========================
       LOGIN SUBMIT
    ========================== */

    const handleLoginSubmit = (e) => {

        e.preventDefault();

        // TODO: Connect this to Spring Boot login API

        alert("Logged in successfully!");

        setLoginData({
            email: "",
            password: "",
        });
    };


    /* =========================
       REGISTER SUBMIT
    ========================== */

    const handleRegisterSubmit = (e) => {

        e.preventDefault();

        if (registerData.password !== registerData.confirm) {

            alert("Passwords don't match.");

            return;
        }

        // TODO: Connect this to Spring Boot register API

        alert("User registered successfully!");

        setRegisterData({
            name: "",
            email: "",
            password: "",
            confirm: "",
        });

        setIsSignUp(false);
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
                CUSTOM DOG ANIMATION
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


                    {/* =========================
                        PETVERSE MINI LOGO
                    ========================== */}

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
                            className="h-40 object-contain translate-y-2 -translate-x-2"
                        />

                    </div>

                    {/* =========================
                        DOG AREA
                    ========================== */}

                    <div className="
                        relative
                        w-[350px]
                        h-[360px]
                        flex
                        items-end
                        justify-center
                    ">


                        {/* Ground shadow */}

                        <div className="
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

                    {/* =========================
                        TAGLINE
                    ========================== */}

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
                LOGIN / REGISTER CARD
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
                    MAIN CARD
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


                            {/* Social icons */}

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
                                onSubmit={handleRegisterSubmit}
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


                            {/* Social icons */}

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
                                onSubmit={handleLoginSubmit}
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