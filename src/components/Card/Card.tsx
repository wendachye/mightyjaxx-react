import { memo, ReactNode } from 'react';

import { StyledCard } from './Card.styles';

interface CardProps {
  children?: ReactNode;
  minWidth?: string;
}

const Card = ({ children, minWidth }: CardProps) => {
  return <StyledCard minWidth={minWidth}>{children}</StyledCard>;
};

export default memo(Card);
