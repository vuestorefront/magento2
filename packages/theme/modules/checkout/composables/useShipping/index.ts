import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import useCart from '~/modules/checkout/composables/useCart';
import type { ShippingCartAddress } from '~/modules/GraphQL/types';
import type {
  UseShippingErrors,
  UseShippingInterface,
  UseShippingLoadParams,
  UseShippingSaveParams,
} from './useShipping';

/**
 * Allows loading the shipping information for
 * the current cart and saving (selecting) other shipping information for the
 * same cart.
 *
 * See the {@link UseShippingInterface} for a list of methods and values available in this composable.
 */
export function useShipping(): UseShippingInterface {
  const loading = ref(false);
  const error = ref<UseShippingErrors>({ load: null, save: null });
  const { cart, load: loadCart } = useCart();
  const { app } = useContext();

  const load = async (params: UseShippingLoadParams = {}): Promise<ShippingCartAddress | null> => {
    Logger.debug('useShipping.load');
    let shippingInfo : ShippingCartAddress | null = null;

    try {
      loading.value = true;
      if (cart?.value?.shipping_addresses.length === 0) {
        await loadCart(params);
      }

      [shippingInfo] = cart.value.shipping_addresses;
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useShipping/load', err);
    } finally {
      loading.value = false;
    }
    return shippingInfo;
  };

  const save = async ({ shippingDetails }: UseShippingSaveParams): Promise<ShippingCartAddress | null> => {
    Logger.debug('useShipping.save');
    let shippingInfo : ShippingCartAddress | null = null;

    try {
      loading.value = true;

      const { id } = cart.value;

      const {
        apartment,
        neighborhood,
        extra,
        customerAddressId,
        ...address
      } = shippingDetails;

      const shippingData = customerAddressId
        ? { customer_address_id: customerAddressId }
        : {
          address: {
            ...address,
            street: [address.street, apartment, neighborhood, extra].filter(Boolean),
          },
        };

      const shippingAddressInput = {
        cart_id: id,
        shipping_addresses: [
          {
            ...shippingData,
          },
        ],
      };

      const { data } = await app.$vsf.$magento.api.setShippingAddressesOnCart(shippingAddressInput);

      Logger.debug('[Result]:', { data });

      [shippingInfo] = data.setShippingAddressesOnCart.cart.shipping_addresses;

      error.value.save = null;
    } catch (err) {
      error.value.save = err;
      Logger.error('useShipping/save', err);
    } finally {
      loading.value = false;
    }

    return shippingInfo;
  };

  return {
    load,
    save,
    error: readonly(error),
    loading: readonly(loading),
  };
}

export * from './useShipping';
export default useShipping;
