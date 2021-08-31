import {
  Composable,
  ComposableFunctionArgs,
  ComputedProperty,
  CustomQuery,
  PlatformApi,
  UseCart as UseCartBase,
  UseCartErrors as UseCartErrorsBase,
} from '@absolute-web/vsf-core';
import { ComputedRef } from '@vue/composition-api';
import { FetchPolicy } from './index';

export type CustomQueryParams = { customQuery?: CustomQuery; [k: string]: any };

export interface UseUrlResolver<ROUTE, API extends PlatformApi = any> extends Composable<API> {
  search: (params: ComposableFunctionArgs<{ url: string }>) => Promise<void>;
  result: ComputedProperty<ROUTE>;
  error: ComputedProperty<UseRouterErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseRouterErrors {
  search: Error;
}

export interface UseExternalCheckout<API extends PlatformApi = any> extends Composable<API> {
  initializeCheckout: (params: ComposableFunctionArgs<{ baseUrl: string }>) => Promise<string>;
  error: ComputedProperty<UseExternalCheckoutErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseExternalCheckoutErrors {
  initializeCheckout: Error;
}

export interface UseCategorySearch<CATEGORY, CATEGORY_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  search: (params: ComposableFunctionArgs<CATEGORY_SEARCH_PARAMS>) => Promise<CATEGORY[]>;
  result: ComputedProperty<CATEGORY[]>;
  error: ComputedProperty<UseCategorySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCategorySearchErrors {
  search: Error;
}

export interface UseCountrySearch<COUNTRIES, COUNTRY, API extends PlatformApi = any> extends Composable<API> {
  load: (params?: ComposableFunctionArgs<{}>) => Promise<COUNTRIES[]>;
  search: (params: ComposableFunctionArgs<{ id: string }>) => Promise<COUNTRY>;
  countries: ComputedProperty<COUNTRIES[]>;
  country: ComputedProperty<COUNTRY>;
  error: ComputedProperty<UseCountrySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCountrySearchErrors {
  load: Error;
  search: Error;
}

export interface UseConfig<CONFIG, API extends PlatformApi = any> extends Composable<API> {
  config: ComputedRef<CONFIG>;
  loadConfig: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  loading: ComputedRef<boolean>;
}

export interface UseContentErrors {
  content: Error;
  blocks: Error;
}

export interface UseContent<PAGE, BLOCK, API extends PlatformApi = any> extends Composable<API> {
  page: ComputedProperty<PAGE>;
  blocks: ComputedProperty<BLOCK[]>
  loadContent: (params: ComposableFunctionArgs<{ identifier: string }>) => Promise<void>;
  loadBlocks: (params: ComposableFunctionArgs<{ identifiers: string[] }>) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseContentErrors>;
}

export interface UseGetShippingMethods<SHIPPING_METHOD, API extends PlatformApi = any> extends Composable<API> {
  state: ComputedProperty<SHIPPING_METHOD[]>;

  setState(state: SHIPPING_METHOD[]): void;

  load: (params: ComposableFunctionArgs<{ cartId: string }>) => Promise<SHIPPING_METHOD[]>;
  result: ComputedProperty<SHIPPING_METHOD[]>;
  error: ComputedProperty<UseGetShippingMethodsErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseGetShippingMethodsErrors {
  load: Error;
}

export interface UsePaymentProviderErrors {
  load: Error;
  save: Error;
}

export interface UsePaymentProvider<STATE, PAYMENT_METHOD, API extends PlatformApi = any> extends Composable<API> {
  error: ComputedProperty<UsePaymentProviderErrors>;
  loading: ComputedProperty<boolean>;
  state: ComputedProperty<STATE>;

  setState(state: STATE): void;

  load(params?: ComposableFunctionArgs<{}>): Promise<void>;

  save(params: ComposableFunctionArgs<{ paymentMethod: PAYMENT_METHOD }>): Promise<void>;
}

export interface UseGuestUserErrors {
  attachToCart: Error;
}

export interface UseGuestUserRegisterParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;

