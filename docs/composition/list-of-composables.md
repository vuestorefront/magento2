# List of composables

## `useAddresses`

Allows loading and manipulating addresses of the current user. These addresses can be used for both billing and shipping.

See the [UseAddressesInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/customer/composables/useAddresses/useAddresses.ts#L9) for more information.

## `useApi`

Allows executing arbitrary GraphQL queries and mutations.

See the [UseApiInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useApi/index.ts#L29) for more information.

## `useBilling`

Allows loading and saving billing information of the current cart.

See the [UseBillingInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/checkout/composables/useBilling/useBilling.ts#L54) for more information.

## `useCart`

Allows loading and manipulating cart of the current user.

See the [UseCartInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/checkout/composables/useCart/useCart.ts#L46) for more information.

## `useCategory`

Allows loading categories from Magento API. It is commonly used in navigation menus, and provides the load function and refs for the categories, loading and error.

See the [UseCategoryInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/catalog/category/composables/useCategory/useCategory.ts#L53) for more information.

## `useCategorySearch`

Allows searching for categories. It is commonly used in subtrees navigation.

See the [UseCategorySearchInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/catalog/category/composables/useCategorySearch/useCategorySearch.ts#L23) for more information.

## `useConfig`

Allows interacting with the store configuration.

See the [UseConfigInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useConfig/useConfig.ts#L23) for more information.

## `useContent`

Allows loading CMS Pages or Blocks from Magento API.

See the [UseContentInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useConfig/useConfig.ts#L23) for more information.

## `useCountrySearch`

Allows fetching a list of countries or a single country by ID

See the [UseCountrySearchInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useCountrySearch/useCountrySearch.ts#L30) for more information.

## `useCurrency`

Allows loading and changing the currency.

See the [UseCurrencyInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useCountrySearch/useCountrySearch.ts#L30) for more information.

## `useExternalCheckout` (Work in progress)

Allows redirecting to external checkout process. It depends on the [magento2-external-checkout repository](https://github.com/Vendic/magento2-external-checkout).

See the [UseExternalCheckoutInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useExternalCheckout/useExternalCheckout.ts#L12) for more information.

## `useFacet`

Allows searching for products with pagination, totals and sorting options.

See the [UseFacetInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/catalog/category/composables/useFacet/useFacet.ts#L58) for more information.

## `useForgotPassword`

Allows to request a password reset email and to set a new password to a user.

Se the [UseForgotPasswordInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/customer/composables/useForgotPassword/useForgotPassword.ts#L33) for more information.

## `useGetShippingMethods`

Allows fetching shipping methods available for a given cart.

See the [UseGetShippingMethodsInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/checkout/composables/useGetShippingMethods/useGetShippingMethods.ts#L14) for more information.

## `useGuestUser`

Allows to attach a guest cart to a user.

See the [UseGuestUserInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/customer/composables/useGuestUser/useGuestUser.ts#L20) for more information.

## `useImage`

Allows extracting image paths from magento URL.

See the [UseImageInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useImage/useImage.ts#L29) for more information.

## `useMagentoConfiguration`

Allows getting the Magento's major definitions, e.g., the selected currency, store, locale, and config object.

See the [UseMagentoConfigurationInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useMagentoConfiguration/UseMagentoConfiguration.ts#L7) for more information.

## `useMakeOrder`

Allows making an order from a cart.

See the [UseMakeOrderInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/checkout/composables/useMakeOrder/useMakeOrder.ts#L17) for more information.

## `useNewsletter`

Allows updating the subscription status of an email in the newsletter.

See the [UseNewsletterInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useNewsletter/useNewsletter.ts#L25) for more information.

## `usePaymentProvider`

Allows loading the available payment methods for current cart, and selecting (saving) one of them.

See the [UsePaymentProviderInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/checkout/composables/usePaymentProvider/usePaymentProvider.ts#L31) for more information.

## `useProduct`

Allows loading product details or list with params for sorting, filtering and pagination.

See the [UseProductInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/catalog/product/composables/useProduct/useProduct.ts#L25) for more information.

## `useRelatedProducts`

Allows searching for related products with params for sort, filter and pagination.

See the [UseRelatedProductsInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/catalog/product/composables/useRelatedProducts/useRelatedProducts.ts#L23) for more information.

## `useReview`

Allows loading and adding product reviews.

See the [UseReviewInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/review/composables/useReview/useReview.ts#L50) for more information.

## `useShipping`

Allows loading the shipping information for the current cart and saving (selecting) other shipping information for the same cart.

See the [UseShippingInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/checkout/composables/useShipping/useShipping.ts#L28) for more information.

## `useShippingProvider`

Allows loading the shipping provider for the current cart and saving (selecting) other shipping provider for the same cart.

See the [UseShippingProviderInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/checkout/composables/useShippingProvider/useShippingProvider.ts#L35) for more information.

## `useStore`

Allows loading and changing currently active store.

See the [UseStoreInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useStore/useStore.ts#L23) for more information.

## `useUiHelpers`

Allows handling the parameters for filtering, searching, sorting and pagination in the URL search/query params.

See the [UseUiHelpersInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useUiHelpers/useUiHelpers.ts#L8) for more information.

## `useUiNotification`

Allows managing and showing notifications to the user.

See the [UseUiNotificationInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useUiNotification/useUiNotification.ts#L22) for more information.

## `useUiState`

Global store for managing UI state.

See the [UseUiStateInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useUiState/useUiState.ts#L17) for more information.

## `useUpsellProducts`

Allows loading upsell products.

See the [UseUpsellProductsInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/catalog/product/composables/useUpsellProducts/useUpsellProducts.ts#L23) for more information.

## `useUrlResolver`

Allows searching the resolver for current route path (URL).

See the [UseUrlResolverInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/composables/useUrlResolver/UseUrlResolver.ts#L22) for more information.

## `useUser`

Allows loading and manipulating data of the current user.

See the [UseUserInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/customer/composables/useUser/useUser.ts#L61) for more information.

## `useUserAddress`

Allows loading and manipulating addresses of the current user.

See the [UseUserAddressInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/customer/composables/useUserAddress/useUserAddress.ts#L61) for more information.

## `useUserOrder`

Allows fetching customer orders.

See the [UseUserOrderInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/customer/composables/useUserOrder/useUserOrder.ts#L24) for more information.

## `useWishlist`

Allows loading and manipulating wishlist of the current user.

See the [UseWishlistInterface](https://github.com/vuestorefront/magento2/blob/main/packages/theme/modules/wishlist/composables/useWishlist/useWishlist.ts#L74) for more information.
