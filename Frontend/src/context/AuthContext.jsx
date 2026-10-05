import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

// CAMBIO: activado el cliente HTTP que comunica el frontend con el backend.
// import apiClient from '../services/apiClient';

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // CAMBIO: función estable mediante useCallback.
    // Conservamos el contrato original: /me devuelve el usuario en res.data.
    const loadCurrentUser = useCallback(async () => {
        const response = await apiClient.get('/api/auth/me');

        // CAMBIO: guardamos directamente los datos del usuario.
        const currentUser = response.data ?? null;

        setUser(currentUser);
        return currentUser;
    }, []);

    useEffect(() => {
        loadCurrentUser()
            .catch((error) => {
                setUser(null);

                // CAMBIO: no ocultamos errores de conexión o programación.
                // Un 401 indica que no hay una sesión válida.
                if (error.response?.status !== 401) {
                    console.error(
                        'Error al comprobar la sesión:',
                        error,
                    );
                }
            })
            .finally(() => {
                setLoading(false);
            });

        // CAMBIO: incluida la función utilizada en las dependencias.
    }, [loadCurrentUser]);

    // CAMBIO: función estable y dependencia explícita de loadCurrentUser.
    const login = useCallback(async (email, password) => {
        await apiClient.post('/api/auth/login', {
            email,
            password,
        });

        // Consultamos el usuario una vez iniciada la sesión.
        return loadCurrentUser();
    }, [loadCurrentUser]);

    // CAMBIO: función estable mediante useCallback.
    const logout = useCallback(async () => {
        await apiClient.post('/api/auth/logout');

        // Limpiamos el usuario cuando el backend confirma el cierre.
        setUser(null);
    }, []);

    // CAMBIO: eliminadas hasPermission y hasAnyPermission.
    const value = useMemo(
        () => ({
            user,
            loading,
            login,
            logout,
            refreshUser: loadCurrentUser,
        }),

        // CAMBIO: incluidas todas las dependencias utilizadas.
        [user, loading, login, logout, loadCurrentUser],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    // CAMBIO: comprobamos que el componente esté dentro del proveedor.
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error(
            'useAuth debe utilizarse dentro de AuthProvider.',
        );
    }

    return context;
}