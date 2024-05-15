import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import { useState } from "react";
import Navbar from '../components/shared/Navbar';

const Root = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
            <div className="relative flex">
                <div className={`absolute z-10 inset-y-0 left-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-24'} transition-transform duration-300 ease-in-out`}>
                    <Sidebar isOpen={sidebarOpen} />
                </div>
            </div>
            <div>
                {/* Outlet */}
                <Outlet />
            </div>
            {/* Footer */}
        </div>
    );
};

export default Root;
