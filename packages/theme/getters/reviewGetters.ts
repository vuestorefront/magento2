import {
  ProductInterface,
  ProductReview,
  ProductReviewRatingMetadata,
  ProductReviews,
} from '~/modules/GraphQL/types';

export interface RateCount {
  rate: number;
  count: number;
}

export interface ReviewMetadata {
  id: string;
  name: string;
  values: {
    label: string | number;
    id: string;
  }[];
}

export const getItems = (review): ProductReview[] => review?.reviews?.items || [];

export const getReviewId = (item: ProductReview): string => `${item.nickname}_${item.created_at}_${item.average_rating}`;

export const getReviewAuthor = (item: ProductReview): string => item.nickname;

export const getReviewMessage = (item: ProductReview): string => item.text;

export const getReviewRating = (item: ProductReview): number => Number.parseInt(
  item.ratings_breakdown.find((r) => r.name === 'Rating')?.value,
  10,
) || 0;

export const getReviewDate = (item: ProductReview): string => item.created_at;

export const getTotalReviews = (review: ProductInterface): number => review?.review_count || 0;

export const getAverageRating = (review: ProductInterface): number => ((review?.reviews?.items?.reduce((acc, curr) => Number.parseInt(`${acc}`, 10) + getReviewRating(curr), 0)) ?? 0) / (review?.review_count || 1) || 0;

export const getRatesCount = (_review: ProductReviews): RateCount[] => [];

export const getReviewsPage = (review: ProductInterface): number => review?.reviews.page_info?.page_size || 0;

export const getReviewMetadata = (reviewData: ProductReviewRatingMetadata[]): ReviewMetadata[] => reviewData?.map((m) => ({
  ...m,
  values: m.values.map((v) => ({
    label: (Number.parseInt(v.value, 10) || v.value),
    id: v.value_id,
  })),
}));

export const getProductName = (review: ProductReview): string => review?.product?.name || '';

const reviewGetters = {
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
