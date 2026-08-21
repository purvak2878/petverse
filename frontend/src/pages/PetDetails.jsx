import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PawBackground from "../components/PawBackground";
import { isLoggedIn } from "../utils/auth";


function PetDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [pet, setPet] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!isLoggedIn()) {
            navigate("/login");
            return;
        }

        const loadPet = async () => {

            try {

                const response = await fetch(
                    `https://petverse-backend-9odi.onrender.com/api/pets/${id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to load pet");
                }

                const data = await response.json();

                setPet(data);

            } catch (error) {

                console.error(
                    "Pet details error:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

        loadPet();

    }, [id, navigate]);


    // =====================================================
    // IMAGE URL
    // =====================================================

    const getImageUrl = (image) => {

        if (!image) {

            return "";
        }


        if (image.startsWith("http")) {

            return image;
        }


        return `https://petverse-backend-9odi.onrender.com/uploads/pets/${image}`;
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-50 flex items-center justify-center">

                <p className="text-violet-600">
                    Loading pet details...
                </p>

            </div>
        );
    }


    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!pet) {

        return (

            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">

                <h2 className="text-xl font-bold text-slate-700">
                    Pet not found
                </h2>

                <button
                    onClick={() =>
                        navigate("/browse-pets")
                    }
                    className="mt-4 px-5 py-2 rounded-lg bg-violet-600 text-white"
                >
                    Back to Browse Pets
                </button>

            </div>
        );
    }


    // =====================================================
    // TRAITS
    // =====================================================

    const traits = pet.traits
        ? pet.traits
            .split(",")
            .map((trait) => trait.trim())
            .filter(Boolean)
        : [];


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="relative min-h-screen bg-slate-50 py-8 px-4">

            <PawBackground />


            <div className="relative z-10 max-w-6xl mx-auto">


                {/* BACK */}

                <button
                    onClick={() =>
                        navigate("/browse-pets")
                    }
                    className="mb-6 text-violet-600 text-sm font-semibold hover:text-violet-800"
                >
                    ← Back to Browse Pets
                </button>


                {/* MAIN CARD */}

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">


                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div className="bg-slate-100 min-h-[500px] flex items-center justify-center">

                        {pet.image ? (

                            <img
                                src={getImageUrl(pet.image)}
                                alt={pet.name}
                                className="w-full h-full max-h-[650px] object-cover"
                            />

                        ) : (

                            <div className="text-slate-400">
                                No image available
                            </div>

                        )}

                    </div>


                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <div className="p-7 lg:p-10">


                        {/* TYPE + STATUS */}

                        <div className="flex items-center justify-between mb-3">

                            <span className="px-4 py-1.5 rounded-full bg-violet-50 text-violet-600 text-xs font-semibold">
                                {pet.type}
                            </span>


                            <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                                {pet.status}
                            </span>

                        </div>


                        {/* NAME */}

                        <h1 className="text-4xl font-bold text-slate-800">
                            {pet.name}
                        </h1>


                        {/* BREED */}

                        <p className="text-slate-500 mt-1 text-lg">
                            {pet.breed}
                        </p>


                        {/* INFORMATION GRID */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">


                            {/* AGE */}

                            <div className="bg-slate-50 rounded-xl p-5">

                                <p className="text-xs text-violet-500 font-medium">
                                    Age
                                </p>

                                <p className="text-slate-800 font-semibold mt-1">
                                    {pet.age}
                                </p>

                            </div>


                            {/* GENDER */}

                            <div className="bg-slate-50 rounded-xl p-5">

                                <p className="text-xs text-pink-500 font-medium">
                                    Gender
                                </p>

                                <p className="text-slate-800 font-semibold mt-1">
                                    {pet.gender}
                                </p>

                            </div>


                            {/* CITY */}

                            <div className="bg-slate-50 rounded-xl p-5">

                                <p className="text-xs text-violet-500 font-medium">
                                    Location
                                </p>

                                <p className="text-slate-800 font-semibold mt-1">
                                    {pet.city}
                                </p>

                            </div>


                            {/* HEALTH */}

                            <div className="bg-slate-50 rounded-xl p-5">

                                <p className="text-xs text-emerald-500 font-medium">
                                    Health Status
                                </p>

                                <p className="text-slate-800 font-semibold mt-1">
                                    {pet.healthStatus}
                                </p>

                            </div>

                        </div>


                        {/* DESCRIPTION */}

                        <div className="mt-8">

                            <h2 className="text-lg font-bold text-slate-800">
                                About {pet.name}
                            </h2>

                            <p className="text-sm text-slate-500 leading-6 mt-2">
                                {pet.description ||
                                    "No description available."}
                            </p>

                        </div>


                        {/* TRAITS */}

                        <div className="mt-7">

                            <h2 className="text-lg font-bold text-slate-800">
                                Personality & Traits
                            </h2>


                            <div className="flex flex-wrap gap-2 mt-3">

                                {traits.length > 0 ? (

                                    traits.map(
                                        (trait, index) => (

                                            <span
                                                key={index}
                                                className="px-4 py-2 rounded-full bg-violet-50 text-violet-600 text-xs font-medium"
                                            >
                                                {trait}
                                            </span>

                                        )
                                    )

                                ) : (

                                    <span className="text-sm text-slate-400">
                                        No traits added.
                                    </span>

                                )}

                            </div>

                        </div>


                        {/* VACCINATION */}

                        <div className="mt-7 p-4 rounded-xl bg-emerald-50 border border-emerald-100">

                            <p className="font-semibold text-emerald-700">
                                Vaccination Status
                            </p>

                            <p className="text-sm text-emerald-600 mt-1">

                                {pet.vaccinated
                                    ? "This pet is vaccinated."
                                    : "This pet is not vaccinated."}

                            </p>

                        </div>


                        {/* BUTTONS */}

                        <div className="flex flex-col sm:flex-row gap-3 mt-7">

                            {/* ADOPT */}

                            <button
                                onClick={() =>
                                    navigate(
                                        "/apply",
                                        {
                                            state: {
                                                pet: pet
                                            }
                                        }
                                    )
                                }
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold text-sm shadow-md hover:opacity-90"
                            >
                                🐾 Adopt Me
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default PetDetails;