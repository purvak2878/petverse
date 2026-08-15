import { Link } from "react-router-dom";
import {
    FaSearch,
    FaBell,
    FaHeart,
    FaMoon,
    FaUserCircle,
    FaBars,
} from "react-icons/fa";

import logo from "../assets/images/petverse_logo_1.png";

function Navbar({ sidebarOpen, setSidebarOpen }) {

    return (

        <header className="fixed top-0 left-0 w-full h-[65px] bg-white border-b shadow-md z-50">

            <div className="flex items-center justify-between h-full px-6">

                {/* Left */}

                <div className="flex items-center h-full">

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-violet-100 transition flex items-center justify-center text-lg -translate-x-4"
                    >

                        <FaBars />

                    </button>

                    <img
                        src={logo}
                        alt="PetVerse"
                        className="h-24 object-contain translate-y-2 -translate-x-8"
                    />

                </div>

                {/* Search */}

                <div className="flex-1 flex justify-center">

                    <div className="flex items-center w-[850px] bg-slate-100 rounded-full px-6 py-2.5">

                        <FaSearch className="text-gray-400 mr-3"/>

                        <input
                            type="text"
                            placeholder="Search pets, breeds or locations..."
                            className="bg-transparent outline-none w-full"
                        />

                    </div>

                </div>

                {/* Icons */}

                <div className="flex items-center gap-3">

                    <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-purple-100 transition flex items-center justify-center">

                        <FaBell />

                    </button>

                    <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-pink-100 transition flex items-center justify-center">

                        <FaHeart />

                    </button>

                    <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-yellow-100 transition flex items-center justify-center">

                        <FaMoon />

                    </button>
                    <Link
                        to="/login"
                        className="px-5 py-2.5 rounded-full text-white font-semibold
                   bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500
                   shadow-md shadow-violet-300/40
                   hover:-translate-y-0.5 hover:shadow-lg
                   transition-all duration-300"
                    >
                        LOGIN
                    </Link>

                    <button className="text-4xl text-gray-400 hover:text-violet-600 transition">

                        <FaUserCircle />

                    </button>

                </div>

            </div>

        </header>

    );

}

export default Navbar;