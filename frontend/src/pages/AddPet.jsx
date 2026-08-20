import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaPaw,
    FaArrowLeft,
    FaDog,
    FaImage,
    FaHeart,
    FaShieldAlt,
    FaFilePdf,
    FaTrash,
} from "react-icons/fa";

import PawBackground from "../components/PawBackground";


function AddPet() {

    const navigate = useNavigate();

    const fileInputRef = useRef(null);


    // =========================================
    // FORM DATA
    // =========================================

    const [formData, setFormData] = useState({

        name: "",
        type: "",
        breed: "",
        age: "",
        gender: "",
        city: "",
        traits: "",
        description: "",
        vaccinated: false,
        healthStatus: "",
        status: "Available",

    });


    // =========================================
    // MESSAGE
    // =========================================

    const [message, setMessage] = useState({

        type: "",
        text: "",

    });


    // =========================================
    // LOADING
    // =========================================

    const [loading, setLoading] = useState(false);


    // =========================================
    // FILE
    // =========================================

    const [imageFile, setImageFile] = useState(null);

    const [imagePreview, setImagePreview] = useState("");


    // =========================================
    // HANDLE INPUT
    // =========================================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;


        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        });

    };


    // =========================================
    // HANDLE FILE
    // =========================================

    const handleImageChange = (e) => {

        const file = e.target.files[0];


        if (!file) {
            return;
        }


        // =====================================
        // ALLOWED FILE TYPES
        // =====================================

        const allowedTypes = [

            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf",

        ];


        if (!allowedTypes.includes(file.type)) {

            setMessage({

                type: "error",

                text:
                    "Please select a JPG, PNG, WEBP or PDF file.",

            });

            e.target.value = "";

            return;
        }


        // =====================================
        // MAX FILE SIZE - 5 MB
        // =====================================

        if (file.size > 5 * 1024 * 1024) {

            setMessage({

                type: "error",

                text:
                    "File size must be less than 5 MB.",

            });

            e.target.value = "";

            return;
        }


        // =====================================
        // SAVE FILE
        // =====================================

        setImageFile(file);


        // =====================================
        // IMAGE PREVIEW
        // =====================================

        if (file.type.startsWith("image/")) {

            const previewUrl =
                URL.createObjectURL(file);

            setImagePreview(previewUrl);

        } else {

            // PDF does not need image preview
            setImagePreview("");

        }


        // =====================================
        // CLEAR ERROR
        // =====================================

        setMessage({

            type: "",
            text: "",

        });

    };


    // =========================================
    // REMOVE SELECTED FILE
    // =========================================

    const handleRemoveImage = () => {

        // Clear selected file
        setImageFile(null);

        // Clear preview
        setImagePreview("");

        // Clear actual file input
        if (fileInputRef.current) {

            fileInputRef.current.value = "";

        }

        // Clear any previous message
        setMessage({

            type: "",
            text: "",

        });

    };


    // =========================================
    // SUBMIT PET
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);


        setMessage({

            type: "",
            text: "",

        });


        try {


            // =====================================
            // CHECK FILE
            // =====================================

            if (!imageFile) {

                setMessage({

                    type: "error",

                    text:
                        "Please select a pet image or PDF.",

                });

                setLoading(false);

                return;
            }


            // =====================================
            // CREATE FORM DATA
            // =====================================

            const dataToSend = new FormData();


            // =====================================
            // PET INFORMATION
            // =====================================

            dataToSend.append(
                "name",
                formData.name
            );


            dataToSend.append(
                "type",
                formData.type
            );


            dataToSend.append(
                "breed",
                formData.breed
            );


            dataToSend.append(
                "age",
                formData.age
            );


            dataToSend.append(
                "gender",
                formData.gender
            );


            dataToSend.append(
                "city",
                formData.city
            );


            // =====================================
            // PET DETAILS
            // =====================================

            dataToSend.append(
                "traits",
                formData.traits
            );


            dataToSend.append(
                "description",
                formData.description
            );


            // =====================================
            // HEALTH INFORMATION
            // =====================================

            dataToSend.append(
                "vaccinated",
                formData.vaccinated
            );


            dataToSend.append(
                "healthStatus",
                formData.healthStatus
            );


            dataToSend.append(
                "status",
                formData.status
            );


            // =====================================
            // FILE
            // =====================================

            dataToSend.append(
                "image",
                imageFile
            );


            // =====================================
            // SEND TO SPRING BOOT
            // =====================================

            const response = await fetch(

                "http://localhost:9090/api/pets",

                {
                    method: "POST",
                    body: dataToSend,
                }

            );


            // =====================================
            // READ RESPONSE
            // =====================================

            const contentType =
                response.headers.get(
                    "content-type"
                );


            let data;


            if (
                contentType &&
                contentType.includes(
                    "application/json"
                )
            ) {

                data =
                    await response.json();

            } else {

                data =
                    await response.text();

            }


            // =====================================
            // CHECK RESPONSE
            // =====================================

            if (!response.ok) {

                throw new Error(

                    typeof data === "string"

                        ? data

                        : "Failed to add pet."

                );

            }


            // =====================================
            // SUCCESS
            // =====================================

            console.log(
                "PET ADDED SUCCESSFULLY:",
                data
            );


            setMessage({

                type: "success",

                text:
                    "Pet added successfully! 🐾",

            });


            // =====================================
            // CLEAR FORM
            // =====================================

            setFormData({

                name: "",
                type: "",
                breed: "",
                age: "",
                gender: "",
                city: "",
                traits: "",
                description: "",
                vaccinated: false,
                healthStatus: "",
                status: "Available",

            });


            // =====================================
            // CLEAR FILE
            // =====================================

            setImageFile(null);

            setImagePreview("");


            if (fileInputRef.current) {

                fileInputRef.current.value = "";

            }


            // =====================================
            // GO TO BROWSE PETS
            // =====================================

            setTimeout(() => {

                navigate("/browse-pets");

            }, 1200);


        } catch (error) {

            console.error(
                "Add pet failed:",
                error
            );


            setMessage({

                type: "error",

                text:
                    error.message ||
                    "Something went wrong while adding the pet.",

            });


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="
            min-h-screen
            bg-slate-50
            relative
            overflow-hidden
        ">

            {/* =====================================
                PAW BACKGROUND
            ====================================== */}

            <PawBackground />


            {/* =====================================
                BACK BUTTON
            ====================================== */}

            <div className="
                relative
                z-10
                max-w-5xl
                mx-auto
                pt-6
                px-6
            ">

                <button
                    onClick={() => navigate(-1)}
                    className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-medium
                        text-slate-500
                        hover:text-violet-600
                        transition
                    "
                >

                    <FaArrowLeft />

                    Back

                </button>

            </div>


            {/* =====================================
                PAGE HEADING
            ====================================== */}

            <div className="
                relative
                z-10
                text-center
                mt-4
                mb-6
            ">

                <div className="
                    flex
                    justify-center
                    items-center
                    gap-2
                ">

                    <FaPaw className="
                        text-violet-600
                        text-2xl
                    " />


                    <h1 className="
                        text-4xl
                        md:text-5xl
                        font-bold
                        text-slate-800
                    ">

                        Add A{" "}

                        <span className="
                            text-transparent
                            bg-clip-text
                            bg-gradient-to-r
                            from-violet-600
                            via-fuchsia-500
                            to-pink-500
                        ">

                            Pet

                        </span>

                    </h1>


                    <FaPaw className="
                        text-pink-500
                        text-2xl
                        rotate-12
                    " />

                </div>


                <p className="
                    text-xs
                    text-slate-500
                    mt-1
                ">

                    Give a lovely pet a chance
                    to find a caring home.

                </p>

            </div>


            {/* =====================================
                FORM CARD
            ====================================== */}

            <div className="
                relative
                z-10
                w-[92%]
                max-w-4xl
                mx-auto
                mb-10
                bg-white
                rounded-2xl
                shadow-xl
                border
                border-slate-100
                overflow-hidden
            ">


                {/* =================================
                    PET INFORMATION
                ================================== */}

                <div className="
                    p-6
                    border-b
                    border-slate-100
                ">


                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-5
                    ">

                        <div className="
                            w-9
                            h-9
                            rounded-xl
                            bg-violet-100
                            text-violet-600
                            flex
                            items-center
                            justify-center
                        ">

                            <FaDog />

                        </div>


                        <div>

                            <h2 className="
                                text-sm
                                font-bold
                                text-slate-800
                            ">

                                Pet Information

                            </h2>


                            <p className="
                                text-[10px]
                                text-slate-400
                            ">

                                Tell us about the pet
                                you want to add.

                            </p>

                        </div>

                    </div>


                    {/* ROW */}

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-4
                    ">


                        <InputField
                            label="Pet Name"
                            name="name"
                            placeholder="Enter pet name"
                            value={formData.name}
                            onChange={handleChange}
                        />


                        <SelectField
                            label="Pet Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            options={[
                                "Dog",
                                "Cat",
                            ]}
                            placeholder="Select pet type"
                        />


                        <InputField
                            label="Breed"
                            name="breed"
                            placeholder="Enter breed"
                            value={formData.breed}
                            onChange={handleChange}
                        />


                        <InputField
                            label="Age"
                            name="age"
                            placeholder="Example: 2 years"
                            value={formData.age}
                            onChange={handleChange}
                        />


                        <SelectField
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            options={[
                                "Male",
                                "Female",
                            ]}
                            placeholder="Select gender"
                        />


                        <InputField
                            label="City"
                            name="city"
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={handleChange}
                        />

                    </div>

                </div>


                {/* =================================
                    PET DETAILS
                ================================== */}

                <div className="
                    p-6
                    border-b
                    border-slate-100
                ">


                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-5
                    ">

                        <div className="
                            w-9
                            h-9
                            rounded-xl
                            bg-pink-100
                            text-pink-500
                            flex
                            items-center
                            justify-center
                        ">

                            <FaHeart />

                        </div>


                        <div>

                            <h2 className="
                                text-sm
                                font-bold
                                text-slate-800
                            ">

                                About the Pet

                            </h2>


                            <p className="
                                text-[10px]
                                text-slate-400
                            ">

                                Add some details to help
                                people know this pet better.

                            </p>

                        </div>

                    </div>


                    {/* =================================
                        PET IMAGE / FILE
                    ================================== */}

                    <div className="mb-4">

                        <label className="
                            block
                            text-[11px]
                            font-semibold
                            text-slate-600
                            mb-1.5
                        ">

                            Pet Image / Document

                        </label>


                        <div className="
                            border-2
                            border-dashed
                            border-slate-200
                            rounded-xl
                            bg-slate-50
                            p-5
                            text-center
                            hover:border-violet-300
                            transition
                        ">


                            {imageFile ? (

                                <div className="
                                    flex
                                    flex-col
                                    items-center
                                ">


                                    {/* =================================
                                        IMAGE PREVIEW
                                    ================================== */}

                                    {imageFile.type.startsWith(
                                        "image/"
                                    ) ? (

                                        <img
                                            src={imagePreview}
                                            alt="Pet preview"
                                            className="
                                                w-32
                                                h-32
                                                object-cover
                                                rounded-xl
                                                shadow-md
                                                mb-3
                                            "
                                        />

                                    ) : (

                                        /* =================================
                                            PDF PREVIEW
                                        ================================== */

                                        <div className="
                                            w-32
                                            h-32
                                            rounded-xl
                                            bg-red-50
                                            text-red-500
                                            flex
                                            flex-col
                                            items-center
                                            justify-center
                                            shadow-md
                                            mb-3
                                        ">

                                            <FaFilePdf className="
                                                text-4xl
                                                mb-2
                                            " />

                                            <span className="
                                                text-[10px]
                                                font-semibold
                                            ">

                                                PDF FILE

                                            </span>

                                        </div>

                                    )}


                                    {/* =================================
                                        FILE NAME
                                    ================================== */}

                                    <p className="
                                        text-xs
                                        font-medium
                                        text-slate-700
                                        max-w-[90%]
                                        truncate
                                    ">

                                        {imageFile.name}

                                    </p>


                                    {/* =================================
                                        FILE SIZE
                                    ================================== */}

                                    <p className="
                                        text-[10px]
                                        text-slate-400
                                        mt-1
                                    ">

                                        {(
                                            imageFile.size /
                                            (1024 * 1024)
                                        ).toFixed(2)}{" "}
                                        MB

                                    </p>


                                    {/* =================================
                                        FILE ACTIONS
                                    ================================== */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-4
                                        mt-3
                                    ">


                                        {/* CHANGE FILE */}

                                        <label className="
                                            cursor-pointer
                                            text-xs
                                            font-semibold
                                            text-violet-600
                                            hover:text-pink-500
                                            transition
                                        ">

                                            Choose another file


                                            <input
                                                type="file"
                                                accept="
                                                    .jpg,
                                                    .jpeg,
                                                    .png,
                                                    .webp,
                                                    .pdf
                                                "
                                                onChange={
                                                    handleImageChange
                                                }
                                                className="hidden"
                                            />

                                        </label>


                                        {/* REMOVE FILE */}

                                        <button
                                            type="button"
                                            onClick={
                                                handleRemoveImage
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-1.5
                                                text-xs
                                                font-semibold
                                                text-red-500
                                                hover:text-red-600
                                                transition
                                            "
                                        >

                                            <FaTrash />

                                            Remove

                                        </button>

                                    </div>

                                </div>

                            ) : (

                                /* =================================
                                    NO FILE SELECTED
                                ================================== */

                                <label className="
                                    cursor-pointer
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                ">


                                    <div className="
                                        w-12
                                        h-12
                                        rounded-full
                                        bg-violet-100
                                        text-violet-600
                                        flex
                                        items-center
                                        justify-center
                                        mb-2
                                    ">

                                        <FaImage className="
                                            text-lg
                                        " />

                                    </div>


                                    <p className="
                                        text-xs
                                        font-semibold
                                        text-slate-700
                                    ">

                                        Choose Pet Image or PDF

                                    </p>


                                    <p className="
                                        text-[10px]
                                        text-slate-400
                                        mt-1
                                    ">

                                        JPG, JPEG, PNG, WEBP or PDF
                                        · Max 5 MB

                                    </p>


                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="
                                            .jpg,
                                            .jpeg,
                                            .png,
                                            .webp,
                                            .pdf
                                        "
                                        onChange={
                                            handleImageChange
                                        }
                                        className="hidden"
                                    />

                                </label>

                            )}

                        </div>

                    </div>


                    {/* =================================
                        DESCRIPTION
                    ================================== */}

                    <div className="mb-4">

                        <label className="
                            block
                            text-[11px]
                            font-semibold
                            text-slate-600
                            mb-1.5
                        ">

                            Description

                        </label>


                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="
                                Tell us more about this pet...
                            "
                            required
                            className="
                                w-full
                                rounded-lg
                                border
                                border-slate-200
                                bg-slate-50
                                px-3
                                py-2.5
                                text-xs
                                text-slate-700
                                outline-none
                                resize-none
                                focus:ring-2
                                focus:ring-violet-300
                                focus:border-violet-400
                            "
                        />

                    </div>


                    {/* =================================
                        TRAITS
                    ================================== */}

                    <InputField
                        label="Traits"
                        name="traits"
                        placeholder="
                            Example: Friendly, playful, active
                        "
                        value={formData.traits}
                        onChange={handleChange}
                    />

                </div>


                {/* =================================
                    HEALTH INFORMATION
                ================================== */}

                <div className="p-6">


                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-5
                    ">

                        <div className="
                            w-9
                            h-9
                            rounded-xl
                            bg-emerald-100
                            text-emerald-600
                            flex
                            items-center
                            justify-center
                        ">

                            <FaShieldAlt />

                        </div>


                        <div>

                            <h2 className="
                                text-sm
                                font-bold
                                text-slate-800
                            ">

                                Health Information

                            </h2>


                            <p className="
                                text-[10px]
                                text-slate-400
                            ">

                                Help adopters understand
                                the pet's health.

                            </p>

                        </div>

                    </div>


                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-4
                    ">


                        <SelectField
                            label="Health Status"
                            name="healthStatus"
                            value={formData.healthStatus}
                            onChange={handleChange}
                            options={[
                                "Healthy",
                                "Needs Care",
                                "Under Treatment",
                                "Recovering",
                            ]}
                            placeholder="
                                Select health status
                            "
                        />


                        <SelectField
                            label="Pet Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            options={[
                                "Available",
                                "Adopted",
                                "Pending",
                            ]}
                            placeholder="
                                Select status
                            "
                        />

                    </div>


                    {/* =================================
                        VACCINATION
                    ================================== */}

                    <label className="
                        mt-5
                        flex
                        items-center
                        gap-3
                        cursor-pointer
                        text-xs
                        text-slate-600
                    ">

                        <input
                            type="checkbox"
                            name="vaccinated"
                            checked={formData.vaccinated}
                            onChange={handleChange}
                            className="
                                w-4
                                h-4
                                accent-violet-600
                            "
                        />


                        <span>

                            This pet is vaccinated.

                        </span>

                    </label>

                </div>


                {/* =================================
                    MESSAGE + BUTTON
                ================================== */}

                <div className="
                    px-6
                    py-5
                    bg-slate-50
                    border-t
                    border-slate-100
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                ">


                    {/* MESSAGE */}

                    <div>

                        {message.text && (

                            <p className={`
                                text-xs
                                font-semibold
                                ${
                                message.type === "success"
                                    ? "text-emerald-600"
                                    : "text-red-500"
                            }
                            `}>

                                {message.text}

                            </p>

                        )}

                    </div>


                    {/* BUTTON */}

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
                            px-8
                            py-2.5
                            rounded-full
                            text-white
                            text-xs
                            font-semibold
                            bg-gradient-to-r
                            from-violet-600
                            to-pink-500
                            shadow-lg
                            shadow-violet-300/40
                            hover:-translate-y-0.5
                            active:translate-y-0
                            transition
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                        "
                    >

                        {loading
                            ? "Adding Pet..."
                            : "Add Pet"
                        }

                    </button>

                </div>

            </div>

        </div>

    );

}


/* =========================================
   INPUT COMPONENT
========================================= */

function InputField({
                        label,
                        name,
                        placeholder,
                        value,
                        onChange,
                    }) {

    return (

        <div>

            <label className="
                block
                text-[11px]
                font-semibold
                text-slate-600
                mb-1.5
            ">

                {label}

            </label>


            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    border
                    border-slate-200
                    bg-slate-50
                    text-xs
                    text-slate-700
                    outline-none
                    focus:ring-2
                    focus:ring-violet-300
                    focus:border-violet-400
                "
            />

        </div>

    );

}


/* =========================================
   SELECT COMPONENT
========================================= */

function SelectField({
                         label,
                         name,
                         value,
                         onChange,
                         options,
                         placeholder,
                     }) {

    return (

        <div>

            <label className="
                block
                text-[11px]
                font-semibold
                text-slate-600
                mb-1.5
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
                    h-10
                    px-3
                    rounded-lg
                    border
                    border-slate-200
                    bg-slate-50
                    text-xs
                    text-slate-700
                    outline-none
                    focus:ring-2
                    focus:ring-violet-300
                    focus:border-violet-400
                "
            >

                <option value="">
                    {placeholder}
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


export default AddPet;