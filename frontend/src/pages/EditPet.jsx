import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PawBackground from "../components/PawBackground";


function EditPet() {

    const { id } = useParams();
    const navigate = useNavigate();


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
        status: "",
    });


    const [imageFile, setImageFile] = useState(null);

    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");


    // =====================================================
    // LOAD PET
    // =====================================================

    useEffect(() => {

        const loadPet = async () => {

            try {

                const response = await fetch(
                    `https://petverse-backend-9odi.onrender.com/api/pets/${id}`

                );


                if (!response.ok) {

                    throw new Error(
                        "Failed to load pet"
                    );
                }


                const pet = await response.json();


                setFormData({
                    name: pet.name || "",
                    type: pet.type || "",
                    breed: pet.breed || "",
                    age: pet.age || "",
                    gender: pet.gender || "",
                    city: pet.city || "",
                    traits: pet.traits || "",
                    description: pet.description || "",
                    vaccinated: pet.vaccinated || false,
                    healthStatus: pet.healthStatus || "",
                    status: pet.status || "",
                });


                if (pet.image) {

                    if (pet.image.startsWith("http")) {

                        setImagePreview(pet.image);

                    } else {

                        setImagePreview(
                            `https://petverse-backend-9odi.onrender.com/uploads/pets/${pet.image}`
                        );
                    }
                }


            } catch (error) {

                console.error(error);

                setMessage(
                    "Unable to load pet details."
                );

            } finally {

                setLoading(false);
            }
        };


        loadPet();

    }, [id]);


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;


        setFormData((previous) => ({
            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };


    // =====================================================
    // HANDLE IMAGE
    // =====================================================

    const handleImageChange = (e) => {

        const file =
            e.target.files?.[0];


        if (!file) {
            return;
        }


        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];


        if (!allowedTypes.includes(file.type)) {

            setMessage(
                "Please select JPG, PNG or WEBP image."
            );

            return;
        }


        setImageFile(file);

        setImagePreview(
            URL.createObjectURL(file)
        );

        setMessage("");
    };


    // =====================================================
    // SAVE CHANGES
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        setMessage("");


        try {

            const dataToSend =
                new FormData();


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

            dataToSend.append(
                "traits",
                formData.traits
            );

            dataToSend.append(
                "description",
                formData.description
            );

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


            // Only send image if user selected a new one
            if (imageFile) {

                dataToSend.append(
                    "image",
                    imageFile
                );
            }


            const response = await fetch(
                `https://petverse-backend-9odi.onrender.com/api/pets/${id}`,
                {
                    method: "PUT",
                    body: dataToSend,
                }
            );


            if (!response.ok) {

                const errorText =
                    await response.text();

                throw new Error(
                    errorText ||
                    "Failed to update pet"
                );
            }


            const updatedPet =
                await response.json();


            setMessage(
                "Pet details updated successfully!"
            );


            // Go back to details after saving
            setTimeout(() => {

                navigate(
                    `/pet/${updatedPet.id}`
                );

            }, 800);


        } catch (error) {

            console.error(error);

            setMessage(
                error.message ||
                "Failed to update pet."
            );

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">

                <p className="text-violet-600 text-sm">
                    Loading pet details...
                </p>

            </div>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="relative min-h-screen bg-slate-50 py-10 px-4">

            <PawBackground />


            <div className="relative z-10 max-w-4xl mx-auto">

                {/* BACK */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(`/pet/${id}`)
                    }
                    className="mb-5 text-violet-600 text-sm font-medium hover:text-violet-800"
                >
                    ← Back to Pet Details
                </button>


                {/* CARD */}

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* HEADER */}

                    <div className="px-6 py-5 border-b border-slate-100">

                        <h1 className="text-2xl font-bold text-slate-800">
                            Edit Pet
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Update the pet information below.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="p-6"
                    >

                        {/* IMAGE */}

                        <div className="mb-7">

                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Pet Image
                            </label>


                            <div className="flex flex-col sm:flex-row gap-5 items-start">

                                {imagePreview && (

                                    <img
                                        src={imagePreview}
                                        alt={formData.name}
                                        className="w-40 h-40 object-cover rounded-xl border border-slate-200"
                                    />

                                )}


                                <div>

                                    <p className="text-xs text-slate-500 mb-3">
                                        Select a new JPG, PNG or WEBP image.
                                        Leave empty to keep the current image.
                                    </p>


                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                                        onChange={handleImageChange}
                                        className="text-sm text-slate-600"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* BASIC INFORMATION */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                            {/* NAME */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Pet Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-violet-300"
                                />

                            </div>


                            {/* TYPE */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Pet Type
                                </label>

                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-violet-300"
                                >

                                    <option value="">
                                        Select pet type
                                    </option>

                                    <option value="Dog">
                                        Dog
                                    </option>

                                    <option value="Cat">
                                        Cat
                                    </option>

                                </select>

                            </div>


                            {/* BREED */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Breed
                                </label>

                                <input
                                    type="text"
                                    name="breed"
                                    value={formData.breed}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-violet-300"
                                />

                            </div>


                            {/* AGE */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Age
                                </label>

                                <input
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-violet-300"
                                />

                            </div>


                            {/* GENDER */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-violet-300"
                                >

                                    <option value="">
                                        Select gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                </select>

                            </div>


                            {/* CITY */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-violet-300"
                                />

                            </div>


                            {/* HEALTH */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Health Status
                                </label>

                                <select
                                    name="healthStatus"
                                    value={formData.healthStatus}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-violet-300"
                                >

                                    <option value="">
                                        Select health status
                                    </option>

                                    <option value="Healthy">
                                        Healthy
                                    </option>

                                    <option value="Needs Care">
                                        Needs Care
                                    </option>

                                    <option value="Under Treatment">
                                        Under Treatment
                                    </option>

                                </select>

                            </div>


                            {/* STATUS */}

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Pet Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-violet-300"
                                >

                                    <option value="Available">
                                        Available
                                    </option>

                                    <option value="Adopted">
                                        Adopted
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* TRAITS */}

                        <div className="mt-5">

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Traits
                            </label>

                            <input
                                type="text"
                                name="traits"
                                value={formData.traits}
                                onChange={handleChange}
                                placeholder="Friendly, playful, gentle"
                                className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-violet-300"
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="mt-5">

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                className="w-full px-3 py-3 rounded-lg border border-slate-200 bg-slate-50 outline-none resize-none focus:ring-2 focus:ring-violet-300"
                            />

                        </div>


                        {/* VACCINATED */}

                        <div className="mt-5">

                            <label className="flex items-center gap-3 text-sm text-slate-700">

                                <input
                                    type="checkbox"
                                    name="vaccinated"
                                    checked={formData.vaccinated}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-violet-600"
                                />

                                This pet is vaccinated.

                            </label>

                        </div>


                        {/* MESSAGE */}

                        {message && (

                            <div className="mt-5 p-3 rounded-lg bg-violet-50 text-violet-700 text-sm">
                                {message}
                            </div>

                        )}


                        {/* BUTTONS */}

                        <div className="mt-7 flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/pet/${id}`)
                                }
                                className="px-6 py-3 rounded-lg border border-violet-300 text-violet-600 font-semibold text-sm hover:bg-violet-50"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={saving}
                                className="px-7 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold text-sm shadow hover:opacity-90 disabled:opacity-60"
                            >

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}


export default EditPet;