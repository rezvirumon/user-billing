import { NavLink } from "react-router-dom";
import { FaDesktop, FaLocationArrow, FaMoneyBillAlt, FaUserPlus, FaUsers } from 'react-icons/fa';
import { useContext, useEffect } from 'react'; // Import useEffect
import { AuthContext } from '../../provider/AuthProvider'; // Import AuthContext

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user } = useContext(AuthContext); // Get user from AuthContext

    // Check if user is logged in, if not, do not render Sidebar
    if (!user) {
        return null;
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (isOpen && event.target.closest('.w-44') === null) {
                toggleSidebar(); // Close sidebar if clicked outside
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleSidebar]);

    return (
        <>
            <div className={` bg-base-200 min-h-screen lg:min-h-[830px] w-44 ${isOpen ? 'block' : 'hidden'}`}>
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
                    <li className="ml-3">
                        <NavLink to="/listcustomers" style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "black",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>
                            <span className="flex items-center justify-between">
                                List User
                                <FaUsers />
                            </span>
                        </NavLink>
                    </li>
                    <li className="ml-3">
                        <NavLink to="/billing" style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "black",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>
                            <span className="flex items-center justify-between">
                                Billing List
                                <FaMoneyBillAlt />
                            </span>
                        </NavLink>
                    </li>
                    <li className="ml-3">
                        <NavLink to="/area" style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "black",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>
                            <span className="flex items-center justify-between">
                                Area
                                <FaLocationArrow />
                            </span>
                        </NavLink>
                    </li>
                </ul>
                {/* <img className="w-16 h-16 rounded-full object-cover" src={user.photoURL} alt="User Avatar" /> */}
            </div>
        </>
    );
};

export default Sidebar;
