import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Flex from './Flex';
import Task from './Task';
import { selectedBoard, updateTask } from '../redux/boardSlice';

const Column = ({ column }) => {
  const dispatch = useDispatch();
  const board = useSelector(selectedBoard);

  return (
    <StyledColumn
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const { taskId, taskStatus } = JSON.parse(
          e.dataTransfer.getData('transfer'),
        );
        const boardId = board.id;
        const oldColumnId = board.columns.find((c) => c.name === taskStatus).id;
        const newColumnId = board.columns.find(
          (c) => c.name === column.name,
        ).id;

        if (oldColumnId === newColumnId) {
          return;
        }

        dispatch(
          updateTask({
            boardId,
            oldColumnId,
            newColumnId,
            taskId,
            values: {
              status: column.name,
            },
          }),
        );
      }}
    >
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
