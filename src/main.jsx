import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import AppContextProvider from './AppContext';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
);
