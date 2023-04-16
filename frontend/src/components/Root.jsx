import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import RequireAuth from './RequireAuth';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default Root;
