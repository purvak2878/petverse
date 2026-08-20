import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import PawBackground from "../components/PawBackground.jsx";


// =====================================================
// PET TIPS DATA
// Exported so PetTipDetails.jsx can use the same data.
// =====================================================

export const petTips = [

    {
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
        category: "Well-Being",
        title: "Essential Tips On Caring For Your Dog",
        description:
            "Taking care of a dog requires love, patience, proper nutrition, exercise, and regular health checkups.",
        content:
            "Caring for a dog involves creating a safe, comfortable and loving environment. Maintain a consistent daily routine, provide suitable food and fresh water, make time for exercise and play, and pay attention to changes in behaviour or health. Regular veterinary checkups and keeping vaccinations up to date are also important parts of responsible pet care."
    },

    {
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
        category: "Well-Being",
        title: "At-Home Grooming Tips For Dogs",
        description:
            "Regular grooming keeps your pet clean, comfortable, healthy, and looking their best at home.",
        content:
            "Regular grooming can help keep your dog's coat and skin clean and comfortable. Brush the coat according to its needs, keep the ears and paws clean, and pay attention to the condition of the nails. Introduce grooming gradually and keep the experience calm and positive."
    },

    {
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
        category: "Exercise",
        title: "Ways To Keep Your Dog Active",
        description:
            "Daily walks, playtime, and simple activities can help your dog stay active and maintain a healthy lifestyle.",
        content:
            "Dogs benefit from regular physical activity and mental stimulation. Walks, supervised play, simple games and interactive activities can become part of a healthy routine. Choose activities appropriate for your dog's age, abilities and energy level, and always provide access to fresh water."
    },

    {
        image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80",
        category: "Nutrition",
        title: "Everything You Need To Know About Dog Diet",
        description:
            "A balanced diet provides the nutrients your dog needs for energy, growth, immunity, and overall health.",
        content:
            "A dog's food should provide appropriate nutrition for its age, size and activity level. Keep feeding routines consistent and provide fresh drinking water. Avoid making sudden changes to food and speak with a veterinarian if your pet has special dietary needs or develops ongoing eating or digestive problems."
    },

    {
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
        category: "Well-Being",
        title: "Taking Care Of Your Female Dog",
        description:
            "Understanding your female dog's health, hygiene, nutrition, and changing needs helps her stay happy and healthy.",
        content:
            "Female dogs can have different care needs depending on their age and life stage. Maintain good hygiene, provide balanced nutrition and regular activity, and keep up with routine veterinary care. If you notice unusual behaviour or health changes, consult a veterinarian."
    },

    {
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
        category: "Exercise",
        title: "Tips To Keep Your Dog Active At Home",
        description:
            "Indoor games and simple activities can keep your dog mentally stimulated and physically active.",
        content:
            "Indoor activities can be useful when outdoor exercise is limited. Try supervised games, basic training exercises, interactive toys and short play sessions. Keep activities varied and give your dog breaks so that exercise remains enjoyable."
    },

    {
        image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
        category: "Well-Being",
        title: "How To Groom Your Adult Dog At Home",
        description:
            "Learn simple grooming habits that help maintain your dog's coat, nails, ears, and overall hygiene.",
        content:
            "Adult dogs benefit from a regular grooming routine. Brushing helps maintain the coat, while checking the ears, paws and nails can help you notice changes early. Keep grooming sessions comfortable and reward calm behaviour."
    },

    {
        image: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80",
        category: "Ownership",
        title: "How To Work From Home With An Adult Dog",
        description:
            "Create a comfortable routine that keeps your dog happy while allowing you to stay productive at home.",
        content:
            "A predictable routine can help your dog understand when it is time for attention and when you need to work. Set up a comfortable resting area, include regular breaks for interaction and exercise, and keep suitable toys nearby for independent activities."
    },

    {
        image: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?auto=format&fit=crop&w=800&q=80",
        category: "Ownership",
        title: "How To Introduce Your Dog To A New Pet",
        description:
            "Introducing pets slowly and carefully can help them build a comfortable and positive relationship.",
        content:
            "Introducing pets should be done gradually and with supervision. Give both animals enough space, allow them to become familiar with each other's presence and avoid forcing interactions. Positive experiences and patience can help them become more comfortable with one another."
    },

    {
        image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80",
        category: "Ownership",
        title: "Adopting An Adult Dog? Here's What You Need To Know",
        description:
            "Adult dogs can make wonderful companions. Learn what to expect when welcoming one into your home.",
        content:
            "Adopting an adult dog can be a rewarding experience. Give the dog time to become familiar with its new surroundings and establish a consistent routine. Be patient while learning its personality, habits and comfort level, and provide plenty of positive interaction."
    },

    {
        image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
        category: "Nutrition",
        title: "Everything You Need To Know About The Adult Dog Diet",
        description:
            "Adult dogs need a balanced diet with the right amount of nutrients based on their age, size, and activity.",
        content:
            "Adult dogs need nutrition that matches their individual lifestyle and needs. Follow an appropriate feeding routine, provide fresh water and avoid making sudden dietary changes. If you are unsure about the right food or portion for your dog, ask a veterinarian for guidance."
    },

    {
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
        category: "Nutrition",
        title: "Tips To Manage Overweight & Underweight Dogs",
        description:
            "Maintaining a healthy weight is important. Learn how nutrition and activity can support your dog's health.",
        content:
            "Healthy weight management should focus on appropriate nutrition, regular activity and professional guidance when needed. Avoid making drastic feeding or exercise changes without understanding the reason for the weight change. A veterinarian can help determine an appropriate plan for your pet."
    },

    {
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
        category: "Well-Being",
        title: "How To Groom Your Puppy At Home",
        description:
            "Start grooming habits early so your puppy becomes comfortable with brushing, bathing, and nail care.",
        content:
            "Introducing puppies to grooming gradually can help them become comfortable with the process. Keep sessions short, gentle and positive. Slowly introduce brushing and other basic grooming activities while rewarding calm behaviour."
    },

    {
        image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
        category: "Well-Being",
        title: "6 Ways To Prepare Your Pooch For Fireworks And Thunderstorms",
        description:
            "Loud noises can frighten pets. Create a safe and comfortable environment to help your dog stay calm.",
        content:
            "During loud weather or fireworks, create a comfortable and secure area where your dog can retreat. Keep doors and windows secure, reduce unnecessary noise where possible and remain calm around your pet. If your dog has a strong fear response, discuss suitable options with a veterinarian before stressful events."
    },

    {
        image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80",
        category: "Training",
        title: "How To Begin Leash Training A Puppy",
        description:
            "Introduce your puppy to a leash gradually and use positive reinforcement to build confidence.",
        content:
            "Begin leash training in a calm environment. Allow the puppy to become comfortable with the collar or harness and leash before expecting longer walks. Use positive reinforcement and short sessions, gradually increasing the duration as the puppy becomes more confident."
    },

    {
        image: "https://images.unsplash.com/photo-1558929996-da64ba858215?auto=format&fit=crop&w=800&q=80",
        category: "Training",
        title: "The Dos And Don'ts Of Puppy Training",
        description:
            "Learn simple training practices that help your puppy understand boundaries while building trust.",
        content:
            "Good puppy training relies on consistency, patience and positive reinforcement. Keep commands simple and sessions short. Reward desired behaviour and avoid confusing the puppy with inconsistent rules. Give the puppy time to learn and build confidence."
    },

    {
        image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80",
        category: "Ownership",
        title: "How To Raise A Puppy When You Work From Home",
        description:
            "A consistent routine can help balance your work responsibilities with your puppy's needs.",
        content:
            "Puppies need regular attention, rest, play and opportunities for training. Creating a predictable daily routine can make it easier to balance work and pet care. Set aside dedicated time for interaction and make sure the puppy has a comfortable and safe resting space."
    },

    {
        // FIXED POTTY TRAINING IMAGE
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
        category: "Training",
        title: "How To Potty Train A Puppy Successfully",
        description:
            "Consistency, patience, and positive reinforcement are important when teaching your puppy where to go.",
        content:
            "Potty training works best with a consistent routine and plenty of patience. Take the puppy to the appropriate location regularly, especially around meals and after waking or playing. Reward successful behaviour and clean accidents thoroughly without punishment."
    },

];


