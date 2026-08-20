import { useEffect, useState } from "react";

import {
    FaMapMarkerAlt,
    FaPaw,
    FaShieldAlt,
    FaCalendarAlt,
    FaVenusMars,
    FaSearch,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


function FilterBar() {

    const navigate = useNavigate();


    // =========================================
    // FILTER STATE
    // =========================================

    const [filters, setFilters] = useState({

        city: "",
        type: "",
        breed: "",
        age: "",
        gender: "",

    });


    // =========================================
    // PET DATA FOR OPTIONS
    // =========================================

    const [pets, setPets] = useState([]);


    useEffect(() => {

        const loadPets = async () => {

            try {

                const response = await fetch(
                    "http://localhost:9090/api/pets"
                );


                if (!response.ok) {

                    throw new Error(
                        "Failed to load pets"
                    );

                }


                const data =
                    await response.json();


                const petList =
                    Array.isArray(data)
                        ? data
                        : data.pets || [];


                setPets(petList);

            } catch (error) {

                console.error(
                    "Filter options error:",
                    error
                );

            }

        };


        loadPets();

    }, []);


    // =========================================
    // UNIQUE OPTIONS
    // =========================================

    const uniqueValues = (key) => {

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

    };


    const cities =
        uniqueValues("city");


    const breeds =
        uniqueValues("breed");


    const genders =
        uniqueValues("gender");


    const types =
        uniqueValues("type");


    // =========================================
    // HANDLE CHANGE
    // =========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFilters((previous) => ({

            ...previous,

            [name]: value,

        }));

    };


    // =========================================
    // SEARCH
    // =========================================

    const handleSearch = () => {

        const params =
            new URLSearchParams();


        if (filters.city) {

            params.set(
                "city",
                filters.city
            );

        }


        if (filters.type) {

            params.set(
                "type",
                filters.type
            );

        }


        if (filters.breed) {

            params.set(
                "breed",
                filters.breed
            );

        }


        if (filters.age) {

            params.set(
                "age",
                filters.age
            );

        }


        if (filters.gender) {

            params.set(
                "gender",
                filters.gender
            );

        }


        const query =
            params.toString();


        navigate(
            query
                ? `/browse-pets?${query}`
                : "/browse-pets"
        );

    };


    return (

        <div className="
            w-full
            bg-white
            rounded-2xl
            border
            border-slate-100
            shadow-sm
            px-4
            py-3
        ">


            <div className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-6
                gap-3
                items-end
            ">


                {/* =================================
                    CITY
                ================================== */}

                <FilterSelect
                    label="City"
                    icon={
                        <FaMapMarkerAlt />
                    }
                    name="city"
                    value={filters.city}
                    onChange={handleChange}
                >

                    <option value="">
                        Select City
                    </option>

                    {cities.map((city) => (

                        <option
                            key={city}
                            value={city}
                        >

                            {city}

                        </option>

                    ))}

                </FilterSelect>


                {/* =================================
                    TYPE
                ================================== */}

                <FilterSelect
                    label="Pet Type"
                    icon={
                        <FaPaw />
                    }
                    name="type"
                    value={filters.type}
                    onChange={handleChange}
                >

                    <option value="">
                        All Types
                    </option>

                    {types.map((type) => (

                        <option
                            key={type}
                            value={type}
                        >

                            {type}

                        </option>

                    ))}

                </FilterSelect>


                {/* =================================
                    BREED
                ================================== */}

                <FilterSelect
                    label="Breed"
                    icon={
                        <FaShieldAlt />
                    }
                    name="breed"
                    value={filters.breed}
                    onChange={handleChange}
                >

                    <option value="">
                        All Breeds
                    </option>

                    {breeds.map((breed) => (

                        <option
                            key={breed}
                            value={breed}
                        >

                            {breed}

                        </option>

                    ))}

                </FilterSelect>


                {/* =================================
                    AGE
                ================================== */}

                <FilterSelect
                    label="Age"
                    icon={
                        <FaCalendarAlt />
                    }
                    name="age"
                    value={filters.age}
                    onChange={handleChange}
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

                </FilterSelect>


                {/* =================================
                    GENDER
                ================================== */}

                <FilterSelect
                    label="Gender"
                    icon={
                        <FaVenusMars />
                    }
                    name="gender"
                    value={filters.gender}
                    onChange={handleChange}
                >

                    <option value="">
                        All Genders
                    </option>

                    {genders.map((gender) => (

                        <option
                            key={gender}
                            value={gender}
                        >

                            {gender}

                        </option>

                    ))}

                </FilterSelect>


                {/* =================================
                    SEARCH BUTTON
                ================================== */}

                <button
                    type="button"
                    onClick={handleSearch}
                    className="
                        h-11
                        rounded-xl
                        bg-gradient-to-r
                        from-violet-600
                        via-fuchsia-500
                        to-pink-500
                        text-white
                        font-semibold
                        text-sm
                        flex
                        items-center
                        justify-center
                        gap-2
                        shadow-sm
                        hover:-translate-y-0.5
                        hover:shadow-md
                        transition-all
                    "
                >

                    <FaSearch />

                    Search

                </button>

            </div>

        </div>

    );

}


/* =============================================
   REUSABLE SELECT
============================================= */

function FilterSelect({
                          label,
                          icon,
                          name,
                          value,
                          onChange,
                          children,
                      }) {

    return (

        <div>

            <label className="
                flex
                items-center
                gap-1.5
                text-[10px]
                font-semibold
                text-slate-600
                mb-1.5
            ">

                <span className="
                    text-violet-500
                ">

                    {icon}

                </span>

                {label}

            </label>


            <div className="
                relative
            ">

                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="
                        w-full
                        h-11
                        px-3
                        rounded-xl
                        bg-slate-50
                        border
                        border-slate-200
                        text-xs
                        text-slate-600
                        outline-none
                        appearance-none
                        cursor-pointer
                        focus:border-violet-400
                        focus:ring-2
                        focus:ring-violet-100
                        transition
                    "
                >

                    {children}

                </select>


                <span className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                    text-[10px]
                    text-slate-400
                ">

                    ▼

                </span>

            </div>

        </div>

    );

}


export default FilterBar;