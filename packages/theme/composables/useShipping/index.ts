import { ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '@vue-storefront/core';
import { useCart } from '~/composables';
import { UseShippingInterface, ShippingCartAddress } from '~/composables/useShipping/useShipping';

export function useShipping(): UseShippingInterface<ShippingCartAddress> {
  const loading = ref(false);
  const error = ref({ load: null, save: null });
  const { cart, load: loadCart } = useCart();
  const { app } = useContext();

  const load = async (params = {}): Promise<ShippingCartAddress | {}> => {
    Logger.debug('useShipping.load');
    let shippingInfo = null;

    try {
      loading.value = true;
      if (!cart?.value?.shipping_addresses) {
        await loadCart(params);
      }

      [shippingInfo] = cart.value.shipping_addresses;
      error.value.load = null;

      return shippingInfo;
    } catch (err) {
      error.value.load = err;
      Logger.error('useShipping/load', err);
    } finally {
      loading.value = false;
    }

    return {};
  };

  const save = async ({ shippingDetails }): Promise<ShippingCartAddress | {}> => {
    Logger.debug('useShipping.save');
    let shippingInfo = null;

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
        ? ({
          customer_address_id: customerAddressId,
        })
        : ({
          address: {
            ...address,
            street: [address.street, apartment, neighborhood, extra].filter(Boolean),
          },
        });

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

      [shippingInfo] = data
        .setShippingAddressesOnCart
        .cart
        .shipping_addresses;

      error.value.save = null;

      return shippingInfo;
    } catch (err) {
      error.value.save = err;
      Logger.error('useShipping/save', err);
    } finally {
      loading.value = false;
    }

    return {};
  };

  return {
    loading,
    error,
    load,
    save,
  };
}

export default useShipping;