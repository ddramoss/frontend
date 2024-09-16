import React, { useState } from 'react';
import { register } from '../services/authService';
import { UserIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setSuccess('');
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            await register(name, email, password);
            setSuccess('Registro exitoso.');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            router.push('/tasks');

        } catch (err) {
            setError(err.message || 'Error en el registro.');
        }
    };

    const handleLoginClick = () => {
        router.push('/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Registro</h1>
                <form onSubmit={handleSubmit}>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                        Nombre
                    </label>
                    <div className="mb-4 flex items-center border border-gray-300 rounded-lg">
                        <UserIcon className="w-6 h-6 text-gray-500 mx-3" />
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Nombre"
                            className="w-full px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                        Correo electrónico
                    </label>
                    <div className="mb-4 flex items-center border border-gray-300 rounded-lg">
                        <EnvelopeIcon className="w-6 h-6 text-gray-500 mx-3" />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Correo electrónico"
                            className="w-full px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <div className="mb-4 flex items-center border border-gray-300 rounded-lg relative">
                        <LockClosedIcon className="w-6 h-6 text-gray-500 mx-3" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Contraseña"
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
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
                        Confirmar contraseña
                    </label>
                    <div className="mb-6 flex items-center border border-gray-300 rounded-lg relative">
                        <LockClosedIcon className="w-6 h-6 text-gray-500 mx-3" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirmar contraseña"
                            className="w-full px-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-3"
                        >
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="w-6 h-6 text-gray-500" />
                            ) : (
                                <EyeIcon className="w-6 h-6 text-gray-500" />
                            )}
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 mt-4 mb-4">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-500 mt-4 mb-4">{success}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Registrar
                    </button>
                    <button
                        type="button"
                        onClick={handleLoginClick}
                        className="w-full mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Ya tengo una cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
