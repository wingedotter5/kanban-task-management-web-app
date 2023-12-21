import styled from 'styled-components';

const Button = styled.button`
  width: ${(props) => (props.$full ? '100%' : '')};
  background-color: ${(props) => (props.$primary ? '#635fc7' : 'white')};
  padding: 1rem;
  border-radius: 1e3px;
  border: none;
  color: ${(props) => (props.$primary ? 'white' : '#635fc7')};
  font-weight: bolder;
  cursor: pointer;
`;

export default Button;
