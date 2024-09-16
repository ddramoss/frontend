import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTasks } from '../src/context/TaskContext';

import { createTask, updateTask, deleteTask, getTasks } from '../services/taskService';
import { getAuthToken } from '../services/authService';
import { authenticate } from '../middleware/authMiddleware';

import FilterForm from '../components/FilterForm';
import Loader from '../components/Loader';
import TaskList from '../components/TaskList';
import Pagination from '../components/Pagination';
import TaskModal from '../components/TaskModal';
import Header from '../components/Header';
import TaskHeader from '../components/TaskHeader';

export default function Tasks({ user, initialTasks, initialMeta }) {
    const router = useRouter();
    const { tasks, dispatch } = useTasks();
    const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '', status: '', priority:'' });
    const [editTask, setEditTask] = useState(null);
    const [meta, setMeta] = useState(initialMeta);
    const [currentPage, setCurrentPage] = useState(meta.current_page || 1);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [filters, setFilters] = useState({
        title: '',
        description: '',
        due_date: '',
        priority: '',
        status: ''
    });


    useEffect(() => {
        dispatch({ type: 'SET_TASKS', payload: initialTasks });
    }, [dispatch, initialTasks]);

    // Verifica si hay un token de lo contrario redirecciona al login
    const verifyToken = () => {
        const token = getAuthToken();
        if (!token) {
            // Redirigir si no hay token
            router.push('/login');
        }
    };

    // Gestión de tareas: Creación y edición
    const handleCreateOrUpdateTask = async (e) => {
        setLoading(true);
        setError('');

        e.preventDefault();
        try {
            verifyToken();

            if (editTask) {
                const updatedTask = await updateTask(editTask.id, newTask);
                dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
                setEditTask(null);
            } else {
                const createdTask = await createTask(newTask);
                dispatch({ type: 'ADD_TASK', payload: createdTask });
                // Si se crea una tarea se incrementa el total 
                setMeta(prevMeta => ({
                    ...prevMeta, // Copiar los demás campos del estado actual
                    total: meta.total + 1
                }));
            }
            setNewTask({ title: '', description: '', due_date: '', status: '', priority:'' });
            setIsModalOpen(false); // Cerrar el modal después de crear o actualizar la tarea
        } catch (error) {
            setError(error.message || 'Ha ocurrido un error.');
        } finally {
            setLoading(false); // Finalizar carga
        }
    };

    // Eliminación de tareas
    const handleDeleteTask = async (taskId) => {
        setLoading(true);
        try {
            verifyToken();

            await deleteTask(taskId);
            dispatch({ type: 'REMOVE_TASK', payload: taskId });

            // Si se elimina una tarea se disminuye el total 
            setMeta(prevMeta => ({
                ...prevMeta,  // Copiar los demás campos del estado actual
                total: meta.total - 1
            }));

        } catch (error) {
            setError(error.message || 'Ha ocurrido un error.');
        } finally {
            setLoading(false); // Finalizar carga
        }
    };

    // Establece los datos que se van a modificar
    const handleEditTask = (task) => {
        setEditTask(task);
        setNewTask({ title: task.title, description: task.description, due_date: task.due_date, status: task.status, priority:task.priority });
        setIsModalOpen(true); // Abrir el modal para editar la tarea
    };

    // Restablece los datos
    const handleCancelEdit = () => {
        setEditTask(null);
        setNewTask({ title: '', description: '', due_date: '', status: '', priority:'' });
        setIsModalOpen(false); // Cerrar el modal al cancelar
    };

    // Maneja el cambio de los datos de la tarea
    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

     // Manejar el cambio de filtro
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Manejar el envío de filtros al backend
    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            verifyToken();

            const paginatedTasks = await getTasks(1, filters); // Enviar los filtros
            dispatch({ type: 'SET_TASKS', payload: paginatedTasks.data });
            setMeta(paginatedTasks.meta); // Actualizar los metadatos de paginación
            setCurrentPage(1); // Reiniciar la página a la primera
        } catch (error) {
            setError(error.message || 'Ha ocurrido un error.');
        } finally {
            setLoading(false); // Finalizar carga
        }
    };

    // Limpia los filtros realizados y carga nuevamente las tareas
    const handleClearFilters = async () => {
        setLoading(true);
        setError('');
        try {
            verifyToken();
    
            const paginatedTasks = await getTasks(1, {});
            dispatch({ type: 'SET_TASKS', payload: paginatedTasks.data });
            setMeta(paginatedTasks.meta);
            setCurrentPage(1);

            setFilters({
                title: '',
                description: '',
                due_date: '',
                priority: '',
                status: ''
            });

        } catch (error) {
            setError(error.message || 'Ha ocurrido un error.');
        } finally {
            setLoading(false); // Finalizar carga
        }
    };
    
    // Maneja la paginación
    const handlePageChange = async (page) => {
        setLoading(true);
        try {
            verifyToken();

            const paginatedTasks = await getTasks(page, filters);
            dispatch({ type: 'SET_TASKS', payload: paginatedTasks.data });
            setMeta(paginatedTasks.meta);
            setCurrentPage(page);
        } catch (error) {
            setError(error.message || 'Ha ocurrido un error.');
        } finally {
            setLoading(false); // Finalizar carga
        }
    };

    return (
        <div className="container mx-auto p-4">
            
            {/* Modal de carga cuando se hacen peticiones */}
            <Loader loading={loading} />

            {/* Encabezado de la pagina */}
            <Header user={user} />

            {/* Formulario de filtro */}
            <FilterForm
                filters={filters}
                onFilterChange={handleFilterChange}
                onFilterSubmit={handleFilterSubmit}
                clearFilters={handleClearFilters}
            />

            {/* Modal de tarea (creación, edición) */}
            <TaskModal
                isOpen={isModalOpen}
                task={newTask}
                onSave={handleCreateOrUpdateTask}
                onCancel={handleCancelEdit}
                onChange={handleChange}
                loading={loading}
                error={error}
            />

            {/* Encabezado de las tareas */}
            <TaskHeader
                meta={meta}
                setIsModalOpen={setIsModalOpen} 
            />

            {/* Listado de tareas */}
            <TaskList 
                tasks={tasks} 
                handleEditTask={handleEditTask} 
                handleDeleteTask={handleDeleteTask} 
            />

            {/* Paginación */}
            <Pagination 
                meta={meta} 
                currentPage={currentPage} 
                handlePageChange={handlePageChange} 
            />
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const user = await authenticate(context);
        if (!user) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        const paginatedTasks = await getTasks(1, {}, context);
        
        return {
            props: {
                initialTasks: paginatedTasks.data,
                initialMeta: paginatedTasks.meta,
                user,
            },
        };
    } catch (error) {
        return {
            props: {
                initialTasks: [],
                initialMeta: {
                    current_page: 1,
                    last_page: 1,
                },
                user: {
                    name: null,
                    email: null,
                }
            },
        };
    }
}
