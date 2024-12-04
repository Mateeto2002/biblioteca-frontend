import React, { useState } from 'react';
import './Dashboard.css'; 
import { Navbar } from '../Navbar/Navbar';
import CrearLibroView from '../admin/CrearLibroView'
import CrearAutorView from './CrearAutorView';
import CrearEditorialView from './CrearEditorialView';
import { PrestamoView } from './PrestamosView';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('crearLibros'); 

    
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="dashboard-container">
            
            <div className="sidebar">
                <div className="logo">
                    <h2>Bibliotecaas</h2>
                </div>
                <p> </p>
                <ul className="menu">
                    <li onClick={() => handleTabChange('gestionPrestamos')} className={activeTab === 'gestionPrestamos' ? 'active' : ''}>
                        Grestion de prestamos
                    </li>
                    <li onClick={() => handleTabChange('crearLibros')} className={activeTab === 'crearLibros' ? 'active' : ''}>
                        Crear Libro
                    </li>
                    <li onClick={() => handleTabChange('crearAutor')} className={activeTab === 'crearAutor' ? 'active' : ''}>
                        Crear Autor
                    </li>
                    <li onClick={() => handleTabChange('crearEditorial')} className={activeTab === 'crearEditorial' ? 'active' : ''}>
                        Crear Editorial
                    </li>
                </ul>
            </div>

            

           
            <div className="main-content">
                {activeTab === 'gestionPrestamos' && <div><PrestamoView /> </div>}
                {activeTab === 'crearLibros' && <div><CrearLibroView /></div>}
                {activeTab === 'crearAutor' && <div><CrearAutorView /></div>}
                {activeTab === 'crearEditorial' && <div><CrearEditorialView /> </div>}
            </div>
        </div>
    );
};

export default Dashboard;