import styled from 'styled-components';

const BoardList = styled.ul`
  list-style-type: none;
  overflow-y: auto;

  @media screen and (max-width: 640px) {
    max-height: 60vh;
  }
`;

export default BoardList;
