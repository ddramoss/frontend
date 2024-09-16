import { BookmarkSquareIcon } from '@heroicons/react/24/outline';

export default function TaskModal({ isOpen, task, onSave, onCancel, onChange, loading, error }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/2">
                <h2 className="flex justify-between text-xl font-bold mb-4">
                    {task?.id ? 'Editar tarea' : 'Crear tarea'}

                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-50 hover:bg-gray-100 text-gray-400 text-sm p-2 flex items-center"
                    >
                        X
                    </button>
                </h2>
                <form onSubmit={onSave}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="title" className="mb-1 font-semibold">
                            Título <span className='text-red-500'>*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={task.title}
                            onChange={onChange}
                            name="title"
                            placeholder="Título"
                            className="border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <label htmlFor="description" className="mb-1 font-semibold">
                            Descripción <span className='text-red-500'>*</span>
                        </label>
                        <input
                            id="description"
                            type="text"
                            value={task.description}
                            onChange={onChange}
                            name="description"
                            placeholder="Descripción"
                            className="border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <label htmlFor="due_date" className="mb-1 font-semibold">
                            Fecha de vencimiento  <span className='text-red-500'>*</span>
                        </label>
                        <input
                            id="due_date"
                            type="date"
                            value={task.due_date}
                            onChange={onChange}
                            name="due_date"
                            className="border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <label htmlFor="priority" className="mb-1 font-semibold">
                            Prioridad  <span className='text-gray-500 text-sm'>(Opcional)</span>
                        </label>
                        <select
                            id="priority"
                            value={task.priority}
                            onChange={onChange}
                            name="priority"
                            className="border rounded p-2 mb-2"
                        >
                            <option value="">Seleccione...</option>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>

                        <label htmlFor="status" className="mb-1 font-semibold">
                            Estado <span className='text-red-500'>*</span>
                        </label>
                        <select
                            id="status"
                            value={task.status}
                            onChange={onChange}
                            name="status"
                            className="border rounded p-2 mb-4"
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="En progreso">En progreso</option>
                            <option value="Completada">Completada</option>
                        </select>
                    </div>

                    {error && (
                        <p className="text-red-500 mt-4 mb-4">{error}</p>
                    )}
                    
                    <div className="flex justify-end items-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center mr-2"
                        >
                            <BookmarkSquareIcon className="h-5 w-5 mr-2" />
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg flex items-center"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
