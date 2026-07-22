import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Interceptor to attach token to requests
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Public paths that should never trigger a redirect on 401
const PUBLIC_PATHS = [
    '/login',
    '/signup',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-otp',
    '/verify-email',
    '/', // Home page
];

// Interceptor to handle global 401 Unauthorized responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
                const currentPath = window.location.pathname;

                // Only redirect to login if:
                // 1. We are NOT already on a public/auth page (avoid redirect loops)
                // 2. The current path is an authenticated portal (admin, student, etc.)
                const isPublicPath = PUBLIC_PATHS.some(
                    (path) => currentPath === path || currentPath.startsWith(path + '/')
                );

                if (!isPublicPath) {
                    // Clear stale token
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('blueboxx_user');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
