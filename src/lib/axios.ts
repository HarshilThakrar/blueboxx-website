import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
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
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            if (typeof window !== 'undefined') {
                const currentPath = window.location.pathname;

                // Only redirect to login if:
                // 1. We are NOT already on a public/auth page (avoid redirect loops)
                // 2. The current path is an authenticated portal (admin, student, etc.)
                const isPublicPath = PUBLIC_PATHS.some(
                    (path) => currentPath === path || currentPath.startsWith(path + '/')
                );

                if (!isPublicPath) {
                    // For 401, or 403 if it's a "User is not logged in" spatie error, clear token
                    // For general 403s on portals, we can let layout-level redirects handle the precise role routing,
                    // but as a fallback, if we are stuck on a 403 and the layout doesn't kick us, go to login.
                    if (error.response.status === 401 || (error.response.status === 403 && error.response.data?.message === 'User is not logged in.')) {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('blueboxx_user');
                        window.location.href = '/login';
                    }
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
