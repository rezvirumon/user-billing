import React, { useState, useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider'; // Adjusted import path

const Registration = () => {
    const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState('');

    const handleRegistrationWithEmail = async (e) => {
        e.preventDefault();
        try {
            // Create user with email and password
            await createUser(email, password);

            // Update user profile with name and photo URL
            await updateUserProfile(name, photoURL);

            // Additional logic after successful registration
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegistrationWithGoogle = async () => {
        try {
            // Sign in with Google
            await signInWithGoogle();

            // Additional logic after successful registration
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleRegistrationWithEmail}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoURL">
                        Photo URL
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="photoURL"
                        type="text"
                        placeholder="Photo URL"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register with Email
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleRegistrationWithGoogle}
                    >
                        Register with Google
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Registration;
