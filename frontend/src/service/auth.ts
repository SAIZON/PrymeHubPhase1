import axios from 'axios';

// 1. Define Types
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    token?: string;
}

export interface AuthResponse {
    accessToken: string;
    tokenType: string;
    user: User;
}

export interface LoginRequest {
    email?: string;
    password?: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    mobile: string;
    password?: string;
    role?: string;
}

// 2. Setup API Client
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// 3. Named Exports (Preferred)
export const login = async (data: LoginRequest) => {
    return await axios.post<AuthResponse>(`${API_URL}/auth/login`, data);
};

export const register = async (data: RegisterRequest) => {
    return await axios.post<AuthResponse>(`${API_URL}/auth/register`, data);
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
};

export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem("user");
    // Check if userStr exists AND is not the string "undefined"
    if (userStr && userStr !== "undefined") {
        try {
            return JSON.parse(userStr) as User;
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("user"); // Clean up bad data
            return null;
        }
    }
    return null;
};

export const isAdmin = (): boolean => {
    const user = getCurrentUser();
    return user?.role === 'ADMIN';
};

export const getToken = (): string | null => {
    return localStorage.getItem("token");
};

// 4. Compatibility Object (Fixes your error while maintaining named exports)
export const authService = {
    login,
    register,
    logout,
    getCurrentUser,
    isAdmin,
    getToken
};