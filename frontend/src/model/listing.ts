/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * Nejdej API
 * Documentation of API endpoints of Nejdej
 * OpenAPI spec version: 1.0.0
 */
import type { ListingView } from './listingView';

export interface Listing {
  id: string;
  readonly views: ListingView;
  title: string;
  description?: string | null;
  image?: string | null;
  /** [('DF', 'Draft'), ('PB', 'Published'), ('DN', 'Denied')] */
  readonly status: string;
  price: string;
  user: number;
  sub_category: string;
}