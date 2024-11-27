import { axiosInstance } from  '../../helpers/api.config';


const obtenerUsuarios = () => {
    return axiosInstance.get('/usuario');
};

// Crear un nuevo director
const crearUsuario = (data) => {
    return axiosInstance.post('/usuario/register', data);
};



export {
    obtenerUsuarios,
    crearUsuario,
    
};
