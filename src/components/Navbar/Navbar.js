import {React } from 'react';
import { Link } from 'react-router-dom';
import Logo_Bilioteca from '../images/Logo_Biblioteca.png';
import './Navbar.css';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from 'react';


const Navbar = () => {

    const [nombre, setNombre] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);

    const usuarioAdmin = "admin";
    const passwordAdmin = "admin"

    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mensaje, setMensaje] = useState("");

    const navigate = useNavigate();
    
    
    const ingresarAdministrador = async (e) => {
        e.preventDefault();
        
        if(usuario == usuarioAdmin && contrasena ==passwordAdmin){
            alert('Inicio de sesion exitosa')
            navigate("/admin")
            
        }else{
            alert('No tienes acceso al administrador')
            cerrarModal();
            
        }
        setUsuario("");
        setContrasena("");

    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };






    useEffect(() => {
        // Obtener el token del localStorage
        const token = localStorage.getItem("token");

        if (token) {
            try {
                
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);  

                
                setNombre(decodedToken.nombre); 
            } catch (error) {
                console.error("Error al decodificar el token", error);
            }
        }
    }, []);




    return (
        <nav className='navbar'>

            <div className='encabezado_nv'>
                <img className="imagen_login_nv" src={Logo_Bilioteca} alt="Logo" />
                <div className='titulo_nv'>   LIBRERIA EL <br />MONTE DE LOS SABIOS</div>
                
                <div>
                    <p className='perfil_nv'>BIENVENIDO!</p>
                    <h1 className='nombre_nv'> {nombre} </h1>
                    <p className='perfil_nv'>¿Que vamos a leer hoy?</p>

                </div>
              
                <div className='admin_nv'>
                    <p className='text_admin_nv'>ADMINISTRADOR  </p>
                    <button type='button' onClick={handleSubmit} className='boton_admin_nv'>Ingresar</button>
                </div>


            </div>

            <ul className='navegador_nv'>

                <li className='lista_nv'>
                    <a> <Link to="/home"> Inicio</Link></a>
                </li>
                <li className='lista_nv'>
                    <a> <Link to="/user/prestamos"> Mis Prestamos</Link></a>
                </li>
                <li className='lista_nv'>
                    <a> <Link to="https://github.com/Mateeto2002"> Contactenos</Link></a>
                </li>
                <li className='lista_nv' >
                    <a> <Link to="/"> Salir</Link></a>
                </li>
                

            </ul>

            {mostrarModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Bienvenido señor administrador</p>
                        
                        <form>
                            <input 
                            required
                            onChange={(e) => setUsuario(e.target.value)}
                            value={usuario}
                            className="input_nv" 
                            placeholder='Ingresa tu usuario'/>

                            <input 
                            type='password'
                            required
                            onChange={(e) => setContrasena(e.target.value)}
                            value={contrasena}
                            className="input_nv" 
                            placeholder='Ingresa tu contraseña'/>
                        </form>
                        
                        <p></p> 
                        <button className="boton_modal_nv" onClick={cerrarModal}>Cerrar</button>
                        <button className="boton_modal_nv" onClick={ingresarAdministrador}>Ingresar</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export {
    Navbar
}