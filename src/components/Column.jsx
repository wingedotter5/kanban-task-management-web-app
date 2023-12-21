import styled from 'styled-components';

import Flex from './Flex';

const Column = ({ column }) => {
  return (
    <StyledColumn>
      <ColumnHeader>{`${column.name} (${column.tasks.length})`}</ColumnHeader>
      <Flex $dir="column" $gap="1rem">
        {column.tasks.map((task) => {
          const subtasksRemaining = task.subtasks.filter(
            (st) => st.isCompleted,
          ).length;
          return (
            <Task key={task.id}>
              <h4>{task.title}</h4>
              <div>{`${subtasksRemaining} of ${task.subtasks.length} subtasks`}</div>
            </Task>
          );
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

const Task = styled.div`
  background-color: #2b2c37;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    color: #635fc7;
  }

  > div {
    color: #828fa3;
    font-size: 14px;
    font-weight: bolder;
    line-height: 2em;
  }
`;

export default Column;
