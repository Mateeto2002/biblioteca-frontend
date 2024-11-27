import React, { useState } from 'react';
import './Dashboard.css'; // Añadir los estilos personalizados

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('crearLibros'); // Estado para manejar la pestaña activa

    // Función para cambiar la pestaña activa
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="dashboard-container">
            {/* Barra lateral */}
            <div className="sidebar">
                <div className="logo">
                    <h2>Biblioteca</h2>
                </div>
                <ul className="menu">
                    <li onClick={() => handleTabChange('crearLibros')} className={activeTab === 'crearLibros' ? 'active' : ''}>
                        Crear libros
                    </li>
                    <li onClick={() => handleTabChange('verPrestamos')} className={activeTab === 'verPrestamos' ? 'active' : ''}>
                        Ver préstamos pendientes
                    </li>
                    <li onClick={() => handleTabChange('usuarios')} className={activeTab === 'usuarios' ? 'active' : ''}>
                        Gestionar usuarios
                    </li>
                    <li onClick={() => handleTabChange('reportes')} className={activeTab === 'reportes' ? 'active' : ''}>
                        Reportes
                    </li>
                </ul>
            </div>

            {/* Contenido principal */}
            <div className="main-content">
                {activeTab === 'crearLibros' && <div>Contenido para crear libros</div>}
                {activeTab === 'verPrestamos' && <div>Contenido para ver préstamos pendientes</div>}
                {activeTab === 'usuarios' && <div>Contenido para gestionar usuarios</div>}
                {activeTab === 'reportes' && <div>Contenido para ver reportes</div>}
            </div>
        </div>
    );
};

export default Dashboard;