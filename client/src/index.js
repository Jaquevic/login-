import React from 'react';
import ReactDOM from 'react-dom/client';

// Importa o CSS do Bootstrap primeiro
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa o estilo personalizado
import './index.css'; 

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);