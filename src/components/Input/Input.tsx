import { forwardRef, memo } from 'react';

import Label from 'components/Label/Label';
import { Container, StyledInput } from './Input.styles';

interface InputProps {
  accept?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  value?: string;
  width?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ error, ...rest }, ref) => {
  return (
    <Container>
      <StyledInput ref={ref} {...rest} />
      {error && <Label>{error}</Label>}
    </Container>
  );
});

export default memo(Input);
