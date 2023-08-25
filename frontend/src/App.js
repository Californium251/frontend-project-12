/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RequireAuth from './components/RequireAuth';
import pageAddresses from './routes/index';
import './App.css';

const App = () => {
  const { login, signup, root } = pageAddresses;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={login} element={<Login />} />
        <Route path={signup} element={<SignUp />} />
        <Route path={root} element={<RequireAuth />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
