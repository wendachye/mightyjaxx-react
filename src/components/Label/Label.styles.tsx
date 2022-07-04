import styled from 'styled-components';

export const StyledLabel = styled.span<{
  color?: string;
  fontSize?: string;
  margin?: string;
}>`
  color: ${({ theme, color }) => color || theme.colors.red};
  font-size: ${({ fontSize }) => fontSize || '0.75rem'};
  margin: ${({ margin }) => margin || '0'};
`;
