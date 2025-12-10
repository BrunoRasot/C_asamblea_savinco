import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div>Cargando...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <div className="p-10">
                                <h1 className="text-3xl font-bold">¡Bienvenido al Dashboard de SAVINCO!</h1>
                            </div>
                        </PrivateRoute>
                    } />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;