// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase/firebaseConfig';

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Render the requested component if authenticated
  return children;
};

export default ProtectedRoute;
