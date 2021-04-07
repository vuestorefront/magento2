/* istanbul ignore file */
import { createApiClient } from '@vue-storefront/magento-api';
import { integrationPluginFactory } from '@vue-storefront/core';

import useBilling from './composables/useBilling';
import useCart from './composables/useCart';
import useCategory from './composables/useCategory';
import useCheckout from './composables/useCheckout';
import useConfig from './composables/useConfig';
import useFacet from './composables/useFacet';
import useMakeOrder from './composables/useMakeOrder';
import usePage from './composables/usePage';
import useProduct from './composables/useProduct';
import useReview from './composables/useReview';
import useRouter from './composables/useRouter';
import useShipping from './composables/useShipping';
import useShippingProvider from './composables/useShippingProvider';
import useUser from './composables/useUser';
import useUserBilling from './composables/useUserBilling';
import useUserOrder from './composables/useUserOrder';
import useUserShipping from './composables/useUserShipping';
import useWishlist from './composables/useWishlist';

export * from './composables/getters';

const integrationPlugin = integrationPluginFactory(createApiClient);

export {
  useBilling,
  useCart,
  useCategory,
  useCheckout,
  useConfig,
  useFacet,
  useMakeOrder,
  usePage,
  useProduct,
  useReview,
  useRouter,
  useShipping,
  useShippingProvider,
  useUser,
  useUserBilling,
  useUserOrder,
  useUserShipping,
  useWishlist,
  integrationPlugin
};
