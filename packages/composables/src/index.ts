/* istanbul ignore file */

import useCategory from './composables/useCategory';
import useProduct from './composables/useProduct';
import useCart from './composables/useCart';
import useCheckout from './composables/useCheckout';
import useUser from './composables/useUser';
import useUserOrder from './composables/useUserOrder';
import usePage from './composables/usePage';
import useWishlist from './composables/useWishlist';
import useRouter from './composables/useRouter';
import useConfig from './composables/useConfig';
import useBilling from './composables/useBilling';
import useUserBilling from './composables/useUserBilling';
import useShipping from './composables/useShipping';
import useShippingProvider from './composables/useShippingProvider';
import useMakeOrder from './composables/useMakeOrder';

import { createApiClient } from '@vue-storefront/magento-api';
import { integrationPluginFactory } from '@vue-storefront/core';

const integrationPlugin = integrationPluginFactory(createApiClient);

import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters,
  wishlistGetters
} from './composables/getters';

export {
  useCategory,
  useProduct,
  useCart,
  useCheckout,
  useUser,
  useUserOrder,
  usePage,
  useWishlist,
  useRouter,
  useConfig,
  useBilling,
  useUserBilling,
  useShipping,
  useShippingProvider,
  useMakeOrder,
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters,
  wishlistGetters,
  integrationPlugin
};
