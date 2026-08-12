import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Layout() {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Common Navbar */}

            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Common Sidebar */}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Current Page */}

            <main
                className={`
                    pt-[65px]
                    transition-all
                    duration-300
                    ${sidebarOpen ? "ml-[285px]" : "ml-0"}
                `}
            >
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;