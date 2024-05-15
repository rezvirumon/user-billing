import { NavLink } from "react-router-dom";
import { FaDesktop, FaUserPlus } from 'react-icons/fa';




const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <>
            <div className={`bg-base-200 min-h-screen lg:min-h-[830px] w-44 ${isOpen ? 'block' : 'hidden'}`}>
                <ul className="py-4 space-y-4 w-3/4">
                    <li className="ml-3">
                        <NavLink to="/" style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "black",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>
                            <span className="flex items-center justify-between">
                                Dashboard
                                <FaDesktop />
                            </span>
                        </NavLink>
                    </li>
                    <li className="ml-3">
                        <NavLink to="/addcustomer" style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "black",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>
                            <span className="flex items-center justify-between">
                                Add User
                                <FaUserPlus />
                            </span>
                        </NavLink>
                    </li>
                </ul>

               
            </div>

        </>
    );
};

export default Sidebar;
