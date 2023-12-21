import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$dir || ''};
  gap: ${(props) => props.$gap || ''};
  justify-content: ${(props) => props.$justify || ''};
  align-items: ${(props) => props.$items || ''};
`;

export default Flex;
