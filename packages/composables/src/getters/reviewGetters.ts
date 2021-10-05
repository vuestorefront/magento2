/* istanbul ignore file */
import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';
import {
  ProductReview,
  ProductReviewRatingMetadata,
  ProductReviews,
  ReviewMetadata,
} from '@vue-storefront/magento-api';
import { AgnosticReviewMetadata } from '../types';

export const getItems = (review): ProductReview[] => review?.reviews?.items || [];

export const getReviewId = (item: ProductReview): string => `${item.nickname}_${item.created_at}_${item.average_rating}`;

export const getReviewAuthor = (item: ProductReview): string => item.nickname;

export const getReviewMessage = (item: ProductReview): string => item.text;

export const getReviewRating = (item: ProductReview): number => Number.parseInt(item.ratings_breakdown.find((r) => r.name === 'Rating')?.value,
  10) || 0;

export const getReviewDate = (item: ProductReview): string => item.created_at;

export const getTotalReviews = (review: ProductReviews): number => review?.review_count || 0;

export const getAverageRating = (review): number => (review?.reviews?.items?.reduce((
  acc, curr,
) => Number.parseInt(`${acc}`, 10) + getReviewRating(curr), 0)) / (review?.review_count || 1) || 0;

export const getRatesCount = (_review: ProductReviews): AgnosticRateCount[] => [];

export const getReviewsPage = (review: ProductReviews): number => review?.reviews.page_info?.page_size || 0;

export const getReviewMetadata = (reviewData: ProductReviewRatingMetadata[]): AgnosticReviewMetadata[] => reviewData?.map((m) => ({
  ...m,
  values: m.values.map((v) => ({
    label: (Number.parseInt(v.value, 10) || v.value),
    id: v.value_id,
  })),
}));

export const getProductName = (review: ProductReview): string => review?.product?.name || '';

interface MagentoReviewGetters extends ReviewGetters<ProductReviews, ProductReview> {
  getReviewMetadata(reviewData: ReviewMetadata[]): AgnosticReviewMetadata[];
  getProductName(reviewData: ProductReview): string;
}

const reviewGetters: MagentoReviewGetters = {
  getAverageRating,
  getItems,
  getRatesCount,
  getReviewAuthor,
  getReviewDate,
  getReviewId,
  getReviewMessage,
  getReviewMetadata,
  getReviewRating,
  getReviewsPage,
  getTotalReviews,
  getProductName,
};

export default reviewGetters;
