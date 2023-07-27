import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Chat from './Chat';
import AuthContext from '../context/AuthProvider';

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const { token } = auth;

  return (
    token
      ? <Chat />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
