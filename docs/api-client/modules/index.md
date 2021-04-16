[@vue-storefront/magento-api](../README.md) / [Modules](../modules.md) / index

# Module: index

## Table of contents

### Enumerations

- [ProductsQueryType](../enums/index.productsquerytype.md)

### Interfaces

- [ApiClientMethods](../interfaces/index.apiclientmethods.md)
- [ApiClientSettings](../interfaces/index.apiclientsettings.md)
- [Storage](../interfaces/index.storage.md)

### Type aliases

- [Cart](index.md#cart)
- [CartItem](index.md#cartitem)
- [Category](index.md#category)
- [CategoryFilter](index.md#categoryfilter)
- [Coupon](index.md#coupon)
- [Customer](index.md#customer)
- [CustomerUpdateParameters](index.md#customerupdateparameters)
- [Product](index.md#product)
- [ProductAttributeFilter](index.md#productattributefilter)
- [ShippingMethod](index.md#shippingmethod)
- [Store](index.md#store)
- [StoreGroup](index.md#storegroup)
- [Website](index.md#website)
- [Wishlist](index.md#wishlist)

### Variables

- [createApiClient](index.md#createapiclient)

## Type aliases

### Cart

Ƭ **Cart**: CartInterface

Defined in: [packages/api-client/src/types/index.ts:35](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L35)

___

### CartItem

Ƭ **CartItem**: CartItemInterface

Defined in: [packages/api-client/src/types/index.ts:41](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L41)

___

### Category

Ƭ **Category**: CategoryTree

Defined in: [packages/api-client/src/types/index.ts:38](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L38)

___

### CategoryFilter

Ƭ **CategoryFilter**: CategoryFilterInput

Defined in: [packages/api-client/src/types/index.ts:39](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L39)

___

### Coupon

Ƭ **Coupon**: AppliedCoupon

Defined in: [packages/api-client/src/types/index.ts:42](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L42)

___

### Customer

Ƭ **Customer**: CustomerInterface

Defined in: [packages/api-client/src/types/index.ts:43](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L43)

___

### CustomerUpdateParameters

Ƭ **CustomerUpdateParameters**: CustomerInput

Defined in: [packages/api-client/src/types/index.ts:44](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L44)

___

### Product

Ƭ **Product**: ProductInterface

Defined in: [packages/api-client/src/types/index.ts:37](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L37)

___

### ProductAttributeFilter

Ƭ **ProductAttributeFilter**: ProductAttributeFilterInput

Defined in: [packages/api-client/src/types/index.ts:46](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L46)

___

### ShippingMethod

Ƭ **ShippingMethod**: *object*

#### Type declaration:

Defined in: [packages/api-client/src/types/index.ts:40](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L40)

___

### Store

Ƭ **Store**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`code` | *string* |
`storeGroup`? | [*StoreGroup*](index.md#storegroup) |

Defined in: [packages/api-client/src/types/index.ts:152](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L152)

___

### StoreGroup

Ƭ **StoreGroup**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`code` | *string* |
`defaultStore` | *string* |
`stores` | *Record*<string, [*Store*](index.md#store)\> |
`website`? | [*Website*](index.md#website) |

Defined in: [packages/api-client/src/types/index.ts:145](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L145)

___

### Website

Ƭ **Website**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`code` | *string* |
`defaultStoreGroup` | *string* |
`storeGroups` | *Record*<string, [*StoreGroup*](index.md#storegroup)\> |

Defined in: [packages/api-client/src/types/index.ts:139](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L139)

___

### Wishlist

Ƭ **Wishlist**: *object*

#### Type declaration:

Defined in: [packages/api-client/src/types/index.ts:36](https://github.com/vuestorefront/magento2/blob/9cc19fe/packages/api-client/src/types/index.ts#L36)

## Variables

### createApiClient

• **createApiClient**: (`config`: *any*, `customApi?`: *any*) => ApiClientInstance

#### Type declaration:

▸ (`config`: *any*, `customApi?`: *any*): ApiClientInstance

#### Parameters:

Name | Type |
:------ | :------ |
`config` | *any* |
`customApi?` | *any* |

**Returns:** ApiClientInstance

Defined in: node_modules/@vue-storefront/core/lib/src/factories/apiClientFactory.d.ts:19

Name | Type |
:------ | :------ |
`tag` | *string* |
