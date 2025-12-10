import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Globe, Building2, User, Lock, LogIn } from 'lucide-react';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pais, setPais] = useState('Ecuador');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(async () => {
            const result = await login(email, password, pais);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message);
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        SAVINCO<span className="text-yellow-600">.</span>
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 font-medium">
                        Ingresa tus credenciales para continuar
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-600 transition-colors" />
                        </div>
                        <select className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition-all appearance-none cursor-pointer text-gray-600">
                            <option>Español</option>
                            <option>Ingles</option>
                            <option>Español - España</option>
                            <option>Nepalí</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building2 className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-600 transition-colors" />
                        </div>
                        <select
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition-all appearance-none cursor-pointer text-gray-600"
                            value={pais}
                            onChange={(e) => setPais(e.target.value)}
                        >
                            <option value="Ecuador">Ecuador</option>
                            <option value="Perú">Perú</option>
                            <option value="España">España</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Nepal">Nepal</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-600 transition-colors" />
                        </div>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-600 transition-colors" />
                        </div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="flex items-center bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-r shadow-sm text-sm" role="alert">
                            <p className="font-bold mr-1">Error:</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
                                Recordarme
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500 hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${loading ? 'bg-yellow-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Iniciando...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <LogIn className="w-5 h-5" />
                                Iniciar Sesión
                            </span>
                        )}
                    </button>
                </form>
            </div>
            <div className="mt-8 text-center text-xs text-gray-400">
                <p>©2025 Savinco. Ahorrar para aprender.</p>
                <p className="mt-1">Versión 1.0.0 | Derechos reservados</p>
            </div>
        </div>
    );
};

export default Login;