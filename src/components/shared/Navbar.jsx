// Navbar.js
import { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignLeft, FaAlignRight, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';
import Logo from '../../assets/LogoBGR.png';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
    const { user, logOut } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 64; // Show navbar when scrolling up or when close to top
            setPrevScrollPos(currentScrollPos);
            setVisible(isVisible);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

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
        <div className={`lg:h-20 w-full flex items-center shadow-xl px-4 fixed top-0 left-0 right-0 z-auto transition-transform duration-300 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="flex justify-between w-full items-center">
                <div className='flex items-center gap-3'>
                    <Link to='/'>
                        <img className='w-32 cursor-pointer' src={Logo} alt="Logo" />
                    </Link>
                    <button className="text-xl btn" onClick={toggleSidebar}>
                        {sidebarOpen ? <FaAlignLeft className='text-blue-700' /> : <FaAlignRight />}
                    </button>
                </div>
                <div ref={dropdownRef} className="relative">
                    <summary className="m-1 relative cursor-pointer flex items-center" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-300">
                            {user.photoURL ? (
                                <img className="w-full h-full object-cover" src={user.photoURL} alt="User Avatar" />
                            ) : (
                                <img className="w-full h-full object-cover" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Default Avatar" />
                            )}
                        </div>
                    </summary>
                    {dropdownOpen && (
                        <ul className="absolute right-0 mt-4 py-2 w-72 lg:w-96 bg-base-300 rounded-lg shadow-xl z-50">
                            <li className="lg:px-4 py-2 text-center">
                                <h2 className="text-xl font-semibold font-serif text-purple-600">Welcome! {user.displayName}</h2>
                            </li>
                            <li className="lg:px-4 py-2 text-center ">
                                <p className="font-bold">Email: {user.email}</p>
                            </li>
                            <li className="lg:px-4 py-2 text-center ">
                                <button className="font-bold btn btn-outline btn-primary w-full flex items-center justify-center" onClick={handleLogout}>
                                    <FaSignOutAlt className="mr-2" />
                                    Logout
                                </button>
                            </li>
                            <li className="lg:px-4 py-2 text-center hidden">
                                <Link to='/registration'>
                                    <button className="font-bold btn btn-outline w-full flex items-center justify-center btn-accent">
                                        <FaUserPlus className="mr-2" />
                                        Register New Employees
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
