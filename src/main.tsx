import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { AdminSessionProvider } from './hooks/useAdminSession';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminSessionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AdminSessionProvider>
  </React.StrictMode>,
);
