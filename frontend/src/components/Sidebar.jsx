import { NavLink } from "react-router-dom";

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
} from "react-icons/fa";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

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
            icon: <FaQuestionCircle />,
            label: "FAQs",
            path: "/faqs"
        },

        {
            icon: <FaUser />,
            label: "Profile",
            path: "/profile"
        }
    ];

    return (
        <>
            {/* Sidebar */}

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

                    ${sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                }
                `}
            >

                {/* Menu */}

                <nav className="mt-4 px-2">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}

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

                            <span className="text-lg">
                                {item.icon}
                            </span>

                            <span className="font-medium">
                                {item.label}
                            </span>

                        </NavLink>

                    ))}


                    {/* Logout */}

                    <button
                        onClick={() => {
                            console.log("Logout clicked");
                        }}

                        className="
                            w-full
                            flex
                            items-center
                            gap-4
                            px-5
                            py-4
                            rounded-xl
                            hover:bg-violet-50
                            hover:text-violet-700
                            transition
                            text-gray-700
                        "
                    >

                        <FaSignOutAlt />

                        <span className="font-medium">
                            Logout
                        </span>

                    </button>

                </nav>


                {/* Bottom Adoption Card */}

                <div className="
                    absolute
                    bottom-8
                    left-0
                    w-full
                    px-6
                    translate-y-2
                ">

                    <div className="
                        rounded-2xl
                        bg-gradient-to-br
                        from-violet-600
                        to-pink-500
                        text-white
                        p-4
                    ">

                        <h3 className="font-bold text-base">
                            🐾 Adopt. Love. Repeat.
                        </h3>

                        <p className="text-xs mt-2 opacity-90">
                            Give a pet a loving home and gain a friend for life.
                        </p>

                    </div>

                </div>

            </aside>
        </>
    );
}

export default Sidebar;