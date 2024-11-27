import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {login_app} from '../../services/Usuarios/login';
import Logo_Bilioteca from '../images/Logo_Biblioteca.png'
import './LoginView.css';
import { Link } from "react-router-dom";

export const LoginView = () => {


        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const data = await login_app(email, password);
                console.log("Inicio de sesión exitoso:", data);

                navigate("/home")
                
            } catch (err) {
                console.error(err);
                setError(err); // Mostrar mensaje de error
            }
        };



    return (

        <div className="login_fondo">


            <div className="login_contenedor_principal">


                <form className="login_formulario" onSubmit={handleSubmit}>

                    <div className="login_encabezado">
                        <img className="login_imagen_logo" src={Logo_Bilioteca} alt="Logo" />
                        <h2 className="login_titulo1">INICIA SESION</h2>
                    </div>
                   

                    <div className="login_contenedor1">
                        <label className="login_label1">Email:</label>
                        <input
                            className="login_input1"
                            type="text"
                            name="nombre"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="login_contenedor1">
                        <label className="login_label1">Contraseña:</label>
                        <input
                            className="login_input1"
                            type="password"
                            name="apellido"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    

                    <div>
                        <p>No tienes cuenta?, <Link to="/register">REGISTRATE AQUI </Link></p>
                    </div>

                    <button type="submit" className="login_boton">INGRESAR</button>
                    
                    {error && <p className="error_message">{error}</p>}
                </form>
            </div>

        </div>



    )
};