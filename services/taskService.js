import axios from 'axios';
import { getAuthToken } from './authService';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = async (page = 1, filters = {}, context = {}) => {
    const token = getAuthToken(context); // Obtener el token, ya sea del servidor o del cliente

    try {
        // Construir los parámetros de consulta, incluyendo la página y los filtros
        const params = { 
            page,
            ...filters, // Agregar los filtros al objeto de parámetros
        };

        const response = await axios.get(`${API_URL}/tasks`, {
            headers: { 'Authorization': `Bearer ${token}` },
            params, // Enviar los parámetros (página y filtros)
        });

        return response.data; // Retorna tanto las tareas como los metadatos de la paginación
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ha ocurrido un error.');
    }
};

// Crear nueva tarea
export const createTask = async (task) => {
    const token = getAuthToken(); // No se pasa contexto aquí porque se asume que esto se llama en el cliente
    try {
        const response = await axios.post(`${API_URL}/tasks`, task, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ha ocurrido un error.');
    }
};

// Actualizar tarea
export const updateTask = async (taskId, updatedTask) => {
    const token = getAuthToken(); // No se pasa contexto aquí porque se asume que esto se llama en el cliente
    try {
        const response = await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ha ocurrido un error.');
    }
};

// Eliminar tarea
export const deleteTask = async (taskId) => {
    const token = getAuthToken(); // No se pasa contexto aquí porque se asume que esto se llama en el cliente
    try {
        const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ha ocurrido un error.');
    }
};
