// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
const token= localStorage.getItem('token');

  return(token?<Outlet/> : <Navigate to="/login" />) ;
};

export default PrivateRoute;
