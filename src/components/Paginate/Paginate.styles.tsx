import styled from 'styled-components';

export const PaginateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PaginateItem = styled.div<{ selected: boolean }>`
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.brand200 : theme.colors.white};
  color: ${({ selected, theme }) => (selected ? theme.colors.white : theme.colors.brand200)};
  border: 0.063rem solid ${({ theme }) => theme.colors.brand200};
  padding: 0.375rem;
  border-radius: 50%;
  height: 1.75rem;
  width: 1.75rem;
  position: relative;
  margin: 0 0.375rem;
  cursor: pointer;
  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const PaginateText = styled.span`
  margin: 0 0.625;
  cursor: pointer;
`;
