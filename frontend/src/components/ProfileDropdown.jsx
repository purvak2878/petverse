import { useEffect, useRef, useState } from "react";

import {
    FaUserCircle,
    FaSignOutAlt,
    FaPaw,
    FaUser,
    FaHeart,
    FaClipboardList,
    FaChevronRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


function ProfileDropdown() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);


    // =========================================
    // USER
    // =========================================

    const [user, setUser] = useState(() => {

        const savedUser =
            localStorage.getItem("petverseUser");

        return savedUser
            ? JSON.parse(savedUser)
            : null;

    });


    // =========================================
    // CLOSE WHEN CLICKING OUTSIDE
    // =========================================

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    // =========================================
    // UPDATE USER
    // =========================================

    useEffect(() => {

        const updateUser = () => {

            const savedUser =
                localStorage.getItem("petverseUser");

            setUser(
                savedUser
                    ? JSON.parse(savedUser)
                    : null
            );

        };

        window.addEventListener(
            "petverseAuthChange",
            updateUser
        );

        window.addEventListener(
            "storage",
            updateUser
        );

        return () => {

            window.removeEventListener(
                "petverseAuthChange",
                updateUser
            );

            window.removeEventListener(
                "storage",
                updateUser
            );

        };

    }, []);


    // =========================================
    // NAVIGATION
    // =========================================

    const goTo = (path) => {

        setOpen(false);

        navigate(path);

    };


    // =========================================
    // LOGIN
    // =========================================

    const handleLogin = () => {

        setOpen(false);

        navigate("/login", {
            state: {
                openRegister: false
            }
        });

    };


    // =========================================
    // REGISTER
    // =========================================

    const handleRegister = () => {

        setOpen(false);

        navigate("/login", {
            state: {
                openRegister: true
            }
        });

    };


    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = () => {

        localStorage.removeItem(
            "petverseUser"
        );

        localStorage.removeItem(
            "petverseToken"
        );

        setUser(null);

        setOpen(false);

        window.dispatchEvent(
            new Event("petverseAuthChange")
        );

        navigate("/");

    };


    // =========================================
    // USER INFORMATION
    // =========================================

    const displayName =
        user?.username ||
        user?.name ||
        "PetVerse User";


    const displayEmail =
        user?.email ||
        "PetVerse member";


    const profileImage =
        user?.profileImage ||
        user?.profile_image ||
        null;


    return (

        <div
            ref={dropdownRef}
            className="relative"
        >


            {/* =====================================
                PROFILE BUTTON
            ====================================== */}

            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-label="Profile"
                aria-expanded={open}
                className={`
                    relative
                    flex
                    items-center
                    justify-center
                    w-10
                    h-10
                    rounded-full
                    transition-all
                    duration-200

                    ${
                    open
                        ? "bg-violet-100 text-violet-600"
                        : "text-slate-600 hover:bg-violet-50 hover:text-violet-600"
                }
                `}
            >

                {profileImage ? (

                    <img
                        src={profileImage}
                        alt={displayName}
                        className="
                            w-9
                            h-9
                            rounded-full
                            object-cover
                            border-2
                            border-violet-200
                        "
                    />

                ) : (

                    <FaUserCircle
                        className="text-[2.35rem]"
                    />

                )}


                {user && (

                    <span className="
                        absolute
                        bottom-0
                        right-0
                        w-3
                        h-3
                        rounded-full
                        bg-emerald-400
                        border-2
                        border-white
                    " />

                )}

            </button>


            {/* =====================================
                DROPDOWN
            ====================================== */}

            {open && (

                <div className="
                    absolute
                    right-0
                    top-[52px]
                    w-[300px]
                    bg-white
                    rounded-2xl
                    shadow-xl
                    border
                    border-slate-100
                    overflow-hidden
                    z-[100]
                ">


                    {/* =================================
                        LOGGED IN
                    ================================== */}

                    {user ? (

                        <>


                            {/* =================================
                                PROFILE HEADER
                            ================================== */}

                            <div className="
                                relative
                                px-5
                                py-5
                                bg-gradient-to-r
                                from-violet-600
                                to-fuchsia-500
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">


                                    {/* PROFILE IMAGE */}

                                    <div className="
                                        relative
                                        flex-shrink-0
                                    ">

                                        <div className="
                                            w-14
                                            h-14
                                            rounded-full
                                            bg-white
                                            p-1
                                        ">

                                            <div className="
                                                w-full
                                                h-full
                                                rounded-full
                                                overflow-hidden
                                                bg-violet-100
                                                flex
                                                items-center
                                                justify-center
                                            ">

                                                {profileImage ? (

                                                    <img
                                                        src={profileImage}
                                                        alt={displayName}
                                                        className="
                                                            w-full
                                                            h-full
                                                            object-cover
                                                        "
                                                    />

                                                ) : (

                                                    <FaUserCircle
                                                        className="
                                                            text-4xl
                                                            text-violet-400
                                                        "
                                                    />

                                                )}

                                            </div>

                                        </div>


                                        {/* ONLINE DOT */}

                                        <span className="
                                            absolute
                                            bottom-0
                                            right-0
                                            w-3.5
                                            h-3.5
                                            rounded-full
                                            bg-emerald-400
                                            border-2
                                            border-white
                                        " />

                                    </div>


                                    {/* USER DETAILS */}

                                    <div className="
                                        min-w-0
                                        text-white
                                    ">

                                        <p className="
                                            text-[9px]
                                            uppercase
                                            tracking-widest
                                            font-semibold
                                            text-white/70
                                        ">

                                            PetVerse Member

                                        </p>


                                        <h3 className="
                                            mt-0.5
                                            text-base
                                            font-bold
                                            truncate
                                        ">

                                            {displayName}

                                        </h3>


                                        <p className="
                                            text-[11px]
                                            text-white/80
                                            truncate
                                        ">

                                            {displayEmail}

                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* =================================
                                MENU
                            ================================== */}

                            <div className="
                                py-2
                            ">


                                {/* PROFILE */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        goTo("/profile")
                                    }
                                    className="
                                        group
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-5
                                        py-3
                                        text-left
                                        hover:bg-slate-50
                                        transition
                                    "
                                >

                                    <FaUser className="
                                        w-4
                                        text-slate-400
                                        group-hover:text-violet-500
                                        transition
                                    " />

                                    <span className="
                                        flex-1
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        group-hover:text-violet-600
                                    ">

                                        My Profile

                                    </span>


                                    <FaChevronRight className="
                                        text-[10px]
                                        text-slate-300
                                        group-hover:text-violet-400
                                        transition
                                    " />

                                </button>


                                {/* WISHLIST */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        goTo("/wishlist")
                                    }
                                    className="
                                        group
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-5
                                        py-3
                                        text-left
                                        hover:bg-slate-50
                                        transition
                                    "
                                >

                                    <FaHeart className="
                                        w-4
                                        text-slate-400
                                        group-hover:text-pink-500
                                        transition
                                    " />

                                    <span className="
                                        flex-1
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        group-hover:text-pink-500
                                    ">

                                        My Wishlist

                                    </span>


                                    <FaChevronRight className="
                                        text-[10px]
                                        text-slate-300
                                        group-hover:text-pink-400
                                        transition
                                    " />

                                </button>


                                {/* APPLICATIONS */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        goTo("/applications")
                                    }
                                    className="
                                        group
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-5
                                        py-3
                                        text-left
                                        hover:bg-slate-50
                                        transition
                                    "
                                >

                                    <FaClipboardList className="
                                        w-4
                                        text-slate-400
                                        group-hover:text-orange-500
                                        transition
                                    " />

                                    <span className="
                                        flex-1
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        group-hover:text-orange-500
                                    ">

                                        My Applications

                                    </span>


                                    <FaChevronRight className="
                                        text-[10px]
                                        text-slate-300
                                        group-hover:text-orange-400
                                        transition
                                    " />

                                </button>

                            </div>


                            {/* =================================
                                FIND COMPANION
                            ================================== */}

                            <div className="
                                mx-4
                                border-t
                                border-slate-100
                                pt-3
                                pb-3
                            ">

                                <button
                                    type="button"
                                    onClick={() =>
                                        goTo("/browse-pets")
                                    }
                                    className="
                                        group
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-3
                                        rounded-xl
                                        bg-slate-50
                                        hover:bg-violet-50
                                        transition
                                        text-left
                                    "
                                >

                                    <FaPaw className="
                                        text-violet-500
                                        text-sm
                                    " />


                                    <div className="
                                        flex-1
                                    ">

                                        <p className="
                                            text-xs
                                            font-semibold
                                            text-slate-700
                                            group-hover:text-violet-600
                                        ">

                                            Find a Companion

                                        </p>


                                        <p className="
                                            text-[10px]
                                            text-slate-400
                                            mt-0.5
                                        ">

                                            Browse pets waiting
                                            for a home.

                                        </p>

                                    </div>


                                    <FaChevronRight className="
                                        text-[10px]
                                        text-slate-300
                                    " />

                                </button>

                            </div>


                            {/* =================================
                                LOGOUT
                            ================================== */}

                            <div className="
                                border-t
                                border-slate-100
                                px-4
                                py-2
                            ">

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2.5
                                        rounded-xl
                                        text-left
                                        text-red-500
                                        hover:bg-red-50
                                        transition
                                    "
                                >

                                    <FaSignOutAlt className="
                                        text-sm
                                    " />

                                    <span className="
                                        text-sm
                                        font-medium
                                    ">

                                        Logout

                                    </span>

                                </button>

                            </div>

                        </>

                    ) : (


                        /* =================================
                           GUEST
                        ================================== */

                        <div className="
                            p-6
                            text-center
                        ">


                            <div className="
                                w-14
                                h-14
                                mx-auto
                                rounded-full
                                bg-violet-50
                                flex
                                items-center
                                justify-center
                                mb-3
                            ">

                                <FaPaw className="
                                    text-xl
                                    text-violet-500
                                " />

                            </div>


                            <h3 className="
                                text-base
                                font-bold
                                text-slate-800
                            ">

                                Welcome to PetVerse

                            </h3>


                            <p className="
                                text-xs
                                leading-5
                                text-slate-500
                                mt-2
                                mb-5
                            ">

                                Login to save favourites,
                                manage applications and
                                find your perfect companion.

                            </p>


                            <div className="
                                flex
                                gap-3
                            ">

                                <button
                                    type="button"
                                    onClick={handleLogin}
                                    className="
                                        flex-1
                                        py-2.5
                                        rounded-full
                                        text-sm
                                        font-semibold
                                        text-violet-600
                                        border
                                        border-violet-200
                                        bg-white
                                        hover:bg-violet-50
                                        transition
                                    "
                                >

                                    Login

                                </button>


                                <button
                                    type="button"
                                    onClick={handleRegister}
                                    className="
                                        flex-1
                                        py-2.5
                                        rounded-full
                                        text-sm
                                        font-semibold
                                        text-white
                                        bg-gradient-to-r
                                        from-violet-600
                                        to-pink-500
                                        hover:opacity-90
                                        transition
                                    "
                                >

                                    Register

                                </button>

                            </div>

                        </div>

                    )}

                </div>

            )}

        </div>

    );

}


export default ProfileDropdown;