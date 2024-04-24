import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import Task from './Task';
import { EDIT_TASK, GET_BOARD } from '../queries';

const Column = ({ currentBoard, column }) => {
  const [editTaskMutation] = useMutation(EDIT_TASK, {
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: {
          id: currentBoard.id,
        },
      },
    ],
  });

  return (
    <StyledColumn
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const { taskId, columnId } = JSON.parse(
          event.dataTransfer.getData('transfer'),
        );

        if (columnId === column.id) {
          return;
        }

        editTaskMutation({
          variables: {
            id: taskId,
            columnId: column.id,
          },
        });
      }}
    >
      <ColumnHeader>{`${column.name} (${column.tasks.length})`}</ColumnHeader>
      <div className="flex flex-col gap-4">
        {column.tasks.map((task) => {
          return <Task key={task.id} task={task} currentBoard={currentBoard} />;
        })}
      </div>
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
