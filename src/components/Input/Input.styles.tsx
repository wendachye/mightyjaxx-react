import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.625rem;
`;

export const StyledInput = styled.input<{ width?: string }>`
  width: ${({ width }) => width || '15rem'};
  font-size: 0.9375rem;
  border: 0.125rem solid ${({ theme }) => theme.colors.lightGray};
  padding: 0.625rem 0.9375rem;
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
`;
