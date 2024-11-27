import axios from 'axios';

export const axiosInstance = axios.create(
    {
        baseURL: 'https://biblioteca-backend-6gs1.onrender.com'
    }
) 

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

