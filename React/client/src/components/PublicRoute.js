import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
    return localStorage.getItem('token') ? <Navigate to="/" /> : children;
}

export default PublicRoute;
