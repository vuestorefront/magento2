import { ApolloQueryResult, FetchPolicy, FetchResult } from '@apollo/client/core';
import { ExecutionResult } from 'graphql';
import {
  AddBundleProductsToCartInput,
  AddBundleProductsToCartMutation,
  AddConfigurableProductsToCartInput,
  AddConfigurableProductsToCartMutation,
  AddDownloadableProductsToCartInput,
  AddDownloadableProductsToCartMutation,
  AddProductsToCartOutput,
  AddProductsToWishlistMutation,
  AddProductsToWishlistMutationVariables,
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AddVirtualProductsToCartInput,
  AddVirtualProductsToCartMutation,
  ApplyCouponToCartInput,
  ApplyCouponToCartMutation,
  AvailableStoresQuery,
  BundleProduct,
  CartItemInput,
  CartQuery,
  CategoryListQuery,
  CategoryListQueryVariables,
  CategorySearchQuery,
  CategorySearchQueryVariables,
  ChangeCustomerPasswordMutation,
  CmsBlockQuery,
  CmsPageQuery,
  ConfigurableProduct,
  CountriesListQuery,
  CountryInformationQuery,
  CreateCustomerAddressMutation,
  CreateCustomerMutation,
  CreateEmptyCartMutation,
  CreateProductReviewInput,
  CreateProductReviewMutation,
  CurrencyQuery,
  CustomerAddressInput,
  CustomerAvailablePaymentMethodsQuery,
  CustomerAvailableShippingMethodsQuery,
  CustomerCartQuery,
  CustomerCreateInput,
  CustomerOrdersFilterInput,
  CustomerOrdersQuery,
  CustomerProductReviewQuery,
  CustomerQuery,
  CustomerUpdateInput,
  DeleteCustomerAddressMutation,
  DownloadableProduct,
  GenerateCustomerTokenMutation,
  GetCustomerAddressesQuery,
  GroupedProduct,
  GuestAvailablePaymentMethodsQuery,
  GuestAvailableShippingMethodsQuery,
  InputMaybe,
  MergeCartsMutation,
  PlaceOrderInput,
  PlaceOrderMutation,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQuery,
  ProductInterface,
  ProductReviewQuery,
  ProductReviewRatingsMetadataQuery,
  ProductsListQuery,
  RelatedProductsQuery,
  RemoveCouponFromCartInput,
  RemoveCouponFromCartMutation,
  RemoveItemFromCartInput,
  RemoveItemFromCartMutation,
  RemoveProductsFromWishlistMutation,
  RemoveProductsFromWishlistMutationVariables,
  RequestPasswordResetEmailMutation,
  RequestPasswordResetEmailMutationVariables,
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
  RevokeCustomerTokenMutation,
  RoutableInterface,
  Scalars,
  SetBillingAddressOnCartInput,
  SetBillingAddressOnCartMutation,
  SetGuestEmailOnCartInput,
  SetGuestEmailOnCartMutation,
  SetPaymentMethodOnCartInput,
  SetPaymentMethodOnCartMutation,
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartMutation,
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartMutation,
  StoreConfigQuery,
  SubscribeEmailToNewsletterMutation,
  SubscribeEmailToNewsletterMutationVariables,
  UpdateCartItemsInput,
  UpdateCartItemsMutation,
  UpdateCustomerAddressMutation,
  UpdateCustomerEmailMutationVariables,
  UpdateCustomerMutation,
  UpsellProductsQuery,
  UrlResolverQuery,
  VirtualProduct,
  WishlistQuery,
  WishlistQueryVariables
} from './Schema';

export type CustomQuery = Record<string, string>;

export type AddProductsToCartInput = {
  cartId: string;
  cartItems: CartItemInput[];
};

export type CustomerProductReviewParams = {
  currentPage?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};

export interface SetPaymentMethodOnCartInputs extends SetPaymentMethodOnCartInput {
  [k: string]: any;
}

export type RouteQuery<ROUTE_TYPE> = {
  route: ROUTE_TYPE
};


export interface Product extends ProductInterface, ConfigurableProduct, Omit<BundleProduct, 'items'>, Omit<GroupedProduct, 'items'>, Omit<DownloadableProduct, 'items'>, Omit<VirtualProduct, 'items'> {
}

export const enum ProductsQueryType {
  List = 'LIST',
  Detail = 'DETAIL',
}

export type GetProductSearchParams = {
  pageSize?: number;
  currentPage?: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
  configurations?: string[];
};

export type GetOrdersSearchParams = {
  pageSize?: number;
  currentPage?: number;
  filter?: CustomerOrdersFilterInput;
};

export enum MagentoCustomerGender {
  Male = 1,
  Female = 2,
}

export declare type CustomHeaders = Record<string, string>;

