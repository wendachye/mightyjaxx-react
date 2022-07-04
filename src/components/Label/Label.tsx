import { memo, ReactNode } from 'react';

import { StyledLabel } from './Label.styles';

interface LabelProps {
  children?: ReactNode;
  color?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
}

const Label = ({ children, ...rest }: LabelProps) => {
  return <StyledLabel {...rest}>{children}</StyledLabel>;
};

export default memo(Label);
