import { Outlet } from 'react-router-dom';
import React from 'react';

const Layout = () => (
  <main className="App d-flex flex-column h-100">
    <Outlet />
  </main>
);

export default Layout;
