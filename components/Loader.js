import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded flex flex-col items-center">
                <ThreeDots
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="loading"
                />
                <p className="mt-2 text-gray-700">Cargando...</p>
            </div>
        </div>
    );
};

export default Loader;
