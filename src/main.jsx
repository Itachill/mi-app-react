import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './index.css';

import CarritoProvider from './context/CarritoProvider';
import AuthProvider from './context/AuthProvider'; // si ya lo tienes

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Elimina esto si no estás usando AuthContext */}
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
