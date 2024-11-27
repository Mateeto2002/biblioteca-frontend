import { axiosInstance } from "../../helpers/api.config";



export const mostrarLibros = async () => {

    try{
        const response = await axiosInstance.get('/libro')
        return response.data
    }catch  (error) {
        console.error("Error al obtener los libros:", error);
        throw error;
    
    }

}