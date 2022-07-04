import { memo } from 'react';

import { PaginateContainer, PaginateItem, PaginateText } from './Paginate.styles';

interface PaginateProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onClickNextPage: () => void;
  onClickPageNumber: (pageNumber: number) => void;
  onClickPreviousPage: () => void;
  totalCount: number;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  onClickNextPage,
  onClickPageNumber,
  onClickPreviousPage,
  totalCount,
  totalPages,
}: PaginateProps) => {
  return totalCount ? (
    <PaginateContainer>
      {hasPreviousPage && <PaginateText onClick={onClickPreviousPage}>{'< Previous'}</PaginateText>}
      {Array.from({ length: totalPages }).map((_, i) => (
        <PaginateItem
          key={i}
          selected={currentPage === i + 1}
          onClick={() => onClickPageNumber(i + 1)}
        >
          <span>{i + 1}</span>
        </PaginateItem>
      ))}
      {hasNextPage && <PaginateText onClick={onClickNextPage}>{'Next >'}</PaginateText>}
    </PaginateContainer>
  ) : null;
};

export default memo(Pagination);
