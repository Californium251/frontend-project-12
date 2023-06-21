/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import reportWebVitals from './reportWebVitals';
import store from './slices/index';
import './locales/index';

document.querySelector('html').classList.add('h-100');
document.querySelector('body').classList.add('h-100');
document.getElementById('root').classList.add('h-100');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
