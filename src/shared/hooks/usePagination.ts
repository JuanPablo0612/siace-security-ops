import { useState, useMemo } from 'react';
import type { Pagination } from '@/shared/types/global.types';

interface UsePaginationResult<T> {
  paginatedItems: T[];
  pagination: Pagination;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number;
}

/**
 * usePagination
 *
 * Slices a pre-fetched array into pages and exposes navigation helpers.
 * All pagination state is kept local — no URL coupling.
 *
 * @example
 * const { paginatedItems, pagination, nextPage, prevPage } = usePagination(alerts, 10);
 */
export function usePagination<T>(items: T[], pageSize = 10): UsePaginationResult<T> {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const safePage = Math.min(page, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  const pagination: Pagination = {
    page: safePage,
    pageSize,
    total: items.length,
  };

  return {
    paginatedItems,
    pagination,
    totalPages,
    goToPage: (p) => setPage(Math.max(1, Math.min(p, totalPages))),
    nextPage: () => setPage((p) => Math.min(p + 1, totalPages)),
    prevPage: () => setPage((p) => Math.max(p - 1, 1)),
  };
}
