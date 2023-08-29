/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RequireAuth from './components/RequireAuth';
import routes from './routes/index';
import './App.css';

const App = () => {
  const { loginPage, signupPage, root } = routes;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginPage} element={<Login />} />
        <Route path={signupPage} element={<SignUp />} />
        <Route path={root} element={<RequireAuth />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
