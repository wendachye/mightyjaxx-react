import { memo, ReactNode } from 'react';

import { StyledContainer } from './Container.styles';

export type PositionType =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

interface ContainerProps {
  alignItems?: PositionType;
  children?: ReactNode;
  justifyContent?: PositionType;
}

const Container = ({
  children,
  alignItems = 'center',
  justifyContent = 'flex-start',
}: ContainerProps) => {
  return (
    <StyledContainer alignItems={alignItems} justifyContent={justifyContent}>
      {children}
    </StyledContainer>
  );
};

export default memo(Container);
