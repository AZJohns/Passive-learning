import { useState } from 'react';
import { Link } from 'react-router';
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle2,
} from 'lucide-react';

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!form.name.trim()) {
            return 'Introduce tu nombre.';
        }

        if (!EMAIL_PATTERN.test(form.email.trim())) {
            return 'Introduce un correo electrónico válido.';
        }

        if (form.password.length < MIN_PASSWORD_LENGTH) {
            return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
        }

        if (form.password !== form.confirmPassword) {
            return 'Las contraseñas no coinciden.';
        }

        return '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setError('');
        setStatus('');

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        /*
         * Más adelante conectarás aquí el backend:
         *
         * await register({
         *     name: form.name.trim(),
         *     email: form.email.trim().toLowerCase(),
         *     password: form.password,
         * });
         */

        setStatus(
            'Los datos son válidos, pero la cuenta todavía no se ha creado porque falta conectar el backend.'
        );
    };

    return (
        <div className="relative min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 overflow-hidden">
            {/* Fondo de puntos */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
                    backgroundSize: '28px 28px',
                }}
            />

            <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600" />

                    <div className="p-8 sm:p-10">
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-extrabold text-white shadow-lg shadow-blue-500/25 text-lg select-none">
                                P
                            </div>

                            <span className="text-xl font-bold text-slate-800">
                                Passive-<span className="text-blue-600">Learning</span>
                            </span>
                        </div>

                        {/* Encabezado */}
                        <div className="mb-7">
                            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                                Crear una cuenta
                            </h1>

                            <p className="text-sm text-slate-500 mt-1">
                                Empieza a guardar tu progreso de aprendizaje
                            </p>
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

                        {/* Estado temporal */}
                        {status && (
                            <div
                                role="status"
                                aria-live="polite"
                                className="mb-5 flex items-start gap-2.5 text-sm text-blue-700 bg-blue-50 border border-blue-200 p-3.5 rounded-xl"
                            >
                                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                                <span>{status}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            {/* Nombre */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Nombre
                                </label>

                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        placeholder="John Andrade"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Email
                                </label>

                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="john@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                                    />
                                </div>
                            </div>

                            {/* Contraseña */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Contraseña
                                </label>

                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        minLength={MIN_PASSWORD_LENGTH}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-11 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((current) => !current)}
                                        aria-label={
                                            showPassword
                                                ? 'Ocultar contraseña'
                                                : 'Mostrar contraseña'
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                <p className="text-xs text-slate-400">
                                    Mínimo {MIN_PASSWORD_LENGTH} caracteres.
                                </p>
                            </div>

                            {/* Confirmar contraseña */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Confirmar contraseña
                                </label>

                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-11 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword((current) => !current)
                                        }
                                        aria-label={
                                            showConfirmPassword
                                                ? 'Ocultar confirmación'
                                                : 'Mostrar confirmación'
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 mt-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all duration-150 text-sm flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Crear cuenta
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500 mt-6">
                            ¿Ya tienes una cuenta?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-xs text-slate-400 mt-5">
                    &copy; {new Date().getFullYear()} Passive-Learning. Todos los
                    derechos reservados.
                </p>
            </div>
        </div>
    );
}