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

export default Dashboard;
