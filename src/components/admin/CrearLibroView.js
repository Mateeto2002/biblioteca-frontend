import React, { useState, useEffect } from "react"
import { Navbar } from "../Navbar/Navbar"
import { crearLibro, obtenerLibros } from '../../services/Admin/librosService'

import './styles_admin.css'
import { obtenerAutores as fetchAutores } from "../../services/Admin/autoresService"
import { obtenerEditoriales as fetchEditoriales } from "../../services/Admin/editoriales"
import { obtenerEjemplares as fetchEjemplares, sumarEjemplares, restarEjemplares } from "../../services/Admin/ejemplaresService"

import { deleteLibro } from "../../services/Admin/librosService"

export const CrearLibroView = () => {

    const [valoresForm, setValoresForm] = useState({
        titulo: "",
        categoria_1: "",
        categoria_2: "",
        img: "",
        editorial: "",
        autor: ""
    })

    const [libros, setLibros] = useState([]);

    const [autorId, setAutorId] = useState("");
    const [autores, setAutores] = useState([])
    const [autorInfo, setAutorInfo] = useState(null);

    const [editorialId, setEditorialId] = useState("");
    const [editoriales, setEditoriales] = useState([])
    const [editorialInfo, setEditorialInfo] = useState(null);

    const [ejemplarId, setEjemplarId] = useState('');
    const [ejemplares, setEjemplares] = useState([])
    const [ejemplarInfo, setEjemplarInfo] = useState(null);

   
    const [idLibro, setIdLibro] = useState('');
    const [cantidades, setCantidades] = useState({});

    const { titulo, categoria_1, categoria_2, img, editorial, autor } = valoresForm;



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

    useEffect(() => {
        const fetchAutoresData = async () => {
            try {
                const autoresData = await fetchAutores();
                setAutores(autoresData);
            } catch (error) {
                console.error("Error al obtener los autores:", error);
            }
        };
        fetchAutoresData();
    }, []);

    useEffect(() => {
        const fetchEditorialesData = async () => {
            try {
                const editorialesData = await fetchEditoriales();
                setEditoriales(editorialesData);
            } catch (error) {
                console.error("Error al obtener los editoriales:", error);
            }
        };
        fetchEditorialesData();
    }, []);

    useEffect(() => {
        const fetchEjemplaresData = async () => {


            try {
                const ejemplaresData = await fetchEjemplares();
                setEjemplares(ejemplaresData);
            } catch (error) {
                console.error("Error al obtener los editoriales:", error);
            }
        };
        fetchEjemplaresData();
    }, []);



    const handleSumar = async (idLibro) => {
    const cantidad = cantidades[idLibro] || 0; // Obtener la cantidad asociada al libro o 0 si no se ha definido
    if (!cantidad || cantidad <= 0) return; // Si la cantidad es 0 o no válida, no hacer nada

    try {
        const updateEjemplar = await sumarEjemplares(idLibro, cantidad); // Pasamos el idLibro y la cantidad
        setEjemplares(prevEjemplares =>
            prevEjemplares.map(ejemplar =>
                ejemplar.idLibro === updateEjemplar.idLibro ? updateEjemplar : ejemplar
            )
        );
    } catch (error) {
        alert('Error al agregar ejemplares.');
    }
};

const handleRestar = async (idLibro) => {
    const cantidad = cantidades[idLibro] || 0; // Obtener la cantidad asociada al libro o 0 si no se ha definido
    if (!cantidad || cantidad <= 0) return; // Si la cantidad es 0 o no válida, no hacer nada

    try {
        const updateEjemplar = await restarEjemplares(idLibro, cantidad); // Pasamos el idLibro y la cantidad
        setEjemplares(prevEjemplares =>
            prevEjemplares.map(ejemplar =>
                ejemplar.idLibro === updateEjemplar.idLibro ? updateEjemplar : ejemplar
            )
        );
    } catch (error) {
        alert('Error al agregar ejemplares.');
    }
}

const handleCantidadChange = (idLibro, e) => {
    const nuevaCantidad = e.target.value;
    setCantidades(prevCantidades => ({
        ...prevCantidades,
        [idLibro]: nuevaCantidad, // Actualizamos la cantidad específica del libro
    }));
};





    const handleAutorChange = (e) => {
        const id = parseInt(e.target.value, 10);
        setAutorId(id);

        if (id) {
            const autor = autores.find((a) => a.idAutor === id);
            setAutorInfo(autor || { mensaje: "Autor no encontrado." });
        } else {
            setAutorInfo(null);
        }
    };

    const handleEditorialChange = (e) => {
        const id = parseInt(e.target.value, 10);
        setEditorialId(id);

        if (id) {
            const editorial = editoriales.find((a) => a.idEditorial === id);
            setEditorialInfo(editorial || { mensaje: "Editorial no encontrada." });
        } else {
            setEditorialInfo(null);
        }
    };


    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        const parsedValue = name === "editorial" || name === "autor" ? parseInt(value, 10) : value;
        setValoresForm({ ...valoresForm, [name]: parsedValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const libro = { titulo, categoria_1, categoria_2, img, editorial, autor }

        console.log(libro);
        try {

            const { data } = await crearLibro(libro);

            setValoresForm({
                titulo: "",
                categoria_1: "",
                categoria_2: "",
                img: "",
                editorial: "",
                autor: ""
            })
        } catch {
        }

    };


    const handleEliminar = async (idLibro) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este libro?");

        if (confirmacion) {
            try {
                await deleteLibro(idLibro);
                setLibros((prevLibros) => prevLibros.filter((libro) => libro.idLibro !== idLibro));
                console.log(`Libro con ID ${idLibro} eliminado correctamente.`);
            } catch (error) {
                console.error(`Error al eliminar el libro con ID ${idLibro}:`, error);
            }
        } else {
            console.log("Eliminación cancelada.");
        }
    };


    return (

        <div>


            <div className="contenedor_formulario_admin">
                <p className="titulo_admin">Gestor de Libros</p>
                <form onSubmit={handleSubmit} className="formulario_admin">

                    <div className="form_admin">
                        <label className="label_admin">Titulo: </label>
                        <input name="titulo" value={titulo} onChange={handleOnChange} />
                    </div>

                    <div className="form_admin flex-container">
                        <div className="form_admin-item">
                            <label className="label_admin">Categoria Principal: </label>
                            <input name="categoria_1" value={categoria_1} onChange={handleOnChange} />
                        </div>
                        <div className="form_admin-item">
                            <label className="label_admin">Categoria secundaria: </label>
                            <input name="categoria_2" value={categoria_2} onChange={handleOnChange} />
                        </div>
                    </div>

                    <div className="form_admin">
                        <label className="label_admin">Link de la portada: </label>
                        <input name="img" value={img} onChange={handleOnChange} />
                    </div>

                    <div className="form_admin flex-container">

                        <div className="form_admin-item">
                            <label className="label_admin">ID de la editorial: </label>
                            <input type="number" name="editorial" value={editorial} onChange={(e) => {
                                handleOnChange(e);
                                handleEditorialChange(e);
                            }} />
                        </div>

                        <div className="form_admin-item">
                            <label className="label_admin">ID del autor: </label>
                            <input
                                type="number"
                                name="autor"
                                value={autor}
                                onChange={(e) => {
                                    handleOnChange(e);
                                    handleAutorChange(e);
                                }}

                            />
                        </div>


                    </div>
                    <div className="info_extra_admin">

                        <div>
                            {editorialInfo && (
                                <div className="info_autor">
                                    {editorialInfo.mensaje ? (
                                        <p style={{ color: "red" }}>{editorialInfo.mensaje}</p>
                                    ) : (
                                        <p>
                                            <strong>Nombre:</strong> {editorialInfo.nombre} <br />
                                            <strong>Nacionalidad:</strong> {editorialInfo.direccion} <br />
                                            <strong>Libros contacto:</strong> {editorialInfo.contacto}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            {autorInfo && (
                                <div className="info_autor">
                                    {autorInfo.mensaje ? (
                                        <p style={{ color: "red" }}>{autorInfo.mensaje}</p>
                                    ) : (
                                        <p>
                                            <strong>Nombre:</strong> {autorInfo.nombre} <br />
                                            <strong>Nacionalidad:</strong> {autorInfo.nacionalidad} <br />
                                            <strong>Libros contacto:</strong> {autorInfo.contacto}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>

                    <div>
                        <button className="boton_admin" type="submit">Guardar</button>
                    </div>
                </form>
            </div>


            <table className="tablas_general">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>Categoria</th>
                        <th>Categoria</th>
                        <th>Imagen</th>
                        <th>Autor</th>
                        <th>Editorial</th>
                        <th>Ejemplares</th>
                        <th>add Ejemplares</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {libros.map((libro) => {
                        // Filtrar ejemplares que pertenecen al libro actual
                        const ejemplaresDelLibro = ejemplares.filter((ejemplar) => ejemplar.libro.idLibro === libro.idLibro);
                        console.log(ejemplaresDelLibro)

                        return (
                            <tr key={libro.idLibro}>
                                <td>{libro.idLibro}</td>
                                <td>{libro.titulo}</td>
                                <td>{libro.categoria}</td>
                                <td>{libro.categoria2}</td>
                                <td><a href={libro.img} target="_blank">Ver Imagen</a></td>
                                <td>{libro.autores?.nombre}</td>
                                <td>{libro.editorial?.nombre}</td>

                                {/* Mostrar los ejemplares asociados al libro */}
                                <td>
                                    {ejemplaresDelLibro.length > 0 ? (
                                        ejemplaresDelLibro.map((ejemplar) => (
                                            <div key={ejemplar.idEjemplar}>
                                                {ejemplar.cantidad}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay ejemplares</p>
                                    )}
                                </td>

                                {/* Add ejemplares - Formulario o lógica para agregar ejemplares */}
                                <td>
                                    <div className="ejemplares_admin">
                                        <div>
                                            <button onClick={() => handleRestar(libro.idLibro)}>

                                            <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={1.5} 
                                            stroke="currentColor" 
                                            className="icon_tabla">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                            </svg>

                                            </button>
                                           
                                        </div>
                                        <div>
                                            <input
                                                className="input_tabla"
                                                type="number"
                                                value={cantidades[libro.idLibro] || 0} // Usar la cantidad específica para cada libro
                                                onChange={(e) => handleCantidadChange(libro.idLibro, e)} />
                                        </div>
                                        <div>
                                            <button onClick={() => handleSumar(libro.idLibro)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none" viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="icon_tabla">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </button>

                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div className="icon_tabla2">
                                        <button onClick={() => handleEliminar(libro.idLibro)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_tabla">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>





        </div>
    )
};

export default CrearLibroView;
