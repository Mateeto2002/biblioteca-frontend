import React, { useState, useEffect } from "react"

import { crearEditorial, obtenerEditoriales, deleteEditorial } from "../../services/Admin/editoriales";

import './styles_admin.css'



export const CrearEditorialView = () => {

    const [valoresForm, setValoresForm] = useState({
        nombre: "",
        contacto: "",
        direccion: ""

    })

    const [editorial, setEditorial] = useState([]);


    const [mensaje, setMensaje] = useState('');

    const { nombre, contacto, direccion } = valoresForm;


    useEffect(() => {
        const fetchEditoriales = async () => {
            try {
                const editorialData = await obtenerEditoriales();
                setEditorial(editorialData);
            } catch (error) {
                console.error("Error al obtener las Editoriales:", error);
            }
        };
        fetchEditoriales();
    }, []);





    const handleOnChange = ({ target }) => {
        const { name, value } = target;

        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editorial = { nombre, contacto, direccion }

        console.log(editorial);
        try {

            const { data } = await crearEditorial(editorial);

            setValoresForm({
                nombre: "",
                contacto: "",
                direccion: ""

            })
        } catch {
        }

    };


    const handleEliminar = async (idEditorial) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta Editorial?");
        
        if (confirmacion) {
            try {
                await deleteEditorial(idEditorial); 
                setEditorial((prevEditorial) =>
                    prevEditorial.filter((editorial) => editorial.idEditorial !== idEditorial)
                );      
                    console.log(`Libro con ID ${idEditorial} eliminado correctamente.`);

            } catch (error) {
                alert('Error al eliminar, Asegurate que el autor no tenga libros asociados')
            }
        } else {
            console.log("Eliminación cancelada.");
        }
    };


    return (

        <div>


            <div className="contenedor_formulario_admin">
                <p className="titulo_admin">Gestor de Autores</p>
                <form onSubmit={handleSubmit} className="formulario_admin">

                    <div className="form_admin">
                        <label className="label_admin">Nombre: </label>
                        <input name="nombre" value={nombre} onChange={handleOnChange} />
                    </div>

                    <div className="form_admin">
                        <label className="label_admin">Contacto: </label>
                        <input name="contacto" value={contacto} onChange={handleOnChange} />
                    </div>

                    <div className="form_admin">
                        <label className="label_admin">Direccion: </label>
                        <input name="direccion" value={direccion} onChange={handleOnChange} />
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
                        <th>Nombre</th>
                        <th>Contacto</th>
                        <th>Direccion</th>
                        <th>Acciones</th>
                        
                    </tr>
                </thead>

                <tbody>
                    {editorial.map((editorial) => (
                        <tr key={editorial.idEditorial}>
                            <td>{editorial.idEditorial}</td>
                            <td>{editorial.nombre}</td>
                            <td>{editorial.contacto}</td>
                            <td>{editorial.direccion}</td>
                            
                            <td>
                                <div className="icon_tabla2">

                                    <button onClick={() => handleEliminar(editorial.idEditorial)} >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="icon_tabla">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                                    </button>
                                </div>




                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>





        </div>
    )
};

export default CrearEditorialView;