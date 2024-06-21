import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      lazy: () => import('./pages/Dashboard'),
    },
    {
      path: 'login',
      lazy: () => import('./pages/Login'),
    },
    {
      path: 'signup',
      lazy: () => import('./pages/Signup'),
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
