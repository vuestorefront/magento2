[@vue-storefront/magento-api](../README.md) / [Exports](../modules.md) / ApiClientSettings

# Interface: ApiClientSettings

## Table of contents

### Properties

- [api](apiclientsettings.md#api)
- [defaultStore](apiclientsettings.md#defaultstore)
- [externalCheckout](apiclientsettings.md#externalcheckout)
- [overrides](apiclientsettings.md#overrides)
- [storage](apiclientsettings.md#storage)
- [tax](apiclientsettings.md#tax)
- [websites](apiclientsettings.md#websites)

## Properties

### api

• `Optional` **api**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`uri` | *string* |

Defined in: [packages/api-client/src/types/index.ts:83](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L83)

___

### defaultStore

• **defaultStore**: *string*

Defined in: [packages/api-client/src/types/index.ts:95](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L95)

___

### externalCheckout

• **externalCheckout**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`cmsUrl` | *string* |
`enabled` | *boolean* |
`stores` | *Record*<string, ExternalCheckoutStore\> |

Defined in: [packages/api-client/src/types/index.ts:89](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L89)

___

### overrides

• **overrides**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`addConfigurableProductsToCart`? | (`input`: AddConfigurableProductsToCartInput) => *Promise*<ExecutionResult<AddConfigurableProductsToCartOutput\>\> |
`addSimpleProductsToCart`? | (`input`: AddSimpleProductsToCartInput) => *Promise*<ExecutionResult<AddSimpleProductsToCartOutput\>\> |
`applyCouponToCart`? | (`input`: ApplyCouponToCartInput) => *Promise*<ExecutionResult<ApplyCouponToCartOutput\>\> |
`cart`? | (`cartId`: *string*) => *Promise*<ApolloQueryResult<cartQuery\>\> |
`categoryList`? | (`categoryFilter?`: CategoryFilterInput) => *Promise*<ApolloQueryResult<categoryList\>\> |
`changeCustomerPassword`? | (`currentPassword`: *string*, `newPassword`: *string*) => *Promise*<Customer\> |
`cmsPage`? | (`indentifier`: *string*) => *Promise*<ApolloQueryResult<cmsPageQuery\>\> |
`createCustomer`? | (`input`: CustomerInput) => *Promise*<Customer\> |
`createEmptyCart`? | () => *Promise*<ExecutionResult<createEmptyCartMutation\>\> |
`customer`? | () => *Promise*<ApolloQueryResult<customerQuery\>\> |
`customerCart`? | () => *Promise*<ApolloQueryResult<cartQuery\>\> |
`generateCustomerToken`? | (`email`: *string*, `password`: *string*) => *Promise*<ExecutionResult<CustomerToken\>\> |
`mergeCarts`? | (`sourceCartId`: *string*, `destinationCartId`: *string*) => *Promise*<ExecutionResult<Cart\>\> |
`products`? | (`pageSize`: *number*, `currentPage`: *number*, `queryType`: [*ProductsQueryType*](../enums/productsquerytype.md), `search?`: *string*, `filter?`: ProductAttributeFilterInput, `sort?`: ProductAttributeSortInput) => *Promise*<ApolloQueryResult<Products\>\> |
`removeItemFromCart`? | (`input`: RemoveItemFromCartInput) => *Promise*<ExecutionResult<RemoveItemFromCartOutput\>\> |
`revokeCustomerToken` | () => *Promise*<boolean\> |
`storeConfig`? | () => *Promise*<ApolloQueryResult<storeConfigQuery\>\> |
`updateCartItems`? | (`input`: UpdateCartItemsInput) => *Promise*<ExecutionResult<UpdateCartItemsOutput\>\> |
`updateCustomer`? | (`input`: CustomerInput) => *Promise*<Customer\> |
`urlResolver`? | (`url`: *string*) => *Promise*<ApolloQueryResult<EntityUrl\>\> |

Defined in: [packages/api-client/src/types/index.ts:96](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L96)

___

### storage

• **storage**: [*Storage*](storage.md)

Defined in: [packages/api-client/src/types/index.ts:82](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L82)

___

### tax

• **tax**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`displayCartSubtotalIncludingTax` | *boolean* |

Defined in: [packages/api-client/src/types/index.ts:86](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L86)

___

### websites

• **websites**: *Record*<string, [*Website*](../modules.md#website)\>

Defined in: [packages/api-client/src/types/index.ts:94](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L94)
