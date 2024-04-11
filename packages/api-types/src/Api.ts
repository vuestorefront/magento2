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
  CategoryFilterInput,
  CategoryListQuery,
  CategoryListQueryVariables,
  CategoryResult,
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
  Maybe,
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
