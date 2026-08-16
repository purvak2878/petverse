import { useState } from "react";
import {
    FaPaw,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaHome,
    FaHeart,
    FaArrowLeft,
    FaCheck,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import PawBackground from "../components/PawBackground.jsx";


function ApplicationForm() {

    const navigate = useNavigate();

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


    const [submitted, setSubmitted] = useState(false);


    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        // Backend connection will be added later

        setSubmitted(true);

    };


    /* =========================================
       SUCCESS SCREEN
    ========================================== */

    if (submitted) {

        return (

            <div className="
                relative
                min-h-screen
                overflow-hidden
                bg-slate-50
                flex
                items-center
                justify-center
                px-6
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
                    w-full
                    max-w-lg
                    bg-white
                    rounded-3xl
                    shadow-xl
                    border
                    border-slate-100
                    p-10
                    text-center
                ">

                    <div className="
                        w-20
                        h-20
                        mx-auto
                        rounded-full
                        bg-green-100
                        text-green-600
                        flex
                        items-center
                        justify-center
                        mb-6
                    ">

                        <FaCheck className="text-3xl" />

                    </div>


                    <h1 className="
                        text-3xl
                        font-bold
                        text-slate-800
                    ">
                        Application Submitted!
                    </h1>


                    <p className="
                        mt-3
                        text-gray-500
                        leading-7
                    ">
                        Your adoption application has been submitted
                        successfully. The shelter will review your
                        application and contact you with the next steps.
                    </p>


                    <div className="
                        mt-6
                        rounded-2xl
                        bg-violet-50
                        p-4
                        text-sm
                        text-violet-700
                    ">

                        <p className="font-semibold">
                            Application ID
                        </p>

                        <p className="mt-1 font-mono">
                            APP-2026-001
                        </p>

                    </div>


                    <div className="
                        flex
                        gap-3
                        mt-7
                    ">

                        <button
                            onClick={() => navigate("/browse-pets")}
                            className="
                                flex-1
                                py-3
                                rounded-full
                                border
                                border-violet-300
                                text-violet-600
                                font-semibold
                                text-sm
                                hover:bg-violet-50
                                transition
                            "
                        >
                            Browse Pets
                        </button>


                        <button
                            onClick={() => navigate("/applications")}
                            className="
                                flex-1
                                py-3
                                rounded-full
                                bg-gradient-to-r
                                from-violet-600
                                to-pink-500
                                text-white
                                font-semibold
                                text-sm
                                shadow-md
                                hover:-translate-y-0.5
                                transition
                            "
                        >
                            My Applications
                        </button>

                    </div>

                </div>

            </div>

        );
    }


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
                PAGE CONTENT
            ====================================== */}

            <div className="
                relative
                z-10
                px-6
                pt-28
                pb-16
            ">

                <div className="
                    max-w-5xl
                    mx-auto
                ">


                    {/* =================================
                        BACK BUTTON
                    ================================== */}

                    <button
                        onClick={() => navigate(-1)}
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-slate-500
                            hover:text-violet-600
                            transition
                            mb-6
                        "
                    >

                        <FaArrowLeft />

                        Back

                    </button>


                    {/* =================================
                        HEADER
                    ================================== */}

                    <div className="
                        text-center
                        mb-10
                    ">

                        <div className="
                            flex
                            items-center
                            justify-center
                            gap-3
                        ">

                            <FaPaw className="
                                text-3xl
                                text-violet-600
                            " />


                            <h1 className="
                                text-4xl
                                md:text-5xl
                                font-bold
                                text-slate-800
                            ">

                                Adoption{" "}

                                <span className="
                                    text-transparent
                                    bg-clip-text
                                    bg-gradient-to-r
                                    from-violet-600
                                    via-fuchsia-500
                                    to-pink-500
                                ">
                                    Application
                                </span>

                            </h1>

                        </div>


                        <p className="
                            mt-3
                            text-gray-500
                        ">
                            Tell us a little about yourself and your
                            plans for welcoming a pet.
                        </p>

                    </div>


                    {/* =================================
                        APPLICATION FORM
                    ================================== */}

                    <form
                        onSubmit={handleSubmit}
                        className="
                            bg-white
                            rounded-3xl
                            shadow-lg
                            border
                            border-slate-100
                            overflow-hidden
                        "
                    >


                        {/* =================================
                            PET SECTION
                        ================================== */}

                        <div className="
                            p-7
                            md:p-9
                            border-b
                            border-slate-100
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-6
                            ">

                                <div className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-violet-100
                                    text-violet-600
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <FaPaw />
                                </div>


                                <div>

                                    <h2 className="
                                        text-xl
                                        font-bold
                                        text-slate-800
                                    ">
                                        Pet Information
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-gray-500
                                        mt-1
                                    ">
                                        Select the pet you would like
                                        to apply for.
                                    </p>

                                </div>

                            </div>


                            {/* Temporary pet selection */}

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-5
                            ">

                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        mb-2
                                    ">
                                        Pet Name
                                    </label>

                                    <select
                                        name="petName"
                                        required
                                        className="
                                            w-full
                                            h-12
                                            px-4
                                            rounded-xl
                                            bg-slate-50
                                            border
                                            border-slate-200
                                            outline-none
                                            text-sm
                                            text-slate-600
                                            focus:border-violet-400
                                            focus:ring-2
                                            focus:ring-violet-100
                                        "
                                    >

                                        <option value="">
                                            Select a pet
                                        </option>

                                        <option value="Bruno">
                                            Bruno
                                        </option>

                                        <option value="Luna">
                                            Luna
                                        </option>

                                        <option value="Max">
                                            Max
                                        </option>

                                    </select>

                                </div>


                                <div>

                                    <label className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        mb-2
                                    ">
                                        Pet Type
                                    </label>

                                    <select
                                        name="petType"
                                        required
                                        className="
                                            w-full
                                            h-12
                                            px-4
                                            rounded-xl
                                            bg-slate-50
                                            border
                                            border-slate-200
                                            outline-none
                                            text-sm
                                            text-slate-600
                                            focus:border-violet-400
                                            focus:ring-2
                                            focus:ring-violet-100
                                        "
                                    >

                                        <option value="">
                                            Select type
                                        </option>

                                        <option value="Dog">
                                            Dog
                                        </option>

                                        <option value="Cat">
                                            Cat
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>


                        {/* =================================
                            APPLICANT DETAILS
                        ================================== */}

                        <div className="
                            p-7
                            md:p-9
                            border-b
                            border-slate-100
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-6
                            ">

                                <div className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-pink-100
                                    text-pink-500
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <FaUser />
                                </div>


                                <div>

                                    <h2 className="
                                        text-xl
                                        font-bold
                                        text-slate-800
                                    ">
                                        Your Details
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-gray-500
                                        mt-1
                                    ">
                                        Tell us how we can contact you.
                                    </p>

                                </div>

                            </div>


                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-5
                            ">


                                {/* Full Name */}

                                <FormInput
                                    label="Full Name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    icon={<FaUser />}
                                    required
                                />


                                {/* Email */}

                                <FormInput
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    icon={<FaEnvelope />}
                                    required
                                />


                                {/* Phone */}

                                <FormInput
                                    label="Phone Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    icon={<FaPhone />}
                                    required
                                />


                                {/* City */}

                                <FormInput
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter your city"
                                    icon={<FaMapMarkerAlt />}
                                    required
                                />

                            </div>


                            {/* Address */}

                            <div className="mt-5">

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                ">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                    placeholder="Enter your complete address"
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        bg-slate-50
                                        border
                                        border-slate-200
                                        outline-none
                                        resize-none
                                        text-sm
                                        focus:border-violet-400
                                        focus:ring-2
                                        focus:ring-violet-100
                                    "
                                />

                            </div>

                        </div>


                        {/* =================================
                            ABOUT YOU
                        ================================== */}

                        <div className="
                            p-7
                            md:p-9
                            border-b
                            border-slate-100
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-6
                            ">

                                <div className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-violet-100
                                    text-violet-600
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <FaHeart />
                                </div>


                                <div>

                                    <h2 className="
                                        text-xl
                                        font-bold
                                        text-slate-800
                                    ">
                                        About You
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-gray-500
                                        mt-1
                                    ">
                                        Help us understand your
                                        adoption plans.
                                    </p>

                                </div>

                            </div>


                            {/* Reason */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    mb-2
                                ">
                                    Why do you want to adopt this pet?
                                </label>

                                <textarea
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    placeholder="Tell us why you would like to adopt..."
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        rounded-xl
                                        bg-slate-50
                                        border
                                        border-slate-200
                                        outline-none
                                        resize-none
                                        text-sm
                                        focus:border-violet-400
                                        focus:ring-2
                                        focus:ring-violet-100
                                    "
                                />

                            </div>


                            {/* Select Questions */}

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-5
                                mt-5
                            ">


                                {/* Previous Pet */}

                                <SelectField
                                    label="Have you owned a pet before?"
                                    name="previousPet"
                                    value={formData.previousPet}
                                    onChange={handleChange}
                                    options={[
                                        "Yes",
                                        "No",
                                    ]}
                                />


                                {/* Other Pets */}

                                <SelectField
                                    label="Do you currently have other pets?"
                                    name="otherPets"
                                    value={formData.otherPets}
                                    onChange={handleChange}
                                    options={[
                                        "Yes",
                                        "No",
                                    ]}
                                />


                                {/* Housing */}

                                <SelectField
                                    label="What type of home do you live in?"
                                    name="housing"
                                    value={formData.housing}
                                    onChange={handleChange}
                                    options={[
                                        "Apartment",
                                        "House",
                                        "Other",
                                    ]}
                                />


                                {/* Permission */}

                                <SelectField
                                    label="Do you have permission to keep a pet?"
                                    name="permission"
                                    value={formData.permission}
                                    onChange={handleChange}
                                    options={[
                                        "Yes",
                                        "No",
                                    ]}
                                />


                                {/* Contact */}

                                <SelectField
                                    label="Preferred contact method"
                                    name="contactMethod"
                                    value={formData.contactMethod}
                                    onChange={handleChange}
                                    options={[
                                        "Phone",
                                        "Email",
                                    ]}
                                />

                            </div>

                        </div>


                        {/* =================================
                            AGREEMENT + SUBMIT
                        ================================== */}

                        <div className="
                            p-7
                            md:p-9
                            bg-slate-50/70
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
                                    checked={formData.agreement}
                                    onChange={handleChange}
                                    required
                                    className="
                                        mt-1
                                        w-4
                                        h-4
                                        accent-violet-600
                                    "
                                />


                                <span className="
                                    text-sm
                                    leading-6
                                    text-gray-500
                                ">
                                    I understand that adopting a pet is a
                                    long-term responsibility and I am prepared
                                    to provide proper care, love, and a safe
                                    home.
                                </span>

                            </label>


                            <div className="
                                flex
                                justify-end
                                mt-7
                            ">

                                <button
                                    type="submit"
                                    className="
                                        px-10
                                        py-3.5
                                        rounded-full
                                        bg-gradient-to-r
                                        from-violet-600
                                        via-fuchsia-500
                                        to-pink-500
                                        text-white
                                        font-semibold
                                        text-sm
                                        shadow-lg
                                        shadow-violet-200
                                        hover:-translate-y-0.5
                                        hover:shadow-xl
                                        transition-all
                                        duration-300
                                    "
                                >
                                    Submit Application
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}


