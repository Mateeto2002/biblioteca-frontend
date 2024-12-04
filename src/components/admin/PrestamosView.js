import React, { useEffect, useState } from "react";
import { obtenerPrestamos, deletePrestamo } from "../../services/Admin/prestamos";
import dayjs from 'dayjs';
import './styles_admin.css'

export const PrestamoView = () => {
    const [prestamo, setPrestamo] = useState([]);

    useEffect(() => {
        const fetchPrestamos = async () => {
            try {
                const prestamosData = await obtenerPrestamos();

               
                const prestamosTransformados = prestamosData.map((prestamo) => {
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




    const hanldeNotificar = async () =>{
        alert('Hemos enviado un correo automatico para recordarle al usuario de la entrega')
    };




    const handleEliminar = async (idPrestamo) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar el prestamos? ");


        if (confirmacion) {
            try {
                await deletePrestamo(idPrestamo);
                setPrestamo((prevPrestamos) =>
                    prevPrestamos.filter((prestamo) => prestamo.idPrestamo !== idPrestamo)
                );
                console.log(`Libro con ID ${idPrestamo} eliminado correctamente.`);

            } catch (error) {
                alert('Error al eliminar, Asegurate que el autor no tenga libros asociados')
            }
        } else {
            console.log("Eliminación cancelada.");
        }
    };

    return (
        <div>
            <table className="tablas_general">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Finalización</th>
                        <th>Estado</th>
                        <th>Usuario</th>
                        <th>Accciones</th>
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
                            <td>
                                    <div className="icon_tabla2">
                                        <button onClick={() => handleEliminar(prestamo.idPrestamo)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="icon_tabla">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                                   




                                        </button>

                                        <button onClick={hanldeNotificar}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_tabla">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
</svg>

                                        </button>
                                    </div>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
