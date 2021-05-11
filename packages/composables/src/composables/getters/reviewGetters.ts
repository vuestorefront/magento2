/* istanbul ignore file */
import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';
import { ProductReview, ProductReviews } from '@vue-storefront/magento-api';

export const getItems = (review: ProductReviews): ProductReview[] => review?.reviews.items;

export const getReviewId = (item: ProductReview): string => `${item.nickname}_${item.created_at}_${item.average_rating}`;

export const getReviewAuthor = (item: ProductReview): string => item.nickname;

export const getReviewMessage = (item: ProductReview): string => item.text;

export const getReviewRating = (item: ProductReview): number => Number.parseInt(item.ratings_breakdown.find((r) => r.name === 'Rating')?.value, 10) || 0;

export const getReviewDate = (item: ProductReview): string => item.created_at;

export const getTotalReviews = (review: ProductReviews): number => review?.review_count;

export const getAverageRating = (review: ProductReviews): number => (review?.reviews
  .items
  .reduce((
    acc, curr,
  ) => Number.parseInt(`${acc}`, 10) + getReviewRating(curr), 0)) / (review?.review_count || 1) || 0;

export const getRatesCount = (_review: ProductReviews): AgnosticRateCount[] => [];

export const getReviewsPage = (review: ProductReviews): number => review?.reviews.page_info.page_size;

const reviewGetters: ReviewGetters<ProductReviews, ProductReview> = {
  getItems,
  getReviewId,
  getReviewAuthor,
  getReviewMessage,
  getReviewRating,
  getReviewDate,
  getTotalReviews,
  getAverageRating,
  getRatesCount,
  getReviewsPage,
};

export default reviewGetters;
