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
  Cart as CartInterface,
  CartItemInterface,
  CartQuery,
  CategoryFilterInput,
  CategoryListQuery,
  CategoryTree,
  CustomerInput,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductInterface,
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
  UpdateCustomerAddressMutation, UrlResloverQuery, WishlistQuery,
} from './GraphQL';

export type Cart = CartInterface;
export type CartItem = CartItemInterface;
export type Category = CategoryTree;
export type CategoryFilter = CategoryFilterInput;
export type Coupon = AppliedCoupon;
export type Customer = CustomerFragment;
export type CustomerUpdateParameters = CustomerInput;
export type Product = ProductInterface;
export type ProductAttributeFilter = ProductAttributeFilterInput;
export type ShippingMethod = Record<string, any>;
export type Wishlist = Record<string, any>;

export const enum ProductsQueryType {
  List = 'LIST',
  Detail = 'DETAIL',
}

export type GetProductSearchParams = {
  pageSize?: number;
  currentPage?: number;
  queryType?: ProductsQueryType;
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

  customerCart(): Promise<ApolloQueryResult<CartQuery>>;

  customerOrders(): Promise<ApolloQueryResult<CustomerOrdersQuery>>;

  deleteCustomerAddress(addressId: number): Promise<ExecutionResult<DeleteCustomerAddressMutation>>;

  generateCustomerToken(email: string, password: string): Promise<FetchResult<GenerateCustomerTokenMutation>>;

  getMenuCategory(params: CategoryFilterInput, customQuery?: CustomQuery): Promise<GetMenuCategoryQuery>;

  mergeCarts(sourceCartId: string, destinationCartId: string): Promise<FetchResult<MergeCartsMutation>>;

  placeOrder(input: PlaceOrderInput): Promise<FetchResult<PlaceOrderMutation>>;

  products(searchParams: GetProductSearchParams, customQuery?: CustomQuery): Promise<ApolloQueryResult<ProductDetailsQuery | ProductsListQuery>>;

  removeCouponFromCart(input: RemoveCouponFromCartInput): Promise<FetchResult<RemoveCouponFromCartMutation>>;

  removeItemFromCart(input: RemoveItemFromCartInput): Promise<FetchResult<RemoveItemFromCartMutation>>;

  revokeCustomerToken(): Promise<FetchResult<RevokeCustomerTokenMutation>>;

  setBillingAddress(input: SetBillingAddressOnCartInput): Promise<FetchResult<SetBillingAddressOnCartMutation>>;

  setGuestEmailOnCart(input: SetGuestEmailOnCartInput): Promise<FetchResult<SetGuestEmailOnCartMutation>>;

  setPaymentMethodOnCart(input: SetPaymentMethodOnCartInput): Promise<FetchResult<SetPaymentMethodOnCartMutation>>;

  setPaymentMethodOnCart(input: SetShippingAddressesOnCartInput): Promise<FetchResult<SetShippingAddressesOnCartMutation>>;

  setShippingMethodsOnCart(input: SetShippingMethodsOnCartInput): Promise<FetchResult<SetShippingMethodsOnCartMutation>>;

  storeConfig(): Promise<ApolloQueryResult<StoreConfigQuery>>;

  updateCartItems(input: UpdateCartItemsInput): Promise<FetchResult<UpdateCartItemsMutation>>;

  updateCustomer(input: CustomerInput): Promise<CustomerFragment>;

  updateCustomerAddress(input: CustomerAddressInput): Promise<FetchResult<UpdateCustomerAddressMutation>>;

  urlResolver(url: string): Promise<ApolloQueryResult<UrlResloverQuery>>;

  wishlist(): Promise<ApolloQueryResult<WishlistQuery>>;
}
