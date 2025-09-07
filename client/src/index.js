import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css'; // Removido pois o arquivo não existe
import App from './App';
// import reportWebVitals from './reportWebVitals'; // Removido pois o arquivo não existe

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Removido reportWebVitals();
