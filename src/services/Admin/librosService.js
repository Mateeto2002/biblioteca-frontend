import { axiosInstance } from "../../helpers/api.config";


const obtenerLibros = async () => {

       try{
        const response = await axiosInstance.get('/libro/mostrar')
        return response.data
    }catch  (error) {
        console.error("Error al obtener los libros:", error);
        throw error;
    }
};


const crearLibro = (data) => {
    return axiosInstance.post('/libro/create', data)
    
};

const deleteLibro = async (idLibro) => {
    try {
        const response = await axiosInstance.delete(`/libro/delete/${idLibro}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el libro:", error);
        throw error;
    }
};

const eliminarLibro = () => {
    
};

export {
    obtenerLibros,
    crearLibro,
    deleteLibro
}