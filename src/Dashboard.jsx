import styled from 'styled-components';

import Sidebar from './components/Sidebar';
import Panel from './components/Panel';

const Dashboard = () => {
  return (
    <StyledDashboard>
      <Sidebar />
      <Panel />
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  background-color: #20212c;
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
`;

export default Dashboard;
