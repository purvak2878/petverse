import { useState } from "react";
import { FaPlus, FaMinus, FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import PawBackground from "../components/PawBackground.jsx";

function FAQs() {

    const [openIndex, setOpenIndex] = useState(null);
    const [question, setQuestion] = useState("");

    const faqs = [
        {
            question: "How do I know if I am well-prepared to adopt a pet?",
            answer:
                "Before adopting a pet, consider your time, living space, budget, lifestyle, and ability to provide proper care. Make sure you are ready for the long-term responsibility of caring for a pet."
        },
        {
            question: "How do I know the breed and health status of the pet?",
            answer:
                "You can check the pet profile for its breed, age, vaccination details, and other available information. You can also contact the shelter for additional health-related information."
        },
        {
            question: "How do I adopt a pet from your portal?",
            answer:
                "Browse the available pets, select the pet you are interested in, view its details, and submit an adoption application. The shelter will review your application and contact you for the next steps."
        },
        {
            question: "Can I adopt more than one pet?",
            answer:
                "Yes, you may apply to adopt more than one pet. Each adoption application is reviewed separately depending on the pet and the shelter's requirements."
        },
        {
            question: "Can I return the pet to the shelter if I cannot adopt it anymore?",
            answer:
                "If you are unable to continue caring for an adopted pet, contact the respective shelter or organization as soon as possible. They can guide you through the appropriate process."
        },
        {
            question: "What kind of pets do you have in your portal currently?",
            answer:
                "PetVerse can display different types of pets available for adoption, including dogs, cats, and other animals depending on the shelters and listings available on the portal."
        },
        {
            question: "How do I create an account?",
            answer:
                "Click the Login button in the navbar and select Register. Enter your name, email, password, and confirm your password to create your PetVerse account."
        },
        {
            question: "What should I do after making an appointment with the shelter?",
            answer:
                "After making an appointment, check the appointment details and arrive at the shelter at the scheduled time. Carry any required identification or documents requested by the shelter."
        },
        {
            question: "How do I check my appointment time?",
            answer:
                "You can check your appointment details from the My Applications section of your PetVerse account."
        },
        {
            question: "How do I reserve the pet I'm interested in?",
            answer:
                "Open the pet's profile and follow the available adoption or reservation option. Complete the required information and submit your request."
        }
    ];


    const filteredFAQs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(question.toLowerCase())
    );


    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


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
                Always stays BEHIND the page content
            ====================================== */}

            <div className="
                absolute
                inset-0
                z-0
                pointer-events-none
            ">
                <PawBackground/>
            </div>


            {/* =====================================
                ALL ACTUAL PAGE CONTENT
                Stays above paw background
            ====================================== */}

            <div className="
                relative
                z-10
            ">


                {/* =================================
                    FAQ SECTION
                ================================== */}

                <section className="
                    max-w-6xl
                    mx-auto
                    px-6
                    pt-8
                    pb-16
                ">


                    {/* =================================
                        HEADING
                    ================================== */}

                    <div className="
                        text-center
                        mb-10
                    ">

                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-bold
                            text-slate-800
                        ">

                            Frequently Asked{" "}

                            <span className="
                                text-transparent
                                bg-clip-text
                                bg-gradient-to-r
                                from-violet-600
                                via-fuchsia-500
                                to-pink-500
                            ">
                                Questions
                            </span>

                        </h1>


                        <p className="
                            mt-3
                            text-gray-500
                        ">
                            Find answers to common questions about pet adoption
                            and PetVerse.
                        </p>

                    </div>


                    {/* =================================
                        ASK QUESTION
                    ================================== */}

                    <div className="mb-10">

                        <label className="
                            block
                            text-lg
                            font-semibold
                            text-slate-700
                            mb-2
                        ">
                            Ask your Question
                        </label>


                        <div className="
                            flex
                            items-center
                            bg-white
                            border
                            border-slate-200
                            rounded-2xl
                            shadow-sm
                            focus-within:ring-2
                            focus-within:ring-violet-400
                            overflow-hidden
                        ">

                            <FaSearch className="
                                ml-5
                                text-gray-400
                            " />


                            <input
                                type="text"
                                value={question}
                                onChange={(e) => {
                                    setQuestion(e.target.value);
                                    setOpenIndex(null);
                                }}
                                placeholder="Ask your questions..."
                                className="
                                    w-full
                                    px-4
                                    py-4
                                    bg-transparent
                                    outline-none
                                    text-sm
                                    text-slate-700
                                "
                            />


                            {question && (

                                <button
                                    onClick={() => setQuestion("")}
                                    className="
                                        mr-4
                                        text-sm
                                        text-violet-600
                                        font-medium
                                        hover:text-pink-500
                                        transition
                                    "
                                >
                                    Clear
                                </button>

                            )}

                        </div>

                    </div>


                    {/* =================================
                        FAQ LIST
                    ================================== */}

                    <div className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        overflow-hidden
                        border
                        border-slate-100
                    ">

                        {filteredFAQs.length > 0 ? (

                            filteredFAQs.map((faq, index) => (

                                <div
                                    key={index}
                                    className="
                                        border-b
                                        border-slate-200
                                        last:border-b-0
                                    "
                                >

                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="
                                            w-full
                                            flex
                                            items-center
                                            justify-between
                                            gap-5
                                            px-7
                                            py-6
                                            text-left
                                            hover:bg-violet-50/50
                                            transition
                                        "
                                    >

                                        <span className="
                                            text-lg
                                            font-medium
                                            text-slate-800
                                        ">
                                            {faq.question}
                                        </span>


                                        <span className="
                                            flex-shrink-0
                                            w-8
                                            h-8
                                            rounded-full
                                            bg-gradient-to-r
                                            from-violet-600
                                            to-pink-500
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            text-xs
                                        ">

                                            {openIndex === index ? (
                                                <FaMinus />
                                            ) : (
                                                <FaPlus />
                                            )}

                                        </span>

                                    </button>


                                    {openIndex === index && (

                                        <div className="
                                            px-6
                                            pb-6
                                            pr-16
                                            text-base
                                            leading-8
                                            text-gray-500
                                        ">
                                            {faq.answer}
                                        </div>

                                    )}

                                </div>

                            ))

                        ) : (

                            <div className="
                                text-center
                                py-12
                                px-6
                            ">

                                <div className="
                                    text-4xl
                                    mb-3
                                ">
                                    🐾
                                </div>


                                <h3 className="
                                    font-semibold
                                    text-slate-700
                                ">
                                    No matching question found
                                </h3>


                                <p className="
                                    text-sm
                                    text-gray-400
                                    mt-1
                                ">
                                    Try searching with different words.
                                </p>

                            </div>

                        )}

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

export default FAQs;