import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
import AuthRequired from './layouts/AuthRequired';
import Loader from './components/Loader';

const Fallback = () => (
  <div className="min-h-screen bg-[#20212c] flex items-center justify-center">
    <Loader $size="40px" />
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback/>}>
        <Routes>
          <Route element={<AuthRequired />}>
            <Route
              path="/kanban-task-management-web-app/"
              element={<Dashboard />}
            />
          </Route>
          <Route
            path="/kanban-task-management-web-app/login"
            element={<Login />}
          />
          <Route
            path="/kanban-task-management-web-app/signup"
            element={<Signup />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
