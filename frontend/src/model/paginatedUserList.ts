/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * Nejdej API
 * Documentation of API endpoints of Nejdej
 * OpenAPI spec version: 1.0.0
 */
import type { User } from './user';

export interface PaginatedUserList {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: User[];
}