/* =========================================
   REUSABLE INPUT
========================================= */

function FormInput({
                       label,
                       name,
                       type = "text",
                       value,
                       onChange,
                       placeholder,
                       icon,
                       required = false,
                   }) {

    return (

        <div>

            <label className="
                block
                text-sm
                font-semibold
                text-slate-700
                mb-2
            ">
                {label}
            </label>


            <div className="relative">

                <span className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-violet-400
                    text-sm
                ">
                    {icon}
                </span>


                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="
                        w-full
                        h-12
                        pl-11
                        pr-4
                        rounded-xl
                        bg-slate-50
                        border
                        border-slate-200
                        outline-none
                        text-sm
                        text-slate-700
                        placeholder:text-gray-400
                        focus:border-violet-400
                        focus:ring-2
                        focus:ring-violet-100
                        transition
                    "
                />

            </div>

        </div>

    );
}


/* =========================================
   REUSABLE SELECT
========================================= */

function SelectField({
                         label,
                         name,
                         value,
                         onChange,
                         options,
                     }) {

    return (

        <div>

            <label className="
                block
                text-sm
                font-semibold
                text-slate-700
                mb-2
            ">
                {label}
            </label>


            <select
                name={name}
                value={value}
                onChange={onChange}
                required
                className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-slate-50
                    border
                    border-slate-200
                    outline-none
                    text-sm
                    text-slate-600
                    focus:border-violet-400
                    focus:ring-2
                    focus:ring-violet-100
                    transition
                "
            >

                <option value="">
                    Select an option
                </option>

                {options.map((option) => (

                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>

                ))}

            </select>

        </div>

    );
}


export default ApplicationForm;