// =====================================================
// PET TIPS PAGE
// =====================================================

function PetTips() {

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
                PAGE CONTENT
            ====================================== */}

            <div className="
                relative
                z-10
            ">


                {/* =================================
                    HEADER
                ================================== */}

                <section className="
                    pt-8
                    pb-12
                    px-6
                ">

                    <div className="
                        max-w-7xl
                        mx-auto
                        text-center
                    ">

                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-bold
                            text-slate-800
                        ">

                            Pet{" "}

                            <span className="
                                text-transparent
                                bg-clip-text
                                bg-gradient-to-r
                                from-violet-600
                                via-fuchsia-500
                                to-pink-500
                            ">

                                Tips

                            </span>

                        </h1>


                        <p className="
                            mt-3
                            text-base
                            md:text-lg
                            text-gray-500
                            max-w-2xl
                            mx-auto
                        ">

                            Helpful tips and guides to keep your pets happy,
                            healthy, active, and well cared for.

                        </p>

                    </div>

                </section>


                {/* =================================
                    TIPS GRID
                ================================== */}

                <section className="
                    max-w-7xl
                    mx-auto
                    px-6
                    pb-20
                ">

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-x-10
                        gap-y-14
                    ">

                        {petTips.map((tip, index) => (

                            <article
                                key={index}
                                className="
                                    group
                                    flex
                                    flex-col
                                "
                            >


                                {/* IMAGE */}

                                <div className="
                                    w-full
                                    h-56
                                    overflow-hidden
                                    rounded-2xl
                                    bg-slate-200
                                    shadow-sm
                                ">

                                    <img
                                        src={tip.image}
                                        alt={tip.title}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                            group-hover:scale-105
                                            transition-transform
                                            duration-500
                                        "
                                    />

                                </div>


                                {/* CATEGORY */}

                                <p className="
                                    mt-4
                                    text-sm
                                    font-medium
                                    text-violet-600
                                ">

                                    {tip.category}

                                </p>


                                {/* TITLE */}

                                <h2 className="
                                    mt-2
                                    text-xl
                                    font-bold
                                    leading-tight
                                    text-slate-800
                                    group-hover:text-violet-600
                                    transition
                                ">

                                    {tip.title}

                                </h2>


                                {/* DESCRIPTION */}

                                <p className="
                                    mt-2
                                    text-sm
                                    md:text-base
                                    leading-6
                                    text-gray-500
                                ">

                                    {tip.description}

                                </p>


                                {/* =================================
                                    READ MORE
                                ================================== */}

                                <Link
                                    to={`/pet-tips/${index}`}
                                    className="
                                        mt-6
                                        self-start
                                        px-5
                                        py-2.5
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
                                        duration-300
                                    "
                                >

                                    Read More

                                </Link>


                            </article>

                        ))}

                    </div>

                </section>


                <Footer />

            </div>

        </div>

    );

}


export default PetTips;