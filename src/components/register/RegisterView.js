import React, { useState, useEffect } from "react";
import { crearUsuario, obtenerUsuarios } from "../../services/Usuarios/register";
import Swal from "sweetalert2";
import './RegisterView.css';
import Logo_Bilioteca from '../images/Logo_Biblioteca.png'



export const RegisterView = () => {
    const [valoresForm, setValoresForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: ""
    });


    const [tipoUsuario, setTipoUsuario] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [datosAdicionales, setDatosAdicionales] = useState({})

    const { nombre, apellido, email, password } = valoresForm;





    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };



    const handleTipoUsuarioChange = (e) => {
        const selectedTipo = e.target.value;
        setTipoUsuario(selectedTipo)

        if (selectedTipo === "profesor" || selectedTipo === "estudiante") {
            setMostrarModal(true);
        } else {
            setMostrarModal(false);  // Asegúrate de cerrar el modal si no es una opción válida
        }

    }




    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const usuario = {
            nombre,
            apellido,
            email,
            password,
            tipoUsuario,
            ...datosAdicionales,
        };



        try {
            Swal.fire({
                allowOutsideClick: false,
                text: "Cargando..."
            });
            Swal.showLoading();

            const { data } = await crearUsuario(usuario);

            Swal.close(); // Cerrar indicador de carga

            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Productora creada correctamente."
            });

            // Limpiar el formulario después del envío
            setValoresForm({
                nombre: "",
                apellido: "",
                email: "",
                password: ""
            });

        } catch (error) {
            console.error("Error al crear productora:", error);

            Swal.close(); // Cerrar indicador de carga

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo crear la productora. Intenta nuevamente."
            });
        }
    };

    const ModalDatosAdicionales = ({ tipoUsuario, onClose, onSave }) => {
        const [formData, setFormData] = useState({});

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSave = () => {
            onSave(formData); // Guarda los datos adicionales en el estado
            onClose(); // Cierra el modal
        };

        return (
            <div className="modal">
                <div className="modal-content">
                    <h2 className="titulo_modal">{`Datos Adicionales para ${tipoUsuario}`}</h2>

                    {tipoUsuario === "estudiante" && (
                        <>
                            <div className="contenedor_inputM">
                                <label>Curso:</label>
                                <input className="inputModal" type="text" name="curso" onChange={handleChange} />
                            </div>

                            <div className="contenedor_inputM">
                                <label>Semestre:</label>
                                <input className="inputModal" type="text" name="semestre" onChange={handleChange} />
                            </div>
                            <div className="contenedor_inputM">
                                <label>Edad:</label>
                                <input className="inputModal" type="text" name="edad" onChange={handleChange} />

                            </div>

                        </>
                    )}

                    {tipoUsuario === "profesor" && (
                        <>
                            <div className="contenedor_inputM">
                                <label >Especialización:</label>
                                <input className="inputModal" type="text" name="especializacion" onChange={handleChange} />
                            </div>
                            <div className="contenedor_inputM">
                                <label>Fecha de Inicio:</label>
                                <input className="inputModal" type="text" name="fecha_inicio" onChange={handleChange} />
                            </div>
                        </>
                    )}

                    <button className="boton2" onClick={handleSave}>Guardar</button>
                    <button className="boton2" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        );
    };



    return (

        <div className="fondo">


            <div className="contenedor_principal">




                <form onSubmit={handleOnSubmit} className="formulario">

                    <div className="encabezado">
                        <img className="imagen_logo" src={Logo_Bilioteca} alt="Logo" />
                        <h2 className="titulo1">REGISTRATE</h2>
                    </div>
                    <div className="contenedor_1renglon">

                        <div className="contenedor1">
                            <label className="label1">Nombre:</label>
                            <input
                                className="input_doble"
                                type="text"
                                name="nombre"
                                value={nombre}
                                onChange={handleOnChange}
                                required
                            />
                        </div>

                        <div className="conenedor1">
                            <label className="label1">Apellidos:</label>
                            <input
                                className="input_doble"
                                type="text"
                                name="apellido"
                                value={apellido}
                                onChange={handleOnChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="contenedor2">
                        <label className="label1">Email:</label>
                        <input
                            type="text"
                            className="input_total"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                        />
                    </div>


                    <div className="contenedor_1renglon">
                        <div>
                            <label className="label1">Contraseña:</label>
                            <input
                                className="input_doble"
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label className="label1">Confirmar contraseña:</label>
                            <input
                                name="password"
                                className="input_doble"
                                value={password}
                                onChange={handleOnChange}
                            />
                        </div>



                    </div>

                    <div className="lista_desplegable">

                        <label className="label2"> Tipo de usuario: </label>
                        <select className="select" value={tipoUsuario} onChange={handleTipoUsuarioChange}>
                            <option className="options"> -  SELECCIONE   -</option>
                            <option value="profesor" className="options">PROFESOR</option>
                            <option value="estudiante" className="options">ESTUDIANTE</option>
                        </select>

                    </div>

                    <div className="text_form">
                        <p>La creacion de cuenta solo esta disponible para estudiantes y profesores de la <br></br> Universidad RML Colombiana</p>
                    </div>

                    <button type="submit" className="boton">CREAR CUENTA</button>
                </form>
            </div>
            {mostrarModal && (
                <ModalDatosAdicionales
                    tipoUsuario={tipoUsuario}
                    onClose={() => setMostrarModal(false)}
                    onSave={(datos) => setDatosAdicionales(datos)}
                />
            )}
        </div>
    );
};

