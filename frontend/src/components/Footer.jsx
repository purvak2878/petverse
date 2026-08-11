import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import logo from "../assets/images/petverse_logo_1.png"
import {Link} from "react-router-dom";

function Footer({ sidebarOpen }) {

    return (

        <footer className="relative mt-12 bg-gradient-to-r from-violet-100 to-pink-100 overflow-hidden">

            {/* Layered Wave */}

            <div className="absolute -top-[55px] left-0 w-full h-[70px] overflow-hidden">

                {/* Back wave */}
                <svg
                    className="absolute bottom-0 w-full h-[65px]"
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,55 C180,105 360,10 540,55 C720,100 900,15 1080,55 C1260,95 1350,25 1440,50 L1440,120 L0,120 Z"
                        fill="#f3e8ff"
                    />
                </svg>


                {/* Middle wave */}
                <svg
                    className="absolute bottom-[-5px] w-full h-[55px]"
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,65 C180,15 360,105 540,60 C720,15 900,105 1080,60 C1260,20 1350,95 1440,55 L1440,120 L0,120 Z"
                        fill="#fce7f3"
                    />
                </svg>


                {/* Front wave */}
                <svg
                    className="absolute bottom-[-12px] w-full h-[45px]"
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,65 C180,105 360,35 540,70 C720,105 900,30 1080,65 C1260,100 1350,40 1440,65 L1440,120 L0,120 Z"
                        fill="#fdf2f8"
                    />
                </svg>

            </div>


            {/* Footer CONTENT */}

            <div
                className={`
                    relative
                    pt-12
                    pb-6
                    px-8
                    transition-all
                    duration-300

                    ${sidebarOpen ? "ml-[285px]" : "ml-0"}
                `}
            >

                <div className="grid grid-cols-4 gap-8">

                    {/* Brand */}

                    <div>

                        <img
                            src={logo}
                            alt="PetVerse"
                            className="h-24 object-contain -translate-y-8 -translate-x-6"
                        />

                        <p className="text-sm text-gray-600 -translate-y-14 mt-0 max-w-xs">
                            Connecting paws with hearts, one pet at a time!
                        </p>

                    </div>


                    {/* Quick Links */}

                    <div>

                        <h3 className="font-bold text-gray-800 mb-3">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-2 text-sm text-gray-600">

                            <Link
                                to="/"
                                className="hover:text-violet-600 transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/browse-pets"
                                className="hover:text-violet-600 transition"
                            >
                                Browse Pets
                            </Link>

                            <Link
                                to="/pet-tips"
                                className="hover:text-violet-600 transition"
                            >
                                Pet Tips
                            </Link>

                            <Link
                                to="/faqs"
                                className="hover:text-violet-600 transition"
                            >
                                FAQs
                            </Link>

                        </div>

                    </div>


                    {/* Help */}

                    <div>

                        <h3 className="font-bold text-gray-800 mb-3">
                            For Help
                        </h3>

                        <div className="flex flex-col gap-2 text-sm text-gray-600">

                            <span>Help Center</span>
                            <span>Adoption Process</span>
                            <span>Pet Care Guide</span>
                            <span>Contact Us</span>

                        </div>

                    </div>


                    {/* Social */}

                    <div>

                        <h3 className="font-bold text-gray-800 mb-3">
                            Follow Us
                        </h3>

                        <div className="flex gap-3">

                            <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition">
                                <FaFacebook />
                            </button>

                            <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition">
                                <FaInstagram />
                            </button>

                            <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition">
                                <FaTwitter />
                            </button>

                            <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition">
                                <FaYoutube />
                            </button>

                        </div>

                    </div>

                </div>


                {/* Copyright */}

                <div className="border-t border-white/70 mt-8 pt-4 text-center text-sm text-gray-500">

                    © 2026 PetVerse. All rights reserved. 🐾

                </div>

            </div>

        </footer>
    );
}

export default Footer;