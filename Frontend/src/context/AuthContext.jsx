import { createContext, useContext, useEffect, useMemo, useState } from 'react';
//importarmos base de datos
// import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

function normalizeUser(rawUser) {
    if (!rawUser) return null;

    return {
        ...rawUser,
        permissions: Array.isArray(rawUser.permissions) ? rawUser.permissions : [],
        assignedInterventionsCount: Number.isInteger(rawUser.assignedInterventionsCount)
            ? rawUser.assignedInterventionsCount
            : Number(rawUser.assignedInterventionsCount) || 0,
        moduleAvailability:
            rawUser.moduleAvailability && typeof rawUser.moduleAvailability === 'object'
                ? rawUser.moduleAvailability
                : {},
    };
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadCurrentUser = async () => {
        const res = await apiClient.get('/api/auth/me');
        const normalizedUser = normalizeUser(res.data);
        setUser(normalizedUser);
        return normalizedUser;
    };

    useEffect(() => {
        loadCurrentUser()
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const login = async (email, password) => {
        await apiClient.post('/api/auth/login', { email, password });
        const authenticatedUser = await loadCurrentUser();
        return authenticatedUser;
    };

    const logout = async () => {
        await apiClient.post('/api/auth/logout');
        setUser(null);
    };

    const hasPermission = (permission) => {
        if (!permission) return false;

        return (
            user?.permissions?.includes('*') ||
            user?.permissions?.includes(permission)
        );
    };

    const hasAnyPermission = (permissions = []) => {
        if (!Array.isArray(permissions) || permissions.length === 0) {
            return false;
        }

        return permissions.some((permission) => hasPermission(permission));
    };

    const value = useMemo(
        () => ({
            user,
            loading,
            login,
            logout,
            refreshUser: loadCurrentUser,
            hasPermission,
            hasAnyPermission,
        }),
        [user, loading]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
