import { useEffect, useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";

import PetCard from "../components/PetCard";
import PawBackground from "../components/PawBackground.jsx";
import Footer from "../components/Footer.jsx";


function BrowsePets() {

    // =========================================
    // PET DATA
    // =========================================

    const [pets, setPets] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");


    // =========================================
    // FETCH PETS FROM BACKEND
    // =========================================

    useEffect(() => {

        const fetchPets = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:9090/api/pets"
                );


                if (!response.ok) {

                    throw new Error(
                        "Failed to load pets."
                    );

                }


                const data = await response.json();


                console.log(
                    "Pets received from backend:",
                    data
                );


                setPets(data);


            } catch (error) {

                console.error(
                    "Error fetching pets:",
                    error
                );

                setError(
                    "Unable to load pets right now. Please try again."
                );


            } finally {

                setLoading(false);

            }

        };


        fetchPets();

    }, []);


    // =========================================
    // SEARCH
    // =========================================

    const filteredPets = pets.filter((pet) => {

        const searchText =
            search.toLowerCase();


        return (
            pet.name
                ?.toLowerCase()
                .includes(searchText) ||

            pet.breed
                ?.toLowerCase()
                .includes(searchText)
        );

    });


    return (

        <div className="
            relative
            min-h-screen
            w-full
            overflow-hidden
            bg-slate-50
        ">


            {/* =====================================
                PAW BACKGROUND
                Stays BEHIND all page content
            ====================================== */}

            <div className="
                absolute
                inset-0
                z-0
                pointer-events-none
            ">

                <PawBackground />

            </div>


            {/* =====================================
                ALL BROWSE PETS CONTENT
            ====================================== */}

            <div className="
                relative
                z-10
                px-6
                py-6
            ">


                {/* ================= HEADER ================= */}

                <div className="
                    mb-10
                    text-center
                ">

                    <div className="
                        flex
                        items-center
                        justify-center
                        gap-3
                    ">

                        <span className="text-3xl">
                            🐾
                        </span>


                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-bold
                            text-slate-800
                        ">

                            Browse{" "}

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

                        Find a loving companion waiting
                        for their forever home!

                    </p>

                </div>


                {/* ================= SEARCH ================= */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    p-4
                    mb-5
                ">

                    <div className="relative">

                        <FaSearch
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-violet-400
                            "
                        />


                        <input
                            type="text"
                            placeholder="Search by pet name or breed..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                                w-full
                                h-12
                                pl-11
                                pr-4
                                rounded-xl
                                bg-gray-50
                                border
                                border-gray-200
                                outline-none
                                text-sm
                                focus:border-violet-400
                                focus:ring-2
                                focus:ring-violet-100
                                transition
                            "
                        />

                    </div>

                </div>


                {/* ================= FILTERS ================= */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    p-4
                    mb-7
                ">


                    <div className="
                        flex
                        items-center
                        gap-2
                        mb-4
                    ">

                        <FaSlidersH
                            className="text-violet-500"
                        />

                        <h2 className="
                            font-semibold
                            text-gray-800
                        ">
                            Filter Pets
                        </h2>

                    </div>


                    <div className="
                        grid
                        grid-cols-4
                        gap-4
                    ">


                        {/* City */}

                        <select
                            className="
                                h-11
                                px-3
                                rounded-xl
                                bg-gray-50
                                border
                                border-gray-200
                                text-sm
                                text-gray-600
                                outline-none
                                focus:border-violet-400
                            "
                        >

                            <option>
                                All Cities
                            </option>

                            <option>
                                Mumbai
                            </option>

                            <option>
                                Pune
                            </option>

                            <option>
                                Nanded
                            </option>

                            <option>
                                Nagpur
                            </option>

                        </select>


                        {/* Pet Type */}

                        <select
                            className="
                                h-11
                                px-3
                                rounded-xl
                                bg-gray-50
                                border
                                border-gray-200
                                text-sm
                                text-gray-600
                                outline-none
                                focus:border-violet-400
                            "
                        >

                            <option>
                                All Pet Types
                            </option>

                            <option>
                                Dogs
                            </option>

                            <option>
                                Cats
                            </option>

                            <option>
                                Birds
                            </option>

                        </select>


                        {/* Breed */}

                        <select
                            className="
                                h-11
                                px-3
                                rounded-xl
                                bg-gray-50
                                border
                                border-gray-200
                                text-sm
                                text-gray-600
                                outline-none
                                focus:border-violet-400
                            "
                        >

                            <option>
                                All Breeds
                            </option>

                            <option>
                                Golden Retriever
                            </option>

                            <option>
                                Labrador Retriever
                            </option>

                            <option>
                                Beagle
                            </option>

                            <option>
                                Persian Cat
                            </option>

                            <option>
                                Samoyed
                            </option>

                            <option>
                                Border Collie
                            </option>

                        </select>


                        {/* Age */}

                        <select
                            className="
                                h-11
                                px-3
                                rounded-xl
                                bg-gray-50
                                border
                                border-gray-200
                                text-sm
                                text-gray-600
                                outline-none
                                focus:border-violet-400
                            "
                        >

                            <option>
                                All Ages
                            </option>

                            <option>
                                0 - 6 Months
                            </option>

                            <option>
                                6 Months - 1 Year
                            </option>

                            <option>
                                1 - 3 Years
                            </option>

                            <option>
                                3+ Years
                            </option>

                        </select>

                    </div>

                </div>


                {/* ================= PET COUNT ================= */}

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-5
                ">

                    <div>

                        <h2 className="
                            text-xl
                            font-bold
                            text-gray-800
                        ">
                            Available Pets
                        </h2>


                        {!loading && !error && (

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">

                                {filteredPets.length} pets found

                            </p>

                        )}

                    </div>

                </div>


                {/* =====================================
                    LOADING STATE
                ====================================== */}

                {loading && (

                    <div className="
                        bg-white
                        rounded-2xl
                        p-12
                        text-center
                        border
                        border-gray-100
                        shadow-sm
                    ">

                        <div className="
                            text-4xl
                            mb-4
                            animate-bounce
                        ">
                            🐾
                        </div>


                        <h3 className="
                            text-lg
                            font-semibold
                            text-gray-700
                        ">
                            Finding your furry friends...
                        </h3>


                        <p className="
                            text-sm
                            text-gray-400
                            mt-2
                        ">
                            Loading pets from PetVerse.
                        </p>

                    </div>

                )}


                {/* =====================================
                    ERROR STATE
                ====================================== */}

                {!loading && error && (

                    <div className="
                        bg-white
                        rounded-2xl
                        p-12
                        text-center
                        border
                        border-red-100
                        shadow-sm
                    ">

                        <div className="
                            text-4xl
                            mb-4
                        ">
                            🐾
                        </div>


                        <h3 className="
                            text-xl
                            font-bold
                            text-gray-700
                        ">
                            Oops!
                        </h3>


                        <p className="
                            text-gray-500
                            mt-2
                            mb-5
                        ">
                            {error}
                        </p>


                        <button
                            onClick={() =>
                                window.location.reload()
                            }
                            className="
                                px-6
                                py-2.5
                                rounded-full
                                text-white
                                text-sm
                                font-semibold
                                bg-gradient-to-r
                                from-violet-600
                                to-pink-500
                                hover:-translate-y-0.5
                                transition
                            "
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* =====================================
                    PET GRID
                ====================================== */}

                {!loading &&
                    !error &&
                    filteredPets.length > 0 && (

                        <div className="
                            grid
                            grid-cols-4
                            gap-5
                        ">

                            {filteredPets.map((pet) => (

                                <PetCard
                                    key={pet.id}
                                    pet={pet}
                                />

                            ))}

                        </div>

                    )}


                {/* =====================================
                    NO RESULTS
                ====================================== */}

                {!loading &&
                    !error &&
                    filteredPets.length === 0 && (

                        <div className="
                            bg-white
                            rounded-2xl
                            p-12
                            text-center
                            border
                            border-gray-100
                        ">

                            <div className="
                                text-5xl
                                mb-4
                            ">
                                🐾
                            </div>


                            <h3 className="
                                text-xl
                                font-bold
                                text-gray-700
                            ">
                                No pets found
                            </h3>


                            <p className="
                                text-gray-500
                                mt-2
                            ">
                                Try searching for another name or breed.
                            </p>

                        </div>

                    )}

            </div>
        <Footer/>
        </div>
    );
}


export default BrowsePets;