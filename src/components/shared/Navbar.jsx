import  { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignLeft, FaAlignRight, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';
import Logo from '../../assets/LogoBGR.png';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
    const { user, logOut } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('summary')) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = async () => {
        try {
            await logOut();
            // Redirect or handle any additional logic after logout
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    if (!user) {
        return null; // Render nothing if the user is not logged in
    }

    return (
        <div className="lg:h-20 w-full flex items-center shadow-xl px-4">
            <div className="flex justify-between w-full items-center">
                <div className='flex items-center gap-3'>
                    <Link to='/'>
                        <img className='w-32 cursor-pointer' src={Logo} alt="Logo" />
                    </Link>
                    <button className="text-xl" onClick={toggleSidebar}>
                        {sidebarOpen ? <FaAlignLeft className='text-blue-700' /> : <FaAlignRight />}
                    </button>
                </div>
                <div ref={dropdownRef}>
                    <details className="dropdown">
                        <summary className="m-1 btn w-10 lg:w-12 lg:h-12 rounded-full" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <div className="rounded-full ring p-1 object-cover">
                                <div className="w-14">
                                    {user.photoURL ? (
                                        <img className='rounded-full object-cover' src={user.photoURL} alt="User Avatar" />
                                    ) : (
                                        <img className='rounded-full object-cover' src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Default Avatar" />
                                    )}
                                </div>
                            </div>
                        </summary>
                        {dropdownOpen && (
                            <ul className="shadow-xl space-y-3 menu dropdown-content z-[1] glass bg-base-100 right-0 w-64 lg:w-96">
                                <h2 className='text-center text-xl my-4 font-semibold'>Welcome! {user.displayName}</h2>
                                <p className='font-bold btn'>Email: {user.email}</p>
                                <button className="font-bold btn btn-accent" onClick={handleLogout}>
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                                <Link to='/registration'>
                                    <button className="font-bold btn btn-outline w-full btn-accent">
                                        <FaUserPlus />
                                        Register New Employees
                                    </button>
                                </Link>
                            </ul>
                        )}
                    </details>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
