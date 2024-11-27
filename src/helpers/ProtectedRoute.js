import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    // Si no hay token, redirige a /login
    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export {ProtectedRoute } 