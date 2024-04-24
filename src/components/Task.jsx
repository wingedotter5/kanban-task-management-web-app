import styled from 'styled-components';
import { createPortal } from 'react-dom';

import { useDisclosure } from '../hooks';
import Modal from './Modal';
import TaskInfo from './TaskInfo';

const Task = ({ task, currentBoard }) => {
  const {
    isOpen: isTaskInfoModalOpen,
    onOpen: showTaskInfoModal,
    onClose: closeTaskInfoModal,
  } = useDisclosure();
  const subtasksCompleted = task.subtasks.reduce(
    (count, subtask) => (subtask.isCompleted ? count + 1 : count),
    0,
  );

  return (
    <>
      <StyledTask
        onClick={showTaskInfoModal}
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData(
            'transfer',
            JSON.stringify({
              taskId: task.id,
              columnId: task.columnId,
            }),
          );
        }}
      >
        <h4>{task.title}</h4>
        <div>{`${subtasksCompleted} of ${task.subtasks.length} subtasks`}</div>
      </StyledTask>
      {createPortal(
        <Modal onClose={closeTaskInfoModal} isOpen={isTaskInfoModalOpen}>
          <TaskInfo
            task={task}
            currentBoard={currentBoard}
            closeTaskInfoModal={closeTaskInfoModal}
          />
        </Modal>,
        document.getElementById('portal'),
      )}
    </>
  );
};

const StyledTask = styled.div`
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

export default Task;
