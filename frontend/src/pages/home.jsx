
import Hero from "../components/hero";
import FilterBar from "../components/filterBar";
import FeaturedPets from "../components/featuredPets";
import AdoptionJourney from "../components/AdoptionJourney";
import Footer from "../components/Footer";

function Home() {
    return (
        <div>
            <div className="px-4 py-2">

                <Hero />

                <div className="mt-4">
                    <FilterBar />
                </div>

                <div className="mt-4">
                    <FeaturedPets />
                </div>

            </div>

            <AdoptionJourney />
            <Footer />

        </div>
    );
}

export default Home;