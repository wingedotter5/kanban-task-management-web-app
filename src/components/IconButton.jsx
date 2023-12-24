import styled from 'styled-components';

const IconButton = ({ children, onClick, className }) => {
  return (
    <StyledIconButton className={className} onClick={onClick}>
      {children}
    </StyledIconButton>
  );
};

const StyledIconButton = styled.button`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`;

export default IconButton;