  [x: string]: any;
}

export interface UseGuestUser<GUEST_USER, REGISTER_GUEST_USER_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  guestUser: ComputedProperty<GUEST_USER>;
  setGuestUser: (user: GUEST_USER) => void;
  attachToCart: (params: ComposableFunctionArgs<REGISTER_GUEST_USER_PARAMS>) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseGuestUserErrors>;
}

export interface UseReviewErrors {
  search: Error;
  addReview: Error;
  loadReviewMetadata: Error;
  loadCustomerReviews: Error;
}

export interface UseReview<REVIEW,
  REVIEWS_SEARCH_PARAMS,
  REVIEWS_USER_SEARCH_PARAMS,
  REVIEW_ADD_PARAMS,
  REVIEW_METADATA,
  API extends PlatformApi = any> extends Composable<API> {
  search(params?: ComposableFunctionArgs<REVIEWS_SEARCH_PARAMS>): Promise<void>;

  loadCustomerReviews(params?: ComposableFunctionArgs<REVIEWS_USER_SEARCH_PARAMS>): Promise<void>;

  addReview(params: ComposableFunctionArgs<REVIEW_ADD_PARAMS>): Promise<void>;

  loadReviewMetadata(params?: ComposableFunctionArgs<{}>): Promise<void>;

  error: ComputedProperty<UseReviewErrors>;
  reviews: ComputedProperty<REVIEW>;
  metadata: ComputedProperty<REVIEW_METADATA[]>;
  loading: ComputedProperty<boolean>;

  [x: string]: any;
}

export interface UseNewsletterErrors {
  updateSubscription: Error;
}

export interface UseNewsletter<UPDATE_NEWSLETTER_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  error: ComputedProperty<UseNewsletterErrors>;
  loading: ComputedProperty<boolean>;
  updateSubscription: (params: ComposableFunctionArgs<{ email: UPDATE_NEWSLETTER_PARAMS }>) => Promise<void>;
}

export interface UseAddressesErrors {
  load: Error;
  save: Error;
  remove: Error;
  update: Error;
}

export interface UseAddresses<ADDRESS,
  LOAD_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  SAVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  UPDATE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  REMOVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  API extends PlatformApi = any,
> extends Composable<API> {
  error: ComputedProperty<UseAddressesErrors>;
  loading: ComputedProperty<boolean>;
  addresses: ComputedProperty<ADDRESS[]>;
  load: (loadParams?: ComposableFunctionArgs<LOAD_ADDRESS_PARAMS>) => Promise<void>,
  save: (saveParams: ComposableFunctionArgs<SAVE_ADDRESS_PARAMS>) => Promise<void>,
  remove: (removeParams: ComposableFunctionArgs<REMOVE_ADDRESS_PARAMS>) => Promise<void>,
  update: (updateParams: ComposableFunctionArgs<UPDATE_ADDRESS_PARAMS>) => Promise<void>,
}

export interface UseForgotPasswordErrors {
  request: Error;
  setNew: Error;
}

export interface UseForgotPassword<RESULT> {
  result: ComputedProperty<RESULT>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseForgotPasswordErrors>;

  setNew(params: ComposableFunctionArgs<{ tokenValue: string, newPassword: string, email: string }>): Promise<void>;

  request(params: ComposableFunctionArgs<{ email: string }>): Promise<void>;
}

export interface UseRelatedProducts<PRODUCTS, RELATED_PRODUCT_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseRelatedProductsErrors>;

  search(params: ComposableFunctionArgs<RELATED_PRODUCT_SEARCH_PARAMS>): Promise<void>;

  [x: string]: any;
}

export interface UseRelatedProductsErrors {
  search: Error;
}

export interface UseUpsellProducts<PRODUCTS, UPSELL_PRODUCTS_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;

  search(params: ComposableFunctionArgs<UPSELL_PRODUCTS_SEARCH_PARAMS>): Promise<void>;

  [x: string]: any;
}

export interface UseUpsellProductsErrors {
  search: Error;
}

export interface UseCustomQuery<QUERY, QUERY_VARIABLES, QUERY_RETURN, API extends PlatformApi = any> extends Composable<API> {
  setQueryString: (newQueryString: string) => void;
  queryString: ComputedProperty<QUERY>;
  query: ({
    variables,
    fetchPolicy,
  }: {
    variables: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
    // eslint-disable-next-line consistent-return
  }) => Promise<QUERY_RETURN>;
  result: ComputedProperty<QUERY_RETURN>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;

  [x: string]: any;
}

export interface UseUpsellProductsErrors {
  query: Error;
}

