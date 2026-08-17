import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaPaw, FaUser} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProfileDropdown() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);


    /*
     * For now we check localStorage.
     *
     * Later Spring Boot login will set this
     * automatically after successful authentication.
     */

    const [user, setUser] = useState(() => {

        const savedUser = localStorage.getItem("petverseUser");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });


    /* =========================================
       CLOSE WHEN CLICKING OUTSIDE
    ========================================== */

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


    /* =========================================
       LOGIN
    ========================================== */

    const handleLogin = () => {

        setOpen(false);

        navigate("/login", {
            state: {
                openRegister: false
            }
        });

    };


    /* =========================================
       REGISTER
    ========================================== */

    const handleRegister = () => {

        setOpen(false);

        navigate("/login", {
            state: {
                openRegister: true
            }
        });

    };


    /* =========================================
       LOGOUT
    ========================================== */

    const handleLogout = () => {

        localStorage.removeItem("petverseUser");

        setUser(null);

        setOpen(false);

        // Optional: redirect to home
        navigate("/");

    };


    return (

        <div
            ref={dropdownRef}
            className="relative"
        >


            {/* =================================
                PROFILE ICON
            ================================== */}

            <button
                onClick={() => setOpen(!open)}
                className="
                    flex
                    items-center
                    justify-center
                    text-slate-700
                    hover:text-violet-600
                    transition

                "
                aria-label="Profile"
            >

                <FaUserCircle className="
                    text-4xl
                " />

            </button>


            {/* =================================
                DROPDOWN
            ================================== */}

            {open && (

                <div className="
                    absolute
                    right-0
                    top-12
                    w-[280px]
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    border-slate-100
                    overflow-hidden
                    z-[100]
                ">


                    {/* =================================
                        LOGGED IN USER
                    ================================== */}

                    {user ? (

                        <div className="p-5">

                            {/* Profile */}

                            <div className="
                                flex
                                items-center
                                gap-4
                                mb-5
                            ">


                                {/* Profile image */}

                                <div className="
                                    w-14
                                    h-14
                                    rounded-full
                                    overflow-hidden
                                    bg-violet-100
                                    flex
                                    items-center
                                    justify-center
                                    flex-shrink-0
                                ">

                                    {user.profileImage ? (

                                        <img
                                            src={user.profileImage}
                                            alt={user.username}
                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                            "
                                        />

                                    ) : (

                                        <FaUserCircle className="
                                            text-4xl
                                            text-violet-500
                                        " />

                                    )}

                                </div>


                                {/* User information */}

                                <div className="
                                    min-w-0
                                ">

                                    <h3 className="
                                        font-bold
                                        text-slate-800
                                        truncate
                                    ">
                                        {user.username}
                                    </h3>

                                    <p className="
                                        text-xs
                                        text-slate-500
                                        truncate
                                        mt-1
                                    ">
                                        {user.email}
                                    </p>

                                </div>

                            </div>


                            {/* Divider */}

                            <div className="
                              border-t
                              border-slate-100
                              pt-4
                            ">
                                {/* View Profile */}

                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        navigate("/profile");
                                    }}
                                    className="
                                         w-full
                                         flex
                                         items-center
                                         gap-3
                                         px-4
                                         py-3
                                         rounded-xl
                                         text-sm
                                         font-medium
                                         text-slate-700
                                         hover:bg-violet-50
                                         hover:text-violet-600
                                         transition
                                       "
                                >
                                    <FaUser />

                                    <span>
                                        View Details
                                    </span>
                                </button>
                                {/* Logout */}

                                <button
                                    onClick={handleLogout}
                                    className="
                                     w-full
                                     flex
                                     items-center
                                     gap-3
                                     px-4
                                     py-3
                                     rounded-xl
                                     text-sm
                                     font-medium
                                     text-slate-700
                                     hover:bg-red-50
                                     hover:text-red-600
                                     transition
                                   "
                                >
                                    <FaSignOutAlt />

                                    <span>
                                        Logout
                                    </span>

                                </button>

                            </div>
                            </div>

                    ) : (


                        /* =================================
                           GUEST USER
                        ================================== */

                        <div className="
                            p-6
                            text-center
                        ">


                            {/* Paw */}

                            <div className="
                                w-14
                                h-14
                                mx-auto
                                rounded-full
                                bg-violet-50
                                flex
                                items-center
                                justify-center
                                mb-4
                            ">

                                <FaPaw className="
                                    text-2xl
                                    text-violet-600
                                " />

                            </div>


                            <h3 className="
                                text-lg
                                font-bold
                                text-slate-800
                            ">
                                Connect to PetVerse
                            </h3>


                            <p className="
                                text-xs
                                leading-5
                                text-slate-500
                                mt-2
                                mb-5
                            ">
                                Login or create an account to
                                explore all PetVerse features.
                            </p>


                            {/* Buttons */}

                            <div className="
                                flex
                                gap-3
                            ">


                                <button
                                    onClick={handleLogin}
                                    className="
                                        flex-1
                                        py-2.5
                                        rounded-full
                                        text-sm
                                        font-semibold
                                        text-violet-600
                                        border
                                        border-violet-500
                                        hover:bg-violet-50
                                        transition
                                    "
                                >
                                    Login
                                </button>


                                <button
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
                                        hover:-translate-y-0.5
                                        shadow-md
                                        shadow-violet-200
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