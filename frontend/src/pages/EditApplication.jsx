import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaPaw,
    FaArrowLeft,
    FaSave,
} from "react-icons/fa";

import PawBackground from "../components/PawBackground.jsx";


function EditApplication() {

    const { id } = useParams();
    const navigate = useNavigate();


    // =========================================
    // FORM DATA
    // =========================================

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        reason: "",
        previousPet: "",
        otherPets: "",
        housing: "",
        permission: "",
        contactMethod: "",
        agreement: false,
    });


    // =========================================
    // PET DATA
    // =========================================

    const [pet, setPet] = useState(null);


    // =========================================
    // LOADING / ERROR / SUCCESS
    // =========================================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================================
    // GET APPLICATION
    // =========================================

    useEffect(() => {

        const fetchApplication = async () => {

            try {

                const token =
                    localStorage.getItem("petverseToken");


                if (!token) {

                    setError(
                        "Please login before editing your application."
                    );

                    setLoading(false);

                    return;
                }


                const response = await fetch(
                    `http://localhost:9090/api/applications/${id}`,
                    {
                        method: "GET",

                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );


                if (!response.ok) {

                    const message =
                        await response.text();

                    throw new Error(
                        message ||
                        "Unable to load application."
                    );
                }


                const data =
                    await response.json();


                // =================================
                // SET PET
                // =================================

                setPet({

                    id: data.petId,

                    name: data.petName,

                    type: data.petType,

                    breed: data.petBreed,

                    age: data.petAge,

                    gender: data.petGender,

                    city: data.petCity,

                    image: data.petImage,

                });


                // =================================
                // SET FORM VALUES
                // =================================

                setFormData({

                    fullName: data.fullName || "",

                    email: data.email || "",

                    phone: data.phone || "",

                    city: data.city || "",

                    address: data.address || "",

                    reason: data.reason || "",

                    previousPet:
                        data.previousPet || "",

                    otherPets:
                        data.otherPets || "",

                    housing:
                        data.housing || "",

                    permission:
                        data.permission || "",

                    contactMethod:
                        data.contactMethod || "",

                    agreement:
                        data.agreement || false,

                });


            } catch (error) {

                console.error(
                    "Edit application error:",
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
    // INPUT CHANGE
    // =========================================

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;


        setFormData((previous) => ({

            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        }));

    };


    // =========================================
    // SAVE CHANGES
    // =========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        setSuccess("");

        setSaving(true);


        try {

            const token =
                localStorage.getItem("petverseToken");


            if (!token) {

                throw new Error(
                    "Please login before saving changes."
                );

            }


            // =================================
            // REQUEST BODY
            // =================================

            const requestBody = {

                petId: pet?.id,

                fullName:
                formData.fullName,

                email:
                formData.email,

                phone:
                formData.phone,

                city:
                formData.city,

                address:
                formData.address,

                reason:
                formData.reason,

                previousPet:
                formData.previousPet,

                otherPets:
                formData.otherPets,

                housing:
                formData.housing,

                permission:
                formData.permission,

                contactMethod:
                formData.contactMethod,

                agreement:
                formData.agreement,

            };


            // =================================
            // PUT REQUEST
            // =================================

            const response = await fetch(
                `http://localhost:9090/api/applications/${id}`,
                {
                    method: "PUT",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",

                    },

                    body:
                        JSON.stringify(requestBody),

                }
            );


            // =================================
            // RESPONSE
            // =================================

            if (!response.ok) {

                const message =
                    await response.text();

                throw new Error(
                    message ||
                    "Unable to update application."
                );

            }


            setSuccess(
                "Application updated successfully!"
            );


            // =================================
            // GO TO DETAILS
            // =================================

            setTimeout(() => {

                navigate(
                    `/applications/${id}`
                );

            }, 800);


        } catch (error) {

            console.error(
                "Update application error:",
                error
            );

            setError(
                error.message ||
                "Unable to update application."
            );


        } finally {

            setSaving(false);

        }

    };


    // =========================================
    // LOADING SCREEN
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
    // ERROR SCREEN
    // =========================================

    if (error && !pet) {

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
                    bg-white
                    rounded-2xl
                    shadow-lg
                    p-8
                    max-w-md
                    w-full
                    text-center
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
                            from-violet-600
                            to-pink-500
                            text-white
                            font-semibold
                        "
                    >
                        Back to Applications
                    </button>

                </div>

            </div>

        );

    }


    // =========================================
    // MAIN EDIT PAGE
    // =========================================

    return (

        <div className="
            relative
            min-h-screen
            bg-slate-100
            py-10
            px-4
            overflow-hidden
        ">


            {/* =================================
                PAW BACKGROUND
            ================================= */}

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
            ================================= */}

            <div className="
                relative
                z-10
                max-w-4xl
                mx-auto
            ">


                {/* =================================
                    BACK BUTTON
                ================================= */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            `/applications/${id}`
                        )
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        text-slate-600
                        hover:text-violet-600
                        mb-6
                        font-medium
                    "
                >

                    <FaArrowLeft />

                    Back to Application Details

                </button>



                {/* =================================
                    TITLE
                ================================= */}

                <div className="
                    text-center
                    mb-8
                ">

                    <div className="
                        flex
                        justify-center
                        items-center
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
                            Edit Application
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
                        Update your pet adoption application
                    </p>

                </div>



                {/* =================================
                    FORM CARD
                ================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        overflow-hidden
                    "
                >


                    {/* =================================
                        PET INFORMATION
                    ================================= */}

                    {pet && (

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
                                gap-5
                                bg-violet-50
                                rounded-2xl
                                p-4
                            ">


                                {pet.image && (

                                    <img
                                        src={pet.image}
                                        alt={pet.name}
                                        className="
                                            w-full
                                            md:w-48
                                            h-36
                                            object-cover
                                            rounded-xl
                                        "
                                    />

                                )}


                                <div>

                                    <h3 className="
                                        text-2xl
                                        font-bold
                                        text-violet-600
                                    ">
                                        {pet.name}
                                    </h3>


                                    <p className="
                                        text-slate-700
                                        mt-2
                                    ">
                                        {pet.type} •{" "}
                                        {pet.breed}
                                    </p>


                                    <p className="
                                        text-slate-600
                                    ">
                                        {pet.age} •{" "}
                                        {pet.gender}
                                    </p>


                                    <p className="
                                        text-slate-600
                                    ">
                                        {pet.city}
                                    </p>

                                </div>

                            </div>

                        </div>

                    )}



                    {/* =================================
                        APPLICANT DETAILS
                    ================================= */}

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
                            Your Details
                        </h2>


                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-5
                        ">


                            {/* FULL NAME */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    Full Name
                                </label>


                                <input
                                    type="text"
                                    name="fullName"
                                    value={
                                        formData.fullName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />

                            </div>



                            {/* EMAIL */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    Email
                                </label>


                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />

                            </div>



                            {/* PHONE */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    Phone
                                </label>


                                <input
                                    type="text"
                                    name="phone"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />

                            </div>



                            {/* CITY */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    City
                                </label>


                                <input
                                    type="text"
                                    name="city"
                                    value={
                                        formData.city
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                />

                            </div>

                        </div>



                        {/* ADDRESS */}

                        <div className="mt-5">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
                                Address
                            </label>


                            <textarea
                                name="address"
                                value={
                                    formData.address
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                rows="3"
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-300
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-violet-400
                                "
                            />

                        </div>

                    </div>



                    {/* =================================
                        ADOPTION DETAILS
                    ================================= */}

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


                        {/* REASON */}

                        <div className="mb-5">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
                                Why do you want to adopt this pet?
                            </label>


                            <textarea
                                name="reason"
                                value={
                                    formData.reason
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                rows="4"
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-300
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-violet-400
                                "
                            />

                        </div>



                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-5
                        ">


                            {/* PREVIOUS PET */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    Have you owned a pet before?
                                </label>


                                <select
                                    name="previousPet"
                                    value={
                                        formData.previousPet
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        bg-white
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="Yes">
                                        Yes
                                    </option>

                                    <option value="No">
                                        No
                                    </option>

                                </select>

                            </div>



                            {/* OTHER PETS */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    Do you currently have other pets?
                                </label>


                                <select
                                    name="otherPets"
                                    value={
                                        formData.otherPets
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        bg-white
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="Yes">
                                        Yes
                                    </option>

                                    <option value="No">
                                        No
                                    </option>

                                </select>

                            </div>



                            {/* HOUSING */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    What type of home do you live in?
                                </label>


                                <select
                                    name="housing"
                                    value={
                                        formData.housing
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        bg-white
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="House">
                                        House
                                    </option>

                                    <option value="Apartment">
                                        Apartment
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>



                            {/* PERMISSION */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    Do you have permission to keep a pet?
                                </label>


                                <select
                                    name="permission"
                                    value={
                                        formData.permission
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        bg-white
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="Yes">
                                        Yes
                                    </option>

                                    <option value="No">
                                        No
                                    </option>

                                </select>

                            </div>



                            {/* CONTACT METHOD */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                ">
                                    Preferred Contact Method
                                </label>


                                <select
                                    name="contactMethod"
                                    value={
                                        formData.contactMethod
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-slate-300
                                        bg-white
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-violet-400
                                    "
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="Phone">
                                        Phone
                                    </option>

                                    <option value="Email">
                                        Email
                                    </option>

                                    <option value="WhatsApp">
                                        WhatsApp
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>



                    {/* =================================
                        AGREEMENT
                    ================================= */}

                    <div className="
                        p-6
                        border-b
                    ">

                        <label className="
                            flex
                            items-start
                            gap-3
                            cursor-pointer
                        ">

                            <input
                                type="checkbox"
                                name="agreement"
                                checked={
                                    formData.agreement
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                className="
                                    mt-1
                                    w-5
                                    h-5
                                    accent-violet-600
                                "
                            />


                            <span className="
                                text-slate-600
                            ">
                                I understand that adopting a pet
                                is a long-term responsibility and
                                I am prepared to provide proper
                                care, love, and a safe home.
                            </span>

                        </label>

                    </div>



                    {/* =================================
                        MESSAGES
                    ================================= */}

                    {(error || success) && (

                        <div className="px-6 pt-6">

                            {error && (

                                <div className="
                                    bg-red-50
                                    border
                                    border-red-200
                                    text-red-600
                                    rounded-xl
                                    p-4
                                ">
                                    {error}
                                </div>

                            )}


                            {success && (

                                <div className="
                                    bg-green-50
                                    border
                                    border-green-200
                                    text-green-600
                                    rounded-xl
                                    p-4
                                ">
                                    {success}
                                </div>

                            )}

                        </div>

                    )}



                    {/* =================================
                        BUTTONS
                    ================================= */}

                    <div className="
                        p-6
                        bg-slate-50
                        flex
                        flex-col
                        sm:flex-row
                        justify-end
                        gap-4
                    ">


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/applications/${id}`
                                )
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
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                px-7
                                py-3
                                rounded-xl
                                bg-gradient-to-r
                                from-violet-600
                                to-pink-500
                                text-white
                                font-semibold
                                flex
                                items-center
                                justify-center
                                gap-2
                                hover:opacity-90
                                disabled:opacity-50
                                transition
                            "
                        >

                            <FaSave />

                            {saving
                                ? "Saving..."
                                : "Save Changes"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


export default EditApplication;