import { useState } from 'react';
import { useNavigate } from 'react-router';
// import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
    // const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate('/', { replace: true });
        } catch (err) {
            setError(err.response?.data?.error || 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
            {/* Dot grid background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
                    backgroundSize: '28px 28px',
                }}
            />

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 overflow-hidden">
                    {/* Top accent bar */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600" />

                    <div className="p-8 sm:p-10">
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-extrabold text-white shadow-lg shadow-blue-500/25 text-lg select-none">
                                K
                            </div>
                            <span className="text-xl font-bold text-slate-800">
                                Kaprichos <span className="text-blue-600">Admin</span>
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="mb-7">
                            <h1 className="text-2xl font-bold text-slate-900 leading-tight">Iniciar sesión</h1>
                            <p className="text-sm text-slate-500 mt-1">Acceso exclusivo para administradores</p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                role="alert"
                                aria-live="polite"
                                className="mb-5 flex items-start gap-2.5 text-sm text-red-700 bg-red-50 border border-red-200 p-3.5 rounded-xl"
                            >
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            {/* Email */}
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                                        placeholder="admin@kaprichos.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        autoComplete="current-password"
                                        className="w-full pl-10 pr-11 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 mt-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all duration-150 text-sm flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Verificando...
                                    </>
                                ) : (
                                    'Entrar'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-400 mt-5">
                    &copy; {new Date().getFullYear()} Kaprichos. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
}
