import { PlusIcon } from '@heroicons/react/24/outline';

export default function TaskHeader({ meta, setIsModalOpen }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
                Tareas
                <span className="inline-block bg-indigo-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700 mr-2 mb-2 ml-2">
                    {meta.total}
                </span>
            </h2>
            <button
                onClick={() => setIsModalOpen(true)} // Abrir el modal para crear tarea
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center text-sm"
            >
                <PlusIcon className="h-5 w-5 mr-2" />
                Crear tarea
            </button>
        </div>
    );
}
