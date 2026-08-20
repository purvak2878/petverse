import { Link, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaBookOpen,
} from "react-icons/fa";

import Footer from "../components/Footer";
import PawBackground from "../components/PawBackground.jsx";

import { petTips } from "./PetTips";


function PetTipDetails() {

    const { id } = useParams();


    // =========================================
    // FIND SELECTED TIP
    // =========================================

    const tipIndex = Number(id);

    const tip = petTips[tipIndex];


    // =========================================
    // INVALID TIP
    // =========================================

    if (!tip) {

        return (

            <div className="
                min-h-screen
                flex
                flex-col
                items-center
                justify-center
                bg-slate-50
                px-6
                text-center
            ">

                <div className="
                    text-6xl
                    mb-5
                ">

                    🐾

                </div>


                <h1 className="
                    text-3xl
                    font-bold
                    text-slate-800
                ">

                    Tip Not Found

                </h1>


                <p className="
                    mt-3
                    text-gray-500
                ">

                    Sorry, we couldn't find the pet tip you're looking for.

                </p>


                <Link
                    to="/pet-tips"
                    className="
                        mt-6
                        px-6
                        py-3
                        rounded-full
                        text-sm
                        font-semibold
                        text-white
                        bg-gradient-to-r
                        from-violet-600
                        via-fuchsia-500
                        to-pink-500
                        shadow-md
                        hover:-translate-y-0.5
                        transition
                    "
                >

                    <span className="
                        inline-flex
                        items-center
                        gap-2
                    ">

                        <FaArrowLeft />

                        Back To Pet Tips

                    </span>

                </Link>

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
                CONTENT
            ====================================== */}

            <div className="
                relative
                z-10
            ">


                {/* =================================
                    BACK BUTTON
                ================================== */}

                <div className="
                    max-w-5xl
                    mx-auto
                    px-6
                    pt-8
                ">

                    <Link
                        to="/pet-tips"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-slate-500
                            hover:text-violet-600
                            transition
                        "
                    >

                        <FaArrowLeft />

                        Back to Pet Tips

                    </Link>

                </div>


                {/* =================================
                    ARTICLE
                ================================== */}

                <article className="
                    max-w-5xl
                    mx-auto
                    px-6
                    pt-8
                    pb-20
                ">


                    {/* =================================
                        HERO IMAGE
                    ================================== */}

                    <div className="
                        w-full
                        h-[280px]
                        md:h-[430px]
                        overflow-hidden
                        rounded-3xl
                        shadow-lg
                        bg-slate-200
                    ">

                        <img
                            src={tip.image}
                            alt={tip.title}
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />

                    </div>


                    {/* =================================
                        CATEGORY
                    ================================== */}

                    <div className="
                        mt-8
                        flex
                        items-center
                        gap-2
                    ">

                        <FaBookOpen className="
                            text-violet-600
                        " />


                        <span className="
                            text-sm
                            font-semibold
                            text-violet-600
                        ">

                            {tip.category}

                        </span>

                    </div>


                    {/* =================================
                        TITLE
                    ================================== */}

                    <h1 className="
                        mt-3
                        text-3xl
                        md:text-5xl
                        font-bold
                        leading-tight
                        text-slate-800
                        max-w-4xl
                    ">

                        {tip.title}

                    </h1>


                    {/* =================================
                        DESCRIPTION
                    ================================== */}

                    <p className="
                        mt-5
                        text-base
                        md:text-lg
                        leading-8
                        text-gray-500
                        max-w-4xl
                    ">

                        {tip.description}

                    </p>


                    {/* =================================
                        DIVIDER
                    ================================== */}

                    <div className="
                        w-full
                        h-px
                        bg-slate-200
                        my-8
                    " />


                    {/* =================================
                        ARTICLE CONTENT
                    ================================== */}

                    <div className="
                        max-w-4xl
                    ">

                        <h2 className="
                            text-2xl
                            font-bold
                            text-slate-800
                            mb-4
                        ">

                            Helpful Guide

                        </h2>


                        <p className="
                            text-base
                            md:text-lg
                            leading-8
                            text-slate-600
                        ">

                            {tip.content}

                        </p>


                        {/* =================================
                            PETVERSE NOTE
                        ================================== */}

                        <div className="
                            mt-8
                            p-5
                            rounded-2xl
                            bg-violet-50
                            border
                            border-violet-100
                        ">

                            <p className="
                                text-sm
                                leading-6
                                text-violet-800
                            ">

                                🐾 Every pet is different.
                                Use these tips as general guidance
                                and seek professional veterinary advice
                                when your pet has specific health or
                                behavioural needs.

                            </p>

                        </div>

                    </div>


                    {/* =================================
                        BACK BUTTON
                    ================================== */}

                    <Link
                        to="/pet-tips"
                        className="
                            mt-10
                            inline-flex
                            items-center
                            gap-2
                            px-6
                            py-3
                            rounded-full
                            text-sm
                            font-semibold
                            text-white
                            bg-gradient-to-r
                            from-violet-600
                            via-fuchsia-500
                            to-pink-500
                            shadow-md
                            shadow-violet-200
                            hover:-translate-y-0.5
                            hover:shadow-lg
                            transition-all
                        "
                    >

                        <FaArrowLeft />

                        Back to Pet Tips

                    </Link>


                </article>


                <Footer />

            </div>

        </div>

    );

}


export default PetTipDetails;