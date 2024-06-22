import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      lazy() {
        return import('./pages/Dashboard');
      },
      loader() {
        if (!localStorage.getItem('token')) {
          return redirect('/login');
        }
        return null;
      },
    },
    {
      path: 'login',
      lazy() {
        return import('./pages/Login');
      },
      loader() {
        if (localStorage.getItem('token')) {
          return redirect('/');
        }
        return null;
      },
    },
    {
      path: 'signup',
      lazy() {
        return import('./pages/Signup');
      },
      loader() {
        if (localStorage.getItem('token')) {
          return redirect('/');
        }
        return null;
      },
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
