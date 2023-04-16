import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.user
      ? <Navigate to="/chat" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
