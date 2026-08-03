import {
    FaSearch,
    FaHeart,
    FaBell,
    FaUserCircle,
    FaMoon,
} from "react-icons/fa";
import { PiPawPrintFill } from "react-icons/pi";

function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">

            <div className="flex items-center justify-between h-20 px-8">

                {/* Logo */}

                <div className="flex items-center gap-3">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">

                        <PiPawPrintFill className="text-white text-3xl"/>

                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight">

                        <span className="text-violet-700">Pet</span>

                        <span className="text-pink-500">Verse</span>

                    </h1>

                </div>

                {/* Search Bar */}

                <div className="hidden lg:flex items-center w-[900px] bg-slate-100 rounded-full px-5 py-3">

                    <FaSearch className="text-gray-400 mr-3" />

                    <input
                        type="text"
                        placeholder="Search pets, breeds or locations..."
                        className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
                    />

                </div>

                {/* Right Side */}

                <div className="flex items-center gap-6">

                    {/* Notifications */}

                    <button className="text-xl text-gray-600 hover:text-violet-600 transition">
                        <FaBell />
                    </button>

                    {/* Favourite */}

                    <button className="text-xl text-gray-600 hover:text-pink-500 transition">
                        <FaHeart />
                    </button>

                    {/* Theme Toggle */}

                    <button className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center hover:bg-violet-100 transition">
                        <FaMoon className="text-gray-700" />
                    </button>

                    {/* Profile */}

                    <button className="text-4xl text-gray-400 hover:text-violet-600 transition">
                        <FaUserCircle />
                    </button>

                </div>

            </div>

        </header>
    );
}

export default Navbar;