export interface UseCustomMutation<MUTATION, MUTATION_VARIABLES, MUTATION_RETURN, API extends PlatformApi = any> extends Composable<API> {
  setMutationString: (newMutationString: string) => void;
  mutationString: ComputedProperty<MUTATION>;
  mutation: ({
    variables,
    fetchPolicy,
  }: {
    variables: MUTATION_VARIABLES,
    fetchPolicy?: Extract<FetchPolicy, 'network-only' | 'no-cache'>,
    // eslint-disable-next-line consistent-return
  }) => Promise<MUTATION_RETURN>;
  result: ComputedProperty<MUTATION_RETURN>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;

  [x: string]: any;
}

export interface UseUpsellProductsErrors {
  query: Error;
}

export interface UseStore<STORES, STORE, API extends PlatformApi = any> extends Composable<API> {
  load: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  change: (params: ComposableFunctionArgs<STORE>) => void;
  stores: ComputedRef<STORES>;
  loading: ComputedRef<boolean>;
}

export interface UseStoreErrors {
  stores: Error;
}

export interface UseCurrency<CURRENCY, API extends PlatformApi = any> extends Composable<API> {
  load: (params?: ComposableFunctionArgs<{}>) => Promise<void>;
  change: (params: ComposableFunctionArgs<{ id: string }>) => void;
  currencies: ComputedRef<CURRENCY>;
  loading: ComputedRef<boolean>;
}

export interface UseWishlistErrors {
  addItem: Error;
  removeItem: Error;
  load: Error;
  clear: Error;
}

export interface UseWishlist<WISHLIST,
  WISHLIST_ITEM,
  PRODUCT,
  API extends PlatformApi = any,
> extends Composable<API> {
  wishlist: ComputedProperty<WISHLIST>;
  loading: ComputedProperty<boolean>;

  addItem(params: ComposableFunctionArgs<{ product: PRODUCT; }>): Promise<void>;

  removeItem(params: ComposableFunctionArgs<{ product: WISHLIST_ITEM; }>): Promise<void>;

  load(params: ComposableFunctionArgs<{
    searchParams?: Partial<{
      currentPage: number;
      pageSize: number;
    }>,
  }>): Promise<void>;

  clear(): Promise<void>;

  setWishlist: (wishlist: WISHLIST) => void;

  isInWishlist({ product: PRODUCT }): boolean;

  error: ComputedProperty<UseWishlistErrors>;
}

export interface UseCartErrors extends UseCartErrorsBase {
  checkGiftCard: Error;
  applyGiftCard: Error;
  removeGiftCard: Error;
  focusSetGroupOnItem: Error;
  focusUpdateCartGroup: Error;
  focusUnsetPickupDate: Error;
}

export interface CartCompliance {
  itar?: boolean;
  twenty_one_and_over?: boolean;
}

export interface UseCart<CART, CART_ITEM, PRODUCT, GIFT_CARD_ACCOUNT, API extends PlatformApi = any>
  extends UseCartBase<CART, CART_ITEM, PRODUCT, API> {
  compliance: ComputedProperty<CartCompliance>;
  setCompliance: (compliance: CartCompliance) => void;
  load(): Promise<void>;
  load(params: ComposableFunctionArgs<{
    forceReload?: boolean;
  }>): Promise<void>;
  addItem: (
    params: ComposableFunctionArgs<{
      product: PRODUCT;
      quantity: any;
      enteredOptions?: any;
    }>
  ) => Promise<void>;
  checkGiftCard(params: {
    giftCardCode: string;
  }): Promise<GIFT_CARD_ACCOUNT>;
  applyGiftCard(params: ComposableFunctionArgs<{
    giftCardCode: string;
  }>): Promise<void>;
  removeGiftCard(params: ComposableFunctionArgs<{
    giftCardCode: string;
  }>): Promise<void>;
  focusSetGroupOnItem(params: {
    product: CART_ITEM;
    groupType: string;
  }): Promise<void>;
  focusUpdateCartGroup(params: {
    groupType: string; data: any
  }): Promise<void>;
  focusUnsetPickupDate: (params: {
    currentCart: CART
  }) => Promise<void>;
  error: ComputedProperty<UseCartErrors>;
}

export interface UsePickupLocationErrors {
  search: Error;
}

export interface UsePickupLocation<PICKUP_LOCATION, PICKUP_LOCATION_SEARCH_PARAMS> {
  search: (params: PICKUP_LOCATION_SEARCH_PARAMS) => Promise<PICKUP_LOCATION[]>;
  result: ComputedProperty<PICKUP_LOCATION[]>;
  error: ComputedProperty<UsePickupLocationErrors>;
  loading: ComputedProperty<boolean>;
}
