import React, { useState, useEffect } from 'react';

import { Navbar } from '../components/Navbar/Navbar';
import './Home.css';
import LibroCard from '../components/inicio/LibrosCard';
import { mostrarLibros } from '../services/home/catalogoLibro';


export const Home = () => {

    const [libros, setLibros] = useState([]);


    
    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const librosData = await mostrarLibros(); 
                setLibros(librosData); 

                

            } catch (error) {
                console.error("Error al obtener los libros:", error);
            }
        };

        fetchLibros();
    }, []);



    return (
        <div className='fondo_home'>


            <Navbar />
            <div className='main_content_home'>

                <div className="catalogo_libros_home">

                    {libros.length > 0 ? (
                        libros.map(libro => (
                            <LibroCard key={libro.id} libro={libro} />
                        ))
                    ) : (
                        <p>No hay libros disponibles en este momento.</p>
                    )}



                </div>

            </div>


        </div>



    )
};