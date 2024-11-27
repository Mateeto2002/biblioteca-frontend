import { axiosInstance } from  '../../helpers/api.config';


const login_app = async (email, password) => {
    try {
        const response = await axiosInstance.post(`/login`, { email, password });

        const token = response.data.token;

        if(token){
            localStorage.setItem("token",token);
        }

        return response.data;
        
    } catch (error) {
        throw error.response?.data || "Error al iniciar sesión"; // Propaga el mensaje de error
    }
};

export const cerrarSesion = () => {
    localStorage.removeItem("token"); // Eliminar el token
};

export  {login_app};