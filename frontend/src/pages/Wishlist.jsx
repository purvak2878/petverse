import { useEffect, useState } from "react";
import {
    FaHeart,
    FaTrash,
    FaArrowRight,
    FaPaw,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import PawBackground from "../components/PawBackground.jsx";
import Footer from "../components/Footer.jsx";


function Wishlist() {

    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================
    // FETCH WISHLIST
    // =========================================

    useEffect(() => {

        fetchWishlist();

    }, []);


    const fetchWishlist = async () => {

        const token =
            localStorage.getItem("petverseToken");

        const savedUser =
            localStorage.getItem("petverseUser");


        // Guest user
        if (!token || !savedUser) {

            setLoading(false);
            return;

        }


        try {

            const response = await fetch(
                "http://localhost:9090/api/wishlist",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to load wishlist."
                );

            }


            const data = await response.json();

            setWishlist(data);


        } catch (error) {

            console.error(
                "Wishlist error:",
                error
            );

            setError(
                "Unable to load your wishlist."
            );


        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // REMOVE PET
    // =========================================

    const removeFromWishlist = async (petId) => {

        const token =
            localStorage.getItem("petverseToken");


        try {

            const response = await fetch(
                `http://localhost:9090/api/wishlist/${petId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to remove pet."
                );

            }


            // Remove immediately from UI
            setWishlist((current) =>
                current.filter(
                    (pet) => pet.id !== petId
                )
            );


        } catch (error) {

            console.error(
                "Remove wishlist error:",
                error
            );

            setError(
                "Unable to remove this pet."
            );

        }

    };


    // =========================================
    // VIEW DETAILS
    // =========================================

    const handleViewDetails = (pet) => {

        navigate("/pet-details", {
            state: {
                pet: pet,
            },
        });

    };


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-slate-50
                flex
                items-center
                justify-center
            ">

                <div className="
                    text-center
                    text-gray-500
                ">

                    <FaPaw className="
                        mx-auto
                        mb-4
                        text-4xl
                        text-violet-500
                        animate-bounce
                    " />

                    <p>
                        Loading your wishlist...
                    </p>

                </div>

            </div>

        );

    }


    // =========================================
    // GUEST USER
    // =========================================

    const token =
        localStorage.getItem("petverseToken");

    const savedUser =
        localStorage.getItem("petverseUser");


    if (!token || !savedUser) {

        return (

            <div className="
                relative
                min-h-screen
                bg-slate-50
                overflow-hidden
            ">

                <PawBackground />


                <main className="
                    relative
                    z-10
                    min-h-[75vh]
                    flex
                    items-center
                    justify-center
                    px-6
                ">

                    <div className="
                        bg-white
                        rounded-3xl
                        shadow-xl
                        border
                        border-slate-100
                        p-10
                        max-w-md
                        w-full
                        text-center
                    ">

                        <div className="
                            w-16
                            h-16
                            mx-auto
                            rounded-full
                            bg-pink-50
                            flex
                            items-center
                            justify-center
                            mb-5
                        ">

                            <FaHeart className="
                                text-pink-500
                                text-2xl
                            " />

                        </div>


                        <h1 className="
                            text-2xl
                            font-bold
                            text-slate-800
                        ">

                            Your Wishlist

                        </h1>


                        <p className="
                            mt-3
                            text-gray-500
                            leading-6
                        ">

                            Login to save your favourite
                            pets and keep them close
                            to your heart.

                        </p>


                        <button
                            onClick={() =>
                                navigate("/login")
                            }
                            className="
                                mt-7
                                px-8
                                py-3
                                rounded-full
                                bg-gradient-to-r
                                from-violet-600
                                via-fuchsia-500
                                to-pink-500
                                text-white
                                font-semibold
                                shadow-lg
                                hover:-translate-y-0.5
                                transition
                            "
                        >

                            Login / Register

                        </button>

                    </div>

                </main>


                <Footer />

            </div>

        );

    }


    // =========================================
    // MAIN WISHLIST PAGE
    // =========================================

    return (

        <div className="
            relative
            min-h-screen
            bg-slate-50
            overflow-hidden
        ">

            <PawBackground />


            <main className="
                relative
                z-10
                max-w-6xl
                mx-auto
                px-6
                pt-28
                pb-20
            ">


                {/* =================================
                    HEADER
                ================================== */}

                <div className="
                    text-center
                    mb-12
                ">

                    <div className="
                        flex
                        items-center
                        justify-center
                        gap-3
                    ">

                        <FaHeart className="
                            text-pink-500
                            text-2xl
                        " />


                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-bold
                            text-slate-800
                        ">

                            My{" "}

                            <span className="
                                text-transparent
                                bg-clip-text
                                bg-gradient-to-r
                                from-violet-600
                                via-fuchsia-500
                                to-pink-500
                            ">

                                Wishlist

                            </span>

                        </h1>

                    </div>


                    <p className="
                        mt-3
                        text-gray-500
                    ">

                        Pets you've saved for later.

                    </p>

                </div>


                {/* =================================
                    ERROR
                ================================== */}

                {error && (

                    <div className="
                        mb-6
                        rounded-xl
                        bg-red-50
                        border
                        border-red-100
                        text-red-600
                        px-5
                        py-3
                        text-center
                        text-sm
                    ">

                        {error}

                    </div>

                )}


                {/* =================================
                    EMPTY WISHLIST
                ================================== */}

                {wishlist.length === 0 ? (

                    <div className="
                        bg-white
                        rounded-3xl
                        border
                        border-slate-100
                        shadow-lg
                        p-12
                        text-center
                        max-w-xl
                        mx-auto
                    ">

                        <div className="
                            w-20
                            h-20
                            mx-auto
                            rounded-full
                            bg-pink-50
                            flex
                            items-center
                            justify-center
                            mb-5
                        ">

                            <FaHeart className="
                                text-pink-400
                                text-3xl
                            " />

                        </div>


                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-800
                        ">

                            Your wishlist is empty

                        </h2>


                        <p className="
                            mt-2
                            text-gray-500
                        ">

                            Found a pet you love?
                            Save it here so you can
                            find it again later.

                        </p>


                        <button
                            onClick={() =>
                                navigate("/browse-pets")
                            }
                            className="
                                mt-7
                                inline-flex
                                items-center
                                gap-2
                                px-7
                                py-3
                                rounded-full
                                bg-gradient-to-r
                                from-violet-600
                                via-fuchsia-500
                                to-pink-500
                                text-white
                                font-semibold
                                shadow-lg
                                hover:-translate-y-0.5
                                transition
                            "
                        >

                            Browse Pets

                            <FaArrowRight />

                        </button>

                    </div>

                ) : (

                    /* =================================
                       WISHLIST PET GRID
                    ================================== */

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-7
                    ">

                        {wishlist.map((pet) => (

                            <div
                                key={pet.id}
                                className="
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
                                "
                            >

                                {/* IMAGE */}

                                <div className="
                                    relative
                                    h-60
                                    overflow-hidden
                                ">

                                    {pet.image ? (

                                        <img
                                            src={pet.image}
                                            alt={pet.name}
                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                                hover:scale-105
                                                transition
                                                duration-500
                                            "
                                        />

                                    ) : (

                                        <div className="
                                            w-full
                                            h-full
                                            bg-violet-50
                                            flex
                                            items-center
                                            justify-center
                                        ">

                                            <FaPaw className="
                                                text-5xl
                                                text-violet-300
                                            " />

                                        </div>

                                    )}


                                    {/* REMOVE BUTTON */}

                                    <button
                                        onClick={() =>
                                            removeFromWishlist(
                                                pet.id
                                            )
                                        }
                                        className="
                                            absolute
                                            top-4
                                            right-4
                                            w-10
                                            h-10
                                            rounded-full
                                            bg-white/95
                                            flex
                                            items-center
                                            justify-center
                                            text-gray-500
                                            hover:text-red-500
                                            shadow-md
                                            transition
                                        "
                                        title="Remove from wishlist"
                                    >

                                        <FaTrash />

                                    </button>

                                </div>


                                {/* PET INFO */}

                                <div className="p-6">

                                    <h2 className="
                                        text-xl
                                        font-bold
                                        text-slate-800
                                    ">

                                        {pet.name}

                                    </h2>


                                    <p className="
                                        mt-1
                                        text-sm
                                        text-gray-500
                                    ">

                                        {pet.breed}

                                    </p>


                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                        mt-3
                                        text-xs
                                        text-gray-500
                                    ">

                                        <span>
                                            {pet.age}
                                        </span>

                                        <span>
                                            {pet.gender}
                                        </span>

                                        <span>
                                            {pet.city}
                                        </span>

                                    </div>


                                    {/* VIEW DETAILS */}

                                    <button
                                        onClick={() =>
                                            handleViewDetails(
                                                pet
                                            )
                                        }
                                        className="
                                            w-full
                                            mt-5
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            px-4
                                            py-2.5
                                            rounded-full
                                            border
                                            border-violet-200
                                            text-violet-600
                                            font-semibold
                                            text-sm
                                            hover:bg-violet-50
                                            transition
                                        "
                                    >

                                        View Details

                                        <FaArrowRight
                                            className="text-xs"
                                        />

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>


            <Footer />

        </div>

    );

}


export default Wishlist;