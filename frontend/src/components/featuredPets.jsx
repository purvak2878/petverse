import PetCard from "../components/PetCard";
import { Link } from "react-router-dom";

const pets = [
    {
        id: 1,
        name: "Bruno",
        breed: "Golden Retriever",
        age: "2 Years",
        gender: "Male",
        traits: ["Friendly", "Playful", "Vaccinated"],
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d"
    },

    {
        id: 2,
        name: "Luna",
        breed: "Persian Cat",
        age: "1 Year",
        gender: "Female",
        traits: ["Calm", "Loving", "Indoor"],
        image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5"
    },

    {
        id: 3,
        name: "Max",
        breed: "Beagle",
        age: "3 Years",
        gender: "Male",
        traits: ["Active", "Curious", "Vaccinated"],
        image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530"
    },

    {
        id: 4,
        name: "Bella",
        breed: "Samoyed",
        age: "4 Months",
        gender: "Female",
        traits: ["Fluffy", "Friendly", "Playful"],
        image: "https://images.unsplash.com/photo-1558788353-f76d92427f16"
    }
];


function FeaturedPets() {

    return (

        <section className="w-full">

            {/* Heading */}

            <div className="flex items-center justify-between mb-5">

                <div>

                    <div className="flex items-center gap-2">

                        <span className="text-2xl">
                            🐾
                        </span>

                        <h2 className="text-2xl font-bold text-gray-800">
                            Featured Pets
                        </h2>

                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                        Meet some lovely pets waiting for their forever home.
                    </p>

                </div>

                <Link
                    to="/browse-pets"
                    className="text-violet-600 font-semibold text-sm hover:text-pink-500 transition"
                >
                    View All Pets →
                </Link>

            </div>


            {/* Cards */}

            <div className="grid grid-cols-4 gap-5">

                {pets.map((pet) => (

                    <PetCard
                        key={pet.id}
                        pet={pet}
                    />

                ))}

            </div>

        </section>

    );
}

export default FeaturedPets;