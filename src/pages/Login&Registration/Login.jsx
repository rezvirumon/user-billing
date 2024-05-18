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
        <div className="px-3">
            <div className="bg-base-100 border rounded-xl shadow-xl p-5  lg:w-96 mx-auto mt-28">
                <div className='w-full px-2 rounded-xl mb-6'>
                    <img className='w-44 my-5 mx-auto ' src={Logo} alt="" />
                    <div className='border-b-2 border-blue-400'></div>
                </div>
                <form className="mb-10" onSubmit={handleLogin}>
                    <div className="mb-4">
                        
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
                            className="btn  btn-primary w-full"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div className='text-center mt-20 cursor-pointer font-semibold animate-bounce'>
                <p className='text-primary'>Powered by RumonNetwork</p>
            </div>
        </div>
    );
};

export default Login;
