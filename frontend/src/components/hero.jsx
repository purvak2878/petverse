import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import HeroSlide1 from "../assets/images/HeroSlide1.png";
import HeroSlide2 from "../assets/images/HeroSlide2.png";
import HeroSlide3 from "../assets/images/HeroSlide3.png";
import HeroSlide4 from "../assets/images/HeroSlide4.png";
import HeroSlide5 from "../assets/images/HeroSlide5.png";

function Hero() {

    const slides = [
        {
            image: HeroSlide1,
            badge: "Adopt • Love • Transform Lives",
            title: "Find Your Forever Friend",
            subtitle:
                "Thousands of loving pets are waiting for a caring family like yours.",
            button1: "Browse Pets",
            button2: "How It Works",
        },
        {
            image: HeroSlide2,
            badge: "About PetVerse",
            title: "Every Adoption Changes Two Lives",
            subtitle:
                "PetVerse connects adopters, shelters and pet lovers on one secure platform.",
            button1: "Learn More",
            button2: "About Us",
        },
        {
            image: HeroSlide3,
            badge: "Featured Pets",
            title: "Meet This Week's Featured Companions",
            subtitle:
                "Discover the most loved and newly listed pets waiting for their forever homes.",
            button1: "Explore Pets",
            button2: "View All",
        },
        {
            image: HeroSlide4,
            badge: "List Your Pet",
            title: "Looking For A Loving Home?",
            subtitle:
                "List your pet safely and help them find a caring and loving family.",
            button1: "Add A Pet",
            button2: "Learn More",
        },
        {
            image: HeroSlide5,
            badge: "Pet Care",
            title: "Pet Care Starts Here",
            subtitle:
                "Read expert articles on nutrition, health, training and everything in between.",
            button1: "Read Articles",
            button2: "Pet Tips",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentSlide((prev) => (prev + 1) % slides.length);

        }, 5000);

        return () => clearInterval(timer);

    }, []);

    const nextSlide = () => {

        setCurrentSlide((prev) => (prev + 1) % slides.length);

    };

    const previousSlide = () => {

        setCurrentSlide((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );

    };

    return (

        <section className="relative w-[650x] h-[420px] overflow-hidden rounded-3xl shadow-2xl">

            <img
                src={slides[currentSlide].image}
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute inset-0 flex items-center">

                <div className="max-w-3xl px-16">

                    <span className="inline-block bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full font-medium">

                        {slides[currentSlide].badge}

                    </span>

                    <h1 className="mt-6 text-6xl font-extrabold leading-tight text-white">

                        {slides[currentSlide].title}

                    </h1>

                    <p className="mt-6 text-xl text-white/90 leading-8">

                        {slides[currentSlide].subtitle}

                    </p>

                    <div className="flex gap-5 mt-10">

                        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold shadow-xl hover:scale-105 duration-300">

                            {slides[currentSlide].button1}

                        </button>

                        <button className="px-8 py-4 rounded-full bg-white text-gray-800 font-semibold hover:bg-gray-100 duration-300">

                            {slides[currentSlide].button2}

                        </button>

                    </div>

                </div>

            </div>

            <button
                onClick={previousSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition hover:scale-110"
            >
                <FaChevronLeft />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition hover:scale-110"
            >
                <FaChevronRight />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">

                {slides.map((_, index) => (

                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                            currentSlide === index
                                ? "w-10 h-3 bg-white"
                                : "w-3 h-3 bg-white/60 hover:bg-white"
                        }`}
                    />

                ))}

            </div>

        </section>

    );
}

export default Hero;