import { useState } from "react";
import { FaHeart, FaPaw, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PetCard({ pet }) {

    const navigate = useNavigate();

    const [showLoginPopup, setShowLoginPopup] = useState(false);


    const handleAdopt = () => {

        // Check if user is logged in
        const savedUser = localStorage.getItem("petverseUser");

        if (savedUser) {

            // User is logged in → open application
            navigate("/apply", {
                state: {
                    pet: pet
                }
            });

        } else {

            // Guest → show login/register popup
            setShowLoginPopup(true);

        }

    };


    const handleLogin = () => {

        setShowLoginPopup(false);

        navigate("/login", {
            state: {
                openRegister: false
            }
        });

    };


    const handleRegister = () => {

        setShowLoginPopup(false);

        navigate("/login", {
            state: {
                openRegister: true
            }
        });

    };


    return (

        <>

            {/* =================================
                PET CARD
            ================================== */}

            <div className="
                bg-white
                rounded-3xl
                overflow-hidden
                border
                border-slate-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                group
            ">


                {/* Pet Image */}

                <div className="
                    relative
                    h-56
                    overflow-hidden
                ">

                    <img
                        src={pet.image}
                        alt={pet.name}
                        className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-105
                            transition-transform
                            duration-500
                        "
                    />


                    {/* Wishlist */}

                    <button
                        className="
                            absolute
                            top-4
                            right-4
                            w-10
                            h-10
                            rounded-full
                            bg-white/90
                            backdrop-blur
                            flex
                            items-center
                            justify-center
                            text-gray-500
                            hover:text-pink-500
                            shadow-md
                            transition
                        "
                    >
                        <FaHeart />
                    </button>

                </div>


                {/* Pet Details */}

                <div className="
                    p-5
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                        gap-2
                    ">

                        <h3 className="
                            text-xl
                            font-bold
                            text-slate-800
                        ">
                            {pet.name}
                        </h3>

                        <span className="
                            text-xs
                            px-3
                            py-1
                            rounded-full
                            bg-violet-50
                            text-violet-600
                            font-medium
                        ">
                            {pet.type}
                        </span>

                    </div>


                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        {pet.breed}
                    </p>


                    {/* Pet Info */}

                    <div className="
                        flex
                        items-center
                        gap-4
                        mt-4
                        text-sm
                        text-gray-500
                    ">

                        <span>
                            {pet.age}
                        </span>

                        <span>
                            •
                        </span>

                        <span>
                            {pet.gender}
                        </span>

                        <span>
                            •
                        </span>

                        <span>
                            {pet.city}
                        </span>

                    </div>


                    {/* Adopt Button */}

                    <button
                        onClick={handleAdopt}
                        className="
                            mt-5
                            w-full
                            flex
                            items-center
                            justify-center
                            gap-2
                            py-3
                            rounded-full
                            bg-gradient-to-r
                            from-violet-600
                            via-fuchsia-500
                            to-pink-500
                            text-white
                            font-semibold
                            text-sm
                            shadow-md
                            shadow-violet-200
                            hover:-translate-y-0.5
                            hover:shadow-lg
                            transition-all
                        "
                    >

                        <FaPaw />

                        Adopt Me

                        <FaArrowRight className="text-xs" />

                    </button>

                </div>

            </div>


            {/* =================================
                LOGIN / REGISTER POPUP
            ================================== */}

            {showLoginPopup && (

                <div className="
                    fixed
                    inset-0
                    z-[100]
                    flex
                    items-center
                    justify-center
                    bg-slate-900/40
                    backdrop-blur-sm
                    px-5
                ">


                    {/* Popup */}

                    <div className="
                        relative
                        w-full
                        max-w-md
                        bg-white
                        rounded-3xl
                        shadow-2xl
                        p-8
                        text-center
                    ">


                        {/* Close */}

                        <button
                            onClick={() => setShowLoginPopup(false)}
                            className="
                                absolute
                                top-4
                                right-5
                                text-xl
                                text-gray-400
                                hover:text-gray-700
                                transition
                            "
                        >
                            ×
                        </button>


                        {/* Paw */}

                        <div className="
                            w-16
                            h-16
                            mx-auto
                            rounded-full
                            bg-violet-50
                            flex
                            items-center
                            justify-center
                            mb-5
                        ">

                            <FaPaw className="
                                text-3xl
                                text-violet-600
                            " />

                        </div>


                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-800
                        ">
                            Join PetVerse
                        </h2>


                        <p className="
                            mt-2
                            text-sm
                            leading-6
                            text-gray-500
                        ">
                            Please login or create an account before
                            submitting an adoption application.
                        </p>


                        {/* Buttons */}

                        <div className="
                            flex
                            gap-3
                            mt-7
                        ">


                            <button
                                onClick={handleLogin}
                                className="
                                    flex-1
                                    py-3
                                    rounded-full
                                    border
                                    border-violet-500
                                    text-violet-600
                                    font-semibold
                                    text-sm
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
                                    py-3
                                    rounded-full
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-pink-500
                                    text-white
                                    font-semibold
                                    text-sm
                                    shadow-md
                                    hover:-translate-y-0.5
                                    transition
                                "
                            >
                                Register
                            </button>

                        </div>


                        <p className="
                            text-xs
                            text-gray-400
                            mt-5
                        ">
                            Find your perfect companion with PetVerse 🐾
                        </p>

                    </div>

                </div>

            )}

        </>

    );
}

export default PetCard;