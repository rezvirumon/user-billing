import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2'; // Import Swal

import Logo from '../../assets/LogoBGR.png';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            const intendedPath = localStorage.getItem('intendedPath');
            navigate(intendedPath || '/');
            Swal.fire({ // Replace toast.success() with Swal.fire()
                icon: 'success',
                title: 'Success',
                text: 'You are logged in successfully'
            });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen fixed w-full p-4">
            <div className="bg-base-200 rounded-xl shadow-md px-8 pt-6 pb-8 mb-4 lg:w-96 mx-auto mt-28">
                <div className='w-full bg-base-200 px-2 rounded-xl'>
                    <img className='w-44 my-5 mx-auto ' src={Logo} alt="" />
                </div>
                <form className="mb-4" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Username
                        </label>
                        <input
                            className="border hover:shadow transition-all ease-in-out appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border hover:shadow transition-all ease-in-out appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold btn w-full rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
