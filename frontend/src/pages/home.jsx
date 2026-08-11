import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/hero";
import FilterBar from "../components/filterBar";
import FeaturedPets from "../components/featuredPets";
import Footer from "../components//Footer";

function Home() {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Navbar stays at the top */}
            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main content */}
            <main
                className={`pt-[90px] transition-all duration-300 
                ${sidebarOpen ? "ml-[295px]" : "ml-0"}
                `}
            >

                <div className="px-4 py-0">

                    <Hero />

                    <div className="mt-4">
                        <FilterBar />
                    </div>

                    <div className="mt-4">
                        <FeaturedPets />
                    </div>
                </div>
            </main>
            {/* Footer */}
            <Footer sidebarOpen={sidebarOpen} />
        </div>
    );
}

export default Home;