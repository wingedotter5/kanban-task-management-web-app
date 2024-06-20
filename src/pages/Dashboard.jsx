import { Navigate } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Panel from '../components/Panel';

const Dashboard = () => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="block min-h-screen grid-cols-[auto_1fr] bg-[#20212c] sm:grid">
      <Sidebar />
      <Panel />
    </div>
  );
};

export default Dashboard;
