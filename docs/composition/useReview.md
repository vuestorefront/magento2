# useReview composable

`useReview` composable allows loading and adding product reviews.

## API
`useReview` composable returns the following properties:

- `search` - function that fetches reviews for the product matching the provided filters
- `loadCustomerReviews` - function that fetches product reviews created by the current customer
- `loadReviewMetadata` - function that fetches additional product reviews data
- `addReview` - function that submits a new product review
- `error` - ref that contains an errors from the composable methods
- `loading` - ref that contains information whether any of the composable methods is loading

## Interfaces

```ts
/**
 * Almost every method is extending this type
 */
type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
  customHeaders?: CustomHeaders;
};


interface UseReviewErrors {
  search: Error;
  addReview: Error;
  loadReviewMetadata: Error;
  loadCustomerReviews: Error;
}

interface CreateProductReviewInput {
  /** The customer's nickname. Defaults to the customer name, if logged in */
  nickname: Scalars['String'];
  /** Ratings details by category. e.g price: 5, quality: 4 etc */
  ratings: Array<InputMaybe<ProductReviewRatingInput>>;
  /** The SKU of the reviewed product */
  sku: Scalars['String'];
  /** The summary (title) of the review */
  summary: Scalars['String'];
  /** The review text. */
  text: Scalars['String'];
  /** The reCaptcha Token. */
  recaptchaToken?: Scalars['String'];
}

type GetProductSearchParams = {
  search?: string;
  filter?: ProductAttributeFilterInput;
  pageSize?: number;
  currentPage?: number;
  sort?: ProductAttributeSortInput;
  configurations?: string[];
};

type UseReviewSearchParams = ComposableFunctionArgs<GetProductSearchParams>;
type UseReviewAddReviewParams = ComposableFunctionArgs<CreateProductReviewInput>;

interface UseReviewInterface {
  search(params: UseReviewSearchParams): Promise<ProductReviewQuery['products']['items'] | []>;
  loadCustomerReviews(): Promise<CustomerProductReviewQuery['customer'] | {}>;
  loadReviewMetadata(params?: ComposableFunctionArgs<{}>): Promise<ProductReviewRatingsMetadataQuery['productReviewRatingsMetadata']['items'] | []>;
  addReview(params: UseReviewAddReviewParams): Promise<CreateProductReviewMutation['createProductReview']['review'] | {}>;
  loading: Readonly<Ref<boolean>>;
  error: Readonly<Ref<UseReviewErrors>>;
}
```


## reviewGetters

`reviewGetters` is a set of helper functions that can be used to get data from the `review` object. They receive `review` object as a parameter and return the data from it.

- `getAverageRating` - returns the average rating of the review
- `getItems` - returns the review items
- `getRatesCount` - returns an object with the rates count:
  - `rate` - returns the rate
  - `count` - returns the count
- `getReviewAuthor` - returns the review author string
- `getReviewDate` - returns the review date
- `getReviewId` - returns the review id
- `getReviewMessage` - returns the review message
- `getReviewMetadata` - returns the review metadata object:
  - `name` - returns the name
  - `values` - returns the value:
    - `id` - returns the id
    - `label` - returns the label
  - `id` - returns the id
- `getReviewRating` - returns the review rating number
- `getReviewsPage` - returns the reviews page number
- `getTotalReviews` - returns the total reviews number
- `getProductName` - returns the product name

## reviewGetters usage

```ts
import reviewGetters from '~/modules/review/getters/reviewGetters';

const productName = reviewGetters.getProductName(review);
const reviewAuthor = reviewGetters.getReviewAuthor(review);
const reviewMessage = reviewGetters.getReviewMessage(review);
```

## Example

Fetch product reviews and get review items:

```ts
import useReview from '~/composables';
import reviewGetters from '~/modules/review/getters/reviewGetters';

import { usePageStore } from '~/stores/page';

setup() {
  const { routeData } = usePageStore();
  const { search, addReview } = useReview();

  const reviews = ref(null);

  const getSearchQuery = {
    filter: {
      sku: {
        eq: routeData.sku,
      },
    },
  };

  const fetchReviews = async (query = getSearchQuery) => {
    const productReviews = await search(query);
    const baseReviews = Array.isArray(productReviews)
      ? productReviews[0]
      : productReviews;

    reviews.value = reviewGetters.getItems(baseReviews);
  };
}
```