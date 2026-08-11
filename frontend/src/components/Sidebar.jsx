import {
    FaBars,
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
import logo from "../assets/images/petverse_logo_1.png";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const menuItems = [
        { icon: <FaHome />, label: "Home" },
        { icon: <FaDog />, label: "Browse Pets" },
        { icon: <FaHeart />, label: "Wishlist" },
        { icon: <FaClipboardList />, label: "My Applications" },
        { icon: <FaPlusCircle />, label: "Add a Pet" },
        { icon: <FaBook />, label: "Pet Tips" },
        { icon: <FaQuestionCircle />, label: "FAQs" },
        { icon: <FaUser />, label: "Profile" },
        { icon: <FaSignOutAlt />, label: "Logout" },
    ];

    return (
        <>
            {/* Sidebar */}
            <aside className={`fixed top-[65px] left-0 h-[calc(100vh-60px)] w-[255px]
        bg-white shadow-lg border-r z-40 overflow-hidden transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
            >
                {/* Menu */}

                <nav className="mt-18 px-2">

                    {menuItems.map((item, index) => (

                        <button
                            key={index}
                            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-violet-50 hover:text-violet-700 transition text-gray-700 -translate-y-14"
                        >

              <span className="text-lg">

                {item.icon}

              </span>

                            <span className="font-medium">

                {item.label}

              </span>

                        </button>

                    ))}

                </nav>

                {/* Bottom */}

                <div className="absolute bottom-8 left-0 w-full px-6  translate-y-2 -translate-y-2">

                    <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 text-white p-4">

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