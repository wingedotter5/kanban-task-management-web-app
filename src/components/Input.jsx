import styled from 'styled-components';

const Input = styled.input`
  display: block;
  width: 100%;
  color: white;
  font-size: 16px;
  line-height: 1.5em;
  border-radius: 0.25rem;
  border: 1px solid rgba(130, 143, 163, 0.25);
  padding: 0.5rem 1rem;
  background-color: transparent;

  &:focus {
    outline: 1px solid #635fc7;
  }
`;

export default Input;
