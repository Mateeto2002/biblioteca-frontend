import React, { useEffect, useState } from "react";
import { obtenerLibros } from "../services/Admin/librosService";
import { Navbar } from "../components/Navbar/Navbar";
import './LibroDetails.css'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { obtenerEjemplares, restarEjemplares } from "../services/Admin/ejemplaresService";
import Calendar from 'react-calendar';
import dayjs from 'dayjs'; // Asegúrate de tener dayjs instalado
import {jwtDecode} from "jwt-decode"; 
import { crearPrestamo } from "../services/Admin/prestamos";

import Swal from "sweetalert2";

export const LibroDetails = () => {

    const navigate = useNavigate();
    const { idLibro } = useParams();
    const [libroDetails, setLibroDetails] = useState(null);
    const [ejemplares, setEjemplares] = useState([]);
    const [disponible, setDisponible] = useState("");

    const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes
    const [cargando, setCargando] = useState(false); // Para manejar el estado de carga
    
    const [idEjemplar, setIdEjemplar] = useState(null);
    const [idEjemplarSeleccionado, setIdEjemplarSeleccionado] = useState(null);




    useEffect(() => {
        console.log("ID del libro obtenido de la URL:", idLibro);
        const fetchLibroDetails = async () => {
            try {
                const libros = await obtenerLibros();

               
                const libroEncontrado = libros.find((libro) => libro.idLibro === parseInt(idLibro));
                if (libroEncontrado) {
                    setLibroDetails(libroEncontrado);
                    
                     
                } else {
                    console.error("Libro no encontrado");
                }
            } catch (error) {
                console.error("Error al obtener los detalles del libro", error);
            }
        };
        fetchLibroDetails();
    }, [idLibro]);


    
    const obtenerIdUsuario = () => {
        const token = localStorage.getItem("token");
        console.log("Token en localStorage:", token);
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Token decodificado:", decodedToken);
                return decodedToken.sub;
            } catch (error) {
                console.error("Error al decodificar el token", error);
                
                return null;
            }
        }
        return null;
    };

  


    const prestarLibro = async () => {
        const idUsuario = obtenerIdUsuario();
        
        console.log('probado decodificador de token', idUsuario)
        if (!idUsuario) {
            setMensaje("Usuario no autenticado");
            return;
        }

        const confirmacion = window.confirm('Seguro que deseas prestar el libro?');
        if(confirmacion){

            const idUsuarioInt = parseInt(idUsuario, 10);
    
            const fechaFinalizacion = dayjs().add(15, "day").format("YYYY-MM-DD");
            const prestamoDTO = {
                idUsuario: idUsuarioInt,
                idEjemplar: idEjemplarSeleccionado,
                fechaFinalizacion
            };
            console.log('datos enviados al services son', prestamoDTO)
            setCargando(true);
            try {
                const response = await crearPrestamo(prestamoDTO);

                if (response.status === 200) {
                    setMensaje("Préstamo realizado con éxito.");
                    console.log('Funcionaaaaaaaaaaaaaaaaaa')
                    Swal.fire({
                        title: 'Prestamo realizado',
                        text: `se ha creado el prestamo, la fecha de entrega del libro es: ${fechaFinalizacion}`,
                        icon: 'success',
                        confirmButtonText: 'Entendido',
                        confirmButtonColor: '#096b64',
                      });
                      navigate('/home')


                } else {
                    setMensaje("Hubo un error al realizar el préstamo.");
                }
            } catch (error) {
                console.error("Error al realizar el préstamo:", error);
                setMensaje("Error en la solicitud.");
            }
        }
        
    
            setCargando(false);
        } ;
    

        useEffect(() => {
            const fetchEjemplares = async () => {
                try {
                    const ejemplares = await obtenerEjemplares();
                    console.log("Ejemplares obtenidos:", ejemplares);
                    const ejemplaresDelLibro = ejemplares.filter(ejemplar => ejemplar.libro.idLibro === parseInt(idLibro));
                    setEjemplares(ejemplaresDelLibro);
                    
                    // Si hay ejemplares disponibles, asigna el primero automáticamente
                    if (ejemplaresDelLibro.length > 0) {
                        setIdEjemplarSeleccionado(ejemplaresDelLibro[0].idEjemplar);
                        console.log("ID del primer ejemplar seleccionado automáticamente:", ejemplaresDelLibro[0].idEjemplar);
                    }
                } catch (error) {
                    console.error("Error al obtener los ejemplares", error);
                }
            };
            fetchEjemplares();
        }, [idLibro]);
        









/*    useEffect(() => {
        const fetchEjemplares = async () => {
            try {
                const ejemplares = await obtenerEjemplares();
                console.log("Ejemplares obtenidos:", ejemplares);
                const ejemplaresDelLibro = ejemplares.filter(ejemplar => ejemplar.libro.idLibro === parseInt(idLibro));
                setEjemplares(ejemplaresDelLibro);
            } catch (error) {
                console.error("Error al obtener los ejemplares", error);
            }
        };
        fetchEjemplares();
    }, [idLibro]);*/


    const libroDisponible = () => {
        if (ejemplares && ejemplares.length > 0) {
            const ejemplaresDisponibles = ejemplares.filter(ejemplar => ejemplar.cantidad > 0);
            if (ejemplaresDisponibles.length > 0) {
                return (
                    <div className="container_boton">
                        <button 
                        className="boton_prestarLibro"
                        onClick={prestarLibro}> PRESTAR LIBRO</button>

                                
                    </div>
                );
            }
        }
        return (
            <div>Este libro no está disponible</div>
        );
    };


    if (!libroDetails) {
        return <p>Cargando detalles del libro...</p>;
    }
    console.log("Estado de libroDetails", libroDetails);



    return (
        <div className="fondo_home">
            <div>
                <Navbar />
            </div>
            <div className="main_content_ld">

                <div className="contenedor_imagen_ld">
                    <img src={libroDetails.img} className="imagen_ld" />
                </div>

                <div className="contenedor_info_ld">
                    <h1>{libroDetails.titulo} </h1>
                    <p>{libroDetails.categoria}  |   | {libroDetails.categoria2} </p>
                    <div className="text_ld">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                        rhoncus sollicitudin lectus, ut sodales dui condimentum quis.
                        Integer ullamcorper, eros sed luctus ornare, odio nunc finibus
                        justo, eu luctus nibh ligula vitae eros. </div>


                    <div className="info_extra_ld">
                        <h3>AUTOR:  </h3>
                        <p>{libroDetails.autores?.idAutor}</p>
                        <p>{libroDetails.autores?.nombre}</p>
                        <p>{libroDetails.autores?.contacto}</p>
                        <p>{libroDetails.autores?.nacionalidad}</p>
                    </div>

                    <div className="info_extra_ld">
                        <h3>EDITORIAL: </h3>
                        <p>{libroDetails.editorial?.idEditorial}</p>
                        <p>{libroDetails.editorial?.nombre}</p>
                        <p>{libroDetails.editorial?.contacto}</p>
                        <p>{libroDetails.editorial?.direccion}</p>

                    </div>
                        
                        {libroDisponible()}                       
                </div>

                <div className="info_ejemplares_ld">
    <h3>Disponibles</h3>
    {ejemplares.length > 0 ? (
        <table className="tabla_ejemplares">
            <thead>
                <tr>
                    
                </tr>
            </thead>
            <tbody>
                {ejemplares.map((ejemplar) => (
                    <tr key={ejemplar.idEjemplar}>
        
                        <td>{ejemplar.cantidad}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p>No hay ejemplares disponibles para este libro.</p>
    )}
</div>



            </div>
        </div>
    )
}
