/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * Nejdej API
 * Documentation of API endpoints of Nejdej
 * OpenAPI spec version: 1.0.0
 */

export interface Review {
  readonly id: string;
  readonly created_at: string;
  readonly updated_at: string;
  title: string;
  description?: string | null;
  /** [('DF', 'Draft'), ('PB', 'Published'), ('DN', 'Denied')] */
  readonly status: string;
  user: number;
  listing?: string | null;
}
