import { useEffect, useRef, useState } from "react";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCamera,
    FaEdit,
    FaSave,
    FaTimes,
    FaTrash,
    FaLock,
    FaCalendarAlt,
    FaPaw,
    FaArrowLeft,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import PawBackground from "../components/PawBackground.jsx";
import Footer from "../components/Footer.jsx";


function Profile() {

    const navigate = useNavigate();
    const fileInputRef = useRef(null);


    // =========================================
    // PROFILE STATE
    // =========================================

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [editing, setEditing] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
    });


    // =========================================
    // GENERAL MESSAGES
    // =========================================

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =========================================
    // DELETE ACCOUNT
    // =========================================

    const [deleteConfirm, setDeleteConfirm] =
        useState(false);

    const [deleting, setDeleting] =
        useState(false);


    // =========================================
    // CHANGE PASSWORD
    // =========================================

    const [showPasswordModal, setShowPasswordModal] =
        useState(false);

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [passwordLoading, setPasswordLoading] =
        useState(false);

    const [passwordMessage, setPasswordMessage] =
        useState("");

    const [passwordError, setPasswordError] =
        useState("");


    // =========================================
    // LOAD PROFILE
    // =========================================

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadProfile();

    }, []);


    const loadProfile = async () => {

        const token =
            localStorage.getItem("petverseToken");


        if (!token) {

            navigate("/login");
            return;

        }


        try {

            const response = await fetch(
                "https://petverse-backend-9odi.onrender.com/api/profile",
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            if (
                response.status === 401 ||
                response.status === 403
            ) {

                localStorage.removeItem(
                    "petverseToken"
                );

                localStorage.removeItem(
                    "petverseUser"
                );

                navigate("/login");
                return;

            }


            if (!response.ok) {

                throw new Error(
                    "Failed to load profile."
                );

            }


            const data =
                await response.json();


            setUser(data);


            setFormData({
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                location: data.location || "",
            });


        } catch (err) {

            console.error(
                "Profile error:",
                err
            );

            setError(
                "Unable to load your profile."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // INPUT CHANGE
    // =========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

    };


    // =========================================
    // SAVE PROFILE
    // =========================================

    const handleSave = async () => {

        const token =
            localStorage.getItem("petverseToken");


        if (!token) {

            navigate("/login");
            return;

        }


        if (!formData.name.trim()) {

            setError(
                "Name cannot be empty."
            );

            return;

        }


        setSaving(true);
        setError("");
        setMessage("");


        try {

            const response = await fetch(
                "https://petverse-backend-9odi.onrender.com/api/profile",

                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        name:
                            formData.name.trim(),

                        phone:
                            formData.phone.trim(),

                        location:
                            formData.location.trim(),
                    }),
                }
            );


            const contentType =
                response.headers.get(
                    "content-type"
                );


            const data =
                contentType &&
                contentType.includes(
                    "application/json"
                )
                    ? await response.json()
                    : await response.text();


            if (!response.ok) {

                throw new Error(
                    typeof data === "string"
                        ? data
                        : data.message ||
                        "Failed to update profile."
                );

            }


            setUser(data);


            // Update local user cache
            const savedUser =
                localStorage.getItem(
                    "petverseUser"
                );


            if (savedUser) {

                try {

                    const oldUser =
                        JSON.parse(savedUser);


                    localStorage.setItem(
                        "petverseUser",
                        JSON.stringify({
                            ...oldUser,
                            ...data,
                        })
                    );

                } catch (e) {

                    console.warn(
                        "Could not update cached user.",
                        e
                    );

                }

            }


            setFormData({
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                location: data.location || "",
            });


            setEditing(false);

            setMessage(
                "Profile updated successfully!"
            );


            setTimeout(() => {

                setMessage("");

            }, 3000);


        } catch (err) {

            console.error(
                "Update profile error:",
                err
            );

            setError(
                err.message ||
                "Unable to update profile."
            );

        } finally {

            setSaving(false);

        }

    };


    // =========================================
    // CANCEL EDIT
    // =========================================

    const handleCancel = () => {

        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            location: user?.location || "",
        });

        setEditing(false);
        setError("");

    };


    // =========================================
    // PROFILE IMAGE
    // =========================================

    const handleImageClick = () => {

        fileInputRef.current?.click();

    };


    const handleImageChange = async (e) => {

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

            setError(
                "Please select a JPG, JPEG, PNG or WebP image."
            );

            e.target.value = "";

            return;

        }


        // 2 MB maximum
        if (
            file.size >
            2 * 1024 * 1024
        ) {

            setError(
                "Profile picture must be smaller than 2 MB."
            );

            e.target.value = "";

            return;

        }


        const token =
            localStorage.getItem(
                "petverseToken"
            );


        if (!token) {

            navigate("/login");
            return;

        }


        setError("");
        setMessage(
            "Uploading profile picture..."
        );


        try {

            const imageData =
                await convertToBase64(file);


            const response = await fetch(
                "https://petverse-backend-9odi.onrender.com/api/profile/image",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        image: imageData,
                    }),
                }
            );


            const contentType =
                response.headers.get(
                    "content-type"
                );


            const data =
                contentType &&
                contentType.includes(
                    "application/json"
                )
                    ? await response.json()
                    : await response.text();


            if (!response.ok) {

                throw new Error(
                    typeof data === "string"
                        ? data
                        : data.message ||
                        "Failed to upload image."
                );

            }


            setUser(data);


            // Update cached user
            const savedUser =
                localStorage.getItem(
                    "petverseUser"
                );


            if (savedUser) {

                try {

                    const oldUser =
                        JSON.parse(savedUser);


                    localStorage.setItem(
                        "petverseUser",
                        JSON.stringify({
                            ...oldUser,
                            ...data,
                        })
                    );

                } catch (e) {

                    console.warn(
                        "Could not update cached user.",
                        e
                    );

                }

            }


            setMessage(
                "Profile picture updated!"
            );


            setTimeout(() => {

                setMessage("");

            }, 3000);


        } catch (err) {

            console.error(
                "Profile image error:",
                err
            );

            setError(
                err.message ||
                "Unable to update profile picture."
            );

        }


        e.target.value = "";

    };


    // =========================================
    // BASE64 CONVERTER
    // =========================================

    const convertToBase64 = (file) => {

        return new Promise(
            (resolve, reject) => {

                const reader =
                    new FileReader();


                reader.readAsDataURL(file);


                reader.onload = () =>
                    resolve(reader.result);


                reader.onerror = (error) =>
                    reject(error);

            }
        );

    };


    // =========================================
    // CHANGE PASSWORD
    // =========================================

    const handlePasswordChange = async () => {

        const token =
            localStorage.getItem(
                "petverseToken"
            );


        if (!token) {

            navigate("/login");
            return;

        }


        if (
            !passwordData.currentPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword
        ) {

            setPasswordError(
                "Please fill in all password fields."
            );

            return;

        }


        if (
            passwordData.newPassword.length < 6
        ) {

            setPasswordError(
                "New password must contain at least 6 characters."
            );

            return;

        }


        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {

            setPasswordError(
                "New passwords do not match."
            );

            return;

        }


        setPasswordLoading(true);
        setPasswordMessage("");
        setPasswordError("");


        try {

            const response = await fetch(
                "https://petverse-backend-9odi.onrender.com/api/profile/password",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify(
                        passwordData
                    ),
                }
            );


            const data =
                await response.text();


            if (!response.ok) {

                throw new Error(
                    data ||
                    "Unable to change password."
                );

            }


            setPasswordMessage(
                data ||
                "Password changed successfully!"
            );


            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });


            setTimeout(() => {

                setShowPasswordModal(false);
                setPasswordMessage("");
                setPasswordError("");

            }, 1500);


        } catch (err) {

            console.error(
                "Password change error:",
                err
            );

            setPasswordError(
                err.message ||
                "Unable to change password."
            );

        } finally {

            setPasswordLoading(false);

        }

    };


    // =========================================
    // DELETE ACCOUNT
    // =========================================

    const handleDeleteAccount = async () => {

        const token =
            localStorage.getItem(
                "petverseToken"
            );


        if (!token) {

            navigate("/login");
            return;

        }


        setDeleting(true);
        setError("");


        try {

            const response = await fetch(
                "https://petverse-backend-9odi.onrender.com/api/profile/image",
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            const data =
                await response.text();


            if (!response.ok) {

                throw new Error(
                    data ||
                    "Failed to delete account."
                );

            }


            localStorage.removeItem(
                "petverseToken"
            );

            localStorage.removeItem(
                "petverseUser"
            );


            navigate("/");


        } catch (err) {

            console.error(
                "Delete account error:",
                err
            );

            setError(
                err.message ||
                "Unable to delete account."
            );

            setDeleteConfirm(false);

        } finally {

            setDeleting(false);

        }

    };


    // =========================================
    // LOADING SCREEN
    // =========================================

    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-slate-50
                flex
                items-center
                justify-center
            ">

                <div className="
                    text-center
                    text-gray-500
                ">

                    <FaPaw className="
                        mx-auto
                        text-4xl
                        text-violet-500
                        animate-bounce
                        mb-4
                    " />

                    Loading your profile...

                </div>

            </div>

        );

    }


    return (

        <div className="
            relative
            min-h-screen
            bg-slate-50
            overflow-hidden
        ">

            <PawBackground />


            <main className="
                relative
                z-10
                max-w-5xl
                mx-auto
                px-5
                pt-20
                pb-20
            ">


                {/* =================================
                    BACK
                ================================= */}

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
                ================================= */}

                <div className="mb-8">

                    <p className="
                        text-sm
                        font-semibold
                        text-violet-600
                        uppercase
                        tracking-wider
                    ">

                        Account

                    </p>


                    <h1 className="
                        mt-0
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

                            Profile

                        </span>

                    </h1>


                    <p className="
                        mt-2
                        text-gray-500
                    ">

                        Manage your PetVerse account
                        and personal information.

                    </p>

                </div>


                {/* =================================
                    ALERTS
                ================================= */}

                {message && (

                    <div className="
                        mb-5
                        rounded-xl
                        bg-green-50
                        border
                        border-green-200
                        text-green-700
                        px-5
                        py-3
                        text-sm
                        font-medium
                    ">

                        {message}

                    </div>

                )}


                {error && (

                    <div className="
                        mb-5
                        rounded-xl
                        bg-red-50
                        border
                        border-red-200
                        text-red-600
                        px-5
                        py-3
                        text-sm
                        font-medium
                    ">

                        {error}

                    </div>

                )}


                {/* =================================
                    PROFILE HERO
                ================================= */}

                <section className="
                    bg-white
                    rounded-[2rem]
                    shadow-xl
                    border
                    border-slate-100
                    overflow-hidden
                    mb-7
                ">

                    <div className="
                        h-32
                        bg-gradient-to-r
                        from-violet-600
                        via-fuchsia-500
                        to-pink-500
                    " />


                    <div className="
                        px-7
                        md:px-10
                        pb-8
                    ">


                        {/* PROFILE IMAGE */}

                        <div className="
                            relative
                            -mt-20
                            mb-5
                            flex
                            items-end
                            justify-between
                        ">

                            <div className="
                                relative
                                w-36
                                h-36
                                rounded-full
                                border-8
                                border-white
                                bg-violet-100
                                shadow-xl
                                overflow-hidden
                            ">

                                {user?.profileImage ? (

                                    <img
                                        src={
                                            user.profileImage
                                        }
                                        alt={
                                            user.name ||
                                            "Profile"
                                        }
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                    />

                                ) : (

                                    <div className="
                                        w-full
                                        h-full
                                        flex
                                        items-center
                                        justify-center
                                    ">

                                        <FaUser className="
                                            text-5xl
                                            text-violet-400
                                        " />

                                    </div>

                                )}


                                <button
                                    type="button"
                                    onClick={
                                        handleImageClick
                                    }
                                    className="
                                        absolute
                                        bottom-1
                                        right-1
                                        w-10
                                        h-10
                                        rounded-full
                                        bg-white
                                        text-violet-600
                                        shadow-lg
                                        flex
                                        items-center
                                        justify-center
                                        hover:scale-105
                                        transition
                                    "
                                    title="Change profile picture"
                                >

                                    <FaCamera />

                                </button>


                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={
                                        handleImageChange
                                    }
                                    className="hidden"
                                />

                            </div>


                            {!editing && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditing(true)
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        px-5
                                        py-2.5
                                        rounded-full
                                        border
                                        border-violet-200
                                        text-violet-600
                                        font-semibold
                                        text-sm
                                        hover:bg-violet-50
                                        transition
                                    "
                                >

                                    <FaEdit />

                                    Edit Profile

                                </button>

                            )}

                        </div>


                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-800
                        ">

                            {user?.name ||
                                "PetVerse User"}

                        </h2>


                        <p className="
                            text-gray-500
                            mt-1
                        ">

                            {user?.email}

                        </p>


                        <div className="
                            flex
                            flex-wrap
                            gap-3
                            mt-4
                        ">

                            <span className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-violet-50
                                text-violet-600
                                text-sm
                                font-medium
                            ">

                                <FaPaw />

                                PetVerse Member

                            </span>


                            {user?.createdAt && (

                                <span className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-2
                                    rounded-full
                                    bg-slate-100
                                    text-slate-600
                                    text-sm
                                ">

                                    <FaCalendarAlt />

                                    Joined{" "}

                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}

                                </span>

                            )}

                        </div>

                    </div>

                </section>


                {/* =================================
                    PERSONAL INFORMATION
                ================================= */}

                <section className="
                    bg-white
                    rounded-[2rem]
                    shadow-lg
                    border
                    border-slate-100
                    p-7
                    md:p-10
                    mb-7
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-7
                    ">

                        <div>

                            <h2 className="
                                text-xl
                                font-bold
                                text-slate-800
                            ">

                                Personal Information

                            </h2>


                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">

                                Your basic account details.

                            </p>

                        </div>


                        <FaUser className="
                            text-violet-400
                            text-xl
                        " />

                    </div>


                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-6
                    ">

                        <ProfileField
                            icon={<FaUser />}
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            editing={editing}
                            onChange={handleChange}
                        />


                        <ProfileField
                            icon={<FaEnvelope />}
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            editing={false}
                            onChange={handleChange}
                        />


                        <ProfileField
                            icon={<FaPhone />}
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            editing={editing}
                            onChange={handleChange}
                            placeholder="Add your phone number"
                        />


                        <ProfileField
                            icon={<FaMapMarkerAlt />}
                            label="Location"
                            name="location"
                            value={formData.location}
                            editing={editing}
                            onChange={handleChange}
                            placeholder="Add your city/location"
                        />

                    </div>


                    {editing && (

                        <div className="
                            flex
                            justify-end
                            gap-3
                            mt-8
                            pt-6
                            border-t
                            border-slate-100
                        ">

                            <button
                                type="button"
                                onClick={handleCancel}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-5
                                    py-2.5
                                    rounded-full
                                    border
                                    border-slate-200
                                    text-slate-600
                                    font-semibold
                                    text-sm
                                    hover:bg-slate-50
                                    transition
                                "
                            >

                                <FaTimes />

                                Cancel

                            </button>


                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saving}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-6
                                    py-2.5
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
                                    disabled:opacity-60
                                "
                            >

                                <FaSave />

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}

                            </button>

                        </div>

                    )}

                </section>


                {/* =================================
                    ACCOUNT & SECURITY
                ================================= */}

                <section className="
                    bg-white
                    rounded-[2rem]
                    shadow-lg
                    border
                    border-slate-100
                    p-7
                    md:p-10
                ">

                    <h2 className="
                        text-xl
                        font-bold
                        text-slate-800
                    ">

                        Account & Security

                    </h2>


                    <p className="
                        text-sm
                        text-gray-500
                        mt-1
                        mb-6
                    ">

                        Manage your account settings.

                    </p>


                    <div className="
                        flex
                        flex-col
                        gap-3
                    ">


                        {/* CHANGE PASSWORD */}

                        <button
                            type="button"
                            onClick={() => {

                                setShowPasswordModal(
                                    true
                                );

                                setPasswordError("");
                                setPasswordMessage("");

                            }}
                            className="
                                w-full
                                flex
                                items-center
                                justify-between
                                px-5
                                py-4
                                rounded-2xl
                                bg-slate-50
                                hover:bg-violet-50
                                transition
                                text-left
                            "
                        >

                            <div className="
                                flex
                                items-center
                                gap-4
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

                                    <FaLock />

                                </div>


                                <div>

                                    <p className="
                                        font-semibold
                                        text-slate-700
                                    ">

                                        Change Password

                                    </p>


                                    <p className="
                                        text-xs
                                        text-gray-400
                                        mt-0.5
                                    ">

                                        Update your account password

                                    </p>

                                </div>

                            </div>

                        </button>


                        {/* DELETE ACCOUNT */}

                        <button
                            type="button"
                            onClick={() =>
                                setDeleteConfirm(true)
                            }
                            className="
                                w-full
                                flex
                                items-center
                                gap-4
                                px-5
                                py-4
                                rounded-2xl
                                bg-red-50
                                hover:bg-red-100
                                transition
                                text-left
                            "
                        >

                            <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-red-100
                                text-red-500
                                flex
                                items-center
                                justify-center
                            ">

                                <FaTrash />

                            </div>


                            <div>

                                <p className="
                                    font-semibold
                                    text-red-600
                                ">

                                    Delete Account

                                </p>


                                <p className="
                                    text-xs
                                    text-red-400
                                    mt-0.5
                                ">

                                    Permanently remove your
                                    PetVerse account

                                </p>

                            </div>

                        </button>

                    </div>

                </section>

            </main>


            <Footer />


            {/* =====================================
                CHANGE PASSWORD MODAL
            ====================================== */}

            {showPasswordModal && (

                <div className="
                    fixed
                    inset-0
                    z-[200]
                    flex
                    items-center
                    justify-center
                    bg-slate-900/50
                    backdrop-blur-sm
                    px-5
                ">

                    <div className="
                        bg-white
                        rounded-3xl
                        shadow-2xl
                        p-8
                        max-w-md
                        w-full
                    ">

                        <div className="
                            w-14
                            h-14
                            rounded-full
                            bg-violet-100
                            text-violet-600
                            flex
                            items-center
                            justify-center
                            mx-auto
                            mb-5
                        ">

                            <FaLock />

                        </div>


                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-800
                            text-center
                        ">

                            Change Password

                        </h2>


                        <p className="
                            text-sm
                            text-gray-500
                            text-center
                            mt-2
                            mb-6
                        ">

                            Keep your PetVerse account secure.

                        </p>


                        {passwordError && (

                            <div className="
                                mb-4
                                rounded-xl
                                bg-red-50
                                border
                                border-red-200
                                text-red-600
                                px-4
                                py-3
                                text-sm
                            ">

                                {passwordError}

                            </div>

                        )}


                        {passwordMessage && (

                            <div className="
                                mb-4
                                rounded-xl
                                bg-green-50
                                border
                                border-green-200
                                text-green-600
                                px-4
                                py-3
                                text-sm
                            ">

                                {passwordMessage}

                            </div>

                        )}


                        <div className="space-y-4">

                            <input
                                type="password"
                                placeholder="Current password"
                                value={
                                    passwordData.currentPassword
                                }
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        currentPassword:
                                        e.target.value,
                                    })
                                }
                                className="
                                    w-full
                                    px-4
                                    py-3.5
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    outline-none
                                    focus:ring-2
                                    focus:ring-violet-300
                                "
                            />


                            <input
                                type="password"
                                placeholder="New password"
                                value={
                                    passwordData.newPassword
                                }
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        newPassword:
                                        e.target.value,
                                    })
                                }
                                className="
                                    w-full
                                    px-4
                                    py-3.5
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    outline-none
                                    focus:ring-2
                                    focus:ring-violet-300
                                "
                            />


                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={
                                    passwordData.confirmPassword
                                }
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        confirmPassword:
                                        e.target.value,
                                    })
                                }
                                className="
                                    w-full
                                    px-4
                                    py-3.5
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    outline-none
                                    focus:ring-2
                                    focus:ring-violet-300
                                "
                            />

                        </div>


                        <div className="
                            flex
                            gap-3
                            mt-7
                        ">

                            <button
                                type="button"
                                onClick={() => {

                                    setShowPasswordModal(
                                        false
                                    );

                                    setPasswordError("");
                                    setPasswordMessage("");

                                }}
                                disabled={passwordLoading}
                                className="
                                    flex-1
                                    py-3
                                    rounded-full
                                    border
                                    border-slate-200
                                    text-slate-600
                                    font-semibold
                                    hover:bg-slate-50
                                "
                            >

                                Cancel

                            </button>


                            <button
                                type="button"
                                onClick={
                                    handlePasswordChange
                                }
                                disabled={passwordLoading}
                                className="
                                    flex-1
                                    py-3
                                    rounded-full
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-pink-500
                                    text-white
                                    font-semibold
                                    disabled:opacity-60
                                "
                            >

                                {passwordLoading
                                    ? "Updating..."
                                    : "Update Password"}

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =====================================
                DELETE CONFIRMATION MODAL
            ====================================== */}

            {deleteConfirm && (

                <div className="
                    fixed
                    inset-0
                    z-[200]
                    flex
                    items-center
                    justify-center
                    bg-slate-900/50
                    backdrop-blur-sm
                    px-5
                ">

                    <div className="
                        bg-white
                        rounded-3xl
                        shadow-2xl
                        p-8
                        max-w-md
                        w-full
                    ">

                        <div className="
                            w-14
                            h-14
                            rounded-full
                            bg-red-100
                            text-red-500
                            flex
                            items-center
                            justify-center
                            mx-auto
                            mb-5
                        ">

                            <FaTrash />

                        </div>


                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-800
                            text-center
                        ">

                            Delete your account?

                        </h2>


                        <p className="
                            text-gray-500
                            text-center
                            mt-3
                            leading-6
                        ">

                            This will permanently delete
                            your account and associated
                            data. This action cannot be
                            undone.

                        </p>


                        <div className="
                            flex
                            gap-3
                            mt-7
                        ">

                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteConfirm(false)
                                }
                                disabled={deleting}
                                className="
                                    flex-1
                                    py-3
                                    rounded-full
                                    border
                                    border-slate-200
                                    text-slate-600
                                    font-semibold
                                    hover:bg-slate-50
                                    transition
                                "
                            >

                                Cancel

                            </button>


                            <button
                                type="button"
                                onClick={
                                    handleDeleteAccount
                                }
                                disabled={deleting}
                                className="
                                    flex-1
                                    py-3
                                    rounded-full
                                    bg-red-500
                                    text-white
                                    font-semibold
                                    hover:bg-red-600
                                    transition
                                    disabled:opacity-60
                                "
                            >

                                {deleting
                                    ? "Deleting..."
                                    : "Delete Account"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


// =============================================
// REUSABLE PROFILE FIELD
// =============================================

function ProfileField({
                          icon,
                          label,
                          name,
                          value,
                          editing,
                          onChange,
                          placeholder,
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


            <div className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3.5
                focus-within:ring-2
                focus-within:ring-violet-300
                transition
            ">

                <span className="
                    text-violet-500
                    flex-shrink-0
                ">

                    {icon}

                </span>


                {editing ? (

                    <input
                        type={
                            name === "phone"
                                ? "tel"
                                : "text"
                        }
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="
                            w-full
                            bg-transparent
                            outline-none
                            text-slate-700
                            text-sm
                        "
                    />

                ) : (

                    <span className="
                        text-sm
                        text-slate-700
                        truncate
                    ">

                        {value ||
                            placeholder ||
                            "Not provided"}

                    </span>

                )}

            </div>

        </div>

    );

}


export default Profile;