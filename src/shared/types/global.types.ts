/**
 * global.types.ts
 *
 * Shared domain primitives reused across feature modules.
 * Keep additions minimal — feature-specific types live inside each feature.
 */

/** RBAC role levels supported by the platform. */
export type UserRole = 'admin' | 'analyst' | 'viewer';

/** Standard envelope returned by the real back-end API. */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

/** Cursor-based pagination metadata. */
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

/** Generic key-value pair for select option lists. */
export interface SelectOption<T = string> {
  label: string;
  value: T;
}
