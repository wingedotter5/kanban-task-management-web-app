import styled from 'styled-components';

const Form = styled.form`
  padding: 2rem;
  background-color: #2b2c37;
  border-radius: 0.5rem;

  @media screen and (max-width: 640px) {
    padding: 1rem;
  }
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: large;
`;

Form.Title = Title;

export default Form;
