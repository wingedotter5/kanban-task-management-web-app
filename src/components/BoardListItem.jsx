import styled from 'styled-components';

import IconBoard from './icons/IconBoard';

const BoardListItem = ({ board, active, onClick }) => {
  return (
    <StyledBoardListItem onClick={onClick} $active={active}>
      <IconBoard />
      <span>{board.name}</span>
    </StyledBoardListItem>
  );
};

const StyledBoardListItem = styled.li`
  background-color: ${(props) => (props.$active ? '#635fc7' : '')};
  color: ${(props) => (props.$active ? 'white' : '#828fa3')};
  font-weight: bolder;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  border-top-right-radius: 1e3px;
  border-bottom-right-radius: 1e3px;

  &:hover {
    color: #635fc7;
    background-color: white;
  }
`;

export default BoardListItem;
