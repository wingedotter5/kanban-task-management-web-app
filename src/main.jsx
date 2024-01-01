import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import AppContextProvider from './AppContext';
import App from './App.jsx';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Provider>
  </React.StrictMode>,
);
