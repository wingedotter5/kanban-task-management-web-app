import { redirect } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Panel from '../components/Panel';

const Dashboard = () => {
  return (
    <div className="block min-h-screen grid-cols-[auto_1fr] bg-[#20212c] sm:grid">
      <Sidebar />
      <Panel />
    </div>
  );
};

export const loader = () => {
  if (!localStorage.getItem('token')) {
    return redirect('/login');
  }
  return null;
};

export { Dashboard as Component };
