import {
    FaMapMarkerAlt,
    FaPaw,
    FaDog,
    FaCalendarAlt,
    FaVenusMars,
    FaSearch,
} from "react-icons/fa";

function FilterBar() {

    return (
        <section className="w-full">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">

                <div className="grid grid-cols-6 gap-3 items-end">

                    {/* City */}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            City
                        </label>

                        <div className="relative">

                            <FaMapMarkerAlt
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-500"
                            />

                            <select
                                className="w-full h-12 pl-9 pr-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
                            >
                                <option>Select City</option>
                                <option>Mumbai</option>
                                <option>Pune</option>
                                <option>Nanded</option>
                                <option>Nagpur</option>
                                <option>Chhatrapati Sambhajinagar</option>
                            </select>

                        </div>
                    </div>


                    {/* Pet Type */}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Pet Type
                        </label>

                        <div className="relative">

                            <FaPaw
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-500"
                            />

                            <select
                                className="w-full h-12 pl-9 pr-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
                            >
                                <option>All Types</option>
                                <option>Dogs</option>
                                <option>Cats</option>
                                <option>Birds</option>
                                <option>Other</option>
                            </select>

                        </div>
                    </div>


                    {/* Breed */}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Breed
                        </label>

                        <div className="relative">

                            <FaDog
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-500"
                            />

                            <select
                                className="w-full h-12 pl-9 pr-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
                            >
                                <option>All Breeds</option>
                                <option>Golden Retriever</option>
                                <option>Labrador</option>
                                <option>Beagle</option>
                                <option>Persian Cat</option>
                                <option>Siamese</option>
                            </select>

                        </div>
                    </div>


                    {/* Age */}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Age
                        </label>

                        <div className="relative">

                            <FaCalendarAlt
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-500"
                            />

                            <select
                                className="w-full h-12 pl-9 pr-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
                            >
                                <option>All Ages</option>
                                <option>0 - 6 Months</option>
                                <option>6 Months - 1 Year</option>
                                <option>1 - 3 Years</option>
                                <option>3+ Years</option>
                            </select>

                        </div>
                    </div>


                    {/* Gender */}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Gender
                        </label>

                        <div className="relative">

                            <FaVenusMars
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-500"
                            />

                            <select
                                className="w-full h-12 pl-9 pr-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
                            >
                                <option>All Genders</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>

                        </div>
                    </div>


                    {/* Search Button */}

                    <button
                        className="h-12 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-violet-700 hover:to-pink-600 transition shadow-md hover:shadow-lg"
                    >

                        <FaSearch />

                        <span>Search</span>

                    </button>

                </div>

            </div>

        </section>
    );
}

export default FilterBar;