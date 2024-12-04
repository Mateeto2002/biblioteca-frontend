import React, { useEffect, useState } from "react";
import { obtenerPrestamos } from "../services/Admin/prestamos"
import dayjs from 'dayjs';
import './styles_admin.css'
import { Navbar } from "../components/Navbar/Navbar";
import { jwtDecode } from "jwt-decode";

export const MisPrestamos = () => {
    const [prestamo, setPrestamo] = useState([]);

    useEffect(() => {
        const fetchPrestamos = async () => {
            try {

                const userId = obtenerIdUsuario(); // Obtén el ID del usuario logueado
                console.log(userId, 'Usuario inicio de sesion')
                if (!userId) {
                    console.error("No se pudo obtener el ID del usuario");
                    return;
                }
                
                
                const prestamosData = await obtenerPrestamos();
                const prestamosTransformados = prestamosData.filter((prestamo) => prestamo.usuario?.idUsuarios === userId).map((prestamo) => {
                    const fechaFin = dayjs(prestamo.fechaFinalizacion);
                    
                    const hoy = dayjs();

                    let estado = 'Activo';
                    if (fechaFin.isBefore(hoy, 'day')) {
                        estado = 'Vencido';
                    } else if (fechaFin.diff(hoy, 'day') <= 5) {
                        estado = 'Próximo a vencer';
                    }
                    return {
                        ...prestamo,
                        fechaInicio: dayjs(prestamo.fechaInicio).format('DD/MM/YYYY'),
                        fechaFinalizacion: dayjs(prestamo.fechaFinalizacion).format('DD/MM/YYYY'),
                        estado,
                    };
                });

                setPrestamo(prestamosTransformados);
            } catch (error) {
                console.error("Error al obtener préstamos:", error);
            }
        };

        fetchPrestamos();
    }, []);

    const obtenerIdUsuario = () => {
        const token = localStorage.getItem("token");
        console.log("Token en localStorage:", token);
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Token decodificado:", decodedToken);
                return parseInt(decodedToken.sub, 10);
            } catch (error) {
                console.error("Error al decodificar el token", error);
                
                return null;
            }
        }
        return null;
    };






    return (

        <div className='fondo_home'>


            <Navbar />
            <div className='main_content_home'>

            <div>
            <table className="tablas_general">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Finalización</th>
                        <th>Estado</th>
                        <th>Usuario</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {prestamo.map((prestamo) => (
                        <tr key={prestamo.idPrestamo}>
                            <td>{prestamo.idPrestamo}</td>
                            <td>{prestamo.fechaInicio}</td>
                            <td>{prestamo.fechaFinalizacion}</td>
                            <td
                                style={{
                                    color:
                                        prestamo.estado === "Vencido" ? "red" :
                                            prestamo.estado === "Próximo a vencer" ? "orange" : "green",
                                }}
                            >
                                {prestamo.estado}
                            </td>
                            <td>{prestamo.usuario?.idUsuarios} - {prestamo.usuario?.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

            </div>

        </div>

    );
};
