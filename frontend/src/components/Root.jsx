import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Chat from './Chat';
import RequireAuth from './RequireAuth';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth />}>
        <Route path="login" element={<Login />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default Root;
