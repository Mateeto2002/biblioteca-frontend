import React from 'react';
import './LibrosCard.css'



const LibroCard = ({ libro, onClick}) => {
    return (
        <div className="libro-card" onClick={onClick}>
            <img src={libro.img} alt={libro.titulo} className="libro-img" />
            <div className="libro-details">
                <h3>{libro.titulo}</h3>
                <p><strong>Categoría:</strong> {libro.categoria} | {libro.categoria2}</p>
                <p><strong>Autor:</strong> {libro.autores?.nombre}</p>
                <p><strong>Editorial:</strong> {libro.editorial?.nombre}</p>
            </div>
        </div>
    );
}

export default LibroCard;