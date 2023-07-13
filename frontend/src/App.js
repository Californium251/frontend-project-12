/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RequireAuth from './components/RequireAuth';

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<RequireAuth />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);

export default App;
