import { axiosInstance } from "../../helpers/api.config";


const obtenerAutores = async () => {

       try{
        const response = await axiosInstance.get('/autores/mostrar')
        return response.data
    }catch  (error) {
        console.error("Error al obtener los autores:", error);
        throw error;
    }
};


const crearAutor = (data) => {
    return axiosInstance.post('/autores/create', data)
    
};



const deleteAutor = async (idAutor) => {
    try {
        const response = await axiosInstance.delete(`/autores/delete/${idAutor}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el autor: ', idAutor, error);
        throw error;
    }
    
};

export {
    obtenerAutores,
    crearAutor, 
    deleteAutor
}