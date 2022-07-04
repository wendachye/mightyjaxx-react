import styled from 'styled-components';

import { PositionType } from './Container';

export const StyledContainer = styled.div<{
  alignItems: PositionType;
  justifyContent: PositionType;
}>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: column;
  width: ${({ theme }) => theme.breakpoints.lg};
  margin: 0 auto;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;
