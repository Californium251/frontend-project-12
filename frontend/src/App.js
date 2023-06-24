/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="/" element={<Chat className="vh-100" />} />
    </Routes>
  );
}

export default App;
