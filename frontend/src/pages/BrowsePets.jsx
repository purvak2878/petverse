import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    FaSearch,
    FaSlidersH,
    FaTimes,
} from "react-icons/fa";

import {
    useSearchParams,
} from "react-router-dom";

import PetCard from "../components/PetCard";

import PawBackground from "../components/PawBackground.jsx";


function BrowsePets() {

    const [searchParams, setSearchParams] =
        useSearchParams();


    // =========================================
    // PETS
    // =========================================

    const [pets, setPets] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    // =========================================
    // FILTERS
    // =========================================

    const [search, setSearch] =
        useState(
            searchParams.get("search") || ""
        );


    const [city, setCity] =
        useState(
            searchParams.get("city") || ""
        );


    const [type, setType] =
        useState(
            searchParams.get("type") || ""
        );


    const [breed, setBreed] =
        useState(
            searchParams.get("breed") || ""
        );


    const [age, setAge] =
        useState(
            searchParams.get("age") || ""
        );


    const [gender, setGender] =
        useState(
            searchParams.get("gender") || ""
        );


    // =========================================
    // LOAD PETS
    // =========================================

    useEffect(() => {

        const loadPets = async () => {

            setLoading(true);
            setError("");


            try {

                const response = await fetch(
                    "http://localhost:9090/api/pets"
                );


                if (!response.ok) {

                    throw new Error(
                        `Failed to load pets (${response.status})`
                    );

                }


                const data =
                    await response.json();


                const petList =
                    Array.isArray(data)
                        ? data
                        : data.pets || [];


                console.log(
                    "Pets received from backend:",
                    petList
                );


                setPets(petList);

            } catch (err) {

                console.error(
                    "Browse pets error:",
                    err
                );


                setError(
                    "Unable to load pets from the server."
                );

            } finally {

                setLoading(false);

            }

        };


        loadPets();

    }, []);


    // =========================================
    // SYNC URL → STATE
    // =========================================

    useEffect(() => {

        setSearch(
            searchParams.get("search") || ""
        );

        setCity(
            searchParams.get("city") || ""
        );

        setType(
            searchParams.get("type") || ""
        );

        setBreed(
            searchParams.get("breed") || ""
        );

        setAge(
            searchParams.get("age") || ""
        );

        setGender(
            searchParams.get("gender") || ""
        );

    }, [searchParams]);


    // =========================================
    // UNIQUE FILTER OPTIONS
    // =========================================

    const cities = useMemo(() => {

        return getUniqueValues(
            pets,
            "city"
        );

    }, [pets]);


    const types = useMemo(() => {

        return getUniqueValues(
            pets,
            "type"
        );

    }, [pets]);


    const breeds = useMemo(() => {

        return getUniqueValues(
            pets,
            "breed"
        );

    }, [pets]);


    const genders = useMemo(() => {

        return getUniqueValues(
            pets,
            "gender"
        );

    }, [pets]);


    // =========================================
    // AGE MATCHER
    // =========================================

    const matchesAge = (
        petAge,
        selectedAge
    ) => {

        if (!selectedAge) {

            return true;

        }


        const months =
            parseAgeInMonths(
                petAge
            );


        if (months === null) {

            return false;

        }


        switch (selectedAge) {

            case "0-6":

                return months >= 0 &&
                    months <= 6;


            case "6-12":

                return months > 6 &&
                    months <= 12;


            case "1-3":

                return months > 12 &&
                    months <= 36;


            case "3+":

                return months > 36;


            default:

                return true;

        }

    };


    // =========================================
    // FILTER PETS
    // =========================================

    const filteredPets = useMemo(() => {

        const query =
            search.trim().toLowerCase();


        return pets.filter((pet) => {

            // SEARCH

            const matchesSearch =
                !query ||

                String(
                    pet.name || ""
                )
                    .toLowerCase()
                    .includes(query) ||

                String(
                    pet.breed || ""
                )
                    .toLowerCase()
                    .includes(query) ||

                String(
                    pet.city || ""
                )
                    .toLowerCase()
                    .includes(query) ||

                String(
                    pet.type || ""
                )
                    .toLowerCase()
                    .includes(query);


            // CITY

            const matchesCity =
                !city ||

                String(
                    pet.city || ""
                )
                    .toLowerCase() ===
                city.toLowerCase();


            // TYPE

            const matchesType =
                !type ||

                String(
                    pet.type || ""
                )
                    .toLowerCase() ===
                type.toLowerCase();


            // BREED

            const matchesBreed =
                !breed ||

                String(
                    pet.breed || ""
                )
                    .toLowerCase() ===
                breed.toLowerCase();


            // GENDER

            const matchesGender =
                !gender ||

                String(
                    pet.gender || ""
                )
                    .toLowerCase() ===
                gender.toLowerCase();


            // AGE

            const matchesSelectedAge =
                matchesAge(
                    pet.age,
                    age
                );


            return (
                matchesSearch &&
                matchesCity &&
                matchesType &&
                matchesBreed &&
                matchesGender &&
                matchesSelectedAge
            );

        });

    }, [
        pets,
        search,
        city,
        type,
        breed,
        gender,
        age,
    ]);


    // =========================================
    // UPDATE URL
    // =========================================

    const updateSearchParams = (
        overrides = {}
    ) => {

        const values = {

            search,
            city,
            type,
            breed,
            age,
            gender,

            ...overrides,

        };


        const params =
            new URLSearchParams();


        Object.entries(values)
            .forEach(
                ([key, value]) => {

                    if (value) {

                        params.set(
                            key,
                            value
                        );

                    }

                }
            );


        setSearchParams(params);

    };


    // =========================================
    // SEARCH INPUT
    // =========================================

    const handleSearchChange = (e) => {

        setSearch(
            e.target.value
        );

    };


    const handleSearchKeyDown = (e) => {

        if (
            e.key === "Enter"
        ) {

            updateSearchParams();

        }

    };


    // =========================================
    // CLEAR FILTERS
    // =========================================

    const clearFilters = () => {

        setSearch("");
        setCity("");
        setType("");
        setBreed("");
        setAge("");
        setGender("");

        setSearchParams({});

    };


    const hasFilters =
        search ||
        city ||
        type ||
        breed ||
        age ||
        gender;


    return (

        <div className="
            relative
            min-h-screen
            w-full
            overflow-hidden
            bg-slate-50
        ">


            {/* =================================
                PAW BACKGROUND
            ================================== */}

            <div className="
                absolute
                inset-0
                z-0
                pointer-events-none
            ">

                <PawBackground />

            </div>


            {/* =================================
                CONTENT
            ================================== */}

            <div className="
                relative
                z-10
                px-6
                py-6
            ">


                {/* =================================
                    HEADER
                ================================== */}

                <div className="
                    mb-8
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


                {/* =================================
                    SEARCH
                ================================== */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    p-4
                    mb-5
                ">

                    <div className="
                        flex
                        gap-3
                    ">


                        <div className="
                            relative
                            flex-1
                        ">

                            <FaSearch className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-violet-400
                            " />


                            <input
                                type="text"
                                placeholder="
                                    Search by pet name,
                                    breed or location...
                                "
                                value={search}
                                onChange={
                                    handleSearchChange
                                }
                                onKeyDown={
                                    handleSearchKeyDown
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
                                    text-slate-700
                                    focus:border-violet-400
                                    focus:ring-2
                                    focus:ring-violet-100
                                    transition
                                "
                            />

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                updateSearchParams()
                            }
                            className="
                                px-6
                                rounded-xl
                                bg-gradient-to-r
                                from-violet-600
                                to-pink-500
                                text-white
                                text-sm
                                font-semibold
                                hover:shadow-md
                                transition
                            "
                        >

                            Search

                        </button>

                    </div>

                </div>


                {/* =================================
                    FILTERS
                ================================== */}

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
                        justify-between
                        mb-4
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                        ">

                            <FaSlidersH className="
                                text-violet-500
                            " />


                            <h2 className="
                                font-semibold
                                text-gray-800
                            ">

                                Filter Pets

                            </h2>

                        </div>


                        {hasFilters && (

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="
                                    flex
                                    items-center
                                    gap-1.5
                                    text-xs
                                    font-semibold
                                    text-slate-400
                                    hover:text-red-500
                                    transition
                                "
                            >

                                <FaTimes />

                                Clear Filters

                            </button>

                        )}

                    </div>


                    <div className="
                        grid
                        grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-5
                        gap-4
                    ">


                        {/* CITY */}

                        <select
                            value={city}
                            onChange={(e) => {

                                setCity(
                                    e.target.value
                                );

                                updateSearchParams({
                                    city:
                                    e.target.value
                                });

                            }}
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

                            <option value="">
                                All Cities
                            </option>

                            {cities.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >

                                    {item}

                                </option>

                            ))}

                        </select>


                        {/* TYPE */}

                        <select
                            value={type}
                            onChange={(e) => {

                                setType(
                                    e.target.value
                                );

                                updateSearchParams({
                                    type:
                                    e.target.value
                                });

                            }}
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

                            <option value="">
                                All Pet Types
                            </option>

                            {types.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >

                                    {item}

                                </option>

                            ))}

                        </select>


                        {/* BREED */}

                        <select
                            value={breed}
                            onChange={(e) => {

                                setBreed(
                                    e.target.value
                                );

                                updateSearchParams({
                                    breed:
                                    e.target.value
                                });

                            }}
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

                            <option value="">
                                All Breeds
                            </option>

                            {breeds.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >

                                    {item}

                                </option>

                            ))}

                        </select>


                        {/* AGE */}

                        <select
                            value={age}
                            onChange={(e) => {

                                setAge(
                                    e.target.value
                                );

                                updateSearchParams({
                                    age:
                                    e.target.value
                                });

                            }}
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

                            <option value="">
                                All Ages
                            </option>

                            <option value="0-6">
                                0 - 6 Months
                            </option>

                            <option value="6-12">
                                6 Months - 1 Year
                            </option>

                            <option value="1-3">
                                1 - 3 Years
                            </option>

                            <option value="3+">
                                3+ Years
                            </option>

                        </select>


                        {/* GENDER */}

                        <select
                            value={gender}
                            onChange={(e) => {

                                setGender(
                                    e.target.value
                                );

                                updateSearchParams({
                                    gender:
                                    e.target.value
                                });

                            }}
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

                            <option value="">
                                All Genders
                            </option>

                            {genders.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >

                                    {item}

                                </option>

                            ))}

                        </select>

                    </div>

                </div>


                {/* =================================
                    PET COUNT
                ================================== */}

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


                        <p className="
                            text-sm
                            text-gray-500
                            mt-1
                        ">

                            {loading
                                ? "Loading pets..."
                                : `${filteredPets.length} pets found`
                            }

                        </p>

                    </div>

                </div>


                {/* =================================
                    ERROR
                ================================== */}

                {error && (

                    <div className="
                        bg-red-50
                        border
                        border-red-200
                        text-red-600
                        rounded-2xl
                        p-5
                        mb-5
                        text-sm
                    ">

                        {error}

                    </div>

                )}


                {/* =================================
                    LOADING
                ================================== */}

                {loading ? (

                    <div className="
                        bg-white
                        rounded-2xl
                        p-12
                        text-center
                        border
                        border-gray-100
                    ">

                        <div className="
                            text-4xl
                            mb-4
                            animate-bounce
                        ">

                            🐾

                        </div>


                        <p className="
                            text-sm
                            text-gray-500
                        ">

                            Finding pets for you...

                        </p>

                    </div>

                ) : filteredPets.length > 0 ? (

                    /* =================================
                        PET GRID
                    ================================== */

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                        gap-5
                    ">

                        {filteredPets.map(
                            (pet) => (

                                <PetCard
                                    key={pet.id}
                                    pet={pet}
                                />

                            )
                        )}

                    </div>

                ) : (

                    /* =================================
                        NO RESULTS
                    ================================== */

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

                            Try changing your search
                            or filters.

                        </p>


                        {hasFilters && (

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="
                                    mt-5
                                    px-5
                                    py-2.5
                                    rounded-full
                                    bg-violet-50
                                    text-violet-600
                                    text-sm
                                    font-semibold
                                    hover:bg-violet-100
                                    transition
                                "
                            >

                                Clear Filters

                            </button>

                        )}

                    </div>

                )}

            </div>

        </div>

    );

}


/* =============================================
   UNIQUE VALUES
============================================= */

function getUniqueValues(
    pets,
    key
) {

    return [

        ...new Set(

            pets
                .map((pet) => pet[key])
                .filter(Boolean)
                .map((value) =>
                    String(value).trim()
                )

        ),

    ].sort();

}


/* =============================================
   AGE PARSER
============================================= */

function parseAgeInMonths(ageValue) {

    if (
        ageValue === null ||
        ageValue === undefined
    ) {

        return null;

    }


    const value =
        String(ageValue)
            .trim()
            .toLowerCase();


    const numberMatch =
        value.match(
            /(\d+(?:\.\d+)?)/
        );


    if (!numberMatch) {

        return null;

    }


    const number =
        parseFloat(
            numberMatch[1]
        );


    if (value.includes("month")) {

        return number;

    }


    if (
        value.includes("year") ||
        value.includes("yr")
    ) {

        return number * 12;

    }


    // If backend stores only a number,
    // treat it as years.

    if (
        !value.includes("month") &&
        !value.includes("year")
    ) {

        return number * 12;

    }


    return null;

}


export default BrowsePets;