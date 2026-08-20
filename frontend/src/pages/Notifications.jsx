import { useState } from "react";

import {
    FaBell,
    FaHeart,
    FaPaw,
    FaClipboardCheck,
    FaInfoCircle,
    FaCheck,
    FaTrash,
    FaArrowLeft,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


function Notifications() {

    const navigate = useNavigate();


    // =========================================
    // SAMPLE NOTIFICATIONS
    // =========================================

    const [notifications, setNotifications] = useState([

        {
            id: 1,
            type: "application",
            title: "Application Submitted",
            message:
                "Your adoption application has been submitted successfully.",
            time: "Just now",
            read: false,
        },

        {
            id: 2,
            type: "wishlist",
            title: "Pet Added To Wishlist",
            message:
                "A pet has been successfully added to your wishlist.",
            time: "Today",
            read: false,
        },

        {
            id: 3,
            type: "pet",
            title: "New Pets Available",
            message:
                "New pets are now available for adoption on PetVerse.",
            time: "Yesterday",
            read: true,
        },

        {
            id: 4,
            type: "info",
            title: "Welcome To PetVerse",
            message:
                "Thanks for being part of the PetVerse community.",
            time: "2 days ago",
            read: true,
        },

    ]);


    // =========================================
    // ACTIVE FILTER
    // =========================================

    const [activeFilter, setActiveFilter] =
        useState("all");


    // =========================================
    // GET ICON
    // =========================================

    const getIcon = (type) => {

        switch (type) {

            case "wishlist":
                return (
                    <FaHeart
                        className="
                            text-pink-500
                        "
                    />
                );


            case "application":
                return (
                    <FaClipboardCheck
                        className="
                            text-violet-600
                        "
                    />
                );


            case "pet":
                return (
                    <FaPaw
                        className="
                            text-orange-500
                        "
                    />
                );


            default:
                return (
                    <FaInfoCircle
                        className="
                            text-blue-500
                        "
                    />
                );

        }

    };


    // =========================================
    // GET ICON BACKGROUND
    // =========================================

    const getIconBackground = (type) => {

        switch (type) {

            case "wishlist":
                return "bg-pink-50";


            case "application":
                return "bg-violet-50";


            case "pet":
                return "bg-orange-50";


            default:
                return "bg-blue-50";

        }

    };


    // =========================================
    // MARK AS READ
    // =========================================

    const markAsRead = (id) => {

        setNotifications((previous) =>

            previous.map((notification) =>

                notification.id === id

                    ? {
                        ...notification,
                        read: true,
                    }

                    : notification

            )

        );

    };


    // =========================================
    // MARK ALL AS READ
    // =========================================

    const markAllAsRead = () => {

        setNotifications((previous) =>

            previous.map((notification) => ({

                ...notification,
                read: true,

            }))

        );

    };


    // =========================================
    // DELETE NOTIFICATION
    // =========================================

    const deleteNotification = (id) => {

        setNotifications((previous) =>

            previous.filter(
                (notification) =>
                    notification.id !== id
            )

        );

    };


    // =========================================
    // CLEAR ALL
    // =========================================

    const clearAll = () => {

        setNotifications([]);

    };


    // =========================================
    // FILTER
    // =========================================

    const filteredNotifications =

        activeFilter === "unread"

            ? notifications.filter(
                (notification) =>
                    !notification.read
            )

            : notifications;


    // =========================================
    // UNREAD COUNT
    // =========================================

    const unreadCount =
        notifications.filter(
            (notification) =>
                !notification.read
        ).length;


    return (

        <div className="
            min-h-screen
            bg-slate-50
            px-5
            md:px-10
            py-8
        ">


            {/* =================================
                HEADER
            ================================== */}

            <div className="
                max-w-5xl
                mx-auto
            ">


                {/* BACK */}

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


                {/* TITLE ROW */}

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-5
                    mb-8
                ">


                    <div className="
                        flex
                        items-center
                        gap-4
                    ">


                        {/* BELL */}

                        <div className="
                            relative
                            w-14
                            h-14
                            rounded-2xl
                            bg-violet-100
                            flex
                            items-center
                            justify-center
                        ">

                            <FaBell className="
                                text-2xl
                                text-violet-600
                            " />


                            {unreadCount > 0 && (

                                <span className="
                                    absolute
                                    -top-1
                                    -right-1
                                    min-w-[22px]
                                    h-[22px]
                                    px-1
                                    rounded-full
                                    bg-pink-500
                                    text-white
                                    text-[10px]
                                    font-bold
                                    flex
                                    items-center
                                    justify-center
                                    border-2
                                    border-white
                                ">

                                    {unreadCount}

                                </span>

                            )}

                        </div>


                        <div>

                            <h1 className="
                                text-3xl
                                md:text-4xl
                                font-bold
                                text-slate-800
                            ">

                                Notifications

                            </h1>


                            <p className="
                                mt-1
                                text-sm
                                text-slate-500
                            ">

                                Stay updated with your
                                PetVerse activities.

                            </p>

                        </div>

                    </div>


                    {/* MARK ALL */}

                    {unreadCount > 0 && (

                        <button
                            onClick={markAllAsRead}
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-5
                                py-2.5
                                rounded-full
                                text-xs
                                font-semibold
                                text-violet-600
                                border
                                border-violet-200
                                bg-white
                                hover:bg-violet-50
                                transition
                            "
                        >

                            <FaCheck />

                            Mark all as read

                        </button>

                    )}

                </div>


                {/* =================================
                    FILTERS
                ================================== */}

                <div className="
                    flex
                    items-center
                    gap-2
                    mb-5
                ">

                    <button
                        onClick={() =>
                            setActiveFilter("all")
                        }
                        className={`
                            px-5
                            py-2
                            rounded-full
                            text-xs
                            font-semibold
                            transition

                            ${
                            activeFilter === "all"

                                ? "bg-violet-600 text-white"

                                : "bg-white text-slate-500 border border-slate-200 hover:bg-violet-50"
                        }
                        `}
                    >

                        All

                    </button>


                    <button
                        onClick={() =>
                            setActiveFilter("unread")
                        }
                        className={`
                            px-5
                            py-2
                            rounded-full
                            text-xs
                            font-semibold
                            transition

                            ${
                            activeFilter === "unread"

                                ? "bg-violet-600 text-white"

                                : "bg-white text-slate-500 border border-slate-200 hover:bg-violet-50"
                        }
                        `}
                    >

                        Unread

                        {unreadCount > 0 && (

                            <span className="
                                ml-1.5
                            ">

                                ({unreadCount})

                            </span>

                        )}

                    </button>

                </div>


                {/* =================================
                    NOTIFICATIONS
                ================================== */}

                {filteredNotifications.length > 0 ? (

                    <div className="
                        space-y-3
                    ">

                        {filteredNotifications.map(
                            (notification) => (

                                <div
                                    key={notification.id}
                                    onClick={() =>
                                        markAsRead(
                                            notification.id
                                        )
                                    }
                                    className={`
                                        group
                                        relative
                                        flex
                                        items-start
                                        gap-4
                                        p-5
                                        rounded-2xl
                                        border
                                        transition-all
                                        cursor-pointer

                                        ${
                                        notification.read

                                            ? "bg-white border-slate-100"

                                            : "bg-violet-50/70 border-violet-100 shadow-sm"
                                    }

                                        hover:shadow-md
                                    `}
                                >


                                    {/* ICON */}

                                    <div className={`
                                        flex-shrink-0
                                        w-11
                                        h-11
                                        rounded-xl
                                        flex
                                        items-center
                                        justify-center

                                        ${
                                        getIconBackground(
                                            notification.type
                                        )
                                    }
                                    `}>

                                        <span className="
                                            text-lg
                                        ">

                                            {getIcon(
                                                notification.type
                                            )}

                                        </span>

                                    </div>


                                    {/* CONTENT */}

                                    <div className="
                                        flex-1
                                        min-w-0
                                    ">

                                        <div className="
                                            flex
                                            items-start
                                            justify-between
                                            gap-3
                                        ">

                                            <div>

                                                <h3 className="
                                                    text-sm
                                                    font-bold
                                                    text-slate-800
                                                ">

                                                    {notification.title}

                                                </h3>


                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    leading-5
                                                    text-slate-500
                                                ">

                                                    {notification.message}

                                                </p>

                                            </div>


                                            {/* UNREAD DOT */}

                                            {!notification.read && (

                                                <span className="
                                                    flex-shrink-0
                                                    w-2.5
                                                    h-2.5
                                                    rounded-full
                                                    bg-violet-600
                                                    mt-1
                                                " />

                                            )}

                                        </div>


                                        {/* TIME */}

                                        <p className="
                                            mt-3
                                            text-[10px]
                                            font-medium
                                            text-slate-400
                                        ">

                                            {notification.time}

                                        </p>

                                    </div>


                                    {/* DELETE */}

                                    <button
                                        type="button"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            deleteNotification(
                                                notification.id
                                            );

                                        }}
                                        className="
                                            flex-shrink-0
                                            opacity-0
                                            group-hover:opacity-100
                                            w-8
                                            h-8
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            text-slate-400
                                            hover:text-red-500
                                            hover:bg-red-50
                                            transition
                                        "
                                        aria-label="
                                            Delete notification
                                        "
                                    >

                                        <FaTrash className="
                                            text-xs
                                        " />

                                    </button>


                                </div>

                            )
                        )}

                    </div>

                ) : (

                    /* =================================
                        EMPTY STATE
                    ================================== */

                    <div className="
                        bg-white
                        rounded-3xl
                        border
                        border-slate-100
                        p-12
                        text-center
                        shadow-sm
                    ">

                        <div className="
                            w-16
                            h-16
                            mx-auto
                            rounded-full
                            bg-violet-50
                            flex
                            items-center
                            justify-center
                            mb-4
                        ">

                            <FaBell className="
                                text-2xl
                                text-violet-300
                            " />

                        </div>


                        <h2 className="
                            text-lg
                            font-bold
                            text-slate-800
                        ">

                            You're all caught up!

                        </h2>


                        <p className="
                            mt-2
                            text-sm
                            text-slate-400
                        ">

                            You don't have any notifications
                            right now.

                        </p>

                    </div>

                )}


                {/* =================================
                    CLEAR ALL
                ================================== */}

                {notifications.length > 0 && (

                    <div className="
                        flex
                        justify-end
                        mt-5
                    ">

                        <button
                            onClick={clearAll}
                            className="
                                flex
                                items-center
                                gap-2
                                text-xs
                                font-semibold
                                text-red-400
                                hover:text-red-500
                                transition
                            "
                        >

                            <FaTrash />

                            Clear all notifications

                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}


export default Notifications;