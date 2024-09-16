'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '../services/authService';


export default function AuthGuard({ children }) {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = getAuthToken();
        if (!token) {
            // Redirigir si no hay token
            router.push('/login');
        }
        }
    }, [router]);

    return <>{children}</>;
}
