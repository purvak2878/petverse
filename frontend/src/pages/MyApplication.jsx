import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaPaw,
    FaEye,
    FaEdit,
    FaCalendarAlt
} from "react-icons/fa";

function MyApplication() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // FETCH MY APPLICATIONS
    // ==========================================

    useEffect(() => {

        const fetchApplications = async () => {

            try {

                // IMPORTANT:
                // Your login stores JWT as "petverseToken"
                const token = localStorage.getItem("petverseToken");


                // Check login
                if (!token) {

                    setError(
                        "Please login to view your applications."
                    );

                    setLoading(false);

                    return;
                }


                // ==========================================
                // CALL BACKEND
                // ==========================================

                const response = await fetch(
                    "http://localhost:9090/api/applications/my",
                    {
                        method: "GET",

                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );


                // ==========================================
                // CHECK RESPONSE
                // ==========================================

                if (!response.ok) {

                    const message =
                        await response.text();

                    throw new Error(
                        message ||
                        "Failed to fetch applications"
                    );
                }


                // ==========================================
                // GET DATA
                // ==========================================

                const data =
                    await response.json();

                console.log(
                    "Applications received:",
                    data
                );

                setApplications(data);


            } catch (err) {

                console.error(
                    "Fetch Applications Error:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load applications."
                );


            } finally {

                setLoading(false);

            }
        };


        fetchApplications();

    }, []);


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };


    // ==========================================
    // VIEW COMPLETE DETAILS
    // ==========================================

    const handleViewDetails = (id) => {

        navigate(`/applications/${id}`);

    };


    // ==========================================
    // EDIT APPLICATION
    // ==========================================

    const handleEdit = (id) => {

        navigate(`/applications/${id}/edit`);

    };


    return (

        <div className="relative min-h-screen bg-slate-100 overflow-hidden">


            {/* ======================================
                PAW BACKGROUND
            ====================================== */}

            <div className="absolute inset-0 overflow-hidden pointer-events-none">


                <FaPaw
                    className="absolute text-slate-400/50 text-5xl"
                    style={{
                        top: "8%",
                        left: "6%",
                        transform: "rotate(-12deg)"
                    }}
                />


                <FaPaw
                    className="absolute text-slate-400/50 text-4xl"
                    style={{
                        top: "18%",
                        left: "25%",
                        transform: "rotate(12deg)"
                    }}
                />


                <FaPaw
                    className="absolute text-slate-400/50 text-5xl"
                    style={{
                        top: "7%",
                        left: "55%",
                        transform: "rotate(-12deg)"
                    }}
                />


                <FaPaw
                    className="absolute text-slate-400/50 text-6xl"
                    style={{
                        top: "15%",
                        right: "8%",
                        transform: "rotate(12deg)"
                    }}
                />


                <FaPaw
                    className="absolute text-slate-400/50 text-4xl"
                    style={{
                        top: "42%",
                        left: "8%",
                        transform: "rotate(12deg)"
                    }}
                />


                <FaPaw
                    className="absolute text-slate-400/50 text-5xl"
                    style={{
                        top: "45%",
                        right: "7%",
                        transform: "rotate(-12deg)"
                    }}
                />


                <FaPaw
                    className="absolute text-slate-400/50 text-5xl"
                    style={{
                        bottom: "20%",
                        left: "12%",
                        transform: "rotate(12deg)"
                    }}
                />


                <FaPaw
                    className="absolute text-slate-400/50 text-4xl"
                    style={{
                        bottom: "10%",
                        left: "35%",
                        transform: "rotate(-12deg)"
                    }}
                />


                <FaPaw
                    className="absolute text-slate-400/50 text-5xl"
                    style={{
                        bottom: "25%",
                        right: "15%",
                        transform: "rotate(12deg)"
                    }}
                />

            </div>


            {/* ======================================
                MAIN CONTENT
            ====================================== */}

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">


                {/* ======================================
                    PAGE TITLE
                ====================================== */}

                <div className="text-center mb-10">

                    <div className="flex items-center justify-center gap-2 mb-2">

                        <FaPaw
                            className="text-violet-600"
                        />

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
                                Applications
                            </span>

                        </h1>

                        <FaPaw
                            className="text-pink-500"
                        />

                    </div>


                    <p className="text-slate-500">
                        View and manage your pet adoption applications.
                    </p>

                </div>


                {/* ======================================
                    LOADING
                ====================================== */}

                {loading && (

                    <div className="flex justify-center items-center py-20">

                        <div className="text-center">

                            <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>

                            <p className="text-slate-500">
                                Loading your applications...
                            </p>

                        </div>

                    </div>

                )}


                {/* ======================================
                    ERROR
                ====================================== */}

                {!loading && error && (

                    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">

                        <FaPaw
                            className="text-red-400 text-4xl mx-auto mb-4"
                        />

                        <h2 className="text-xl font-semibold text-slate-700 mb-2">
                            Unable to load applications
                        </h2>

                        <p className="text-red-500">
                            {error}
                        </p>

                    </div>

                )}


                {/* ======================================
                    NO APPLICATIONS
                ====================================== */}

                {!loading &&
                    !error &&
                    applications.length === 0 && (

                        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-10 text-center">

                            <FaPaw
                                className="text-violet-300 text-6xl mx-auto mb-5"
                            />

                            <h2 className="text-2xl font-semibold text-slate-700 mb-2">
                                No Applications Yet
                            </h2>

                            <p className="text-slate-500 mb-6">
                                You haven't submitted any pet adoption
                                applications yet.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/browse-pets")
                                }
                                className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-violet-600 to-pink-500 hover:scale-105 transition"
                            >
                                Browse Pets
                            </button>

                        </div>

                    )}


                {/* ======================================
                    APPLICATION CARDS
                ====================================== */}

                {!loading &&
                    !error &&
                    applications.length > 0 && (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                            {applications.map((application) => (

                                <div
                                    key={application.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-slate-100"
                                >


                                    {/* ======================================
                                        PET IMAGE
                                    ====================================== */}

                                    <div className="relative h-48 bg-slate-200">

                                        {application.petImage ? (

                                            <img
                                                src={
                                                    application.petImage.startsWith(
                                                        "http"
                                                    )
                                                        ? application.petImage
                                                        : `http://localhost:9090${application.petImage}`
                                                }
                                                alt={
                                                    application.petName ||
                                                    "Pet"
                                                }
                                                className="w-full h-full object-cover"
                                            />

                                        ) : (

                                            <div className="w-full h-full flex items-center justify-center">

                                                <FaPaw className="text-slate-400 text-6xl" />

                                            </div>

                                        )}


                                        {/* STATUS */}

                                        <span
                                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                                                application.status === "Approved"
                                                    ? "bg-green-100 text-green-600"
                                                    : application.status === "Rejected"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-yellow-100 text-yellow-600"
                                            }`}
                                        >
                                            {application.status || "Pending"}
                                        </span>

                                    </div>


                                    {/* ======================================
                                        CARD CONTENT
                                    ====================================== */}

                                    <div className="p-5">


                                        <h2 className="text-xl font-bold text-slate-800">
                                            {application.petName ||
                                                "Unknown Pet"}
                                        </h2>


                                        <p className="text-sm text-violet-600 mt-1">
                                            {application.petBreed ||
                                                application.petType ||
                                                "Pet"}
                                        </p>


                                        <div className="mt-4 space-y-2 text-sm text-slate-500">


                                            <p>
                                                <strong>
                                                    Applicant:
                                                </strong>{" "}
                                                {application.fullName}
                                            </p>


                                            <p>
                                                <strong>
                                                    City:
                                                </strong>{" "}
                                                {application.city}
                                            </p>


                                            <p className="flex items-center gap-2">

                                                <FaCalendarAlt />

                                                {formatDate(
                                                    application.createdAt
                                                )}

                                            </p>

                                        </div>


                                        {/* ======================================
                                            BUTTONS
                                        ====================================== */}

                                        <div className="flex gap-3 mt-5">


                                            <button
                                                onClick={() =>
                                                    handleViewDetails(
                                                        application.id
                                                    )
                                                }
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-violet-300 text-violet-600 hover:bg-violet-50 transition"
                                            >

                                                <FaEye />

                                                View Details

                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        application.id
                                                    )
                                                }
                                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:scale-105 transition"
                                            >

                                                <FaEdit />

                                                Edit

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

            </div>

        </div>

    );
}


export default MyApplication;