import { TaskProvider } from '../context/TaskContext';
import AuthGuard from '../../components/AuthGuard';
import '../../styles/globals.css';


export default function Layout({ children }) {
    return (
        <html lang="es">
            <body>
                <TaskProvider>
                    <main>
                        <AuthGuard>
                            {children}
                        </AuthGuard>
                    </main>
                </TaskProvider>
            </body>
        </html>
    );
}
