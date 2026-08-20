import { Link } from "react-router-dom";

import {
    FaSearch,
    FaHeart,
    FaClipboardList,
    FaHandshake,
    FaHome,
    FaPaw,
    FaArrowLeft,
} from "react-icons/fa";

import Footer from "../components/Footer";
import PawBackground from "../components/PawBackground.jsx";


function AdoptionProcess() {

    const steps = [

        {
            number: "01",
            icon: <FaSearch />,
            title: "Find Your Match",
            description:
                "Browse our pets and take your time finding a companion whose personality and needs feel right for you.",
            doodle: "🐶",
        },

        {
            number: "02",
            icon: <FaHeart />,
            title: "Learn About Them",
            description:
                "Explore their profile, personality, traits, health information and everything you need to know before adopting.",
            doodle: "❤️",
        },

        {
            number: "03",
            icon: <FaClipboardList />,
            title: "Submit Your Application",
            description:
                "Once you've found your match, fill out the adoption application with your information and details.",
            doodle: "📝",
        },

        {
            number: "04",
            icon: <FaHandshake />,
            title: "Meet & Connect",
            description:
                "Take the time to connect with your potential new companion and make sure the match feels right.",
            doodle: "🤝",
        },

        {
            number: "05",
            icon: <FaHome />,
            title: "Welcome Home",
            description:
                "Complete the adoption process and prepare a safe, loving space for your new family member.",
            doodle: "🏠",
        },

    ];


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
                MAIN CONTENT
            ====================================== */}

            <div className="
                relative
                z-10
            ">


                {/* =================================
                    BACK BUTTON
                ================================== */}

                <div className="
                    max-w-6xl
                    mx-auto
                    px-6
                    pt-8
                ">

                    <Link
                        to="/"
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

                        Back to Home

                    </Link>

                </div>


                {/* =================================
                    HERO
                ================================== */}

                <section className="
                    max-w-6xl
                    mx-auto
                    px-6
                    pt-10
                    pb-12
                ">

                    <div className="
                        relative
                        overflow-hidden
                        rounded-[2rem]
                        bg-gradient-to-br
                        from-violet-600
                        via-fuchsia-500
                        to-pink-500
                        px-7
                        py-12
                        md:px-14
                        md:py-16
                        shadow-xl
                    ">


                        {/* DECORATIVE PAWS */}

                        <div className="
                            absolute
                            top-6
                            right-8
                            text-5xl
                            opacity-20
                            rotate-12
                        ">

                            🐾

                        </div>


                        <div className="
                            absolute
                            bottom-5
                            left-10
                            text-4xl
                            opacity-20
                            -rotate-12
                        ">

                            🐾

                        </div>


                        <div className="
                            absolute
                            top-20
                            right-28
                            text-2xl
                            opacity-20
                        ">

                            ✦

                        </div>


                        <div className="
                            absolute
                            bottom-12
                            right-16
                            text-3xl
                            opacity-20
                        ">

                            ♡

                        </div>


                        {/* HERO CONTENT */}

                        <div className="
                            relative
                            max-w-3xl
                        ">

                            <div className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-white/20
                                text-white
                                text-xs
                                font-semibold
                                mb-5
                            ">

                                <FaPaw />

                                PETVERSE ADOPTION GUIDE

                            </div>


                            <h1 className="
                                text-4xl
                                md:text-6xl
                                font-black
                                leading-tight
                                text-white
                            ">

                                How Adoption{" "}

                                <span className="
                                    text-yellow-200
                                ">

                                    Works

                                </span>

                                ?

                            </h1>


                            <p className="
                                mt-5
                                max-w-2xl
                                text-sm
                                md:text-lg
                                leading-7
                                text-white/90
                            ">

                                Adopting a pet is more than bringing
                                an animal home — it's the beginning of
                                a beautiful friendship. Here's how the
                                PetVerse journey works.

                            </p>


                            {/* LITTLE DOODLE ROW */}

                            <div className="
                                mt-8
                                flex
                                items-center
                                gap-5
                                text-3xl
                            ">

                                <span>🐶</span>

                                <span className="
                                    text-white/70
                                ">
                                    →
                                </span>

                                <span>❤️</span>

                                <span className="
                                    text-white/70
                                ">
                                    →
                                </span>

                                <span>🏠</span>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================
                    INTRO
                ================================== */}

                <section className="
                    max-w-4xl
                    mx-auto
                    px-6
                    pb-14
                    text-center
                ">

                    <p className="
                        text-sm
                        md:text-base
                        leading-7
                        text-slate-500
                    ">

                        We believe every pet deserves a loving home
                        and every adopter deserves a companion that's
                        the right fit. Take your time, ask questions,
                        and enjoy the journey.

                    </p>

                </section>


                {/* =================================
                    PROCESS
                ================================== */}

                <section className="
                    max-w-6xl
                    mx-auto
                    px-6
                    pb-20
                ">


                    {/* TITLE */}

                    <div className="
                        text-center
                        mb-14
                    ">

                        <p className="
                            text-sm
                            font-bold
                            tracking-widest
                            uppercase
                            text-violet-600
                        ">

                            Simple & Meaningful

                        </p>


                        <h2 className="
                            mt-2
                            text-3xl
                            md:text-4xl
                            font-bold
                            text-slate-800
                        ">

                            Your Adoption Journey

                        </h2>

                    </div>


                    {/* STEPS */}

                    <div className="
                        relative
                    ">


                        {/* DESKTOP CONNECTING LINE */}

                        <div className="
                            hidden
                            md:block
                            absolute
                            top-[65px]
                            left-[10%]
                            right-[10%]
                            h-[3px]
                            bg-gradient-to-r
                            from-violet-200
                            via-fuchsia-200
                            to-pink-200
                            rounded-full
                        " />


                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-5
                            gap-8
                        ">

                            {steps.map((step, index) => (

                                <div
                                    key={step.number}
                                    className="
                                        relative
                                        text-center
                                    "
                                >


                                    {/* DOODLE */}

                                    <div className="
                                        absolute
                                        -top-8
                                        right-4
                                        text-2xl
                                        rotate-12
                                        opacity-80
                                    ">

                                        {step.doodle}

                                    </div>


                                    {/* ICON CIRCLE */}

                                    <div className="
                                        relative
                                        z-10
                                        mx-auto
                                        w-[130px]
                                        h-[130px]
                                        rounded-full
                                        bg-white
                                        border-[7px]
                                        border-violet-100
                                        shadow-lg
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                    ">

                                        <div className="
                                            w-14
                                            h-14
                                            rounded-2xl
                                            bg-gradient-to-br
                                            from-violet-600
                                            to-pink-500
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            text-xl
                                            shadow-md
                                        ">

                                            {step.icon}

                                        </div>


                                        <span className="
                                            absolute
                                            -bottom-2
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-slate-800
                                            text-white
                                            text-[10px]
                                            font-bold
                                        ">

                                            STEP {step.number}

                                        </span>

                                    </div>


                                    {/* TEXT */}

                                    <div className="
                                        mt-8
                                    ">

                                        <h3 className="
                                            text-lg
                                            font-bold
                                            text-slate-800
                                        ">

                                            {step.title}

                                        </h3>


                                        <p className="
                                            mt-2
                                            text-xs
                                            md:text-sm
                                            leading-6
                                            text-slate-500
                                        ">

                                            {step.description}

                                        </p>

                                    </div>


                                </div>

                            ))}

                        </div>

                    </div>

                </section>


                {/* =================================
                    DO'S SECTION
                ================================== */}

                <section className="
                    max-w-5xl
                    mx-auto
                    px-6
                    pb-20
                ">

                    <div className="
                        grid
                        md:grid-cols-2
                        gap-6
                    ">


                        {/* BEFORE ADOPTION */}

                        <div className="
                            rounded-3xl
                            bg-white
                            border
                            border-violet-100
                            shadow-sm
                            p-7
                        ">

                            <div className="
                                text-4xl
                                mb-4
                            ">

                                🎒

                            </div>


                            <h3 className="
                                text-xl
                                font-bold
                                text-slate-800
                            ">

                                Before You Adopt

                            </h3>


                            <ul className="
                                mt-5
                                space-y-3
                                text-sm
                                text-slate-500
                            ">

                                <li className="
                                    flex
                                    gap-3
                                ">

                                    <span className="
                                        text-violet-500
                                    ">
                                        ✓
                                    </span>

                                    Make sure you're ready for
                                    a long-term commitment.

                                </li>


                                <li className="
                                    flex
                                    gap-3
                                ">

                                    <span className="
                                        text-violet-500
                                    ">
                                        ✓
                                    </span>

                                    Consider your home,
                                    schedule and lifestyle.

                                </li>


                                <li className="
                                    flex
                                    gap-3
                                ">

                                    <span className="
                                        text-violet-500
                                    ">
                                        ✓
                                    </span>

                                    Learn about the pet's
                                    needs and personality.

                                </li>


                                <li className="
                                    flex
                                    gap-3
                                ">

                                    <span className="
                                        text-violet-500
                                    ">
                                        ✓
                                    </span>

                                    Prepare a safe and
                                    comfortable space.

                                </li>

                            </ul>

                        </div>


                        {/* AFTER ADOPTION */}

                        <div className="
                            rounded-3xl
                            bg-gradient-to-br
                            from-violet-50
                            to-pink-50
                            border
                            border-violet-100
                            p-7
                        ">

                            <div className="
                                text-4xl
                                mb-4
                            ">

                                🏡

                            </div>


                            <h3 className="
                                text-xl
                                font-bold
                                text-slate-800
                            ">

                                After Adoption

                            </h3>


                            <ul className="
                                mt-5
                                space-y-3
                                text-sm
                                text-slate-500
                            ">

                                <li className="
                                    flex
                                    gap-3
                                ">

                                    <span className="
                                        text-pink-500
                                    ">
                                        ♥
                                    </span>

                                    Give your new companion
                                    time to settle in.

                                </li>


                                <li className="
                                    flex
                                    gap-3
                                ">

                                    <span className="
                                        text-pink-500
                                    ">
                                        ♥
                                    </span>

                                    Build a consistent routine.

                                </li>


                                <li className="
                                    flex
                                    gap-3
                                ">

                                    <span className="
                                        text-pink-500
                                    ">
                                        ♥
                                    </span>

                                    Provide proper care,
                                    food and attention.

                                </li>


                                <li className="
                                    flex
                                    gap-3
                                ">

                                    <span className="
                                        text-pink-500
                                    ">
                                        ♥
                                    </span>

                                    Most importantly,
                                    give them lots of love.

                                </li>

                            </ul>

                        </div>

                    </div>

                </section>


                {/* =================================
                    FINAL CTA
                ================================== */}

                <section className="
                    max-w-4xl
                    mx-auto
                    px-6
                    pb-20
                ">

                    <div className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        bg-white
                        border
                        border-violet-100
                        shadow-sm
                        p-8
                        md:p-10
                        text-center
                    ">


                        {/* DOODLES */}

                        <div className="
                            absolute
                            top-3
                            left-5
                            text-2xl
                            opacity-50
                        ">

                            ✨

                        </div>


                        <div className="
                            absolute
                            bottom-3
                            right-7
                            text-3xl
                            opacity-50
                        ">

                            🐾

                        </div>


                        <div className="
                            text-4xl
                        ">

                            🐾❤️

                        </div>


                        <h2 className="
                            mt-4
                            text-2xl
                            md:text-3xl
                            font-bold
                            text-slate-800
                        ">

                            Ready to find your new best friend?

                        </h2>


                        <p className="
                            mt-3
                            text-sm
                            text-slate-500
                        ">

                            Your perfect companion might be
                            waiting for you right now.

                        </p>


                        <Link
                            to="/browse-pets"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                mt-6
                                px-7
                                py-3
                                rounded-full
                                bg-gradient-to-r
                                from-violet-600
                                via-fuchsia-500
                                to-pink-500
                                text-white
                                text-sm
                                font-semibold
                                shadow-md
                                shadow-violet-200
                                hover:-translate-y-0.5
                                hover:shadow-lg
                                transition-all
                            "
                        >

                            <FaPaw />

                            Browse Pets

                        </Link>

                    </div>

                </section>


                {/* =================================
                    FOOTER
                ================================== */}

                <Footer />

            </div>

        </div>

    );

}


export default AdoptionProcess;