import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaPaw,
    FaArrowLeft,
    FaCheckCircle,
} from "react-icons/fa";

import PawBackground from "../components/PawBackground.jsx";


function ApplicationDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================
    // FETCH APPLICATION
    // =========================================

    useEffect(() => {

        const fetchApplication = async () => {

            try {

                const token =
                    localStorage.getItem("petverseToken");


                // ==============================
                // CHECK LOGIN
                // ==============================

                if (!token) {

                    setError(
                        "Please login to view this application."
                    );

                    setLoading(false);

                    return;
                }


                // ==============================
                // API REQUEST
                // ==============================

                const response = await fetch(
                    `https://petverse-backend-9odi.onrender.com/api/applications/${id}`,
                    {
                        method: "GET",

                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );


                // ==============================
                // CHECK RESPONSE
                // ==============================

                if (!response.ok) {

                    const message =
                        await response.text();

                    throw new Error(
                        message ||
                        "Unable to load application."
                    );
                }


                // ==============================
                // GET DATA
                // ==============================

                const data =
                    await response.json();

                setApplication(data);


            } catch (error) {

                console.error(
                    "Application details error:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load application."
                );


            } finally {

                setLoading(false);
            }
        };


        fetchApplication();

    }, [id]);


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="
                relative
                min-h-screen
                bg-slate-100
                flex
                items-center
                justify-center
                overflow-hidden
            ">

                <div className="
                    absolute
                    inset-0
                    z-0
                    pointer-events-none
                ">
                    <PawBackground />
                </div>


                <div className="
                    relative
                    z-10
                    text-center
                ">

                    <FaPaw
                        className="
                            text-5xl
                            text-violet-500
                            mx-auto
                            mb-4
                            animate-bounce
                        "
                    />

                    <p className="
                        text-slate-600
                        text-lg
                    ">
                        Loading application...
                    </p>

                </div>

            </div>
        );
    }


    // =========================================
    // ERROR
    // =========================================

    if (error) {

        return (

            <div className="
                relative
                min-h-screen
                bg-slate-100
                flex
                items-center
                justify-center
                px-4
                overflow-hidden
            ">

                {/* PAW BACKGROUND */}

                <div className="
                    absolute
                    inset-0
                    z-0
                    pointer-events-none
                ">
                    <PawBackground />
                </div>


                {/* ERROR CARD */}

                <div className="
                    relative
                    z-10
                    bg-white
                    rounded-2xl
                    shadow-lg
                    p-8
                    text-center
                    max-w-md
                    w-full
                ">

                    <FaPaw
                        className="
                            text-5xl
                            text-red-400
                            mx-auto
                            mb-4
                        "
                    />


                    <h2 className="
                        text-2xl
                        font-bold
                        text-slate-800
                        mb-3
                    ">
                        Unable to Load Application
                    </h2>


                    <p className="
                        text-red-500
                        mb-6
                    ">
                        {error}
                    </p>


                    <button
                        onClick={() =>
                            navigate("/applications")
                        }
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-gradient-to-r
                            from-violet-500
                            to-pink-500
                            text-white
                            font-semibold
                            hover:opacity-90
                            transition
                        "
                    >
                        Back to My Applications
                    </button>

                </div>

            </div>
        );
    }


    // =========================================
    // APPLICATION NOT FOUND
    // =========================================

    if (!application) {

        return (

            <div className="
                relative
                min-h-screen
                bg-slate-100
                flex
                items-center
                justify-center
                overflow-hidden
            ">

                <div className="
                    absolute
                    inset-0
                    z-0
                    pointer-events-none
                ">
                    <PawBackground />
                </div>


                <div className="
                    relative
                    z-10
                    text-center
                ">

                    <FaPaw
                        className="
                            text-5xl
                            text-slate-400
                            mx-auto
                            mb-4
                        "
                    />


                    <h2 className="
                        text-2xl
                        font-bold
                        text-slate-700
                    ">
                        Application not found
                    </h2>


                    <button
                        onClick={() =>
                            navigate("/applications")
                        }
                        className="
                            mt-5
                            px-6
                            py-3
                            rounded-xl
                            bg-violet-600
                            text-white
                            font-semibold
                            hover:bg-violet-700
                            transition
                        "
                    >
                        Back to My Applications
                    </button>

                </div>

            </div>
        );
    }


    // =========================================
    // MAIN APPLICATION DETAILS PAGE
    // =========================================

    return (

        <div className="
            relative
            min-h-screen
            w-full
            overflow-hidden
            bg-slate-100
            py-10
            px-4
        ">


            {/* =====================================
                PAW BACKGROUND
                ALWAYS BEHIND CONTENT
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
                ALL PAGE CONTENT
                ABOVE PAW BACKGROUND
            ====================================== */}

            <div className="
                relative
                z-10
            ">


                <div className="
                    max-w-4xl
                    mx-auto
                ">


                    {/* =================================
                        BACK BUTTON
                    ================================== */}

                    <button
                        onClick={() =>
                            navigate("/applications")
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            text-slate-600
                            hover:text-violet-600
                            mb-6
                            font-medium
                            transition
                        "
                    >

                        <FaArrowLeft />

                        Back to My Applications

                    </button>



                    {/* =================================
                        TITLE
                    ================================== */}

                    <div className="
                        text-center
                        mb-8
                    ">

                        <div className="
                            flex
                            items-center
                            justify-center
                            gap-3
                        ">

                            <FaPaw
                                className="
                                    text-violet-600
                                    text-2xl
                                "
                            />


                            <h1 className="
                                text-4xl
                                font-bold
                                text-violet-600
                            ">
                                Application Details
                            </h1>


                            <FaPaw
                                className="
                                    text-pink-500
                                    text-2xl
                                "
                            />

                        </div>


                        <p className="
                            text-slate-500
                            mt-2
                        ">
                            Complete details of your pet adoption application
                        </p>

                    </div>



                    {/* =================================
                        MAIN APPLICATION CARD
                    ================================== */}

                    <div className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        overflow-hidden
                    ">


                        {/* =================================
                            PET INFORMATION
                        ================================== */}

                        <div className="
                            p-6
                            border-b
                        ">

                            <h2 className="
                                text-2xl
                                font-bold
                                text-slate-800
                                mb-5
                            ">
                                Pet Information
                            </h2>


                            <div className="
                                flex
                                flex-col
                                md:flex-row
                                gap-6
                            ">


                                {/* PET IMAGE */}

                                {application.petImage && (

                                    <img
                                        src={application.petImage}
                                        alt={application.petName}
                                        className="
                                            w-full
                                            md:w-64
                                            h-48
                                            object-cover
                                            rounded-2xl
                                        "
                                    />

                                )}


                                {/* PET DETAILS */}

                                <div className="
                                    space-y-2
                                ">

                                    <h3 className="
                                        text-3xl
                                        font-bold
                                        text-violet-600
                                    ">
                                        {application.petName}
                                    </h3>


                                    <p className="text-slate-700">
                                        <strong>Type:</strong>{" "}
                                        {application.petType}
                                    </p>


                                    <p className="text-slate-700">
                                        <strong>Breed:</strong>{" "}
                                        {application.petBreed}
                                    </p>


                                    <p className="text-slate-700">
                                        <strong>Age:</strong>{" "}
                                        {application.petAge}
                                    </p>


                                    <p className="text-slate-700">
                                        <strong>Gender:</strong>{" "}
                                        {application.petGender}
                                    </p>


                                    <p className="text-slate-700">
                                        <strong>City:</strong>{" "}
                                        {application.petCity}
                                    </p>

                                </div>

                            </div>

                        </div>



                        {/* =================================
                            APPLICATION STATUS
                        ================================== */}

                        <div className="
                            p-6
                            border-b
                            bg-violet-50
                        ">

                            <div className="
                                flex
                                items-center
                                justify-between
                            ">


                                <div>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                    ">
                                        Application Status
                                    </p>


                                    <p className="
                                        text-2xl
                                        font-bold
                                        text-slate-800
                                    ">
                                        {application.status}
                                    </p>

                                </div>


                                <FaCheckCircle
                                    className="
                                        text-green-500
                                        text-4xl
                                    "
                                />

                            </div>

                        </div>



                        {/* =================================
                            APPLICANT INFORMATION
                        ================================== */}

                        <div className="
                            p-6
                            border-b
                        ">

                            <h2 className="
                                text-2xl
                                font-bold
                                text-slate-800
                                mb-5
                            ">
                                Applicant Information
                            </h2>


                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-5
                            ">


                                {/* FULL NAME */}

                                <div>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                    ">
                                        Full Name
                                    </p>


                                    <p className="
                                        font-semibold
                                        text-slate-800
                                    ">
                                        {application.fullName}
                                    </p>

                                </div>



                                {/* EMAIL */}

                                <div>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                    ">
                                        Email
                                    </p>


                                    <p className="
                                        font-semibold
                                        text-slate-800
                                    ">
                                        {application.email}
                                    </p>

                                </div>



                                {/* PHONE */}

                                <div>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                    ">
                                        Phone
                                    </p>


                                    <p className="
                                        font-semibold
                                        text-slate-800
                                    ">
                                        {application.phone}
                                    </p>

                                </div>



                                {/* CITY */}

                                <div>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                    ">
                                        City
                                    </p>


                                    <p className="
                                        font-semibold
                                        text-slate-800
                                    ">
                                        {application.city}
                                    </p>

                                </div>

                            </div>



                            {/* ADDRESS */}

                            <div className="
                                mt-5
                            ">

                                <p className="
                                    text-sm
                                    text-slate-500
                                ">
                                    Address
                                </p>


                                <p className="
                                    font-semibold
                                    text-slate-800
                                ">
                                    {application.address}
                                </p>

                            </div>

                        </div>



                        {/* =================================
                            ABOUT YOUR ADOPTION
                        ================================== */}

                        <div className="
                            p-6
                            border-b
                        ">

                            <h2 className="
                                text-2xl
                                font-bold
                                text-slate-800
                                mb-5
                            ">
                                About Your Adoption
                            </h2>


                            <div className="
                                space-y-5
                            ">


                                {/* REASON */}

                                <div>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                    ">
                                        Why do you want to adopt this pet?
                                    </p>


                                    <p className="
                                        font-semibold
                                        text-slate-800
                                        mt-1
                                    ">
                                        {application.reason}
                                    </p>

                                </div>



                                {/* OTHER DETAILS */}

                                <div className="
                                    grid
                                    grid-cols-1
                                    md:grid-cols-2
                                    gap-5
                                ">


                                    {/* PREVIOUS PET */}

                                    <div>

                                        <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                            Previous Pet
                                        </p>


                                        <p className="
                                            font-semibold
                                            text-slate-800
                                        ">
                                            {application.previousPet}
                                        </p>

                                    </div>



                                    {/* OTHER PETS */}

                                    <div>

                                        <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                            Other Pets
                                        </p>


                                        <p className="
                                            font-semibold
                                            text-slate-800
                                        ">
                                            {application.otherPets}
                                        </p>

                                    </div>



                                    {/* HOUSING */}

                                    <div>

                                        <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                            Housing
                                        </p>


                                        <p className="
                                            font-semibold
                                            text-slate-800
                                        ">
                                            {application.housing}
                                        </p>

                                    </div>



                                    {/* PERMISSION */}

                                    <div>

                                        <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                            Permission
                                        </p>


                                        <p className="
                                            font-semibold
                                            text-slate-800
                                        ">
                                            {application.permission}
                                        </p>

                                    </div>



                                    {/* CONTACT METHOD */}

                                    <div>

                                        <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                            Preferred Contact Method
                                        </p>


                                        <p className="
                                            font-semibold
                                            text-slate-800
                                        ">
                                            {application.contactMethod}
                                        </p>

                                    </div>



                                    {/* AGREEMENT */}

                                    <div>

                                        <p className="
                                            text-sm
                                            text-slate-500
                                        ">
                                            Agreement
                                        </p>


                                        <p className="
                                            font-semibold
                                            text-green-600
                                        ">
                                            {application.agreement
                                                ? "Accepted"
                                                : "Not Accepted"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>



                        {/* =================================
                            DATES
                        ================================== */}

                        <div className="
                            p-6
                        ">

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-5
                            ">


                                {/* CREATED DATE */}

                                <div>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                    ">
                                        Application Submitted
                                    </p>


                                    <p className="
                                        font-semibold
                                        text-slate-800
                                    ">
                                        {application.createdAt
                                            ? new Date(
                                                application.createdAt
                                            ).toLocaleString()
                                            : "-"}
                                    </p>

                                </div>



                                {/* UPDATED DATE */}

                                <div>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                    ">
                                        Last Updated
                                    </p>


                                    <p className="
                                        font-semibold
                                        text-slate-800
                                    ">
                                        {application.updatedAt
                                            ? new Date(
                                                application.updatedAt
                                            ).toLocaleString()
                                            : "-"}
                                    </p>

                                </div>

                            </div>

                        </div>



                        {/* =================================
                            BUTTONS
                        ================================== */}

                        <div className="
                            p-6
                            bg-slate-50
                            flex
                            flex-col
                            sm:flex-row
                            justify-end
                            gap-4
                        ">


                            {/* EDIT */}

                            <button
                                onClick={() =>
                                    navigate(
                                        `/applications/${application.id}/edit`
                                    )
                                }
                                className="
                                    px-7
                                    py-3
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-pink-500
                                    text-white
                                    font-semibold
                                    hover:opacity-90
                                    transition
                                "
                            >
                                Edit Application
                            </button>



                            {/* BACK */}

                            <button
                                onClick={() =>
                                    navigate("/applications")
                                }
                                className="
                                    px-7
                                    py-3
                                    rounded-xl
                                    border
                                    border-violet-400
                                    text-violet-600
                                    font-semibold
                                    hover:bg-violet-50
                                    transition
                                "
                            >
                                Back to Applications
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default ApplicationDetails;