/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './components/Login';
import SignUp from './components/SignUp';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<RequireAuth />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
