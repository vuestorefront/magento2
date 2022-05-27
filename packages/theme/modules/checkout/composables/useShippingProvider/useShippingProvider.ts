import type { Ref } from '@nuxtjs/composition-api';
import type { SelectedShippingMethod, ShippingMethodInput } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/composables/types';

/**
 * Errors that occured in the {@link useShippingProvider|useShippingProvider()} composable
 */
export interface UseShippingProviderErrors {
  /**
   * Contains error if `load` method failed, otherwise is `null`
   */
  load: Error | null;

  /**
   * Contains error if `save` method failed, otherwise is `null`
   */
  save: Error | null;
}

/**
 * The params object accepted by the `load` method in the {@link useShippingProvider|useShippingProvider()} composable
 */
export type UseShippingProviderLoadParams = ComposableFunctionArgs<{}>;

/**
 * The params object accepted by the `save` method in the {@link useShippingProvider|useShippingProvider()} composable
 */
export type UseShippingProviderSaveParams = ComposableFunctionArgs<{
  shippingMethod: ShippingMethodInput;
}>;

/**
 * Data and methods returned from the {@link useShippingProvider|useShippingProvider()} composable
 */
export interface UseShippingProviderInterface {
  /**
   * Contains errors from the composable methods
   */
  error: Readonly<Ref<UseShippingProviderErrors>>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Loads the shipping provider for current cart
   */
  load(params?: UseShippingProviderLoadParams): Promise<SelectedShippingMethod | null>;

  /**
   * Save new shipping provider for current cart
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#setShippingMethodsOnCart} API endpoint
   * and accepts the custom queries named `setShippingMethodsOnCart`.
   */
  save(params: UseShippingProviderSaveParams): Promise<SelectedShippingMethod | null>;
}
