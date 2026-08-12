import { useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";

import PetCard from "../components/PetCard";
import { pets } from "../components/FeaturedPets";

function BrowsePets() {

    const [search, setSearch] = useState("");

    const filteredPets = pets.filter((pet) =>
        pet.name.toLowerCase().includes(search.toLowerCase()) ||
        pet.breed.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="px-6 py-6">

            {/* ================= HEADER ================= */}

            <div className="mb-6">

                <div className="flex items-center gap-3">

                    <span className="text-3xl">
                        🐾
                    </span>

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Browse Pets
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Find a loving companion waiting for their forever home.
                        </p>

                    </div>

                </div>

            </div>


            {/* ================= SEARCH ================= */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">

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
                        onChange={(e) => setSearch(e.target.value)}
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

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-7">

                <div className="flex items-center gap-2 mb-4">

                    <FaSlidersH className="text-violet-500" />

                    <h2 className="font-semibold text-gray-800">
                        Filter Pets
                    </h2>

                </div>


                <div className="grid grid-cols-4 gap-4">

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
                        <option>All Cities</option>
                        <option>Mumbai</option>
                        <option>Pune</option>
                        <option>Nanded</option>
                        <option>Nagpur</option>
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
                        <option>All Pet Types</option>
                        <option>Dogs</option>
                        <option>Cats</option>
                        <option>Birds</option>
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
                        <option>All Breeds</option>
                        <option>Golden Retriever</option>
                        <option>Labrador Retriever</option>
                        <option>Beagle</option>
                        <option>Persian Cat</option>
                        <option>Samoyed</option>
                        <option>Border Collie</option>
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
                        <option>All Ages</option>
                        <option>0 - 6 Months</option>
                        <option>6 Months - 1 Year</option>
                        <option>1 - 3 Years</option>
                        <option>3+ Years</option>
                    </select>

                </div>

            </div>


            {/* ================= PET COUNT ================= */}

            <div className="flex items-center justify-between mb-5">

                <div>

                    <h2 className="text-xl font-bold text-gray-800">
                        Available Pets
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {filteredPets.length} pets found
                    </p>

                </div>

            </div>


            {/* ================= PET GRID ================= */}

            {filteredPets.length > 0 ? (

                <div className="grid grid-cols-4 gap-5">

                    {filteredPets.map((pet) => (

                        <PetCard
                            key={pet.id}
                            pet={pet}
                        />

                    ))}

                </div>

            ) : (

                /* No results */

                <div className="
                    bg-white
                    rounded-2xl
                    p-12
                    text-center
                    border
                    border-gray-100
                ">

                    <div className="text-5xl mb-4">
                        🐾
                    </div>

                    <h3 className="text-xl font-bold text-gray-700">
                        No pets found
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Try searching for another name or breed.
                    </p>

                </div>

            )}

        </div>
    );
}

export default BrowsePets;