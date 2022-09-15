import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import useCart from '~/modules/checkout/composables/useCart';
import { setShippingMethodsOnCartCommand } from '~/modules/checkout/composables/useShippingProvider/commands/setShippingMethodsOnCartCommand';
import type { SetShippingMethodsOnCartInput } from '~/modules/GraphQL/types';
import type {
  UseShippingProviderErrors,
  UseShippingProviderInterface,
  UseShippingProviderLoadParams,
  UseShippingProviderSaveParams,
} from './useShippingProvider';

/**
 * Allows loading the shipping provider
 * for the current cart and saving (selecting) other shipping provider for the
 * same cart.
 *
 * See the {@link UseShippingProviderInterface} for a list of methods and values available in this composable.
 */
export function useShippingProvider(): UseShippingProviderInterface {
  const loading = ref(false);
  const error = ref<UseShippingProviderErrors>({
    load: null,
    save: null,
  });
  const { cart, setCart, load: loadCart } = useCart();
  const context = useContext();

  const save = async ({ shippingMethod, customQuery = null, customHeaders = {} }: UseShippingProviderSaveParams) => {
    Logger.debug('useShippingProvider.save');
    let result = null;
    try {
      loading.value = true;

      const shippingMethodParams: SetShippingMethodsOnCartInput = {
        cart_id: cart.value.id,
        shipping_methods: [shippingMethod],
      };

      const cartData = await setShippingMethodsOnCartCommand.execute(context, shippingMethodParams, customQuery, customHeaders);
      Logger.debug('[Result]:', { cartData });

      setCart(cartData);

      result = cartData.shipping_addresses[0].selected_shipping_method;

      error.value.save = null;
    } catch (err) {
      error.value.save = err;
      Logger.error('useShippingProvider/save', err);
    } finally {
      loading.value = false;
    }

    return result;
  };

  const load = async ({ customQuery = null, customHeaders = {} }: UseShippingProviderLoadParams = {}) => {
    Logger.debug('useShippingProvider.load');
    let result = null;
    try {
      loading.value = true;
      if (!cart?.value?.shipping_addresses[0]?.selected_shipping_method) {
        await loadCart({ customQuery, customHeaders });
      }

      result = cart.value?.shipping_addresses[0]?.selected_shipping_method;
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useShippingProvider/load', err);
    } finally {
      loading.value = false;
    }

    return result;
  };

  return {
    load,
    save,
    error: readonly(error),
    loading: readonly(loading),
  };
}

export * from './useShippingProvider';
export default useShippingProvider;
