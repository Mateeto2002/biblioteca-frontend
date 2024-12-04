import React, { useState, useEffect } from 'react';

import { Navbar } from '../components/Navbar/Navbar';
import './Home.css';
import LibroCard from '../components/inicio/LibrosCard';
import { obtenerLibros } from '../services/Admin/librosService'
import { useNavigate } from 'react-router-dom';
import { LibroDetails } from './LibroDetails';


export const Home = () => {

    const navigate = useNavigate();
    const [libros, setLibros] = useState([]);


    
    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const librosData = await obtenerLibros(); 
                setLibros(librosData); 

                

            } catch (error) {
                console.error("Error al obtener los libros:", error);
            }
        };

        fetchLibros();
    }, []);


    const handleClickLibro = (idLibro) => {
        navigate(`/libro/${idLibro}`); // Redirige a la página de detalle del libro
    };

    



    return (
        <div className='fondo_home'>


            <Navbar />
            <div className='main_content_home'>

                <div className="catalogo_libros_home">

                    {libros.length > 0 ? (
                        libros.map(libro => (
                            <LibroCard 
                            key={libro.id} 
                            libro={libro}  
                            onClick={() => handleClickLibro(libro.idLibro)} />
                        ))
                    ) : (
                        <p>No hay libros disponibles en este momento.</p>
                    )}



                </div>

            </div>


        </div>



    )
};

export default LibroDetails;