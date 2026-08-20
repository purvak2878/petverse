import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaHome,
    FaDog,
    FaHeart,
    FaClipboardList,
    FaPlusCircle,
    FaBook,
    FaQuestionCircle,
    FaUser,
    FaSignOutAlt,
    FaPaw,
} from "react-icons/fa";

import sidebarPet from "../assets/images/sidebarPet.png";


function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const navigate = useNavigate();


    // =========================================
    // LOGOUT DIALOG
    // =========================================

    const [showLogoutDialog, setShowLogoutDialog] =
        useState(false);


    const handleLogout = () => {

        localStorage.removeItem("petverseToken");
        localStorage.removeItem("petverseUser");

        // Tell Navbar that authentication changed
        window.dispatchEvent(
            new Event("petverseAuthChange")
        );

        setShowLogoutDialog(false);

        navigate("/");

    };


    // =========================================
    // SIDEBAR MENU
    // =========================================

    const menuItems = [

        {
            icon: <FaHome />,
            label: "Home",
            path: "/"
        },

        {
            icon: <FaDog />,
            label: "Browse Pets",
            path: "/browse-pets"
        },

        {
            icon: <FaHeart />,
            label: "Wishlist",
            path: "/wishlist"
        },

        {
            icon: <FaClipboardList />,
            label: "My Applications",
            path: "/applications"
        },

        {
            icon: <FaPlusCircle />,
            label: "Add a Pet",
            path: "/add-pet"
        },

        {
            icon: <FaBook />,
            label: "Pet Tips",
            path: "/pet-tips"
        },

        {
            icon: <FaPaw />,
            label: "Adoption Process",
            path: "/adoption-process"
        },

        {
            icon: <FaQuestionCircle />,
            label: "FAQs",
            path: "/faqs"
        },

        {
            icon: <FaUser />,
            label: "Profile",
            path: "/profile"
        },

    ];


    return (

        <>

            {/* =====================================
                SIDEBAR
            ====================================== */}

            <aside
                className={`
                    fixed
                    top-[65px]
                    left-0
                    h-[calc(100vh-60px)]
                    w-[285px]
                    bg-white
                    shadow-lg
                    border-r
                    z-40
                    overflow-hidden
                    transition-all
                    duration-300

                    ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }
                `}
            >

                {/* =================================
                    MENU
                ================================== */}

                <nav className="
                    mt-4
                    px-2
                ">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}

                            /*
                             * IMPORTANT:
                             * Do NOT close the sidebar here.
                             * Sidebar stays open while navigating.
                             * It is closed only through the hamburger menu.
                             */

                            className={({ isActive }) => `
                                w-full
                                flex
                                items-center
                                gap-4
                                px-5
                                py-4
                                rounded-xl
                                transition-all
                                duration-200

                                ${
                                isActive
                                    ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md"
                                    : "text-gray-700 hover:bg-violet-50 hover:text-violet-700"
                            }
                            `}
                        >

                            <span className="
                                text-lg
                            ">

                                {item.icon}

                            </span>


                            <span className="
                                font-medium
                            ">

                                {item.label}

                            </span>

                        </NavLink>

                    ))}


                    {/* =================================
                        LOGOUT
                    ================================== */}

                    <button
                        onClick={() =>
                            setShowLogoutDialog(true)
                        }
                        className="
                            flex
                            items-center
                            gap-3
                            w-full
                            px-5
                            py-3
                            rounded-xl
                            text-red-500
                            hover:bg-red-50
                            transition
                        "
                    >

                        <FaSignOutAlt />

                        <span className="
                            font-medium
                        ">

                            Logout

                        </span>

                    </button>

                </nav>


                {/* =================================
                    BOTTOM AREA
                ================================== */}

                <div className="
                    absolute
                    bottom-8
                    left-0
                    w-full
                    px-6
                ">

                    {/* SIDEBAR PET IMAGE */}

                    <div className="
                        flex
                        items-end
                        h-[105px]
                        translate-y-8
                    ">

                        <img
                            src={sidebarPet}
                            alt="Pet"
                            className="
                                h-[115px]
                                w-auto
                                object-contain
                                drop-shadow-md
                            "
                        />

                    </div>


                    {/* ADOPTION CARD */}

                    <div className="
                        rounded-2xl
                        bg-gradient-to-br
                        from-violet-600
                        to-pink-500
                        text-white
                        p-4
                    ">

                        <h3 className="
                            font-bold
                            text-base
                        ">

                            🐾 Adopt. Love. Repeat.

                        </h3>


                        <p className="
                            text-xs
                            mt-2
                            opacity-90
                        ">

                            Give a pet a loving home and
                            gain a friend for life.

                        </p>

                    </div>

                </div>

            </aside>


            {/* =====================================
                LOGOUT DIALOG
            ====================================== */}

            {showLogoutDialog && (

                <div className="
                    fixed
                    inset-0
                    z-[999]
                    flex
                    items-center
                    justify-center
                    bg-black/40
                    backdrop-blur-sm
                    px-5
                ">

                    <div className="
                        w-full
                        max-w-sm
                        bg-white
                        rounded-3xl
                        shadow-2xl
                        p-7
                    ">

                        {/* ICON */}

                        <div className="
                            w-14
                            h-14
                            mx-auto
                            rounded-full
                            bg-violet-100
                            flex
                            items-center
                            justify-center
                            mb-5
                        ">

                            <FaSignOutAlt className="
                                text-violet-600
                                text-xl
                            " />

                        </div>


                        {/* TITLE */}

                        <h2 className="
                            text-xl
                            font-bold
                            text-slate-800
                            text-center
                        ">

                            Are you sure?

                        </h2>


                        {/* MESSAGE */}

                        <p className="
                            text-sm
                            text-gray-500
                            text-center
                            mt-2
                        ">

                            Are you sure you want to log out
                            of PetVerse?

                        </p>


                        {/* BUTTONS */}

                        <div className="
                            flex
                            gap-3
                            mt-7
                        ">

                            <button
                                onClick={() =>
                                    setShowLogoutDialog(false)
                                }
                                className="
                                    flex-1
                                    py-3
                                    rounded-full
                                    border
                                    border-slate-200
                                    text-slate-600
                                    font-semibold
                                    hover:bg-slate-50
                                    transition
                                "
                            >

                                Cancel

                            </button>


                            <button
                                onClick={handleLogout}
                                className="
                                    flex-1
                                    py-3
                                    rounded-full
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-pink-500
                                    text-white
                                    font-semibold
                                    hover:opacity-90
                                    transition
                                "
                            >

                                Log Out

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}


export default Sidebar;