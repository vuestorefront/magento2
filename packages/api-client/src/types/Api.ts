import {
  AppliedCoupon,
  Cart as CartInterface,
  CartItemInterface,
  CategoryFilterInput,
  CategoryTree,
  Customer as CustomerInterface,
  CustomerInput,
  ProductAttributeFilterInput,
  ProductInterface,
} from './GraphQL';

export type Cart = CartInterface;
export type Wishlist = {};
export type Product = ProductInterface;
export type Category = CategoryTree;
export type CategoryFilter = CategoryFilterInput;
export type ShippingMethod = {};
export type CartItem = CartItemInterface;
export type Coupon = AppliedCoupon;
export type Customer = CustomerInterface;
export type CustomerUpdateParameters = CustomerInput;

export type ProductAttributeFilter = ProductAttributeFilterInput;

export const enum ProductsQueryType {
  list = 'LIST',
  detail = 'DETAIL',
}
