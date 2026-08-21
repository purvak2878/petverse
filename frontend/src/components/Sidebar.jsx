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

import sidebarPet from "../assets/images/SidebarPet.png";

const sidebarPetSrc = /** @type {string} */ (sidebarPet);

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

        window.dispatchEvent(
            new Event("pet-verseAuthChange")
        );

        setShowLogoutDialog(false);
        setSidebarOpen(false);
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
                MOBILE OVERLAY
            ====================================== */}

            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="
                        fixed
                        inset-0
                        top-[65px]
                        z-30
                        bg-black/30
                        backdrop-blur-[1px]
                        md:hidden
                    "
                />
            )}

            {/* =====================================
                SIDEBAR
            ====================================== */}

            <aside
                className={`
                    fixed
                    top-[65px]
                    left-0
                    h-[calc(100vh-65px)]
                    w-[min(285px,85vw)]
                    bg-white
                    shadow-lg
                    border-r
                    z-40
                    overflow-y-auto
                    overflow-x-hidden
                    transition-transform
                    duration-300
                    ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }
                `}
            >
                <nav className="
                    mt-4
                    px-2
                    pb-56
                ">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => {
                                // On phones, navigation also closes the drawer.
                                // Desktop remains open after navigation.
                                if (window.innerWidth < 768) {
                                    setSidebarOpen(false);
                                }
                            }}
                            className={({ isActive }) => `
                                w-full
                                flex
                                items-center
                                gap-4
                                px-4
                                sm:px-5
                                py-3.5
                                sm:py-4
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
                            <span className="text-lg shrink-0">
                                {item.icon}
                            </span>

                            <span className="font-medium">
                                {item.label}
                            </span>
                        </NavLink>
                    ))}

                    {/* LOGOUT */}
                    <button
                        type="button"
                        onClick={() =>
                            setShowLogoutDialog(true)
                        }
                        className="
                            flex
                            items-center
                            gap-3
                            w-full
                            px-4
                            sm:px-5
                            py-3
                            rounded-xl
                            text-red-500
                            hover:bg-red-50
                            transition
                        "
                    >
                        <FaSignOutAlt />

                        <span className="font-medium">
                            Logout
                        </span>
                    </button>
                </nav>

                {/* =================================
                    BOTTOM AREA
                ================================== */}

                <div className="
                    absolute
                    bottom-6
                    left-0
                    w-full
                    px-5
                    sm:px-6
                    hidden
                    min-[500px]:block
                ">
                    <div className="
                        flex
                        items-end
                        h-[90px]
                        translate-y-4
                    ">
                        <img
                            src={sidebarPetSrc}
                            alt="Pet"
                            className="
                                h-[95px]
                                sm:h-[115px]
                                w-auto
                                object-contain
                                drop-shadow-md
                            "
                        />
                    </div>

                    <div className="
                        rounded-2xl
                        bg-gradient-to-br
                        from-violet-600
                        to-pink-500
                        text-white
                        p-4
                    ">
                        <h3 className="font-bold text-sm sm:text-base">
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

                        <h2 className="
                            text-xl
                            font-bold
                            text-slate-800
                            text-center
                        ">
                            Are you sure?
                        </h2>

                        <p className="
                            text-sm
                            text-gray-500
                            text-center
                            mt-2
                        ">
                            Are you sure you want to log out
                            of PetVerse?
                        </p>

                        <div className="
                            flex
                            gap-3
                            mt-7
                        ">
                            <button
                                type="button"
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
                                type="button"
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