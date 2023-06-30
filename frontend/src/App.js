/* eslint-disable react/jsx-filename-extension */
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RequireAuth from './components/RequireAuth';
import store from './slices/index';
import SocketProvider from './context/SocketProvider';
import Socket from './components/Socket';

function App() {
  return (
    <React.StrictMode>
      <SocketProvider.Provider value={Socket}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="/" element={<RequireAuth />} />
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </Provider>
      </SocketProvider.Provider>
    </React.StrictMode>
  );
}

export default App;
