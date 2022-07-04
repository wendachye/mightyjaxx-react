import { memo } from 'react';
import loadingSVG from 'assets/loading.svg';
import { theme } from 'styles/theme';

import { LoadingImage, StyledButton } from './Button.styles';

interface ButtonProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  margin?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
}

const Button = ({
  backgroundColor = theme.colors.brand300,
  children,
  loading,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton backgroundColor={backgroundColor} {...rest}>
      {children}
      {loading && <LoadingImage src={loadingSVG} alt={'loading'} />}
    </StyledButton>
  );
};

export default memo(Button);
