// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to the home page if not authenticated
    return <Navigate to="/" replace />;
  }

  return element;
}

export default ProtectedRoute;
