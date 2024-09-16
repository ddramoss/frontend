import jwt from 'jsonwebtoken';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const authenticate = async (ctx) => {
    const cookies = parseCookies(ctx);
    const token = cookies.token;

    if (!token) {
        return null; // No hay token, no autenticado
    }

    try {
        // Verificar el token JWT
        jwt.verify(token, process.env.JWT_SECRET);

        // Obtener el usuario usando el endpoint /me
        const response = await axios.get(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Retorna la data del usuario
    } catch (error) {
        return null; // Token no válido o error al obtener usuario
    }
};
