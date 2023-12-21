import styled from 'styled-components';

const Select = styled.select`
  width: ${(props) => (props.$full ? '100%' : '')};
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: white;
`;

export default Select;
