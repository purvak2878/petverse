import { useEffect, useState } from "react";
import {
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


// =====================================================
// HERO SLIDE IMAGES
// =====================================================

import HeroSlide1 from "../assets/images/HeroSlide1.png";
import HeroSlide2 from "../assets/images/HeroSlide2.png";
import HeroSlide3 from "../assets/images/HeroSlide3.png";
import HeroSlide4 from "../assets/images/HeroSlide4.png";

function Hero() {

    const navigate = useNavigate();


    // =====================================================
    // SLIDES
    // =====================================================

    const slides = [

        // -------------------------------------------------
        // SLIDE 1 — ADOPTION PROCESS
        // -------------------------------------------------

        {
            image: HeroSlide1,

            badge:
                "Adopt • Love • Make a Difference",

            title:
                "Every Paw Deserves a Loving Home",

            subtitle:
                "Adoption isn't just giving a pet a home — it's giving both of you a new beginning.",

            button:
                "Discover the Adoption Process",

            action:
                () => navigate("/adoption-process"),
        },


        // -------------------------------------------------
        // SLIDE 2 — PET TIPS
        // -------------------------------------------------

        {
            image: HeroSlide2,

            badge:
                "Care • Learn • Grow",

            title:
                "A Happy Pet Starts With Good Care",

            subtitle:
                "Learn about everyday care, training, nutrition and everything your companion needs to thrive.",

            button:
                "Explore Pet Tips",

            action:
                () => navigate("/pet-tips"),
        },


        // -------------------------------------------------
        // SLIDE 3 — ADD A PET
        // -------------------------------------------------

        {
            image: HeroSlide3,

            badge:
                "Give Them a Second Chance",

            title:
                "Looking for a Loving Home for Your Pet?",

            subtitle:
                "Help your pet find a caring family and a forever home through PetVerse.",

            button:
                "List Your Pet",

            action:
                () => navigate("/add-pet"),
        },


        // -------------------------------------------------
        // SLIDE 4 — FIND A COMPANION
        // -------------------------------------------------

        {
            image: HeroSlide4,

            badge:
                "Find Your Companion",

            title:
                "A Home Is Better With Paws around",

            subtitle:
                "Some friendships have four legs, a wagging tail and a way of making every day brighter.",

            button:
                "Find Your Companion",

            action:
                () => navigate("/browse-pets"),
        },

    ];


    // =====================================================
    // CURRENT SLIDE
    // =====================================================

    const [currentSlide, setCurrentSlide] =
        useState(0);


    // =====================================================
    // AUTO SLIDE — 8 SECONDS
    // =====================================================

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentSlide(
                (previous) =>
                    (previous + 1) % slides.length
            );

        }, 8000);


        return () => {
            clearInterval(timer);
        };

    }, [slides.length]);


    // =====================================================
    // NEXT SLIDE
    // =====================================================

    const nextSlide = () => {

        setCurrentSlide(
            (previous) =>
                (previous + 1) % slides.length
        );

    };


    // =====================================================
    // PREVIOUS SLIDE
    // =====================================================

    const previousSlide = () => {

        setCurrentSlide(
            (previous) =>
                previous === 0
                    ? slides.length - 1
                    : previous - 1
        );

    };


    // =====================================================
    // CURRENT SLIDE
    // =====================================================

    const slide =
        slides[currentSlide];


    return (

        <section
            className="
                relative
                w-full
                h-[500px]
                overflow-hidden
                rounded-3xl
                shadow-xl
                bg-slate-100
                dark:bg-slate-900
            "
        >


            {/* =================================================
                BACKGROUND IMAGE
            ================================================= */}

            <img
                key={slide.image}
                src={slide.image}
                alt={slide.title}
                className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    transition-all
                    duration-700
                    ease-in-out
                "
            />


            {/* =================================================
                CONTENT
            ================================================= */}

            <div
                className="
                    absolute
                    inset-0
                    flex
                    items-center
                "
            >

                <div
                    className="
                        px-10
                        md:px-16
                        max-w-3xl
                    "
                >


                    {/* =================================================
                        BADGE
                    ================================================= */}

                    <span
                        className="
                            inline-block
                            px-5
                            py-2
                            rounded-full
                            bg-white/20
                            backdrop-blur-md
                            border
                            border-white/30
                            text-white
                            text-sm
                            font-medium
                            shadow-sm
                        "
                    >

                        {slide.badge}

                    </span>


                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <h1
                        className="
                            mt-5
                            text-4xl
                            md:text-5xl
                            lg:text-6xl
                            font-extrabold
                            leading-tight
                            text-white
                            max-w-2xl
                            drop-shadow-md
                        "
                    >

                        {slide.title}

                    </h1>


                    {/* =================================================
                        SUBTITLE
                    ================================================= */}

                    <p
                        className="
                            mt-4
                            max-w-xl
                            text-base
                            md:text-lg
                            leading-7
                            text-white
                            drop-shadow-sm
                        "
                    >

                        {slide.subtitle}

                    </p>


                    {/* =================================================
                        SINGLE BUTTON
                    ================================================= */}

                    <button
                        type="button"
                        onClick={slide.action}
                        className="
        mt-7
        px-7
        py-3.5
        rounded-full
        bg-white
        font-semibold
        shadow-lg
        hover:shadow-xl
        hover:-translate-y-0.5
        transition-all
        duration-300
    "
                    >
    <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
        {slide.button}
    </span>

                        <span className="ml-2 bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
        →
    </span>
                    </button>

                </div>

            </div>


            {/* =================================================
                PREVIOUS BUTTON
            ================================================= */}

            <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    w-11
                    h-11
                    rounded-full
                    bg-white/90
                    text-slate-700
                    shadow-lg
                    flex
                    items-center
                    justify-center
                    hover:bg-white
                    hover:scale-110
                    transition-all
                    duration-300
                    z-20

                    dark:bg-slate-800/90
                    dark:text-white
                    dark:hover:bg-slate-700
                "
            >

                <FaChevronLeft />

            </button>


            {/* =================================================
                NEXT BUTTON
            ================================================= */}

            <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    w-11
                    h-11
                    rounded-full
                    bg-white/90
                    text-slate-700
                    shadow-lg
                    flex
                    items-center
                    justify-center
                    hover:bg-white
                    hover:scale-110
                    transition-all
                    duration-300
                    z-20

                    dark:bg-slate-800/90
                    dark:text-white
                    dark:hover:bg-slate-700
                "
            >

                <FaChevronRight />

            </button>


            {/* =================================================
                SLIDE INDICATORS
            ================================================= */}

            <div
                className="
                    absolute
                    bottom-6
                    left-1/2
                    -translate-x-1/2
                    flex
                    items-center
                    gap-2.5
                    z-20
                "
            >

                {slides.map((_, index) => (

                    <button
                        key={index}
                        type="button"
                        onClick={() =>
                            setCurrentSlide(index)
                        }
                        aria-label={`Go to slide ${index + 1}`}
                        className={`
                            rounded-full
                            transition-all
                            duration-300

                            ${
                            currentSlide === index
                                ? "w-9 h-2.5 bg-white"
                                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                        }
                        `}
                    />

                ))}

            </div>

        </section>

    );

}


export default Hero;