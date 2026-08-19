import { useState } from "react";

import {
    FaHeart,
    FaPaw,
    FaEye,
    FaClock,
    FaVenusMars,
    FaMapMarkerAlt,
    FaFilePdf,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { isLoggedIn } from "../utils/auth";


function PetCard({ pet }) {

    const navigate = useNavigate();

    const [showLoginPopup, setShowLoginPopup] =
        useState(false);const [isWishlisted, setIsWishlisted] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    // =========================================
    // GET PET TRAITS
    // =========================================

    const getTraits = () => {

        if (!pet.traits) {
            return [];
        }


        if (Array.isArray(pet.traits)) {
            return pet.traits;
        }


        return pet.traits
            .split(",")
            .map((trait) => trait.trim())
            .filter(Boolean);
    };


    const traits = getTraits();


    // =========================================
    // IMAGE URL
    // =========================================

    const getImageUrl = () => {

        if (!pet.image) {
            return "";
        }


        const image = pet.image.trim();


        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {
            return image;
        }


        return `http://localhost:9090/uploads/pets/${encodeURIComponent(image)}`;
    };


    const imageUrl = getImageUrl();


    // =========================================
    // CHECK PDF
    // =========================================

    const isPdf =
        pet.image &&
        pet.image.trim().toLowerCase().endsWith(".pdf");


    // =========================================
    // LOGIN CHECK
    // =========================================

    const requireLogin = () => {

        if (!isLoggedIn()) {

            setShowLoginPopup(true);

            return false;
        }


        return true;
    };


    // =========================================
    // VIEW DETAILS
    // =========================================

    const handleViewDetails = () => {

        if (!requireLogin()) {
            return;
        }


        navigate(`/pet/${pet.id}`, {
            state: {
                pet: pet,
            },
        });
    };


    // =========================================
    // ADOPT PET
    // =========================================

    const handleAdopt = () => {

        if (!requireLogin()) {
            return;
        }


        navigate("/apply", {
            state: {
                pet: pet,
            },
        });
    };


    // =========================================
    // LOGIN
    // =========================================

    const handleLogin = () => {

        setShowLoginPopup(false);

        navigate("/login", {
            state: {
                openRegister: false,
            },
        });
    };


    // =========================================
    // REGISTER
    // =========================================

    const handleRegister = () => {

        setShowLoginPopup(false);

        navigate("/login", {
            state: {
                openRegister: true,
            },
        });
    };
    const handleWishlist = async () => {

        // Check login
        const token = localStorage.getItem("petverseToken");
        const savedUser = localStorage.getItem("petverseUser");

        // Guest → login/register popup
        if (!token || !savedUser) {
            setShowLoginPopup(true);
            return;
        }

        try {

            setWishlistLoading(true);

            // If already saved → remove it
            if (isWishlisted) {

                const response = await fetch(
                    `http://localhost:9090/api/wishlist/${pet.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to remove pet from wishlist."
                    );
                }

                setIsWishlisted(false);

            }

            // If not saved → add it
            else {

                const response = await fetch(
                    `http://localhost:9090/api/wishlist/${pet.id}`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {

                    const message =
                        await response.text();

                    throw new Error(
                        message ||
                        "Failed to add pet to wishlist."
                    );
                }

                setIsWishlisted(true);

            }

        } catch (error) {

            console.error(
                "Wishlist error:",
                error
            );

            alert(error.message);

        } finally {

            setWishlistLoading(false);

        }
    };

    return (

        <>

            {/* =====================================
                PET CARD
            ====================================== */}

            <div className="
                group
                bg-white
                rounded-2xl
                overflow-hidden
                border
                border-slate-100
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
            ">


                {/* =================================
                    PET IMAGE
                ================================== */}

                <div className="
                    relative
                    w-full
                    h-[150px]
                    overflow-hidden
                    bg-slate-100
                ">


                    {/* =================================
                        PDF
                    ================================== */}

                    {isPdf ? (

                        <div className="
                            w-full
                            h-full
                            flex
                            flex-col
                            items-center
                            justify-center
                            bg-red-50
                            text-red-500
                        ">

                            <FaFilePdf className="
                                text-4xl
                                mb-2
                            " />


                            <span className="
                                text-xs
                                font-semibold
                            ">
                                PDF FILE
                            </span>


                            <button
                                type="button"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    window.open(
                                        imageUrl,
                                        "_blank"
                                    );

                                }}
                                className="
                                    mt-2
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-red-500
                                    text-white
                                    text-[9px]
                                    font-semibold
                                    hover:bg-red-600
                                    transition
                                "
                            >
                                View PDF
                            </button>

                        </div>


                    ) : imageUrl ? (

                        /* =================================
                            PET IMAGE
                        ================================== */

                        <img
                            src={imageUrl}
                            alt={pet.name}
                            className="
                                w-full
                                h-full
                                object-cover
                                object-center
                                block
                                group-hover:scale-105
                                transition-transform
                                duration-500
                            "
                            onError={(e) => {

                                console.error(
                                    "Pet image failed to load:",
                                    imageUrl
                                );

                                e.currentTarget.style.display =
                                    "none";

                            }}
                        />


                    ) : (

                        /* =================================
                            NO IMAGE
                        ================================== */

                        <div className="
                            w-full
                            h-full
                            flex
                            items-center
                            justify-center
                            bg-violet-50
                        ">

                            <FaPaw className="
                                text-5xl
                                text-violet-300
                            " />

                        </div>

                    )}


                    {/* =================================
                        WISHLIST HEART
                    ================================== */}<button
                    type="button"
                    onClick={handleWishlist}
                    disabled={wishlistLoading}
                    className="
                          absolute
                          top-3
                          right-3
                          w-9
                          h-9
                          rounded-full
                          bg-white
                          flex
                          items-center
                          justify-center
                          shadow-md
                          transition-all
                          duration-200
                          hover:scale-110
                     "
                    aria-label="Add to wishlist"
                >
                    <FaHeart
                        className={
                            isWishlisted
                                ? "text-pink-500"
                                : "text-violet-500"
                        }
                    />
                </button>


                </div>


                {/* =================================
                    PET INFORMATION
                ================================== */}

                <div className="
                    px-5
                    pt-4
                    pb-5
                ">


                    {/* =================================
                        NAME + TYPE
                    ================================== */}

                    <div className="
                        flex
                        items-start
                        justify-between
                        gap-2
                    ">


                        <div className="min-w-0">

                            <h3 className="
                                text-lg
                                font-bold
                                text-slate-800
                                truncate
                            ">
                                {pet.name}
                            </h3>


                            <p className="
                                text-xs
                                text-slate-500
                                mt-0.5
                                truncate
                            ">
                                {pet.breed}
                            </p>

                        </div>


                        {/* TYPE */}

                        <span className="
                            flex-shrink-0
                            text-[10px]
                            px-2.5
                            py-1
                            rounded-full
                            bg-violet-50
                            text-violet-600
                            font-semibold
                        ">
                            {pet.type}
                        </span>

                    </div>


                    {/* =================================
                        PET BASIC INFO
                    ================================== */}

                    <div className="
                        flex
                        items-center
                        gap-3
                        mt-3
                        text-[11px]
                        text-slate-500
                    ">


                        {/* AGE */}

                        <span className="
                            flex
                            items-center
                            gap-1
                            whitespace-nowrap
                        ">

                            <FaClock className="
                                text-violet-400
                                text-[10px]
                            " />

                            {pet.age}

                        </span>


                        {/* GENDER */}

                        <span className="
                            flex
                            items-center
                            gap-1
                            whitespace-nowrap
                        ">

                            <FaVenusMars className="
                                text-pink-400
                                text-[11px]
                            " />

                            {pet.gender}

                        </span>


                        {/* CITY */}

                        <span className="
                            flex
                            items-center
                            gap-1
                            truncate
                        ">

                            <FaMapMarkerAlt className="
                                text-violet-400
                                text-[10px]
                            " />

                            {pet.city}

                        </span>

                    </div>


                    {/* =================================
                        TRAITS
                    ================================== */}

                    <div className="
                        flex
                        flex-wrap
                        gap-1.5
                        mt-3
                        min-h-[25px]
                    ">

                        {traits
                            .slice(0, 3)
                            .map((trait, index) => (

                                <span
                                    key={index}
                                    className={`
                                        text-[9px]
                                        px-2.5
                                        py-1
                                        rounded-full
                                        font-medium
                                        ${
                                        index === 0
                                            ? "bg-violet-50 text-violet-600"
                                            : index === 1
                                                ? "bg-orange-50 text-orange-500"
                                                : "bg-emerald-50 text-emerald-600"
                                    }
                                    `}
                                >
                                    {trait}
                                </span>

                            ))}

                    </div>


                    {/* =================================
                        ACTION BUTTONS
                    ================================== */}

                    <div className="
                        flex
                        gap-2
                        mt-4
                    ">


                        {/* VIEW DETAILS */}

                        <button
                            type="button"
                            onClick={handleViewDetails}
                            className="
                                flex-1
                                flex
                                items-center
                                justify-center
                                gap-1.5
                                py-3
                                rounded-xl
                                border
                                border-violet-300
                                bg-white
                                text-violet-600
                                text-[11px]
                                font-semibold
                                hover:bg-violet-50
                                hover:border-violet-400
                                transition-all
                            "
                        >

                            <FaEye className="text-[10px]" />

                            View Details

                        </button>


                        {/* ADOPT ME */}

                        <button
                            type="button"
                            onClick={handleAdopt}
                            className="
                                flex-1
                                flex
                                items-center
                                justify-center
                                gap-1.5
                                py-3
                                rounded-xl
                                bg-gradient-to-r
                                from-violet-600
                                via-fuchsia-500
                                to-pink-500
                                text-white
                                text-[11px]
                                font-semibold
                                shadow-sm
                                shadow-violet-200
                                hover:-translate-y-0.5
                                hover:shadow-md
                                transition-all
                            "
                        >

                            <FaPaw className="text-[10px]" />

                            Adopt Me

                        </button>

                    </div>

                </div>

            </div>


            {/* =====================================
                LOGIN / REGISTER POPUP
            ====================================== */}

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


                    {/* =================================
                        POPUP
                    ================================== */}

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


                        {/* CLOSE */}

                        <button
                            type="button"
                            onClick={() =>
                                setShowLoginPopup(false)
                            }
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


                        {/* PAW */}

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

                            Please login or create an account
                            before continuing with{" "}

                            <span className="
                                font-semibold
                                text-violet-600
                            ">
                                {pet.name}
                            </span>.

                        </p>


                        {/* POPUP BUTTONS */}

                        <div className="
                            flex
                            gap-3
                            mt-7
                        ">


                            {/* LOGIN */}

                            <button
                                type="button"
                                onClick={handleLogin}
                                className="
                                    flex-1
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
                                    hover:-translate-y-0.5
                                    hover:shadow-lg
                                    transition
                                "
                            >
                                Login
                            </button>


                            {/* REGISTER */}

                            <button
                                type="button"
                                onClick={handleRegister}
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