import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const TaskList = ({ tasks, handleEditTask, handleDeleteTask }) => {
    return (
        <ul className="space-y-4">
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <li
                        key={task.id}
                        className="border rounded-lg p-6 shadow-lg flex justify-between items-start bg-white hover:bg-gray-50 transition-all"
                    >
                        <div className="flex flex-col flex-grow">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h2>
                            <p className="text-gray-700 mb-4">{task.description}</p>
                            <p className="text-sm text-gray-500 mb-2">
                                Fecha de vencimiento: {task.due_date}
                            </p>
                            <div className="flex space-x-4">
                                <p className="text-sm text-gray-500">
                                    Prioridad:
                                    <span
                                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ml-2
                                            ${task.priority === 'Baja' ? 'bg-green-200 text-green-700' : 
                                            task.priority === 'Media' ? 'bg-yellow-200 text-yellow-700' : 
                                            task.priority === 'Alta' ? 'bg-red-200 text-red-700' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        {task.priority || 'Sin asignar'}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Estado:
                                    <span
                                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ml-2
                                            ${task.status === 'Pendiente' ? 'bg-yellow-200 text-yellow-700' : 
                                            task.status === 'En progreso' ? 'bg-blue-200 text-blue-700' : 
                                            task.status === 'Completada' ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        {task.status || 'Sin estado'}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 ml-6">
                            <button
                                onClick={() => handleEditTask(task)}
                                className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg flex items-center text-sm shadow"
                            >
                                <PencilIcon className="h-5 w-5 mr-2" />
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg flex items-center text-sm shadow"
                            >
                                <TrashIcon className="h-5 w-5 mr-2" />
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))
            ) : (
                <p className="text-gray-600">No hay tareas disponibles.</p>
            )}
        </ul>
    );
};

export default TaskList;
