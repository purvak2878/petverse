import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

import logo from "../assets/images/petverse_logo_1.png";

import { Link } from "react-router-dom";


function Footer({ sidebarOpen }) {

    return (

        <footer className="
            relative
            mt-12
            bg-gradient-to-r
            from-pink-300
            to-violet-400
            overflow-hidden
        ">


            {/* =====================================
                LAYERED WAVE
            ====================================== */}

            <div className="
                absolute
                -top-[55px]
                left-0
                w-full
                h-[70px]
                overflow-hidden

                max-md:-top-[35px]
                max-md:h-[45px]
            ">


                {/* BACK WAVE */}

                <svg
                    className="
                        absolute
                        bottom-0
                        w-full
                        h-[65px]

                        max-md:h-[40px]
                    "
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                >

                    <path
                        d="
                            M0,55
                            C180,105 360,10 540,55
                            C720,100 900,15 1080,55
                            C1260,95 1350,25 1440,50
                            L1440,120
                            L0,120
                            Z
                        "
                        fill="#f3e8ff"
                    />

                </svg>


                {/* MIDDLE WAVE */}

                <svg
                    className="
                        absolute
                        bottom-[-5px]
                        w-full
                        h-[55px]

                        max-md:h-[35px]
                    "
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                >

                    <path
                        d="
                            M0,65
                            C180,15 360,105 540,60
                            C720,15 900,105 1080,60
                            C1260,20 1350,95 1440,55
                            L1440,120
                            L0,120
                            Z
                        "
                        fill="#fce7f3"
                    />

                </svg>


                {/* FRONT WAVE */}

                <svg
                    className="
                        absolute
                        bottom-[-12px]
                        w-full
                        h-[45px]

                        max-md:h-[30px]
                    "
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                >

                    <path
                        d="
                            M0,65
                            C180,105 360,35 540,70
                            C720,105 900,30 1080,65
                            C1260,100 1350,40 1440,65
                            L1440,120
                            L0,120
                            Z
                        "
                        fill="#fdf2f8"
                    />

                </svg>

            </div>


            {/* =====================================
                FOOTER CONTENT
            ====================================== */}

            <div
                className={`
                    relative
                    pt-12
                    pb-6
                    px-8
                    transition-all
                    duration-300

                    max-md:pt-8
                    max-md:pb-3
                    max-md:px-6

                    ${
                    sidebarOpen
                        ? "ml-[285px]"
                        : "ml-0"
                }
                `}
            >


                {/* =====================================
                    FOOTER GRID
                ====================================== */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-8

                    max-md:grid-cols-2
                    max-md:gap-x-6
                    max-md:gap-y-4
                ">


                    {/* =================================
                        BRAND
                    ================================== */}

                    <div className="
                        max-md:col-span-2
                        max-md:text-center
                    ">

                        <img
                            src={logo}
                            alt="PetVerse"
                            className="
                                h-24
                                object-contain
                                -translate-y-8
                                -translate-x-6

                                max-md:h-16
                                max-md:translate-x-0
                                max-md:translate-y-0
                                max-md:mx-auto
                                max-md:mb-0
                            "
                        />


                        <p className="
                            text-sm
                            text-gray-600
                            -translate-y-14
                            mt-0
                            max-w-xs

                            max-md:text-[11px]
                            max-md:translate-y-1
                            max-md:max-w-full
                            max-md:mt-0
                            max-md:mb-1
                        ">

                            Connecting paws with hearts,
                            one pet at a time!

                        </p>

                    </div>


                    {/* =================================
                        QUICK LINKS
                    ================================== */}

                    <div>

                        <h3 className="
                            font-bold
                            text-gray-800
                            mb-3

                            max-md:text-sm
                            max-md:mb-2
                        ">

                            Quick Links

                        </h3>


                        <div className="
                            flex
                            flex-col
                            gap-2
                            text-sm
                            text-gray-600

                            max-md:gap-1
                            max-md:text-[11px]
                        ">

                            <Link
                                to="/"
                                className="
                                    hover:text-violet-600
                                    transition
                                "
                            >
                                Home
                            </Link>


                            <Link
                                to="/browse-pets"
                                className="
                                    hover:text-violet-600
                                    transition
                                "
                            >
                                Browse Pets
                            </Link>


                            <Link
                                to="/pet-tips"
                                className="
                                    hover:text-violet-600
                                    transition
                                "
                            >
                                Pet Tips
                            </Link>


                            <Link
                                to="/faqs"
                                className="
                                    hover:text-violet-600
                                    transition
                                "
                            >
                                FAQs
                            </Link>

                        </div>

                    </div>


                    {/* =================================
                        HELP
                    ================================== */}

                    <div>

                        <h3 className="
                            font-bold
                            text-gray-800
                            mb-3

                            max-md:text-sm
                            max-md:mb-2
                        ">

                            For Help

                        </h3>


                        <div className="
                            flex
                            flex-col
                            gap-2
                            text-sm
                            text-gray-600

                            max-md:gap-1
                            max-md:text-[11px]
                        ">


                            <Link
                                to="/faqs"
                                className="
                                    hover:text-violet-600
                                    transition
                                "
                            >
                                Help Center
                            </Link>


                            <Link
                                to="/adoption-process"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    hover:text-violet-600
                                    transition
                                    font-medium
                                "
                            >
                                Adoption Process
                            </Link>


                            <Link
                                to="/pet-tips"
                                className="
                                    hover:text-violet-600
                                    transition
                                "
                            >
                                Pet Care Guide
                            </Link>


                            <span className="
                                cursor-pointer
                                hover:text-violet-600
                                transition
                            ">
                                Contact Us
                            </span>

                        </div>

                    </div>


                    {/* =================================
                        SOCIAL
                    ================================== */}

                    <div className="
                        max-md:col-span-2
                        max-md:flex
                        max-md:flex-col
                        max-md:items-center
                        max-md:mt-1
                    ">

                        <h3 className="
                            font-bold
                            text-gray-800
                            mb-3

                            max-md:text-sm
                            max-md:mb-2
                        ">

                            Follow Us

                        </h3>


                        <div className="
                            flex
                            gap-3

                            max-md:gap-2
                        ">


                            {/* FACEBOOK */}

                            <button
                                type="button"
                                className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    shadow-sm
                                    hover:scale-110
                                    transition

                                    max-md:w-8
                                    max-md:h-8
                                    max-md:text-sm
                                "
                            >

                                <FaFacebook />

                            </button>


                            {/* INSTAGRAM */}

                            <button
                                type="button"
                                className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    shadow-sm
                                    hover:scale-110
                                    transition

                                    max-md:w-8
                                    max-md:h-8
                                    max-md:text-sm
                                "
                            >

                                <FaInstagram />

                            </button>


                            {/* TWITTER */}

                            <button
                                type="button"
                                className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    shadow-sm
                                    hover:scale-110
                                    transition

                                    max-md:w-8
                                    max-md:h-8
                                    max-md:text-sm
                                "
                            >

                                <FaTwitter />

                            </button>


                            {/* YOUTUBE */}

                            <button
                                type="button"
                                className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    shadow-sm
                                    hover:scale-110
                                    transition

                                    max-md:w-8
                                    max-md:h-8
                                    max-md:text-sm
                                "
                            >

                                <FaYoutube />

                            </button>

                        </div>

                    </div>

                </div>


                {/* =================================
                    COPYRIGHT
                ================================== */}

                <div className="
                    border-t
                    border-white/70
                    mt-8
                    pt-4
                    text-center
                    text-sm
                    text-gray-500

                    max-md:mt-4
                    max-md:pt-2
                    max-md:text-[10px]
                ">

                    © 2026 PetVerse. All rights reserved. 🐾

                </div>

            </div>

        </footer>

    );
}


export default Footer;