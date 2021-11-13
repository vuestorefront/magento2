import { ApolloQueryResult } from 'apollo-client';
import { ExecutionResult } from 'graphql';
import { FetchResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/core';
import { FetchPolicy } from 'apollo-client/core/watchQueryOptions';
import {
  AddConfigurableProductsToCartInput,
  AddConfigurableProductsToCartMutation,
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AddDownloadableProductsToCartInput,
  AddDownloadableProductsToCartMutation,
  AddVirtualProductsToCartInput,
  AddVirtualProductsToCartMutation,
  AppliedCoupon,
  ApplyCouponToCartInput,
  ApplyCouponToCartMutation,
  AvailableShippingMethod,
  BundleProduct,
  Cart as CartInterface,
  CartItemInterface,
  CartQuery,
  CategoryFilterInput,
  CategoryListQuery,
  CategoryListQueryVariables,
  CategorySearchQuery,
  CategorySearchQueryVariables,
  CategoryTree,
  CmsPage,
  CmsPageQuery,
  ConfigurableProduct,
  CountriesListQuery,
  CountryInformationQuery,
  CustomerAddress as CustomerAddressInterface,
  CustomerAddressInput,
  CustomerAvailablePaymentMethodsQuery,
  CustomerAvailableShippingMethodsQuery,
  CustomerCartQuery,
  CustomerCreateInput,
  CustomerOrder as CustomerOrderInterface,
  CustomerOrdersQuery,
  CustomerQuery,
  CustomerUpdateInput,
  DeleteCustomerAddressMutation,
  GenerateCustomerTokenMutation,
  GuestAvailablePaymentMethodsQuery,
  GuestAvailableShippingMethodsQuery,
  MergeCartsMutation,
  Order as OrderInterface,
  PlaceOrderInput,
  PlaceOrderMutation,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQuery,
  ProductInterface,
  ProductReviewQuery,
  ProductReviewRatingsMetadataQuery,
  ProductsListQuery,
  RelatedProductQuery,
  RemoveCouponFromCartInput,
  RemoveCouponFromCartMutation,
  RemoveItemFromCartInput,
  RemoveItemFromCartMutation,
  RevokeCustomerTokenMutation,
  SetBillingAddressOnCartInput,
  SetBillingAddressOnCartMutation,
  SetGuestEmailOnCartInput,
  SetGuestEmailOnCartMutation,
  SetPaymentMethodOnCartMutation,
  SetShippingAddressesOnCartInput,
  SetShippingAddressesOnCartMutation,
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartMutation,
  ShippingCartAddress,
  StoreConfigQuery,
  UpdateCartItemsInput,
  UpdateCartItemsMutation,
  UpdateCustomerAddressMutation,
  UpsellProductsQuery,
  UrlResolverQuery,
  WishlistItemInterface,
  WishlistQuery,
  WishlistQueryVariables,
  CreateProductReviewInput,
  CreateEmptyCartMutation,
  CreateProductReviewMutation,
  CustomerProductReviewQuery,
  SubscribeEmailToNewsletterMutationVariables,
  SubscribeEmailToNewsletterMutation,
  UpdateCustomerMutation,
  CreateCustomerMutation,
  AddProductsToWishlistMutationVariables,
  AddProductsToWishlistMutation,
  UpdateCustomerEmailMutationVariables,
  RemoveProductsFromWishlistMutationVariables,
  RemoveProductsFromWishlistMutation,
  GetCustomerAddressesQuery,
  AddProductsToCartMutation,
  CmsBlockQuery,
  GroupedProduct,
  AddBundleProductsToCartInput,
  AddBundleProductsToCartMutation,
  RequestPasswordResetEmailMutation,
  RequestPasswordResetEmailMutationVariables,
  ResetPasswordMutationVariables,
  ResetPasswordMutation,
  ChangeCustomerPasswordMutation,
  CreateCustomerAddressMutation,
  DownloadableProduct,
  VirtualProduct, CustomerOrdersFilterInput,
} from './GraphQL';
import { SetPaymentMethodOnCartInputs } from '../api/setPaymentMethodOnCart';
import { CustomerProductReviewParams } from '../api/customerProductReview';
import { AddProductsToCartInput } from '../api/addProductsToCart';

export interface Product extends ProductInterface, ConfigurableProduct, Omit<BundleProduct, 'items'>, Omit<GroupedProduct, 'items'>, Omit<DownloadableProduct, 'items'>, Omit<VirtualProduct, 'items'> {
}

export type AddressOnCart = ShippingCartAddress;
export type Cart = CartInterface;
export type CartItem = CartItemInterface;
export type Category = CategoryTree | CategorySearchQuery['categoryList'][0];
export type CategoryFilter = CategoryFilterInput;
export type CategoryMenu = CategoryTree;
export type Countries = CountriesListQuery['countries'][0];
export type Coupon = AppliedCoupon;
export type CustomerAddress = CustomerAddressInterface;
export type CustomerOrder = CustomerOrderInterface;
export type CustomerUpdateParameters = CustomerCreateInput;
export type Order = OrderInterface;
export type Page = CmsPage | CmsPageQuery['cmsPage'];
export type ProductAttributeFilter = ProductAttributeFilterInput;
export type ProductReview = ProductReviewQuery['products']['items'][0]['reviews']['items'][0];
export type ProductReviews = ProductReviewQuery['products']['items'][0];
export type ReviewMetadata = ProductReviewRatingsMetadataQuery['productReviewRatingsMetadata']['items'][0];
export type Route = UrlResolverQuery['urlResolver'];
export type ShippingMethod = AvailableShippingMethod;
export type StoreConfig = StoreConfigQuery['storeConfig'];
export type WishlistProduct = WishlistItemInterface;

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

export interface MagentoApiMethods {
  addBundleProductsToCart(input: AddBundleProductsToCartInput): Promise<FetchResult<AddBundleProductsToCartMutation>>;

  addConfigurableProductsToCart(input: AddConfigurableProductsToCartInput): Promise<FetchResult<AddConfigurableProductsToCartMutation>>;

  addProductsToCart(input: AddProductsToCartInput): Promise<FetchResult<AddProductsToCartMutation>>;

  addProductToWishList(input: AddProductsToWishlistMutationVariables): Promise<FetchResult<AddProductsToWishlistMutation>>;

  addSimpleProductsToCart(input: AddSimpleProductsToCartInput): Promise<FetchResult<AddSimpleProductsToCartMutation>>;

  addDownloadableProductsToCart(input: AddDownloadableProductsToCartInput): Promise<FetchResult<AddDownloadableProductsToCartMutation>>;

  addVirtualProductsToCart(input: AddVirtualProductsToCartInput): Promise<FetchResult<AddVirtualProductsToCartMutation>>;

  applyCouponToCart(input: ApplyCouponToCartInput): Promise<FetchResult<ApplyCouponToCartMutation>>;

  cart(cartId: string): Promise<ApolloQueryResult<CartQuery>>;

  categoryList(categoryFilter?: CategoryListQueryVariables): Promise<ApolloQueryResult<CategoryListQuery>>;

  categorySearch(categoryFilter?: CategorySearchQueryVariables): Promise<ApolloQueryResult<CategorySearchQuery>>;

  changeCustomerPassword(currentPassword: string, newPassword: string): Promise<FetchResult<ChangeCustomerPasswordMutation>>;

  cmsBlocks(identifiers: string[]): Promise<ApolloQueryResult<CmsBlockQuery>>;

  cmsPage(identifier: string): Promise<ApolloQueryResult<CmsPageQuery>>;

  countries(): Promise<ApolloQueryResult<CountriesListQuery>>;

  country(id: string): Promise<ApolloQueryResult<CountryInformationQuery>>;

  createCustomer(input: CustomerCreateInput): Promise<FetchResult<CreateCustomerMutation>>;

  createCustomerAddress(input: CustomerAddressInput): Promise<FetchResult<CreateCustomerAddressMutation>>;

  createEmptyCart(): Promise<FetchResult<CreateEmptyCartMutation>>;

  createProductReview(input: CreateProductReviewInput): Promise<FetchResult<CreateProductReviewMutation>>;

  customer(): Promise<ApolloQueryResult<CustomerQuery>>;

  customerCart(): Promise<ApolloQueryResult<CustomerCartQuery>>;

  customerOrders(
    searchParams: GetOrdersSearchParams,
    customQuery?: CustomQuery,
  ): Promise<ApolloQueryResult<CustomerOrdersQuery>>;

  customQuery<QUERY = any, QUERY_VARIABLES = any>({
    query,
    queryVariables,
    fetchPolicy,
  }: {
    query: QUERY,
    queryVariables?: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
  }): Promise<ApolloQueryResult<QUERY>>;

  customMutation<MUTATION = any, MUTATION_VARIABLES = any>({
    mutation,
    mutationVariables,
    fetchPolicy,
  }: {
    mutation: MUTATION,
    mutationVariables: MUTATION_VARIABLES,
    fetchPolicy?: FetchPolicy,
  }): Promise<FetchResult<MUTATION>>;

  customerProductReview(input: CustomerProductReviewParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerProductReviewQuery>>;

  deleteCustomerAddress(addressId: number): Promise<ExecutionResult<DeleteCustomerAddressMutation>>;

  generateCustomerToken(email: string, password: string): Promise<FetchResult<GenerateCustomerTokenMutation>>;

  getAvailableCustomerPaymentMethods(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQuery>>;

  getAvailableCustomerShippingMethods(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQuery>>;

  getAvailablePaymentMethods(params: { cartId: string }, customQuery?: CustomQuery): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQuery>>;

  getAvailableShippingMethods(params: { cartId: string }, customQuery?: CustomQuery): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQuery>>;

  getCustomerAddresses(customQuery?: CustomQuery): Promise<ApolloQueryResult<GetCustomerAddressesQuery>>;

  mergeCarts(sourceCartId: string, destinationCartId: string): Promise<FetchResult<MergeCartsMutation>>;

  placeOrder(input: PlaceOrderInput): Promise<FetchResult<PlaceOrderMutation>>;

  productDetail(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductDetailsQuery>>;

  productReview(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductReviewQuery>>;

  productReviewRatingsMetadata(): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQuery>>;

  products(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductsListQuery>>;

  relatedProduct(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<RelatedProductQuery>>;

  removeCouponFromCart(input: RemoveCouponFromCartInput): Promise<FetchResult<RemoveCouponFromCartMutation>>;

  removeItemFromCart(input: RemoveItemFromCartInput): Promise<FetchResult<RemoveItemFromCartMutation>>;

  removeProductsFromWishlist(input: RemoveProductsFromWishlistMutationVariables): Promise<FetchResult<RemoveProductsFromWishlistMutation>>;

  revokeCustomerToken(): Promise<FetchResult<RevokeCustomerTokenMutation>>;

  requestPasswordResetEmail(
    input: RequestPasswordResetEmailMutationVariables,
    customQuery?: CustomQuery): Promise<FetchResult<RequestPasswordResetEmailMutation>>;

  resetPassword(input: ResetPasswordMutationVariables, customQuery?: CustomQuery,): Promise<FetchResult<ResetPasswordMutation>>;

  setBillingAddressOnCart(input: SetBillingAddressOnCartInput): Promise<FetchResult<SetBillingAddressOnCartMutation>>;

  setGuestEmailOnCart(input: SetGuestEmailOnCartInput): Promise<FetchResult<SetGuestEmailOnCartMutation>>;

  setPaymentMethodOnCart(input: SetPaymentMethodOnCartInputs): Promise<FetchResult<SetPaymentMethodOnCartMutation>>;

  setShippingAddressesOnCart(input: SetShippingAddressesOnCartInput): Promise<FetchResult<SetShippingAddressesOnCartMutation>>;

  setShippingMethodsOnCart(input: SetShippingMethodsOnCartInput): Promise<FetchResult<SetShippingMethodsOnCartMutation>>;

  storeConfig(): Promise<ApolloQueryResult<StoreConfigQuery>>;

  subscribeEmailToNewsletter(input: SubscribeEmailToNewsletterMutationVariables): Promise<FetchResult<SubscribeEmailToNewsletterMutation>>;

  updateCartItems(input: UpdateCartItemsInput): Promise<FetchResult<UpdateCartItemsMutation>>;

  updateCustomer(input: CustomerUpdateInput): Promise<FetchResult<UpdateCustomerMutation>>;

  updateCustomerAddress(input: { addressId: number; input: CustomerAddressInput; }): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  updateCustomerEmail(input: UpdateCustomerEmailMutationVariables): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  upsellProduct(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<UpsellProductsQuery>>;

  urlResolver(url: string): Promise<ApolloQueryResult<UrlResolverQuery>>;

  wishlist(
    searchParams: WishlistQueryVariables,
    customQuery?: CustomQuery,
  ): Promise<ApolloQueryResult<WishlistQuery>>;
}
