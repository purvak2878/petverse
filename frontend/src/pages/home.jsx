
import Hero from "../components/hero";
import FilterBar from "../components/filterBar";
import FeaturedPets from "../components/featuredPets";
import Footer from "../components//Footer";

function Home() {

    return (

        <div>

            <div className="px-4 py-2">

                <Hero />
                <div className="mt-4">
                    <FeaturedPets />
                </div>

            </div>

            <Footer />

        </div>
    );
}


export default Home;