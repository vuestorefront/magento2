[@vue-storefront/magento-api](../README.md) / [Modules](../modules.md) / api

# Module: api

## Table of contents

### Functions

- [addConfigurableProductsToCart](api.md#addconfigurableproductstocart)
- [addSimpleProductsToCart](api.md#addsimpleproductstocart)
- [applyCouponToCart](api.md#applycoupontocart)
- [cart](api.md#cart)
- [categoryList](api.md#categorylist)
- [changeCustomerPassword](api.md#changecustomerpassword)
- [cmsPage](api.md#cmspage)
- [createCustomer](api.md#createcustomer)
- [createEmptyCart](api.md#createemptycart)
- [customer](api.md#customer)
- [customerCart](api.md#customercart)
- [customerOrders](api.md#customerorders)
- [generateCustomerToken](api.md#generatecustomertoken)
- [mergeCarts](api.md#mergecarts)
- [placeOrder](api.md#placeorder)
- [products](api.md#products)
- [removeItemFromCart](api.md#removeitemfromcart)
- [revokeCustomerToken](api.md#revokecustomertoken)
- [setBillingAddressOnCart](api.md#setbillingaddressoncart)
- [setGuestEmailOnCart](api.md#setguestemailoncart)
- [setPaymentMethodOnCart](api.md#setpaymentmethodoncart)
- [setShippingAddressesOnCart](api.md#setshippingaddressesoncart)
- [setShippingMethodsOnCart](api.md#setshippingmethodsoncart)
- [storeConfig](api.md#storeconfig)
- [updateCartItems](api.md#updatecartitems)
- [updateCustomer](api.md#updatecustomer)
- [updateCustomerAddress](api.md#updatecustomeraddress)
- [urlResolver](api.md#urlresolver)
- [wishlist](api.md#wishlist)

## Functions

### addConfigurableProductsToCart

▸ `Const`**addConfigurableProductsToCart**(`__namedParameters`: *Object*, `input`: AddConfigurableProductsToCartInput): *Promise*<ExecutionResult<AddConfigurableProductsToCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | AddConfigurableProductsToCartInput |

**Returns:** *Promise*<ExecutionResult<AddConfigurableProductsToCartOutput\>\>

Defined in: [packages/api-client/src/api/addConfigurableProductsToCart/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/addConfigurableProductsToCart/index.ts#L5)

___

### addSimpleProductsToCart

▸ `Const`**addSimpleProductsToCart**(`__namedParameters`: *Object*, `input`: AddSimpleProductsToCartInput): *Promise*<ExecutionResult<AddSimpleProductsToCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | AddSimpleProductsToCartInput |

**Returns:** *Promise*<ExecutionResult<AddSimpleProductsToCartOutput\>\>

Defined in: [packages/api-client/src/api/addSimpleProductsToCart/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/addSimpleProductsToCart/index.ts#L5)

___

### applyCouponToCart

▸ `Const`**applyCouponToCart**(`__namedParameters`: *Object*, `input`: ApplyCouponToCartInput): *Promise*<ExecutionResult<ApplyCouponToCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | ApplyCouponToCartInput |

**Returns:** *Promise*<ExecutionResult<ApplyCouponToCartOutput\>\>

Defined in: [packages/api-client/src/api/applyCouponToCart/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/applyCouponToCart/index.ts#L5)

___

### cart

▸ `Const`**cart**(`__namedParameters`: *Object*, `cartId`: *string*): *Promise*<ApolloQueryResult<cartQuery\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`cartId` | *string* |

**Returns:** *Promise*<ApolloQueryResult<cartQuery\>\>

Defined in: [packages/api-client/src/api/cart/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/cart/index.ts#L5)

___

### categoryList

▸ `Const`**categoryList**(`__namedParameters`: *Object*, `filters`: CategoryFilterInput): *Promise*<ApolloQueryResult<CategoryTree[]\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`filters` | CategoryFilterInput |

**Returns:** *Promise*<ApolloQueryResult<CategoryTree[]\>\>

Defined in: [packages/api-client/src/api/categoryList/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/categoryList/index.ts#L5)

___

### changeCustomerPassword

▸ `Const`**changeCustomerPassword**(`__namedParameters`: *Object*, `currentPassword`: *string*, `newPassword`: *string*): *Promise*<Customer\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`currentPassword` | *string* |
`newPassword` | *string* |

**Returns:** *Promise*<Customer\>

Defined in: [packages/api-client/src/api/changeCustomerPassword/index.ts:4](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/changeCustomerPassword/index.ts#L4)

___

### cmsPage

▸ `Const`**cmsPage**(`__namedParameters`: *Object*, `identifier`: *string*): *Promise*<ApolloQueryResult<cmsPageQuery\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`identifier` | *string* |

**Returns:** *Promise*<ApolloQueryResult<cmsPageQuery\>\>

Defined in: [packages/api-client/src/api/cmsPage/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/cmsPage/index.ts#L5)

___

### createCustomer

▸ `Const`**createCustomer**(`__namedParameters`: *Object*, `input`: CustomerInput): *Promise*<Customer\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | CustomerInput |

**Returns:** *Promise*<Customer\>

Defined in: [packages/api-client/src/api/createCustomer/index.ts:4](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/createCustomer/index.ts#L4)

___

### createEmptyCart

▸ `Const`**createEmptyCart**(`__namedParameters`: *Object*): *Promise*<ExecutionResult<createEmptyCartMutation\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *Promise*<ExecutionResult<createEmptyCartMutation\>\>

Defined in: [packages/api-client/src/api/createEmptyCart/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/createEmptyCart/index.ts#L5)

___

### customer

▸ `Const`**customer**(`__namedParameters`: *Object*): *Promise*<ApolloQueryResult<customerQuery\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *Promise*<ApolloQueryResult<customerQuery\>\>

Defined in: [packages/api-client/src/api/customer/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/customer/index.ts#L5)

___

### customerCart

▸ `Const`**customerCart**(`__namedParameters`: *Object*): *Promise*<ApolloQueryResult<cartQuery\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *Promise*<ApolloQueryResult<cartQuery\>\>

Defined in: [packages/api-client/src/api/customerCart/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/customerCart/index.ts#L5)

___

### customerOrders

▸ `Const`**customerOrders**(`__namedParameters`: *Object*): *Promise*<ApolloQueryResult<customerOrdersQuery\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *Promise*<ApolloQueryResult<customerOrdersQuery\>\>

Defined in: [packages/api-client/src/api/customerOrders/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/customerOrders/index.ts#L5)

___

### generateCustomerToken

▸ `Const`**generateCustomerToken**(`__namedParameters`: *Object*, `email`: *string*, `password`: *string*): *Promise*<ExecutionResult<CustomerToken\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`email` | *string* |
`password` | *string* |

**Returns:** *Promise*<ExecutionResult<CustomerToken\>\>

Defined in: [packages/api-client/src/api/generateCustomerToken/index.ts:6](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/generateCustomerToken/index.ts#L6)

___

### mergeCarts

▸ `Const`**mergeCarts**(`__namedParameters`: *Object*, `sourceCartId`: *string*, `destinationCartId`: *string*): *Promise*<ExecutionResult<Cart\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`sourceCartId` | *string* |
`destinationCartId` | *string* |

**Returns:** *Promise*<ExecutionResult<Cart\>\>

Defined in: [packages/api-client/src/api/mergeCarts/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/mergeCarts/index.ts#L5)

___

### placeOrder

▸ `Const`**placeOrder**(`__namedParameters`: *Object*, `input`: PlaceOrderInput): *Promise*<ExecutionResult<PlaceOrderOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | PlaceOrderInput |

**Returns:** *Promise*<ExecutionResult<PlaceOrderOutput\>\>

Defined in: [packages/api-client/src/api/placeOrder/index.ts:8](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/placeOrder/index.ts#L8)

___

### products

▸ `Const`**products**(`__namedParameters`: *Object*, `pageSize?`: *number*, `currentPage?`: *number*, `queryType?`: ProductsQueryType, `search?`: *string*, `filter?`: ProductAttributeFilterInput, `sort?`: ProductAttributeSortInput): *Promise*<ApolloQueryResult<Products\>\>

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`__namedParameters` | *Object* | - |
`pageSize` | *number* | 20 |
`currentPage` | *number* | 1 |
`queryType` | ProductsQueryType | - |
`search?` | *string* | - |
`filter?` | ProductAttributeFilterInput | - |
`sort?` | ProductAttributeSortInput | - |

**Returns:** *Promise*<ApolloQueryResult<Products\>\>

Defined in: [packages/api-client/src/api/products/index.ts:18](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/products/index.ts#L18)

___

### removeItemFromCart

▸ `Const`**removeItemFromCart**(`__namedParameters`: *Object*, `input`: RemoveItemFromCartInput): *Promise*<ExecutionResult<RemoveItemFromCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | RemoveItemFromCartInput |

**Returns:** *Promise*<ExecutionResult<RemoveItemFromCartOutput\>\>

Defined in: [packages/api-client/src/api/removeItemFromCart/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/removeItemFromCart/index.ts#L5)

___

### revokeCustomerToken

▸ `Const`**revokeCustomerToken**(`__namedParameters`: *Object*): *Promise*<boolean\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *Promise*<boolean\>

Defined in: [packages/api-client/src/api/revokeCustomerToken/index.ts:3](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/revokeCustomerToken/index.ts#L3)

___

### setBillingAddressOnCart

▸ `Const`**setBillingAddressOnCart**(`__namedParameters`: *Object*, `input`: SetBillingAddressOnCartInput): *Promise*<ExecutionResult<SetBillingAddressOnCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | SetBillingAddressOnCartInput |

**Returns:** *Promise*<ExecutionResult<SetBillingAddressOnCartOutput\>\>

Defined in: [packages/api-client/src/api/setBillingAddressOnCart/index.ts:8](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/setBillingAddressOnCart/index.ts#L8)

___

### setGuestEmailOnCart

▸ `Const`**setGuestEmailOnCart**(`__namedParameters`: *Object*, `input`: SetGuestEmailOnCartInput): *Promise*<ExecutionResult<SetGuestEmailOnCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | SetGuestEmailOnCartInput |

**Returns:** *Promise*<ExecutionResult<SetGuestEmailOnCartOutput\>\>

Defined in: [packages/api-client/src/api/setGuestEmailOnCart/index.ts:8](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/setGuestEmailOnCart/index.ts#L8)

___

### setPaymentMethodOnCart

▸ `Const`**setPaymentMethodOnCart**(`__namedParameters`: *Object*, `input`: SetPaymentMethodOnCartInput): *Promise*<ExecutionResult<SetPaymentMethodOnCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | SetPaymentMethodOnCartInput |

**Returns:** *Promise*<ExecutionResult<SetPaymentMethodOnCartOutput\>\>

Defined in: [packages/api-client/src/api/setPaymentMethodOnCart/index.ts:8](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/setPaymentMethodOnCart/index.ts#L8)

___

### setShippingAddressesOnCart

▸ `Const`**setShippingAddressesOnCart**(`__namedParameters`: *Object*, `input`: SetShippingAddressesOnCartInput): *Promise*<ExecutionResult<SetShippingAddressesOnCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | SetShippingAddressesOnCartInput |

**Returns:** *Promise*<ExecutionResult<SetShippingAddressesOnCartOutput\>\>

Defined in: [packages/api-client/src/api/setShippingAddressesOnCart/index.ts:8](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/setShippingAddressesOnCart/index.ts#L8)

___

### setShippingMethodsOnCart

▸ `Const`**setShippingMethodsOnCart**(`__namedParameters`: *Object*, `input`: SetShippingMethodsOnCartInput): *Promise*<ExecutionResult<SetShippingMethodsOnCartOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | SetShippingMethodsOnCartInput |

**Returns:** *Promise*<ExecutionResult<SetShippingMethodsOnCartOutput\>\>

Defined in: [packages/api-client/src/api/setShippingMethodsOnCart/index.ts:8](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/setShippingMethodsOnCart/index.ts#L8)

___

### storeConfig

▸ `Const`**storeConfig**(`__namedParameters`: *Object*): *Promise*<ApolloQueryResult<storeConfigQuery\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *Promise*<ApolloQueryResult<storeConfigQuery\>\>

Defined in: [packages/api-client/src/api/storeConfig/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/storeConfig/index.ts#L5)

___

### updateCartItems

▸ `Const`**updateCartItems**(`__namedParameters`: *Object*, `input`: UpdateCartItemsInput): *Promise*<ExecutionResult<UpdateCartItemsOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | UpdateCartItemsInput |

**Returns:** *Promise*<ExecutionResult<UpdateCartItemsOutput\>\>

Defined in: [packages/api-client/src/api/updateCartItems/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/updateCartItems/index.ts#L5)

___

### updateCustomer

▸ `Const`**updateCustomer**(`__namedParameters`: *Object*, `input`: CustomerInput): *Promise*<Customer\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | CustomerInput |

**Returns:** *Promise*<Customer\>

Defined in: [packages/api-client/src/api/updateCustomer/index.ts:4](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/updateCustomer/index.ts#L4)

___

### updateCustomerAddress

▸ `Const`**updateCustomerAddress**(`__namedParameters`: *Object*, `input`: CustomerAddressInput): *Promise*<ExecutionResult<CustomerAddress\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`input` | CustomerAddressInput |

**Returns:** *Promise*<ExecutionResult<CustomerAddress\>\>

Defined in: [packages/api-client/src/api/updateCustomerAddress/index.ts:8](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/updateCustomerAddress/index.ts#L8)

___

### urlResolver

▸ `Const`**urlResolver**(`__namedParameters`: *Object*, `url`: *string*): *Promise*<ApolloQueryResult<EntityUrl\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |
`url` | *string* |

**Returns:** *Promise*<ApolloQueryResult<EntityUrl\>\>

Defined in: [packages/api-client/src/api/urlResolver/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/urlResolver/index.ts#L5)

___

### wishlist

▸ `Const`**wishlist**(`__namedParameters`: *Object*): *Promise*<ApolloQueryResult<wishlistOutput\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *Object* |

**Returns:** *Promise*<ApolloQueryResult<wishlistOutput\>\>

Defined in: [packages/api-client/src/api/wishlist/index.ts:5](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/api/wishlist/index.ts#L5)
