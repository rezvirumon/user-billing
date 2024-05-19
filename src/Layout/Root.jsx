import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useEffect
import Navbar from '../components/shared/Navbar';
import Sidebar from "../components/shared/Sidebar";

const Root = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Add useEffect to handle clicks outside of the sidebar
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarOpen && !event.target.closest('.w-44')) {
                setSidebarOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarOpen]);

    return (
        <>
            <div className="relative">
                <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                <div className="fixed z-50 lg:top-24 top-16">
                    <div className={`absolute z-10 inset-y-0 left-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-24'} transition-transform duration-300 ease-in-out`}>
                        <Sidebar isOpen={sidebarOpen} />
                    </div>
                </div>
            </div>
            <div className="mt-20 container mx-auto">
                <Outlet />
            </div>
        </>
    );
};

export default Root;
