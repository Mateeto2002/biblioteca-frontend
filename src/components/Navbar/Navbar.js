import {React } from 'react';
import { Link } from 'react-router-dom';
import Logo_Bilioteca from '../images/Logo_Biblioteca.png';
import './Navbar.css';
import { jwtDecode } from "jwt-decode";

import { useEffect, useState } from 'react';


const Navbar = () => {

    const [nombre, setNombre] = useState("");

    useEffect(() => {
        // Obtener el token del localStorage
        const token = localStorage.getItem("token");

        if (token) {
            try {
                // Decodificar el token
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);  

                // Asumir que el token contiene el campo 'nombre'
                setNombre(decodedToken.nombre); // Puedes cambiar 'nombre' por el campo adecuado de tu payload
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
                <div className='perfil_nv'>hola</div>

                <h1> {nombre} </h1>


            </div>

            <ul className='navegador_nv'>

                <li className='lista_nv'>
                    <a> <Link to="/"> Inicio</Link></a>
                </li>
                <li className='lista_nv'>
                    <a> <Link to="/"> Catalogo</Link></a>
                </li>
                <li className='lista_nv' >
                    <a> <Link to="/"> Mis Prestamos</Link></a>
                </li>
                <li className='lista_nv'>
                    <a> <Link to="/"> Contactenos</Link></a>
                </li>


            </ul>
        </nav>
    );
};

export {
    Navbar
}