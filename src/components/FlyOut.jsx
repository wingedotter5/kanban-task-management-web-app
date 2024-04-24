import { useState, createContext, useContext, useRef } from 'react';
import styled from 'styled-components';

import IconButton from './IconButton';
import IconEllipsis from './icons/IconEllipsis';
import { useClickOutside } from '../hooks';

const FlyOutContext = createContext();

const FlyOut = ({ children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const toggle = () => setOpen((value) => !value);

  useClickOutside(ref, () => {
    setOpen(false);
  });

  return (
    <StyledFlyOut ref={ref}>
      <FlyOutContext.Provider value={{ toggle, open }}>
        {children}
      </FlyOutContext.Provider>
    </StyledFlyOut>
  );
};

const Toggle = () => {
  const { toggle } = useContext(FlyOutContext);

  return (
    <IconButton
      className="flex w-4 items-center justify-center"
      onClick={toggle}
    >
      <IconEllipsis />
    </IconButton>
  );
};

const List = ({ children }) => {
  const { open } = useContext(FlyOutContext);

  return open ? <StyledList>{children}</StyledList> : null;
};

const Item = ({ children, onClick }) => {
  const { toggle } = useContext(FlyOutContext);

  return (
    <StyledItem
      onClick={() => {
        toggle();
        onClick();
      }}
    >
      {children}
    </StyledItem>
  );
};

const StyledFlyOut = styled.div`
  position: relative;
`;

const StyledList = styled.ul`
  position: absolute;
  right: 0;
  background-color: #20212c;
  color: #828fa3;
  list-style-type: none;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const StyledItem = styled.li`
  cursor: pointer;
  white-space: nowrap;
  padding: 0.25rem 0.5rem;
`;

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;

export default FlyOut;
