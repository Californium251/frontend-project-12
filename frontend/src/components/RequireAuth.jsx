import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Chat from './Chat';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();
  const { token } = auth;

  return (
    token
      ? <Chat />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
