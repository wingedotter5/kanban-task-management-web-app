import { Outlet, Navigate } from 'react-router-dom';

const AuthRequired = () => {
  const isLoggedIn = localStorage.getItem('token');

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/kanban-task-management-web-app/login" />
  );
};

export default AuthRequired;
