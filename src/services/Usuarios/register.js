import { axiosInstance } from  '../../helpers/api.config';


const obtenerUsuarios = () => {
    return axiosInstance.get('/usuario');
};


const crearUsuario = (data) => {
    return axiosInstance.post('/usuario/register', data);
};



export {
    obtenerUsuarios,
    crearUsuario,
    
};
