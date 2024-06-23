import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './index.css';
import App from './App.jsx';
import AppContextProvider from './AppContextProvider';

const graphServerURI = import.meta.env.PROD
  ? 'https://kanban-task-management-web-app-backend-nawy.onrender.com'
  : 'http://localhost:4000/';

const httpLink = createHttpLink({
  uri: graphServerURI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AppContextProvider>
  </React.StrictMode>,
);
