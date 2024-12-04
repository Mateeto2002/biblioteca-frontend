import { axiosInstance } from "../../helpers/api.config";


const obtenerPrestamos = async () => {

       try{
        const response = await axiosInstance.get('/prestamos/mostrar')
        return response.data
    }catch  (error) {
        console.error("Error al obtener los ejemplares:", error);
        throw error;
    }
};


const crearPrestamo = (data) => {
    return axiosInstance.post('/prestamos/create', data)
    
};

const deletePrestamo = async (idPrestamo) => {
    try {
        const response = await axiosInstance.delete(`/prestamos/delete/${idPrestamo}`);
        return response.data;
    } catch (error) {
        console.error('Error al devolver el prestamo: ', idPrestamo, error);
        throw error;
    }
    
};
  


export {
    obtenerPrestamos, crearPrestamo, deletePrestamo
}