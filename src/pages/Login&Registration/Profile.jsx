import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logOut();
            // Redirect or handle any additional logic after logout
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold">Profile</h2>
            <div className="flex flex-col items-center gap-2">
                <img className="w-20 h-20 rounded-full" src={user ? user.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt="Profile" />
                <h3 className="text-lg font-medium">{user ? user.displayName : 'User'}</h3>
                <p className="text-gray-500">{user ? user.email : 'user@example.com'}</p>
            </div>
            <button className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
            </button>
        </div>
    );
};

export default Profile;
