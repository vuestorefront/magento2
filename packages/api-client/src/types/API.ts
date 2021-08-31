import { ApolloQueryResult, FetchPolicy, FetchResult } from '@apollo/client/core';
import { ExecutionResult } from 'graphql';
import { CustomQuery } from '@absolute-web/vsf-core';
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
  AvailableStoresQuery,
  BundleProduct,
  Cart as CartInterface,
  CartItemInterface,
  CartQuery,
  CategoryQuery,
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
  CurrencyQuery,
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
  SetShippingAddressesOnCartMutationFocus,
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartMutationFocus,
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
  CachedQuery,
} from './GraphQL';
import { SetPaymentMethodOnCartInputs } from '../api/setPaymentMethodOnCart';
import { CustomerProductReviewParams } from '../api/customerProductReview';
import { AddProductsToCartInput } from '../api/addProductsToCart';

export interface Product extends ProductInterface, ConfigurableProduct, Omit<BundleProduct, 'items'>, Omit<GroupedProduct, 'items'>, Omit<DownloadableProduct, 'items'>, Omit<VirtualProduct, 'items'> {
}

export type AddressOnCart = ShippingCartAddress;
export type AvailableStores = AvailableStoresQuery['availableStores'];
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
  addBundleProductsToCart(
    input: AddBundleProductsToCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<AddBundleProductsToCartMutation>>;

  addConfigurableProductsToCart(
    input: AddConfigurableProductsToCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<AddConfigurableProductsToCartMutation>>;

  addProductsToCart(
    input: AddProductsToCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<AddProductsToCartMutation>>;

  addProductToWishList(
    input: AddProductsToWishlistMutationVariables,
    customQuery?: CustomQuery
  ): Promise<FetchResult<AddProductsToWishlistMutation>>;

  addSimpleProductsToCart(
    input: AddSimpleProductsToCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<AddSimpleProductsToCartMutation>>;

  addDownloadableProductsToCart(
    input: AddDownloadableProductsToCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<AddDownloadableProductsToCartMutation>>;

  addVirtualProductsToCart(
    input: AddVirtualProductsToCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<AddVirtualProductsToCartMutation>>;

  applyCouponToCart(
    input: ApplyCouponToCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<ApplyCouponToCartMutation>>;

  availableStores(customQuery?: CustomQuery): Promise<ApolloQueryResult<CachedQuery<AvailableStoresQuery>>>;

  cart(
    cartId: string,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CartQuery>>;

  category(
    categoryInput?: CategorySearchQueryVariables,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<CategoryQuery>>>;

  categoryList(
    categoryFilter?: CategoryListQueryVariables,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<CategoryListQuery>>>;

  categorySearch(
    categoryFilter?: CategorySearchQueryVariables,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<CategorySearchQuery>>>;

  changeCustomerPassword(
    params: { currentPassword: string; newPassword: string },
    customQuery?: CustomQuery
  ): Promise<FetchResult<ChangeCustomerPasswordMutation>>;

  cmsBlocks(
    identifiers: string[],
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<CmsBlockQuery>>>;

  cmsPage(
    identifier: string,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<CmsPageQuery>>>;

  countries(customQuery?: CustomQuery): Promise<ApolloQueryResult<CachedQuery<CountriesListQuery>>>;

  country(
    id: string,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<CountryInformationQuery>>>;

  createCustomer(
    input: CustomerCreateInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<CreateCustomerMutation>>;

  createCustomerAddress(
    input: CustomerAddressInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<CreateCustomerAddressMutation>>;

  createEmptyCart(customQuery?: CustomQuery): Promise<FetchResult<CreateEmptyCartMutation>>;

  createProductReview(
    input: CreateProductReviewInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<CreateProductReviewMutation>>;

  currency(customQuery?: CustomQuery): Promise<FetchResult<CurrencyQuery>>

  customer(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerQuery>>;

  customerCart(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerCartQuery>>;

  customerOrders(
    searchParams: GetOrdersSearchParams,
    customQuery?: CustomQuery,
  ): Promise<ApolloQueryResult<CustomerOrdersQuery>>;

  customQuery<QUERY = any, QUERY_VARIABLES = any>(params: {
    query: QUERY,
    queryVariables?: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
  }): Promise<ApolloQueryResult<CachedQuery<QUERY>>>;

  customMutation<MUTATION = any, MUTATION_VARIABLES = any>(params: {
    mutation: MUTATION,
    mutationVariables: MUTATION_VARIABLES,
    fetchPolicy?: Extract<FetchPolicy, 'network-only' | 'no-cache'>,
  }): Promise<FetchResult<MUTATION>>;

  customerProductReview(
    input: CustomerProductReviewParams,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CustomerProductReviewQuery>>;

  deleteCustomerAddress(
    addressId: number,
    customQuery?: CustomQuery
  ): Promise<ExecutionResult<DeleteCustomerAddressMutation>>;

  generateCustomerToken(
    params: { email: string, password: string },
    customQuery?: CustomQuery
  ): Promise<FetchResult<GenerateCustomerTokenMutation>>;

  getAvailableCustomerPaymentMethods(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQuery>>;

  getAvailableCustomerShippingMethods(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQuery>>;

  getAvailablePaymentMethods(
    params: { cartId: string },
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQuery>>;

  getAvailableShippingMethods(
    params: { cartId: string },
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQuery>>;

  getCustomerAddresses(customQuery?: CustomQuery): Promise<ApolloQueryResult<GetCustomerAddressesQuery>>;

  mergeCarts(
    params: { sourceCartId: string; destinationCartId: string },
    customQuery?: CustomQuery
  ): Promise<FetchResult<MergeCartsMutation>>;

  placeOrder(
    input: PlaceOrderInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<PlaceOrderMutation>>;

  productDetail(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<ProductDetailsQuery>>>;

  productReview(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<ProductReviewQuery>>;

  productReviewRatingsMetadata(customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQuery>>;

  products(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<ProductsListQuery>>>;

  relatedProduct(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<RelatedProductQuery>>>;

  removeCouponFromCart(
    input: RemoveCouponFromCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<RemoveCouponFromCartMutation>>;

  removeItemFromCart(
    input: RemoveItemFromCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<RemoveItemFromCartMutation>>;

  removeProductsFromWishlist(
    input: RemoveProductsFromWishlistMutationVariables,
    customQuery?: CustomQuery
  ): Promise<FetchResult<RemoveProductsFromWishlistMutation>>;

  revokeCustomerToken(customQuery?: CustomQuery): Promise<FetchResult<RevokeCustomerTokenMutation>>;

  requestPasswordResetEmail(
    input: RequestPasswordResetEmailMutationVariables,
    customQuery?: CustomQuery): Promise<FetchResult<RequestPasswordResetEmailMutation>>;

  resetPassword(
    input: ResetPasswordMutationVariables,
    customQuery?: CustomQuery
  ): Promise<FetchResult<ResetPasswordMutation>>;

  setBillingAddressOnCart(
    input: SetBillingAddressOnCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<SetBillingAddressOnCartMutation>>;

  setGuestEmailOnCart(
    input: SetGuestEmailOnCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<SetGuestEmailOnCartMutation>>;

  setPaymentMethodOnCart(
    input: SetPaymentMethodOnCartInputs,
    customQuery?: CustomQuery
  ): Promise<FetchResult<SetPaymentMethodOnCartMutation>>;

  setShippingAddressesOnCart(
    input: SetShippingAddressesOnCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<SetShippingAddressesOnCartMutationFocus>>;

  setShippingMethodsOnCart(
    input: SetShippingMethodsOnCartInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<SetShippingMethodsOnCartMutationFocus>>;

  storeConfig(customQuery?: CustomQuery): Promise<ApolloQueryResult<StoreConfigQuery>>;

  subscribeEmailToNewsletter(
    input: SubscribeEmailToNewsletterMutationVariables,
    customQuery?: CustomQuery
  ): Promise<FetchResult<SubscribeEmailToNewsletterMutation>>;

  updateCartItems(
    input: UpdateCartItemsInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<UpdateCartItemsMutation>>;

  updateCustomer(
    input: CustomerUpdateInput,
    customQuery?: CustomQuery
  ): Promise<FetchResult<UpdateCustomerMutation>>;

  updateCustomerAddress(
    input: { addressId: number; input: CustomerAddressInput; },
    customQuery?: CustomQuery
  ): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  updateCustomerEmail(
    input: UpdateCustomerEmailMutationVariables,
    customQuery?: CustomQuery
  ): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  upsellProduct(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<UpsellProductsQuery>>>;

  urlResolver(
    url: string,
    customQuery?: CustomQuery
  ): Promise<ApolloQueryResult<CachedQuery<UrlResolverQuery>>>;

  wishlist(
    searchParams: WishlistQueryVariables,
    customQuery?: CustomQuery,
  ): Promise<ApolloQueryResult<WishlistQuery>>;
}
