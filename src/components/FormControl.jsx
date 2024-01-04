import styled from 'styled-components';

const Label = styled.label`
  display: block;
  color: white;
  font-weight: bolder;
  font-size: 12px;
  margin-bottom: 0.5rem;
`;

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

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  color: white;
  font-size: 16px;
  font-family: inherit;
  line-height: 1.5em;
  border-radius: 0.25rem;
  border: 1px solid rgba(130, 143, 163, 0.25);
  padding: 0.5rem 1rem;
  background-color: transparent;
  resize: vertical;

  &:focus {
    outline: 1px solid #635fc7;
  }
`;

const FormControl = styled.div`
  margin-bottom: 1rem;
`;

FormControl.Label = Label;
FormControl.Input = Input;
FormControl.Textarea = Textarea;

export default FormControl;
