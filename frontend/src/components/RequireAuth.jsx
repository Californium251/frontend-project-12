import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Chat from './Chat';

const RequireAuth = () => {
  const location = useLocation();
  const token = window.localStorage.getItem('token');

  return (
    token
      ? <Chat />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
