import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'signup',
      element: <Signup />,
    },
  ],
  {
    basename: '/kanban-task-management-web-app/',
  },
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
