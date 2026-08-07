import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/hero";
import FilterBar from "../components/filterBar";
import FeaturedPets from "../components/featuredPets";

function Home() {

    const [sidebarOpen, setSidebarOpen] = useState(true);   // true = visible for now

    return (

        <div className="flex min-h-screen bg-slate-100">

            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-2">
                    <Hero />
                    <div className="mt-8">
                        <FilterBar />
                    </div>
                    <div className="mt-8">
                        <FeaturedPets />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;