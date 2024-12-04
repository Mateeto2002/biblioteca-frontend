import { axiosInstance } from "../../helpers/api.config";


const obtenerEjemplares = async () => {

       try{
        const response = await axiosInstance.get('/ejemplares/mostrar')
        return response.data
    }catch  (error) {
        console.error("Error al obtener los ejemplares:", error);
        throw error;
    }
};


const sumarEjemplares = async (idLibro, cantidad) => {
    try {
      const response = await axiosInstance.post(`/ejemplares/sumar/${idLibro}`, null, {
        params: { cantidad },
      });
      return response.data;
    } catch (error) {
      console.error('Error al sumar ejemplares:', error);
      throw error;
    }
  };
  
 
  const restarEjemplares = async (idLibro, cantidad) => {
    try {
      const response = await axiosInstance.post(`/ejemplares/restar/${idLibro}`, null, {
        params: { cantidad },
      });
      return response.data;
    } catch (error) {
      console.error('Error al restar ejemplares:', error);
      throw error;
    }
  };

  


export {
    obtenerEjemplares, sumarEjemplares, restarEjemplares
}