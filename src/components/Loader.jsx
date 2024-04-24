import styled from 'styled-components';
import { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: ${(props) => props.$size ?? '24px'};
  height: ${(props) => props.$size ?? '24px'};
  border-radius: 50%;
  border: 4px solid #ededed;
  border-top-color: #635fc7;
  animation: ${rotate} 1s linear infinite;
`;

export default Loader;
