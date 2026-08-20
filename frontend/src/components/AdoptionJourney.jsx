import {
    FaPaw,
    FaHeart,
    FaSearch,
    FaHome,
    FaStar,
} from "react-icons/fa";


function AdoptionJourney() {

    const journey = [

        {
            icon: FaSearch,
            number: "01",
            title: "Meet",

            description:
                "Start with a little curiosity. Browse through pets, discover their personalities and find the one who catches your heart.",

            accent:
                "from-violet-500 to-purple-500",
        },

        {
            icon: FaHeart,
            number: "02",
            title: "Connect",

            description:
                "Every pet has a story. Take a moment to understand their needs, nature and the kind of companionship they are looking for.",

            accent:
                "from-fuchsia-500 to-pink-500",
        },

        {
            icon: FaPaw,
            number: "03",
            title: "Prepare",

            description:
                "A forever home begins before they arrive. Make space, learn what they need and get ready for a new member of the family.",

            accent:
                "from-purple-500 to-fuchsia-500",
        },

        {
            icon: FaHome,
            number: "04",
            title: "Forever",

            description:
                "Then comes the best part — bringing them home, building memories and giving them the love they have been waiting for.",

            accent:
                "from-pink-500 to-rose-500",
        },

    ];


    return (

        <section className="
            relative
            w-full
            py-16
            my-12
            overflow-hidden
        ">


            {/* =====================================================
                SUBTLE DECORATIVE BACKGROUND
            ===================================================== */}

            <div className="
                absolute
                inset-0
                pointer-events-none
            ">

                {/* Soft gradient glow */}

                <div className="
                    absolute
                    top-10
                    left-[10%]
                    w-64
                    h-64
                    rounded-full
                    bg-violet-200/20
                    blur-3xl
                " />

                <div className="
                    absolute
                    bottom-0
                    right-[10%]
                    w-72
                    h-72
                    rounded-full
                    bg-pink-200/20
                    blur-3xl
                " />


                {/* Decorative paw */}

                <FaPaw className="
                    absolute
                    top-12
                    right-[8%]
                    text-5xl
                    text-violet-200/40
                    rotate-12
                " />

                <FaPaw className="
                    absolute
                    bottom-10
                    left-[6%]
                    text-4xl
                    text-pink-200/40
                    -rotate-12
                " />

            </div>


            {/* =====================================================
                HEADING
            ===================================================== */}

            <div className="
                relative
                z-10
                text-center
                max-w-3xl
                mx-auto
                px-5
            ">

                <div className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-white
                    border
                    border-violet-100
                    shadow-sm
                ">

                    <FaStar className="
                        text-violet-500
                        text-sm
                    " />

                    <span className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-violet-600
                    ">
                        The PetVerse Journey
                    </span>

                </div>


                <h2 className="
                    mt-4
                    text-3xl
                    md:text-4xl
                    font-extrabold
                    text-slate-800
                ">

                    From a Little Hello

                    <span className="
                        block
                        text-transparent
                        bg-clip-text
                        bg-gradient-to-r
                        from-violet-600
                        via-fuchsia-500
                        to-pink-500
                    ">
                        To a Forever Home
                    </span>

                </h2>


                <p className="
                    mt-4
                    text-sm
                    md:text-base
                    leading-7
                    text-slate-500
                    max-w-2xl
                    mx-auto
                ">
                    Because finding a pet is only the beginning.
                    The real story starts when two lives become a little
                    more complete together.
                </p>

            </div>


            {/* =====================================================
                JOURNEY CARDS
            ===================================================== */}

            <div className="
                relative
                z-10
                max-w-6xl
                mx-auto
                px-5
                mt-12
            ">

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-5
                ">


                    {journey.map((step) => {

                        const Icon = step.icon;


                        return (

                            <div
                                key={step.number}
                                className="
                                    group
                                    relative
                                "
                            >

                                {/* =================================================
                                    CARD
                                ================================================= */}

                                <div className="
                                    relative
                                    h-full
                                    bg-white
                                    rounded-3xl
                                    p-6
                                    border
                                    border-slate-100
                                    shadow-[0_8px_30px_rgba(15,23,42,0.06)]
                                    hover:-translate-y-2
                                    hover:shadow-[0_18px_40px_rgba(124,58,237,0.12)]
                                    transition-all
                                    duration-300
                                ">


                                    {/* Top number */}

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                    ">

                                        <span className="
                                            text-xs
                                            font-bold
                                            tracking-widest
                                            text-slate-300
                                        ">
                                            {step.number}
                                        </span>


                                        {/* Icon */}

                                        <div className={`
                                            w-12
                                            h-12
                                            rounded-2xl
                                            flex
                                            items-center
                                            justify-center
                                            bg-gradient-to-br
                                            ${step.accent}
                                            shadow-md
                                            group-hover:scale-110
                                            transition-transform
                                            duration-300
                                        `}>

                                            <Icon className="
                                                text-white
                                                text-lg
                                            " />

                                        </div>

                                    </div>


                                    {/* Title */}

                                    <h3 className="
                                        mt-6
                                        text-xl
                                        font-bold
                                        text-slate-800
                                    ">
                                        {step.title}
                                    </h3>


                                    {/* Description */}

                                    <p className="
                                        mt-3
                                        text-sm
                                        leading-6
                                        text-slate-500
                                    ">
                                        {step.description}
                                    </p>


                                    {/* Bottom accent */}

                                    <div className={`
                                        mt-6
                                        w-10
                                        h-1
                                        rounded-full
                                        bg-gradient-to-r
                                        ${step.accent}
                                        opacity-70
                                        group-hover:w-16
                                        transition-all
                                        duration-300
                                    `} />

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>


            {/* =====================================================
                CLOSING LINE
            ===================================================== */}

            <div className="
                relative
                z-10
                flex
                justify-center
                items-center
                gap-3
                mt-10
                text-sm
                text-slate-400
            ">

                <span className="
                    w-10
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    to-violet-300
                " />

                <FaHeart className="
                    text-pink-400
                    text-xs
                " />

                <span>
                    Every ending can be a new beginning.
                </span>

                <FaHeart className="
                    text-violet-400
                    text-xs
                " />

                <span className="
                    w-10
                    h-px
                    bg-gradient-to-l
                    from-transparent
                    to-pink-300
                " />

            </div>

        </section>

    );

}


export default AdoptionJourney;