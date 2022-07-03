/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * Nejdej API
 * Documentation of API endpoints of Nejdej
 * OpenAPI spec version: 1.0.0
 */
import type { ListingImageRequest } from './listingImageRequest';

export interface ListingRequest {
  id: string;
  listing_images: ListingImageRequest[];
  title: string;
  description?: string | null;
  price: string;
  user: number;
  sub_category: string;
}
