import styled from 'styled-components';

import Loader from './Loader';

const StyledButton = styled.button`
  width: ${(props) => (props.$full ? '100%' : '')};
  background-color: ${(props) => (props.$primary ? '#635fc7' : 'white')};
  padding: 1rem;
  border-radius: 1e3px;
  border: none;
  color: ${(props) => (props.$primary ? 'white' : '#635fc7')};
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function Button({
  children,
  loading,
  type = 'button',
  ...props
}) {
  return (
    <StyledButton disabled={loading} type={type} {...props}>
      {loading ? <Loader /> : children}
    </StyledButton>
  );
}
