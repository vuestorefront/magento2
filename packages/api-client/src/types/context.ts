import { ApiClientMethods, IntegrationContext } from '@vue-storefront/core';
import { ApolloQueryResult } from 'apollo-client';
import { ExecutionResult } from 'graphql';
import {
  AddConfigurableProductsToCartInput,
  AddConfigurableProductsToCartOutput,
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartOutput,
  ApplyCouponToCartInput,
  ApplyCouponToCartOutput,
  CartQuery,
  CategoryFilterInput,
  CategoryList,
  CmsPageQuery,
  CreateEmptyCartMutation,
  CustomerInput,
  CustomerQuery,
  CustomerToken,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  Products,
  RemoveItemFromCartInput,
  RemoveItemFromCartOutput,
  StoreConfigQuery,
  UpdateCartItemsInput,
  UpdateCartItemsOutput,
  UrlResolver,
} from './GraphQL';
import { Cart, Customer, ProductsQueryType } from './Api';
import { ClientInstance, Config } from './setup';

export interface MagentoMethods {
  categoryList(categoryFilter?: CategoryFilterInput): Promise<ApolloQueryResult<CategoryList>>;

  urlResolver(url: string): Promise<ApolloQueryResult<UrlResolver>>;

  products(pageSize: number,
    currentPage: number,
    queryType: ProductsQueryType,
    search?: string,
    filter?: ProductAttributeFilterInput,
    sort?: ProductAttributeSortInput): Promise<ApolloQueryResult<Products>>;

  storeConfig(): Promise<ApolloQueryResult<StoreConfigQuery>>;

  cmsPage(indentifier: string): Promise<ApolloQueryResult<CmsPageQuery>>;

  createEmptyCart(): Promise<ExecutionResult<CreateEmptyCartMutation>>;

  cart(cartId: string): Promise<ApolloQueryResult<CartQuery>>;

  addSimpleProductsToCart(input: AddSimpleProductsToCartInput): Promise<ExecutionResult<AddSimpleProductsToCartOutput>>;

  addConfigurableProductsToCart(input: AddConfigurableProductsToCartInput): Promise<ExecutionResult<AddConfigurableProductsToCartOutput>>;

  updateCartItems(input: UpdateCartItemsInput): Promise<ExecutionResult<UpdateCartItemsOutput>>;

  removeItemFromCart(input: RemoveItemFromCartInput): Promise<ExecutionResult<RemoveItemFromCartOutput>>;

  applyCouponToCart(input: ApplyCouponToCartInput): Promise<ExecutionResult<ApplyCouponToCartOutput>>;

  generateCustomerToken(email: string, password: string): Promise<ExecutionResult<CustomerToken>>;

  customer(): Promise<ApolloQueryResult<CustomerQuery>>;

  mergeCarts(sourceCartId: string, destinationCartId: string): Promise<ExecutionResult<Cart>>;

  customerCart(): Promise<ApolloQueryResult<CartQuery>>;

  createCustomer(input: CustomerInput): Promise<Customer>;

  changeCustomerPassword(currentPassword: string, newPassword: string): Promise<Customer>;

  revokeCustomerToken(): Promise<boolean>;

  updateCustomer(input: CustomerInput): Promise<Customer>;
}

export type Context = IntegrationContext<ClientInstance, Config, ApiClientMethods<MagentoMethods>>;
