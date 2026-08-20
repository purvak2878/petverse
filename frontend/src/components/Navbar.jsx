import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    FaSearch,
    FaBell,
    FaHeart,
    FaMoon,
    FaSun,
    FaBars,
} from "react-icons/fa";

import { useEffect, useState } from "react";

import ProfileDropdown from "../components/ProfileDropdown";

import logo from "../assets/images/petverse_logo_1.png";


function Navbar({ sidebarOpen, setSidebarOpen }) {

    const location = useLocation();
    const navigate = useNavigate();


    // =========================================
    // AUTHENTICATION
    // =========================================

    const [isLoggedIn, setIsLoggedIn] = useState(() => {

        return !!localStorage.getItem(
            "petverseToken"
        );

    });


    useEffect(() => {

        const checkLoginStatus = () => {

            setIsLoggedIn(
                !!localStorage.getItem(
                    "petverseToken"
                )
            );

        };


        checkLoginStatus();


        window.addEventListener(
            "storage",
            checkLoginStatus
        );


        window.addEventListener(
            "petverseAuthChange",
            checkLoginStatus
        );


        return () => {

            window.removeEventListener(
                "storage",
                checkLoginStatus
            );


            window.removeEventListener(
                "petverseAuthChange",
                checkLoginStatus
            );

        };

    }, [location]);


    // =========================================
    // THEME
    // =========================================

    const [darkMode, setDarkMode] = useState(() => {

        return (
            localStorage.getItem(
                "petverseTheme"
            ) === "dark"
        );

    });


    useEffect(() => {

        const root =
            document.documentElement;


        if (darkMode) {

            root.classList.add("dark");

            localStorage.setItem(
                "petverseTheme",
                "dark"
            );

            document.body.style.backgroundColor =
                "#020617";

        } else {

            root.classList.remove("dark");

            localStorage.setItem(
                "petverseTheme",
                "light"
            );

            document.body.style.backgroundColor =
                "#f8fafc";

        }

    }, [darkMode]);


    const toggleTheme = () => {

        setDarkMode(
            (previous) => !previous
        );

    };


    // =========================================
    // SEARCH
    // =========================================

    const [searchText, setSearchText] =
        useState("");


    // Keep search box synced with URL

    useEffect(() => {

        const params =
            new URLSearchParams(
                location.search
            );

        setSearchText(
            params.get("search") || ""
        );

    }, [location.search]);


    const performSearch = () => {

        const query =
            searchText.trim();


        if (!query) {

            navigate("/browse-pets");

            return;

        }


        navigate(
            `/browse-pets?search=${encodeURIComponent(query)}`
        );

    };


    const handleSearchKeyDown = (event) => {

        if (event.key === "Enter") {

            performSearch();

        }

    };


    // =========================================
    // NOTIFICATIONS
    // =========================================

    const openNotifications = () => {

        navigate("/notifications");

    };


    // =========================================
    // WISHLIST
    // =========================================

    const openWishlist = () => {

        navigate("/wishlist");

    };


    return (

        <header
            className={`
                fixed
                top-0
                left-0
                w-full
                h-[65px]
                border-b
                shadow-md
                z-50
                transition-colors
                duration-300

                ${
                darkMode
                    ? "bg-slate-950 border-slate-800"
                    : "bg-white border-slate-200"
            }
            `}
        >

            <div className="
                flex
                items-center
                justify-between
                h-full
                px-6
            ">


                {/* =================================
                    LEFT
                ================================== */}

                <div className="
                    flex
                    items-center
                    h-full
                ">


                    {/* SIDEBAR BUTTON */}

                    <button
                        onClick={() =>
                            setSidebarOpen(
                                !sidebarOpen
                            )
                        }
                        className={`
                            w-10
                            h-10
                            rounded-xl
                            transition
                            flex
                            items-center
                            justify-center
                            text-lg
                            -translate-x-4

                            ${
                            darkMode
                                ? "bg-slate-800 text-white hover:bg-violet-900"
                                : "bg-slate-100 text-slate-700 hover:bg-violet-100"
                        }
                        `}
                    >

                        <FaBars />

                    </button>


                    {/* LOGO */}

                    <img
                        src={logo}
                        alt="PetVerse"
                        className="
                            h-24
                            object-contain
                            translate-y-2
                            -translate-x-8
                        "
                    />

                </div>


                {/* =================================
                    SEARCH
                ================================== */}

                <div className="
                    flex-1
                    flex
                    justify-center
                ">

                    <div
                        className={`
                            flex
                            items-center
                            w-[850px]
                            rounded-full
                            px-6
                            py-2.5
                            transition-colors
                            duration-300

                            ${
                            darkMode
                                ? "bg-slate-800"
                                : "bg-slate-100"
                        }
                        `}
                    >

                        <FaSearch
                            onClick={performSearch}
                            className={`
                                mr-3
                                cursor-pointer
                                transition

                                ${
                                darkMode
                                    ? "text-slate-400 hover:text-violet-400"
                                    : "text-gray-400 hover:text-violet-500"
                            }
                            `}
                        />


                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) =>
                                setSearchText(
                                    e.target.value
                                )
                            }
                            onKeyDown={
                                handleSearchKeyDown
                            }
                            placeholder="
                                Search pets, breeds or locations...
                            "
                            className={`
                                bg-transparent
                                outline-none
                                w-full

                                ${
                                darkMode
                                    ? "text-white placeholder:text-slate-400"
                                    : "text-slate-800 placeholder:text-gray-400"
                            }
                            `}
                        />

                    </div>

                </div>


                {/* =================================
                    RIGHT ICONS
                ================================== */}

                <div className="
                    flex
                    items-center
                    gap-3
                ">


                    {/* NOTIFICATIONS */}

                    <button
                        type="button"
                        onClick={
                            openNotifications
                        }
                        aria-label="Notifications"
                        className={`
                            relative
                            w-10
                            h-10
                            rounded-full
                            transition
                            flex
                            items-center
                            justify-center

                            ${
                            darkMode
                                ? "bg-slate-800 text-white hover:bg-purple-900"
                                : "bg-slate-100 text-slate-700 hover:bg-purple-100"
                        }
                        `}
                    >

                        <FaBell />

                    </button>


                    {/* WISHLIST */}

                    <button
                        type="button"
                        onClick={openWishlist}
                        aria-label="Wishlist"
                        className={`
                            w-10
                            h-10
                            rounded-full
                            transition
                            flex
                            items-center
                            justify-center

                            ${
                            darkMode
                                ? "bg-slate-800 text-white hover:bg-pink-900"
                                : "bg-slate-100 text-slate-700 hover:bg-pink-100"
                        }
                        `}
                    >

                        <FaHeart />

                    </button>


                    {/* THEME */}

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        className={`
                            w-10
                            h-10
                            rounded-full
                            transition
                            flex
                            items-center
                            justify-center

                            ${
                            darkMode
                                ? "bg-slate-800 hover:bg-slate-700"
                                : "bg-slate-100 hover:bg-yellow-100"
                        }
                        `}
                    >

                        {darkMode ? (

                            <FaSun
                                className="
                                    text-white
                                    text-lg
                                "
                            />

                        ) : (

                            <FaMoon
                                className="
                                    text-black
                                    text-lg
                                "
                            />

                        )}

                    </button>


                    {/* LOGIN — GUEST ONLY */}

                    {!isLoggedIn && (

                        <Link
                            to="/login"
                            state={{
                                from:
                                    location.pathname +
                                    location.search
                            }}
                            className="
                                px-4
                                py-1.5
                                rounded-full
                                text-xs
                                font-semibold
                                text-white
                                bg-gradient-to-r
                                from-violet-600
                                via-fuchsia-500
                                to-pink-500
                                shadow-md
                                shadow-violet-300/40
                                hover:-translate-y-0.5
                                hover:shadow-lg
                                transition-all
                                duration-300
                            "
                        >

                            LOGIN

                        </Link>

                    )}


                    {/* PROFILE */}

                    <div className="
                        text-4xl
                        text-gray-400
                        hover:text-violet-600
                        transition
                    ">

                        <ProfileDropdown />

                    </div>

                </div>

            </div>

        </header>

    );

}


export default Navbar;