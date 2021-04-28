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
  CartItemInterface,
  CartQuery,
  CategoryFilterInput,
  CategoryListQuery,
  CustomerInput,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  RemoveItemFromCartInput,
  UpdateCartItemsInput,
  CustomerFragmentFragment as CustomerFragment,
  CmsPageQuery,
  CustomerAddressInput,
  CreateCustomerAddressMutation,
  CreateEmptyCartMutation,
  CustomerQuery,
  CustomerOrdersQuery,
  DeleteCustomerAddressMutation,
  GenerateCustomerTokenMutation,
  GetMenuCategoryQuery,
  MergeCartsMutation,
  PlaceOrderInput,
  PlaceOrderMutation,
  ProductDetailsQuery,
  ProductsListQuery,
  RemoveCouponFromCartInput,
  RemoveCouponFromCartMutation,
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
  StoreConfigQuery,
  UpdateCartItemsMutation,
  UpdateCustomerAddressMutation,
  UrlResloverQuery,
  WishlistQuery,
  WishlistQueryVariables,
  CustomerOrdersQueryVariables,
  CustomerCartQuery,
  CartFragmentFragment,
  GuestAvailablePaymentMethodsQuery,
  CustomerAvailablePaymentMethodsQuery,
  CartProductFragmentFragment,
} from './GraphQL';

export type AddressOnCart = SetShippingAddressesOnCartMutation['setShippingAddressesOnCart']['cart']['shipping_addresses'][0];
export type Cart = CartFragmentFragment;
export type CartItem = CartProductFragmentFragment;
export type Category = CategoryListQuery['categoryList'][0];
export type CategoryFilter = CategoryFilterInput;
export type CategoryMenu = GetMenuCategoryQuery['categories']['items'][0];
export type Coupon = AppliedCoupon;
export type Customer = CustomerFragment;
export type CustomerAddress = CustomerFragment['addresses'];
export type CustomerOrder = CustomerOrdersQuery['customer']['orders']['items'][0];
export type CustomerUpdateParameters = CustomerInput;
export type Order = PlaceOrderMutation['placeOrder']['order'];
export type Page = CmsPageQuery['cmsPage'];
export type Product = ProductDetailsQuery['products']['items'][0];
export type ProductAttributeFilter = ProductAttributeFilterInput;
export type Route = UrlResloverQuery['urlResolver'];
export type ShippingMethod = Partial<SetShippingMethodsOnCartMutation['setShippingMethodsOnCart']['cart']['shipping_addresses'][0]['selected_shipping_method']>;
export type StoreConfig = StoreConfigQuery['storeConfig'];
export type Wishlist = WishlistQuery['customer']['wishlists'][0];
export type WishlistProduct = WishlistQuery['customer']['wishlists'][0]['items_v2']['items'][0];

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

export interface MagentoApiMethods {
  addConfigurableProductsToCart(input: AddConfigurableProductsToCartInput): Promise<FetchResult<AddConfigurableProductsToCartMutation>>;

  addSimpleProductsToCart(input: AddSimpleProductsToCartInput): Promise<FetchResult<AddSimpleProductsToCartMutation>>;

  applyCouponToCart(input: ApplyCouponToCartInput): Promise<FetchResult<ApplyCouponToCartMutation>>;

  cart(cartId: string): Promise<ApolloQueryResult<CartQuery>>;

  categoryList(categoryFilter?: CategoryFilterInput): Promise<ApolloQueryResult<CategoryListQuery>>;

  changeCustomerPassword(currentPassword: string, newPassword: string): Promise<CustomerFragment>;

  cmsPage(indentifier: string): Promise<ApolloQueryResult<CmsPageQuery>>;

  createCustomer(input: CustomerInput): Promise<CustomerFragment>;

  createCustomerAddress(input: CustomerAddressInput): Promise<FetchResult<CreateCustomerAddressMutation>>;

  createEmptyCart(): Promise<FetchResult<CreateEmptyCartMutation>>;

  customer(): Promise<ApolloQueryResult<CustomerQuery>>;

  customerCart(): Promise<ApolloQueryResult<CustomerCartQuery>>;

  customerOrders(orderParams: CustomerOrdersQueryVariables): Promise<ApolloQueryResult<CustomerOrdersQuery>>;

  deleteCustomerAddress(addressId: number): Promise<ExecutionResult<DeleteCustomerAddressMutation>>;

  generateCustomerToken(email: string, password: string): Promise<FetchResult<GenerateCustomerTokenMutation>>;

  getMenuCategory(params: CategoryFilterInput, customQuery?: CustomQuery): Promise<GetMenuCategoryQuery>;

  getAvailablePaymentMethods(params: { cartId: string }, customQuery?: CustomQuery): Promise<
  ApolloQueryResult<GuestAvailablePaymentMethodsQuery | CustomerAvailablePaymentMethodsQuery>
  >;

  mergeCarts(sourceCartId: string, destinationCartId: string): Promise<FetchResult<MergeCartsMutation>>;

  placeOrder(input: PlaceOrderInput): Promise<FetchResult<PlaceOrderMutation>>;

  productDetail(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductDetailsQuery>>;

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

  updateCustomer(input: CustomerInput): Promise<CustomerFragment>;

  updateCustomerAddress(input: {
    addressId: number;
    input: CustomerAddressInput;
  }): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  urlResolver(url: string): Promise<ApolloQueryResult<UrlResloverQuery>>;

  wishlist(queryParams: WishlistQueryVariables): Promise<ApolloQueryResult<WishlistQuery>>;
}
