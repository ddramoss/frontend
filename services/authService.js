import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Registro de usuario
export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        const token = response.data.token;
        // Guardar el token en cookies
        setAuthToken(token);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en el registro.');
    }
};

// Inicia sesión
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        const token = response.data.token;
        // Guardar el token en cookies
        setAuthToken(token);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Cierra sesión
export const logout = async () => {
    const cookies = parseCookies();
    const token = cookies.token; // Obtén el token de las cookies

    if (!token) {
        throw new Error('No token found');
    }

    try {
        await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
            }
        });
        destroyCookie(null, 'token')// Elimina el token después de la solicitud
    } catch (error) {
        throw error; // Re-lanza el error para manejarlo en el componente
    }
};

// Establece el valor del token
export const setAuthToken = (token) => {
    setCookie(null, 'token', token, {
        maxAge: 24 * 60 * 60, // La cookie expirará en 24 horas
        path: '/',
    });
};

// Obtener el token, manejando el contexto del servidor si es necesario
export const getAuthToken = (context = {}) => {
    const cookies = parseCookies(context);
    return cookies.token;
};
