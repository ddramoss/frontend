import { useState } from 'react';
import { login } from '../services/authService';
import { useRouter } from 'next/router';
import { authenticate } from '../middleware/authMiddleware';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Por favor, ingrese el correo electrónico.');
            return;
        }
        
        if (!password) {
            setError('Por favor, ingrese la contraseña.');
            return;
        }

        try {
            await login(email, password);
            router.push('/tasks');
        } catch (err) {
            setError(err.error || 'Error al iniciar sesión.');
        }
    };

    const handleRegisterClick = () => {
        router.push('/register');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                        Correo electrónico
                    </label>
                    <div className="mb-4 flex items-center border border-gray-300 rounded-lg">
                        <EnvelopeIcon className="w-6 h-6 text-gray-500 mx-3" />
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Correo electrónico" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <div className="mb-4 flex items-center border border-gray-300 rounded-lg relative">
                        <LockClosedIcon className="w-6 h-6 text-gray-500 mx-3" />
                        <input 
                            type={showPassword ? "text" : "password"} // Cambia el tipo de input
                            id="password"
                            placeholder="Contraseña" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-6 h-6 text-gray-500" />
                            ) : (
                                <EyeIcon className="w-6 h-6 text-gray-500" />
                            )}
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 mb-4">{error}</p>
                    )}
                    
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Iniciar sesión
                    </button>
                    <button 
                        type="button" 
                        onClick={handleRegisterClick}
                        className="w-full mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
}

// Redirigir si el usuario ya está autenticado
export async function getServerSideProps(ctx) {
    const user = await authenticate(ctx);

    if (user) {
        return {
            redirect: {
                destination: '/tasks',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
