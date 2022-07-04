import styled from 'styled-components';

export const StyledButton = styled.button<{
  backgroundColor?: string;
  disabled?: boolean;
  margin?: string;
  width?: string;
}>`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.875rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, backgroundColor, disabled }) =>
    disabled ? theme.colors.gray : backgroundColor};
  border: 0.125rem solid transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  height: 2.5rem;
  margin: ${({ margin }) => margin};
  border-radius: 0.25rem;
  width: ${({ width }) => width};
`;

export const LoadingImage = styled.img`
  padding-left: 0.375rem;
  width: 1.5rem;
  height: 1.5rem;
`;
