import { ApolloQueryResult } from 'apollo-client';
import { ExecutionResult } from 'graphql';
import { FetchResult } from '@apollo/client';
import { CustomQuery } from '@vue-storefront/core';
import {
  AddConfigurableProductsToCartInput,
  AddConfigurableProductsToCartMutation,
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AppliedCoupon,
  ApplyCouponToCartInput,
  ApplyCouponToCartMutation,
  AvailableShippingMethod,
  BundleProduct,
  Cart as CartInterface,
  CartItemInterface,
  CartQuery,
  CategoryFilterInput,
  CategoryListQuery, CategoryListQueryVariables, CategorySearchQuery, CategorySearchQueryVariables,
  CategoryTree,
  CmsPage,
  CmsPageQuery,
  ConfigurableProduct, ConfigurableProductDetailQuery, CountriesListQuery, CountryInformationQuery,
  CreateCustomerAddressMutation,
  CreateEmptyCartMutation,
  CustomerAddress as CustomerAddressInterface,
  CustomerAddressInput,
  CustomerAvailablePaymentMethodsQuery, CustomerAvailableShippingMethodsQuery,
  CustomerCartQuery, CustomerCreateInput,
  CustomerDataFragment as CustomerFragment,
  CustomerOrder as CustomerOrderInterface,
  CustomerOrdersQuery,
  CustomerOrdersQueryVariables,
  CustomerQuery, CustomerUpdateInput,
  DeleteCustomerAddressMutation,
  GenerateCustomerTokenMutation,
  GetMenuCategoryQuery,
  GuestAvailablePaymentMethodsQuery, GuestAvailableShippingMethodsQuery,
  MergeCartsMutation,
  Order as OrderInterface,
  PlaceOrderInput,
  PlaceOrderMutation,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductDetailsQuery,
  ProductInterface,
  ProductReviewQuery,
  ProductsListQuery, RelatedProductQuery,
  RemoveCouponFromCartInput,
  RemoveCouponFromCartMutation,
  RemoveItemFromCartInput,
  RemoveItemFromCartMutation,
  RevokeCustomerTokenMutation,
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
  ShippingCartAddress,
  StoreConfigQuery,
  UpdateCartItemsInput,
  UpdateCartItemsMutation,
  UpdateCustomerAddressMutation, UpsellProductsQuery,
  UrlResloverQuery,
  Wishlist as WishlistInterface,
  WishlistItemInterface,
  WishlistQuery,
  WishlistQueryVariables,
} from './GraphQL';
import { getAvailableCustomerPaymentMethods, getAvailableCustomerShippingMethods } from '../api';

export interface Product extends ProductInterface, ConfigurableProduct, BundleProduct {}
export type AddressOnCart = ShippingCartAddress;
export type Cart = CartInterface;
export type CartItem = CartItemInterface;
export type Category = CategoryTree;
export type CategoryFilter = CategoryFilterInput;
export type Countries = CountriesListQuery['countries'][0];
export type CategoryMenu = CategoryTree;
export type Coupon = AppliedCoupon;
export type Customer = CustomerFragment;
export type CustomerAddress = CustomerAddressInterface;
export type CustomerOrder = CustomerOrderInterface;
export type CustomerUpdateParameters = CustomerCreateInput;
export type Order = OrderInterface;
export type Page = CmsPage;
export type ProductAttributeFilter = ProductAttributeFilterInput;
export type ProductReviews = ProductReviewQuery['products']['items'][0];
export type ProductReview = ProductReviewQuery['products']['items'][0]['reviews']['items'][0];
export type Route = UrlResloverQuery['urlResolver'];
export type ShippingMethod = AvailableShippingMethod;
export type StoreConfig = StoreConfigQuery['storeConfig'];
export type Wishlist = WishlistInterface;
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
};

export enum MagentoCustomerGender {
  Male = 1,
  Female = 2,
}

export interface MagentoApiMethods {
  addConfigurableProductsToCart(input: AddConfigurableProductsToCartInput): Promise<FetchResult<AddConfigurableProductsToCartMutation>>;

  addSimpleProductsToCart(input: AddSimpleProductsToCartInput): Promise<FetchResult<AddSimpleProductsToCartMutation>>;

  applyCouponToCart(input: ApplyCouponToCartInput): Promise<FetchResult<ApplyCouponToCartMutation>>;

  cart(cartId: string): Promise<ApolloQueryResult<CartQuery>>;

  categoryList(categoryFilter?: CategoryListQueryVariables): Promise<ApolloQueryResult<CategoryListQuery>>;

