import styled from 'styled-components';

export const Table = styled.table<{ isDesktop: boolean }>`
  border-collapse: collapse;
  margin: ${({ isDesktop }) => (isDesktop ? '1rem 0' : '1rem')};
  width: fill-available;
`;

export const TR = styled.tr`
  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.lightGray};
  }
`;

export const TH = styled.td`
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.5rem;
  border: 0.063rem solid ${({ theme }) => theme.colors.lightGray};
  text-transform: uppercase;
`;

export const TD = styled.td`
  font-size: 0.875rem;
  padding: 0.5rem;
  border: 0.063rem solid ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1.5rem;
`;

export const Loading = styled.img`
  width: 3.5rem;
  height: 3.5rem;
`;

export const ProductImage = styled.img`
  width: 7.5rem;
  height: 7.5rem;
`;

export const ProductListHeader = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  width: 100%;
  margin-top: 1.5rem;
`;

export const ProductSearchContainer = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: ${({ isDesktop }) => (isDesktop ? '0' : '0 1rem')};
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
`;

export const ProductCreateContainer = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex: 1;
  justify-content: ${({ isDesktop }) => (isDesktop ? 'flex-end' : 'flex-start')};
  padding: ${({ isDesktop }) => (isDesktop ? '0' : '0 1rem')};
`;

export const ProductDeleteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Flex = styled.div`
  display: flex;
`;

export const ModalDeleteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
