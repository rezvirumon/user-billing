import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from '../components/shared/Navbar';
import Sidebar from "../components/shared/Sidebar";


const Root = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    

    return (
        <div className="relative">
            <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
            <div className="absolute -top-6 lg:top-0 left-0 w-full">
                <div className={`absolute z-10 inset-y-0 left-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-24'} transition-transform duration-300 ease-in-out`}>
                    <Sidebar isOpen={sidebarOpen} />
                </div>
            </div>
            <div className="mt-20 container mx-auto">
                {/* Outlet */}
                <Outlet />
               
            </div>
          
        </div>
    );
};

export default Root;
