import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Layout() {
    // Sidebar is intentionally closed when the website first opens.
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100 overflow-x-hidden">
            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <main
                className={`
                    pt-[65px]
                    min-h-screen
                    w-full
                    transition-all
                    duration-300
                    ${sidebarOpen ? "md:ml-[285px] md:w-[calc(100%-285px)]" : "ml-0 w-full"}
                `}
            >
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;