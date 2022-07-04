import { memo } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

interface FormProps {
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ children, ...rest }: FormProps) => {
  return <StyledForm {...rest}>{children}</StyledForm>;
};

export default memo(Form);
