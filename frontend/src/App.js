/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import Root from './components/Root';
import Chat from './components/Chat';
import SignUp from './components/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<Root />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
