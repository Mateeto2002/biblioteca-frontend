import { axiosInstance } from "../../helpers/api.config";


const obtenerEditoriales = async () => {

       try{
        const response = await axiosInstance.get('/editoriales/mostrar')
        return response.data
    }catch  (error) {
        console.error("Error al obtener los editoriales:", error);
        throw error;
    }
};


const crearEditorial = (data) => {
    return axiosInstance.post('/editoriales/create', data)
    
};



const deleteEditorial = async (idAutor) => {
    try {
        const response = await axiosInstance.delete(`/editoriales/delete/${idAutor}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la Editorial: ', idAutor, error);
        throw error;
    }
    
};

export {
    obtenerEditoriales, crearEditorial, deleteEditorial
}