# useReview

## Features
`useReview` composable can be used to:
* fetch existing reviews for products,
* submit new reviews.

## API
```typescript
interface UseReview<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS> {
  search(params: ComposableFunctionArgs<REVIEWS_SEARCH_PARAMS>): Promise<void>;
  addReview(params: ComposableFunctionArgs<REVIEW_ADD_PARAMS>): Promise<void>;
  error: ComputedProperty<UseReviewErrors>;
  reviews: ComputedProperty<REVIEW>;
  loading: ComputedProperty<boolean>;
  [x: string]: any;
}
```

> This composable however needs to be implemented
``
