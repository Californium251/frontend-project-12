/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const token = window.localStorage.getItem('token');
  const username = window.localStorage.getItem('username');
  const [auth, setAuth] = useState({ token: token || undefined, username: username || undefined });
  const login = (creds) => {
    window.localStorage.setItem('username', creds.username);
    window.localStorage.setItem('token', creds.token);
    setAuth(creds);
  };
  const logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    setAuth({ token: undefined });
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
