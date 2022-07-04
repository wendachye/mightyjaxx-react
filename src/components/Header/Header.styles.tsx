import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.brand200};
  border-bottom: 0.063rem solid #e6e6e6;
  box-shadow: 0rem 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  height: 5rem;
  margin: 0 auto;
  padding-right: 0.938rem;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 3.75rem;
    padding-right: 0.625rem;
  }
`;
