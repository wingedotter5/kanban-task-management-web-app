import styled from 'styled-components';

import Flex from './Flex';
import Task from './Task';

const Column = ({ column }) => {
  return (
    <StyledColumn>
      <ColumnHeader>{`${column.name} (${column.tasks.length})`}</ColumnHeader>
      <Flex $dir="column" $gap="1rem">
        {column.tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </Flex>
    </StyledColumn>
  );
};

const StyledColumn = styled.div``;

const ColumnHeader = styled.div`
  color: #828fa3;
  letter-spacing: 0.25em;
  margin-bottom: 1rem;
  font-size: 12px;
  font-weight: bolder;
`;

export default Column;
