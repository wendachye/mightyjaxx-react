import styled from 'styled-components';

export const StyledCard = styled.div<{ minWidth?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.875rem;
  margin: 5rem auto;
  box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.05), 0 0 2.5rem rgba(0, 0, 0, 0.08);
  border-radius: 0.375rem;
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  background-color: ${({ theme }) => theme.colors.white};
`;
