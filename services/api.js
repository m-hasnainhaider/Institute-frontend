import axios from 'axios';

// ============================================
// 1. ACCESS TOKEN (Memory Only)
// ============================================
let accessToken = null;

// Prevent multiple refresh requests
let isRefreshing = false;
let refreshSubscribers = [];

// ============================================
// 2. TOKEN HELPERS
// ============================================
export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => {
    return accessToken;
};

export const clearAccessToken = () => {
    accessToken = null;
};

export const isAuthenticated = () => {
    return !!accessToken;
};

// Queue waiting requests while refresh happens
const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

const onRefreshed = (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

// ============================================
// 3. AXIOS INSTANCE
// ============================================
const API = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_API_URL ||
        'http://localhost:8080/api',

    timeout: 10000,

    withCredentials: true,

});

// ============================================
// 4. REQUEST INTERCEPTOR
// ============================================
API.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ============================================
// 5. RESPONSE INTERCEPTOR
// ============================================
API.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const status = error.response?.status;

        // Ignore non-auth errors
        if (status !== 401) {
            return Promise.reject(error);
        }

        // Never refresh refresh-token request
        if (
            originalRequest.url?.includes(
                '/auth/refresh-token'
            )
        ) {
            clearAccessToken();
            return Promise.reject(error);
        }

        // Avoid loops
        if (originalRequest._retry) {
            clearAccessToken();
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        // Wait if refresh already running
        if (isRefreshing) {
            return new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    originalRequest.headers.Authorization =
                        `Bearer ${token}`;

                    resolve(API(originalRequest));
                });
            });
        }

        isRefreshing = true;

        try {
            const refreshResponse =
                await API.post('/auth/refresh-token');

            const newToken =
                refreshResponse.data.accessToken;

            setAccessToken(newToken);

            onRefreshed(newToken);

            originalRequest.headers.Authorization =
                `Bearer ${newToken}`;

            return API(originalRequest);

        } catch (refreshError) {
            clearAccessToken();

            return Promise.reject(refreshError);

        } finally {
            isRefreshing = false;
        }
    }
);

// ============================================
// 6. AUTH SERVICE
// ============================================
export const authService = {

    signup: async (userData) => {
        try {
            const response =
                await API.post(
                    '/create-account',
                    userData
                );

            if (response.data.accessToken) {
                setAccessToken(
                    response.data.accessToken
                );
            }

            return {
                success: true,
                data: response.data,
            };

        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    error.message,
            };
        }
    },

    login: async (email, password) => {
        try {
            const response =
                await API.post(
                    '/login',
                    {
                        email,
                        pass: password,
                    }
                );

            if (response.data.accessToken) {
                setAccessToken(
                    response.data.accessToken
                );
            }

            return {
                success: true,
                data: response.data,
            };

        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    'Login failed',
            };
        }
    },

    checkSession: async () => {
        try {
            const response =
                await API.get(
                    '/auth/check-session'
                );

            if (response.data.accessToken) {
                setAccessToken(
                    response.data.accessToken
                );
            }

            return {
                success: true,
                isAuthenticated: true,
                data: response.data,
            };

        } catch {
            clearAccessToken();

            return {
                success: false,
                isAuthenticated: false,
            };
        }
    },

    refreshToken: async () => {
        try {
            const response =
                await API.post(
                    '/auth/refresh-token'
                );

            setAccessToken(
                response.data.accessToken
            );

            return {
                success: true,
                accessToken:
                    response.data.accessToken,
            };

        } catch {
            clearAccessToken();

            return {
                success: false,
            };
        }
    },

    logout: async () => {
        clearAccessToken();

        return {
            success: true,
        };
    },
};

// ============================================
// 7. USER SERVICE
// ============================================
export const userService = {

    getProfile: async () => {
        try {
            const response =
                await API.get(
                    '/users/me'
                );

            return {
                success: true,
                data: response.data,
            };

        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.message,
            };
        }
    },

    updateProfile: async (data) => {
        try {
            const response =
                await API.put(
                    '/users/me',
                    data
                );

            return {
                success: true,
                data: response.data,
            };

        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.message,
            };
        }
    },
};

export default API;