import { useEffect, useState } from "react";

import PetCard from "../components/PetCard";

import { Link } from "react-router-dom";


function FeaturedPets() {

    const [pets, setPets] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================================
    // FETCH PETS FROM BACKEND
    // =========================================

    useEffect(() => {

        const fetchPets = async () => {

            try {

                setLoading(true);

                setError("");


                const response = await fetch(
                    "https://petverse-backend-9odi.onrender.com/api/pets"
                );


                if (!response.ok) {

                    throw new Error(
                        "Failed to load pets."
                    );
                }


                const data = await response.json();


                console.log(
                    "Featured pets received:",
                    data
                );


                // Show first 8 pets on Home
                setPets(data.slice(0, 8));


            } catch (error) {

                console.error(
                    "Error fetching featured pets:",
                    error
                );


                setError(
                    "Unable to load pets right now."
                );


            } finally {

                setLoading(false);

            }

        };


        fetchPets();

    }, []);


    return (

        <section className="w-full">


            {/* =================================
                    HEADER
                ================================== */}

            <div className="
                    mb-8
                    mt-16
                    text-center
                ">


                <div className="
                        flex
                        items-center
                        justify-center
                        gap-3
                    ">


                    <span className="
                            text-3xl
                        ">

                        🐾

                    </span>


                    <h1 className="
                            text-4xl
                            md:text-5xl
                            font-bold
                            text-slate-800
                        ">

                        Featured{" "}


                        <span className="
                                text-transparent
                                bg-clip-text
                                bg-gradient-to-r
                                from-violet-600
                                via-fuchsia-500
                                to-pink-500
                            ">

                            Pets

                        </span>

                    </h1>


                </div>


                <p className="
                        mt-3
                        text-gray-500
                    ">

                    Meet some lovely pets waiting for their forever home.

                </p>


            </div>


            {/* VIEW ALL */}

            <div className="
                flex
                justify-end
                mb-5
            ">

                <Link
                    to="/browse-pets"
                    className="
                        text-violet-600
                        font-semibold
                        text-sm
                        hover:text-pink-500
                        transition
                    "
                >

                    View All Pets →

                </Link>

            </div>


            {/* =====================================
                LOADING
            ====================================== */}

            {loading && (

                <div className="
                    grid

                    grid-cols-2
                    lg:grid-cols-4

                    gap-5
                ">


                    {[1, 2, 3, 4, 5, 6, 7, 8].map(
                        (item) => (

                            <div
                                key={item}
                                className="
                                    h-[340px]
                                    bg-white
                                    rounded-2xl
                                    border
                                    border-slate-100
                                    shadow-sm
                                    animate-pulse
                                "
                            />

                        )
                    )}


                </div>

            )}


            {/* =====================================
                ERROR
            ====================================== */}

            {!loading && error && (

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-100
                    p-10
                    text-center
                ">


                    <div className="
                        text-4xl
                        mb-3
                    ">

                        🐾

                    </div>


                    <p className="
                        text-gray-500
                        text-sm
                    ">

                        {error}

                    </p>


                </div>

            )}


            {/* =====================================
                PET CARDS
            ====================================== */}

            {!loading &&
                !error &&
                pets.length > 0 && (

                    <div className="
                        grid

                        grid-cols-2
                        lg:grid-cols-4

                        gap-5
                    ">


                        {pets.map((pet) => (

                            <PetCard
                                key={pet.id}
                                pet={pet}
                            />

                        ))}


                    </div>

                )}


            {/* =====================================
                NO PETS
            ====================================== */}

            {!loading &&
                !error &&
                pets.length === 0 && (

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-100
                        p-10
                        text-center
                    ">


                        <div className="
                            text-4xl
                            mb-3
                        ">

                            🐾

                        </div>


                        <p className="
                            text-gray-500
                            text-sm
                        ">

                            No pets are currently available.

                        </p>


                    </div>

                )}


        </section>

    );
}


export default FeaturedPets;