  categorySearch(categoryFilter?: CategorySearchQueryVariables): Promise<ApolloQueryResult<CategorySearchQuery>>;

  changeCustomerPassword(currentPassword: string, newPassword: string): Promise<CustomerFragment>;

  cmsPage(indentifier: string): Promise<ApolloQueryResult<CmsPageQuery>>;

  createCustomer(input: CustomerCreateInput): Promise<CustomerFragment>;

  createCustomerAddress(input: CustomerAddressInput): Promise<FetchResult<CreateCustomerAddressMutation>>;

  createEmptyCart(): Promise<FetchResult<CreateEmptyCartMutation>>;

  customer(): Promise<ApolloQueryResult<CustomerQuery>>;

  countries(): Promise<ApolloQueryResult<CountriesListQuery>>;

  country(id: string): Promise<ApolloQueryResult<CountryInformationQuery>>;

  customerCart(): Promise<ApolloQueryResult<CustomerCartQuery>>;

  customerOrders(orderParams: CustomerOrdersQueryVariables): Promise<ApolloQueryResult<CustomerOrdersQuery>>;

  deleteCustomerAddress(addressId: number): Promise<ExecutionResult<DeleteCustomerAddressMutation>>;

  generateCustomerToken(email: string, password: string): Promise<FetchResult<GenerateCustomerTokenMutation>>;

  getMenuCategory(params: CategoryFilterInput, customQuery?: CustomQuery): Promise<GetMenuCategoryQuery>;

  getAvailableCustomerPaymentMethods(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerAvailablePaymentMethodsQuery>>;

  getAvailableCustomerShippingMethods(customQuery?: CustomQuery): Promise<ApolloQueryResult<CustomerAvailableShippingMethodsQuery>>;

  getAvailablePaymentMethods(params: { cartId: string }, customQuery?: CustomQuery): Promise<ApolloQueryResult<GuestAvailablePaymentMethodsQuery>>;

  getAvailableShippingMethods(params: { cartId: string }, customQuery?: CustomQuery): Promise<ApolloQueryResult<GuestAvailableShippingMethodsQuery>>;

  mergeCarts(sourceCartId: string, destinationCartId: string): Promise<FetchResult<MergeCartsMutation>>;

  placeOrder(input: PlaceOrderInput): Promise<FetchResult<PlaceOrderMutation>>;

  productDetail(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductDetailsQuery>>;

  configurableProductDetail(
    searchParams: GetProductSearchParams,
    customQuery?: CustomQuery): Promise<ApolloQueryResult<ConfigurableProductDetailQuery>>;

  relatedProduct(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<RelatedProductQuery>>;

  upsellProduct(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<UpsellProductsQuery>>;

  productReview(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductReviewQuery>>;

  products(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductsListQuery>>;

  removeCouponFromCart(input: RemoveCouponFromCartInput): Promise<FetchResult<RemoveCouponFromCartMutation>>;

  removeItemFromCart(input: RemoveItemFromCartInput): Promise<FetchResult<RemoveItemFromCartMutation>>;

  revokeCustomerToken(): Promise<FetchResult<RevokeCustomerTokenMutation>>;

  setBillingAddressOnCart(input: SetBillingAddressOnCartInput): Promise<FetchResult<SetBillingAddressOnCartMutation>>;

  setGuestEmailOnCart(input: SetGuestEmailOnCartInput): Promise<FetchResult<SetGuestEmailOnCartMutation>>;

  setPaymentMethodOnCart(input: SetPaymentMethodOnCartInput): Promise<FetchResult<SetPaymentMethodOnCartMutation>>;

  setPaymentMethodOnCart(input: SetShippingAddressesOnCartInput): Promise<FetchResult<SetShippingAddressesOnCartMutation>>;

  setShippingMethodsOnCart(input: SetShippingMethodsOnCartInput): Promise<FetchResult<SetShippingMethodsOnCartMutation>>;

  setShippingAddressesOnCart(input: SetShippingAddressesOnCartInput): Promise<FetchResult<SetShippingAddressesOnCartMutation>>;

  storeConfig(): Promise<ApolloQueryResult<StoreConfigQuery>>;

  updateCartItems(input: UpdateCartItemsInput): Promise<FetchResult<UpdateCartItemsMutation>>;

  updateCustomer(input: CustomerUpdateInput): Promise<CustomerFragment>;

  updateCustomerAddress(input: {
    addressId: number;
    input: CustomerAddressInput;
  }): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  urlResolver(url: string): Promise<ApolloQueryResult<UrlResloverQuery>>;

  wishlist(queryParams: WishlistQueryVariables): Promise<ApolloQueryResult<WishlistQuery>>;
}
