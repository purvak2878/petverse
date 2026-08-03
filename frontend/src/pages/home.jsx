import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import FilterBar from "../components/FilterBar";
import FeaturedPets from "../components/FeaturedPets";

function home(){
    return(
    <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="px-8 py-6 space-y-8">
            <Hero />

            <FilterBar />

            <FeaturedPets />
        </main>
    </div>
    );
}
export default home;