import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ meta, currentPage, handlePageChange }) {
    return (
        <div className="mt-4 flex justify-between items-center">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={meta.current_page === 1}
                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded flex items-center disabled:bg-gray-300"
            >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Anterior
            </button>
            <span>
                Página {meta.current_page} de {meta.last_page}
            </span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={meta.current_page === meta.last_page}
                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded flex items-center disabled:bg-gray-300"
            >
                <ArrowRightIcon className="h-5 w-5 mr-2" />
                Siguiente
            </button>
        </div>
    );
}
