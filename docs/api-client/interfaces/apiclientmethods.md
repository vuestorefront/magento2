[@vue-storefront/magento-api](../README.md) / [Exports](../modules.md) / ApiClientMethods

# Interface: ApiClientMethods

## Table of contents

### Methods

- [addConfigurableProductsToCart](apiclientmethods.md#addconfigurableproductstocart)
- [addSimpleProductsToCart](apiclientmethods.md#addsimpleproductstocart)
- [applyCouponToCart](apiclientmethods.md#applycoupontocart)
- [cart](apiclientmethods.md#cart)
- [categoryList](apiclientmethods.md#categorylist)
- [changeCustomerPassword](apiclientmethods.md#changecustomerpassword)
- [cmsPage](apiclientmethods.md#cmspage)
- [createCustomer](apiclientmethods.md#createcustomer)
- [createEmptyCart](apiclientmethods.md#createemptycart)
- [customer](apiclientmethods.md#customer)
- [customerCart](apiclientmethods.md#customercart)
- [generateCustomerToken](apiclientmethods.md#generatecustomertoken)
- [mergeCarts](apiclientmethods.md#mergecarts)
- [products](apiclientmethods.md#products)
- [removeItemFromCart](apiclientmethods.md#removeitemfromcart)
- [revokeCustomerToken](apiclientmethods.md#revokecustomertoken)
- [storeConfig](apiclientmethods.md#storeconfig)
- [updateCartItems](apiclientmethods.md#updatecartitems)
- [updateCustomer](apiclientmethods.md#updatecustomer)
- [urlResolver](apiclientmethods.md#urlresolver)

## Methods

### addConfigurableProductsToCart

▸ **addConfigurableProductsToCart**(`input`: AddConfigurableProductsToCartInput): *Promise*<ExecutionResult<AddConfigurableProductsToCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`input` | AddConfigurableProductsToCartInput |

**Returns:** *Promise*<ExecutionResult<AddConfigurableProductsToCartOutput\>\>

Defined in: [packages/api-client/src/types/index.ts:67](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L67)

___

### addSimpleProductsToCart

▸ **addSimpleProductsToCart**(`input`: AddSimpleProductsToCartInput): *Promise*<ExecutionResult<AddSimpleProductsToCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`input` | AddSimpleProductsToCartInput |

**Returns:** *Promise*<ExecutionResult<AddSimpleProductsToCartOutput\>\>

Defined in: [packages/api-client/src/types/index.ts:66](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L66)

___

### applyCouponToCart

▸ **applyCouponToCart**(`input`: ApplyCouponToCartInput): *Promise*<ExecutionResult<ApplyCouponToCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`input` | ApplyCouponToCartInput |

**Returns:** *Promise*<ExecutionResult<ApplyCouponToCartOutput\>\>

Defined in: [packages/api-client/src/types/index.ts:70](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L70)

___

### cart

▸ **cart**(`cartId`: *string*): *Promise*<ApolloQueryResult<cartQuery\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`cartId` | *string* |

**Returns:** *Promise*<ApolloQueryResult<cartQuery\>\>

Defined in: [packages/api-client/src/types/index.ts:65](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L65)

___

### categoryList

▸ **categoryList**(`categoryFilter?`: CategoryFilterInput): *Promise*<ApolloQueryResult<categoryList\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`categoryFilter?` | CategoryFilterInput |

**Returns:** *Promise*<ApolloQueryResult<categoryList\>\>

Defined in: [packages/api-client/src/types/index.ts:54](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L54)

___

### changeCustomerPassword

▸ **changeCustomerPassword**(`currentPassword`: *string*, `newPassword`: *string*): *Promise*<Customer\>

#### Parameters:

Name | Type |
:------ | :------ |
`currentPassword` | *string* |
`newPassword` | *string* |

**Returns:** *Promise*<Customer\>

Defined in: [packages/api-client/src/types/index.ts:76](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L76)

___

### cmsPage

▸ **cmsPage**(`indentifier`: *string*): *Promise*<ApolloQueryResult<cmsPageQuery\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`indentifier` | *string* |

**Returns:** *Promise*<ApolloQueryResult<cmsPageQuery\>\>

Defined in: [packages/api-client/src/types/index.ts:63](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L63)

___

### createCustomer

▸ **createCustomer**(`input`: CustomerInput): *Promise*<Customer\>

#### Parameters:

Name | Type |
:------ | :------ |
`input` | CustomerInput |

**Returns:** *Promise*<Customer\>

Defined in: [packages/api-client/src/types/index.ts:75](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L75)

___

### createEmptyCart

▸ **createEmptyCart**(): *Promise*<ExecutionResult<createEmptyCartMutation\>\>

**Returns:** *Promise*<ExecutionResult<createEmptyCartMutation\>\>

Defined in: [packages/api-client/src/types/index.ts:64](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L64)

___

### customer

▸ **customer**(): *Promise*<ApolloQueryResult<customerQuery\>\>

**Returns:** *Promise*<ApolloQueryResult<customerQuery\>\>

Defined in: [packages/api-client/src/types/index.ts:72](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L72)

___

### customerCart

▸ **customerCart**(): *Promise*<ApolloQueryResult<cartQuery\>\>

**Returns:** *Promise*<ApolloQueryResult<cartQuery\>\>

Defined in: [packages/api-client/src/types/index.ts:74](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L74)

___

### generateCustomerToken

▸ **generateCustomerToken**(`email`: *string*, `password`: *string*): *Promise*<ExecutionResult<CustomerToken\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`email` | *string* |
`password` | *string* |

**Returns:** *Promise*<ExecutionResult<CustomerToken\>\>

Defined in: [packages/api-client/src/types/index.ts:71](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L71)

___

### mergeCarts

▸ **mergeCarts**(`sourceCartId`: *string*, `destinationCartId`: *string*): *Promise*<ExecutionResult<Cart\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`sourceCartId` | *string* |
`destinationCartId` | *string* |

**Returns:** *Promise*<ExecutionResult<Cart\>\>

Defined in: [packages/api-client/src/types/index.ts:73](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L73)

___

### products

▸ **products**(`pageSize`: *number*, `currentPage`: *number*, `queryType`: [*ProductsQueryType*](../enums/productsquerytype.md), `search?`: *string*, `filter?`: ProductAttributeFilterInput, `sort?`: ProductAttributeSortInput): *Promise*<ApolloQueryResult<Products\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`pageSize` | *number* |
`currentPage` | *number* |
`queryType` | [*ProductsQueryType*](../enums/productsquerytype.md) |
`search?` | *string* |
`filter?` | ProductAttributeFilterInput |
`sort?` | ProductAttributeSortInput |

**Returns:** *Promise*<ApolloQueryResult<Products\>\>

Defined in: [packages/api-client/src/types/index.ts:56](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L56)

___

### removeItemFromCart

▸ **removeItemFromCart**(`input`: RemoveItemFromCartInput): *Promise*<ExecutionResult<RemoveItemFromCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`input` | RemoveItemFromCartInput |

**Returns:** *Promise*<ExecutionResult<RemoveItemFromCartOutput\>\>

Defined in: [packages/api-client/src/types/index.ts:69](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L69)

___

### revokeCustomerToken

▸ **revokeCustomerToken**(): *Promise*<boolean\>

**Returns:** *Promise*<boolean\>

Defined in: [packages/api-client/src/types/index.ts:77](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L77)

___

### storeConfig

▸ **storeConfig**(): *Promise*<ApolloQueryResult<storeConfigQuery\>\>

**Returns:** *Promise*<ApolloQueryResult<storeConfigQuery\>\>

Defined in: [packages/api-client/src/types/index.ts:62](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L62)

___

### updateCartItems

▸ **updateCartItems**(`input`: UpdateCartItemsInput): *Promise*<ExecutionResult<UpdateCartItemsOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`input` | UpdateCartItemsInput |

**Returns:** *Promise*<ExecutionResult<UpdateCartItemsOutput\>\>

Defined in: [packages/api-client/src/types/index.ts:68](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L68)

___

### updateCustomer

▸ **updateCustomer**(`input`: CustomerInput): *Promise*<Customer\>

#### Parameters:

Name | Type |
:------ | :------ |
`input` | CustomerInput |

**Returns:** *Promise*<Customer\>

Defined in: [packages/api-client/src/types/index.ts:78](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L78)

___

### urlResolver

▸ **urlResolver**(`url`: *string*): *Promise*<ApolloQueryResult<EntityUrl\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`url` | *string* |

**Returns:** *Promise*<ApolloQueryResult<EntityUrl\>\>

Defined in: [packages/api-client/src/types/index.ts:55](https://github.com/vuestorefront/magento2/blob/92b9847/packages/api-client/src/types/index.ts#L55)
