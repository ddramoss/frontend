import React from 'react';
import { useRouter } from 'next/router';
import { logout } from '../services/authService';
import { ArrowLeftOnRectangleIcon  } from '@heroicons/react/24/outline';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    return (
        <button 
            onClick={handleLogout} 
            className="flex bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
            <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
    );
};

export default LogoutButton;
