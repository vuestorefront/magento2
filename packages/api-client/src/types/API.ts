import { ApolloQueryResult } from 'apollo-client';
import { ExecutionResult } from 'graphql';
import {
  AddConfigurableProductsToCartInput,
  AddConfigurableProductsToCartOutput,
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartOutput,
  AppliedCoupon, ApplyCouponToCartInput,
  ApplyCouponToCartOutput,
  Cart as CartInterface,
  CartItemInterface,
  cartQuery,
  CategoryFilterInput,
  categoryList,
  CategoryTree,
  cmsPageQuery,
  createEmptyCartMutation,
  Customer as CustomerInterface,
  CustomerInput,
  customerQuery,
  CustomerToken,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductInterface,
  Products,
  RemoveItemFromCartInput,
  RemoveItemFromCartOutput,
  storeConfigQuery,
  UpdateCartItemsInput,
  UpdateCartItemsOutput,
  urlResolver,
} from './GraphQL';

export type Cart = CartInterface;
export type CartItem = CartItemInterface;
export type Category = CategoryTree;
export type CategoryFilter = CategoryFilterInput;
export type Coupon = AppliedCoupon;
export type Customer = CustomerInterface;
export type CustomerUpdateParameters = CustomerInput;
export type Product = ProductInterface;
export type ProductAttributeFilter = ProductAttributeFilterInput;
export type ShippingMethod = Record<string, any>;
export type Wishlist = Record<string, any>;

export const enum ProductsQueryType {
  list = 'LIST',
  detail = 'DETAIL',
}

export interface MagentoApiMethods {
  categoryList(categoryFilter?: CategoryFilterInput): Promise<ApolloQueryResult<categoryList>>;

  urlResolver(url: string): Promise<ApolloQueryResult<urlResolver>>;

  products(pageSize: number,
    currentPage: number,
    queryType: ProductsQueryType,
    search?: string,
    filter?: ProductAttributeFilterInput,
    sort?: ProductAttributeSortInput): Promise<ApolloQueryResult<Products>>;

  storeConfig(): Promise<ApolloQueryResult<storeConfigQuery>>;

  cmsPage(indentifier: string): Promise<ApolloQueryResult<cmsPageQuery>>;

  createEmptyCart(): Promise<ExecutionResult<createEmptyCartMutation>>;

  cart(cartId: string): Promise<ApolloQueryResult<cartQuery>>;

  addSimpleProductsToCart(input: AddSimpleProductsToCartInput): Promise<ExecutionResult<AddSimpleProductsToCartOutput>>;

  addConfigurableProductsToCart(input: AddConfigurableProductsToCartInput): Promise<ExecutionResult<AddConfigurableProductsToCartOutput>>;

  updateCartItems(input: UpdateCartItemsInput): Promise<ExecutionResult<UpdateCartItemsOutput>>;

  removeItemFromCart(input: RemoveItemFromCartInput): Promise<ExecutionResult<RemoveItemFromCartOutput>>;

  applyCouponToCart(input: ApplyCouponToCartInput): Promise<ExecutionResult<ApplyCouponToCartOutput>>;

  generateCustomerToken(email: string, password: string): Promise<ExecutionResult<CustomerToken>>;

  customer(): Promise<ApolloQueryResult<customerQuery>>;

  mergeCarts(sourceCartId: string, destinationCartId: string): Promise<ExecutionResult<Cart>>;

  customerCart(): Promise<ApolloQueryResult<cartQuery>>;

  createCustomer(input: CustomerInput): Promise<Customer>;

  changeCustomerPassword(currentPassword: string, newPassword: string): Promise<Customer>;

  revokeCustomerToken(): Promise<boolean>;

  updateCustomer(input: CustomerInput): Promise<Customer>;
}
