import Footer from "../components/Footer";

function PetTips() {

    const tips = [
        {
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
            category: "Well-Being",
            title: "Essential Tips On Caring For Your Dog",
            description:
                "Taking care of a dog requires love, patience, proper nutrition, exercise, and regular health checkups."
        },
        {
            image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
            category: "Well-Being",
            title: "At-Home Grooming Tips For Dogs",
            description:
                "Regular grooming keeps your pet clean, comfortable, healthy, and looking their best at home."
        },
        {
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
            category: "Exercise",
            title: "Ways To Keep Your Dog Active",
            description:
                "Daily walks, playtime, and simple activities can help your dog stay active and maintain a healthy lifestyle."
        },
        {
            image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80",
            category: "Nutrition",
            title: "Everything You Need To Know About Dog Diet",
            description:
                "A balanced diet provides the nutrients your dog needs for energy, growth, immunity, and overall health."
        },
        {
            image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
            category: "Well-Being",
            title: "Taking Care Of Your Female Dog",
            description:
                "Understanding your female dog's health, hygiene, nutrition, and changing needs helps her stay happy and healthy."
        },
        {
            image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
            category: "Exercise",
            title: "Tips To Keep Your Dog Active At Home",
            description:
                "Indoor games and simple activities can keep your dog mentally stimulated and physically active."
        },
        {
            image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
            category: "Well-Being",
            title: "How To Groom Your Adult Dog At Home",
            description:
                "Learn simple grooming habits that help maintain your dog's coat, nails, ears, and overall hygiene."
        },
        {
            image: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80",
            category: "Ownership",
            title: "How To Work From Home With An Adult Dog",
            description:
                "Create a comfortable routine that keeps your dog happy while allowing you to stay productive at home."
        },
        {
            image: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?auto=format&fit=crop&w=800&q=80",
            category: "Ownership",
            title: "How To Introduce Your Dog To A New Pet",
            description:
                "Introducing pets slowly and carefully can help them build a comfortable and positive relationship."
        },
        {
            image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80",
            category: "Ownership",
            title: "Adopting An Adult Dog? Here's What You Need To Know",
            description:
                "Adult dogs can make wonderful companions. Learn what to expect when welcoming one into your home."
        },
        {
            image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
            category: "Nutrition",
            title: "Everything You Need To Know About The Adult Dog Diet",
            description:
                "Adult dogs need a balanced diet with the right amount of nutrients based on their age, size, and activity."
        },
        {
            image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
            category: "Nutrition",
            title: "Tips To Manage Overweight & Underweight Dogs",
            description:
                "Maintaining a healthy weight is important. Learn how nutrition and activity can support your dog's health."
        },
        {
            image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
            category: "Well-Being",
            title: "How To Groom Your Puppy At Home",
            description:
                "Start grooming habits early so your puppy becomes comfortable with brushing, bathing, and nail care."
        },
        {
            image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
            category: "Well-Being",
            title: "6 Ways To Prepare Your Pooch For Fireworks And Thunderstorms",
            description:
                "Loud noises can frighten pets. Create a safe and comfortable environment to help your dog stay calm."
        },
        {
            image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80",
            category: "Training",
            title: "How To Begin Leash Training A Puppy",
            description:
                "Introduce your puppy to a leash gradually and use positive reinforcement to build confidence."
        },
        {
            image: "https://images.unsplash.com/photo-1558929996-da64ba858215?auto=format&fit=crop&w=800&q=80",
            category: "Training",
            title: "The Dos And Don'ts Of Puppy Training",
            description:
                "Learn simple training practices that help your puppy understand boundaries while building trust."
        },
        {
            image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80",
            category: "Ownership",
            title: "How To Raise A Puppy When You Work From Home",
            description:
                "A consistent routine can help balance your work responsibilities with your puppy's needs."
        },
        {
            image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=800&q=80",
            category: "Training",
            title: "How To Potty Train A Puppy Successfully",
            description:
                "Consistency, patience, and positive reinforcement are important when teaching your puppy where to go."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <section className="pt-28 pb-12 px-6">

                <div className="max-w-7xl mx-auto text-center">

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                        Pet{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500">
                            Tips
                        </span>
                    </h1>

                    <p className="mt-3 text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
                        Helpful tips and guides to keep your pets happy,
                        healthy, active, and well cared for.
                    </p>

                </div>

            </section>


            {/* Tips Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-20">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">

                    {tips.map((tip, index) => (

                        <article
                            key={index}
                            className="group flex flex-col"
                        >

                            {/* Image */}
                            <div className="w-full h-56 overflow-hidden rounded-2xl bg-slate-200 shadow-sm">

                                <img
                                    src={tip.image}
                                    alt={tip.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                            </div>


                            {/* Category */}
                            <p className="mt-4 text-sm font-medium text-violet-600">
                                {tip.category}
                            </p>


                            {/* Title */}
                            <h2 className="mt-2 text-xl font-bold leading-tight text-slate-800 group-hover:text-violet-600 transition">
                                {tip.title}
                            </h2>


                            {/* Description */}
                            <p className="mt-2 text-sm md:text-base leading-6 text-gray-500">
                                {tip.description}
                            </p>


                            {/* Read More */}
                            <button
                                className="mt-6 self-start px-5 py-2.5 rounded-full
                                           text-sm font-semibold text-white
                                           bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500
                                           shadow-md shadow-violet-200
                                           hover:-translate-y-0.5
                                           hover:shadow-lg
                                           transition-all duration-300"
                            >
                                Read More
                            </button>

                        </article>

                    ))}

                </div>

            </section>


            {/* Footer */}
            <Footer />

        </div>
    );
}

export default PetTips;