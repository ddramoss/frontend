import { MagnifyingGlassIcon, NoSymbolIcon } from '@heroicons/react/24/outline';

const FilterForm = ({ filters, onFilterChange, onFilterSubmit, clearFilters }) => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Filtrar tareas</h2>

            <form onSubmit={onFilterSubmit} className="mb-4 grid grid-cols-3 gap-4 border rounded p-4 shadow-md">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm text-gray-600 mb-1">Nombre</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={filters.title}
                        onChange={onFilterChange}
                        placeholder="Nombre"
                        className="border rounded p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm text-gray-600 mb-1">Descripción</label>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        value={filters.description}
                        onChange={onFilterChange}
                        placeholder="Descripción"
                        className="border rounded p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="due_date" className="text-sm text-gray-600 mb-1">Fecha</label>
                    <input
                        id="due_date"
                        type="date"
                        name="due_date"
                        value={filters.due_date}
                        onChange={onFilterChange}
                        className="border rounded p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="priority" className="text-sm text-gray-600 mb-1">Prioridad</label>
                    <select
                        id="priority"
                        name="priority"
                        value={filters.priority}
                        onChange={onFilterChange}
                        className="border rounded p-2"
                    >
                        <option value="">Seleccione...</option>
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="status" className="text-sm text-gray-600 mb-1">Estado</label>
                    <select
                        id="status"
                        name="status"
                        value={filters.status}
                        onChange={onFilterChange}
                        className="border rounded p-2"
                    >
                        <option value="">Seleccione...</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Completada">Completada</option>
                    </select>
                </div>
                <div className="flex items-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center mr-4"
                    >
                        <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                        <span className="hidden lg:inline-block ml-2">Buscar</span>
                    </button>
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg flex items-center justify-center"
                    >
                        <NoSymbolIcon className="h-5 w-5 mr-2" />
                        <span className="hidden lg:inline-block ml-2">Borrar filtros</span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default FilterForm;
