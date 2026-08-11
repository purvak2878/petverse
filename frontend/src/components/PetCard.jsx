import {
    FaHeart,
    FaClock,
    FaVenusMars,
    FaPaw,
} from "react-icons/fa";

function PetCard({ pet }) {

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 group">

            {/* Pet Image */}

            <div className="relative h-[210px] overflow-hidden">

                <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Favorite */}

                <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-500 hover:text-pink-500 transition">

                    <FaHeart />

                </button>

                {/* Adoption status */}

                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">

                    Available

                </span>

            </div>


            {/* Information */}

            <div className="p-4">

                <div className="flex items-center justify-between">

                    <div>

                        <h3 className="text-lg font-bold text-gray-800">
                            {pet.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {pet.breed}
                        </p>

                    </div>

                    <FaPaw className="text-violet-500" />

                </div>


                {/* Basic details */}

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">

                    <span className="flex items-center gap-1">
                        <FaClock className="text-violet-500" />
                        {pet.age}
                    </span>

                    <span className="flex items-center gap-1">
                        <FaVenusMars className="text-pink-500" />
                        {pet.gender}
                    </span>

                </div>


                {/* Traits */}

                <div className="flex flex-wrap gap-2 mt-3">

                    {pet.traits.map((trait, index) => (

                        <span
                            key={index}
                            className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 text-xs font-medium"
                        >
                            {trait}
                        </span>

                    ))}

                </div>


                {/* Buttons */}

                <div className="flex gap-2 mt-4">

                    <button className="flex-1 h-10 rounded-xl border border-violet-500 text-violet-600 text-sm font-semibold hover:bg-violet-50 transition">

                        View Details

                    </button>

                    <button className="flex-1 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-semibold hover:from-violet-700 hover:to-pink-600 transition">

                        Adopt Me 🐾

                    </button>

                </div>

            </div>

        </div>
    );
}

export default PetCard;