export interface MagentoApiMethods {
  addBundleProductsToCart(
    input: AddBundleProductsToCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<AddBundleProductsToCartMutation>>;

  addConfigurableProductsToCart(
    input: AddConfigurableProductsToCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<AddConfigurableProductsToCartMutation>>;

  addProductsToCart(
    input: AddProductsToCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<{ addProductsToCart: AddProductsToCartOutput }>>;

  addProductToWishList(
    input: AddProductsToWishlistMutationVariables,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<AddProductsToWishlistMutation>>;

  addSimpleProductsToCart(
    input: AddSimpleProductsToCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<AddSimpleProductsToCartMutation>>;

  addDownloadableProductsToCart(
    input: AddDownloadableProductsToCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<AddDownloadableProductsToCartMutation>>;

  addVirtualProductsToCart(
    input: AddVirtualProductsToCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<AddVirtualProductsToCartMutation>>;

  applyCouponToCart(
    input: ApplyCouponToCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<ApplyCouponToCartMutation>>;

  availableStores(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<AvailableStoresQuery>>;

  cart(
    cartId: string,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CartQuery>>;

  cartTotalQty(
    cartId: string,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CartQuery>>;

  categoryList(
    categoryFilter?: CategoryListQueryVariables,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CategoryListQuery>>;

  categorySearch(
    categoryFilter?: CategorySearchQueryVariables,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CategorySearchQuery>>;

  changeCustomerPassword(
    params: { currentPassword: string; newPassword: string },
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<ChangeCustomerPasswordMutation>>;

  cmsBlocks(
    identifiers: string[],
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CmsBlockQuery>>;

  cmsPage(
    identifier: string,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CmsPageQuery>>;

  countries(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CountriesListQuery>>;

  country(
    id: string,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CountryInformationQuery>>;

  createCustomer(
    input: CustomerCreateInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<CreateCustomerMutation>>;

  createCustomerAddress(
    input: CustomerAddressInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<CreateCustomerAddressMutation>>;

  createEmptyCart(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<CreateEmptyCartMutation>>;

  createProductReview(
    input: CreateProductReviewInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<CreateProductReviewMutation>>;

  currency(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<CurrencyQuery>>;

  customer(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CustomerQuery>>;

  customerCart(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CustomerCartQuery>>;

  customerOrders(
    searchParams: GetOrdersSearchParams,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CustomerOrdersQuery>>;

  customQuery<QUERY, QUERY_VARIABLES = any>(params: {
    query: string,
    queryVariables?: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
    customHeaders?: CustomHeaders,
  }): Promise<ApolloQueryResult<QUERY>>;

  customMutation<MUTATION, MUTATION_VARIABLES = any>(params: {
    mutation: string,
    mutationVariables: MUTATION_VARIABLES,
    fetchPolicy?: Extract<FetchPolicy, 'network-only' | 'no-cache'>,
    customHeaders?: CustomHeaders,
  }): Promise<FetchResult<MUTATION>>;

  customerProductReview(
    input: CustomerProductReviewParams,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CustomerProductReviewQuery>>;

  deleteCustomerAddress(
    addressId: number,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ExecutionResult<DeleteCustomerAddressMutation>>;

  generateCustomerToken(
    params: { email: string, password: string, recaptchaToken: string },
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<GenerateCustomerTokenMutation>>;

  getAvailableCustomerPaymentMethods(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQuery>>;

  getAvailableCustomerShippingMethods(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQuery>>;

  getAvailablePaymentMethods(
    params: { cartId: string },
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQuery>>;

  getAvailableShippingMethods(
    params: { cartId: string },
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQuery>>;

  getCustomerAddresses(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<GetCustomerAddressesQuery>>;

  mergeCarts(
    params: { sourceCartId: string; destinationCartId: string },
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<MergeCartsMutation>>;

  placeOrder(
    input: PlaceOrderInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<PlaceOrderMutation>>;

  productDetails(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<ProductDetailsQuery>>;

  productReview(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<ProductReviewQuery>>;

  productReviewRatingsMetadata(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQuery>>;

  products(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<ProductsListQuery>>;

  relatedProducts(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<RelatedProductsQuery>>;

  removeCouponFromCart(
    input: RemoveCouponFromCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<RemoveCouponFromCartMutation>>;

  removeItemFromCart(
    input: RemoveItemFromCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<RemoveItemFromCartMutation>>;

  removeProductsFromWishlist(
    input: RemoveProductsFromWishlistMutationVariables,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<RemoveProductsFromWishlistMutation>>;

  revokeCustomerToken(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<RevokeCustomerTokenMutation>>;

  requestPasswordResetEmail(
    input: RequestPasswordResetEmailMutationVariables,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<RequestPasswordResetEmailMutation>>;

  resetPassword(
    input: ResetPasswordMutationVariables,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<ResetPasswordMutation>>;

  setBillingAddressOnCart(
    input: SetBillingAddressOnCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<SetBillingAddressOnCartMutation>>;

  setGuestEmailOnCart(
    input: SetGuestEmailOnCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<SetGuestEmailOnCartMutation>>;

  setPaymentMethodOnCart(
    input: SetPaymentMethodOnCartInputs,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<SetPaymentMethodOnCartMutation>>;

  setShippingAddressesOnCart(
    input: SetShippingAddressesOnCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<SetShippingAddressesOnCartMutation>>;

  setShippingMethodsOnCart(
    input: SetShippingMethodsOnCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<SetShippingMethodsOnCartMutation>>;

  storeConfig(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<StoreConfigQuery>>;

  subscribeEmailToNewsletter(
    input: SubscribeEmailToNewsletterMutationVariables,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<SubscribeEmailToNewsletterMutation>>;

  updateCartItems(
    input: UpdateCartItemsInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<UpdateCartItemsMutation>>;

  updateCustomer(
    input: CustomerUpdateInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<UpdateCustomerMutation>>;

  updateCustomerAddress(
    input: { addressId: number; input: CustomerAddressInput; },
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  updateCustomerEmail(
    input: UpdateCustomerEmailMutationVariables,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  upsellProducts(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<UpsellProductsQuery>>;

  urlResolver(
    url: string,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<UrlResolverQuery>>;

  route(
    url: string,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<RouteQuery<RoutableInterface>>>;

  wishlist(
    searchParams: WishlistQueryVariables,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<WishlistQuery>>;

  wishlistItemsCount(
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
  ): Promise<ApolloQueryResult<WishlistQuery>>;
}
