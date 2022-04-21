import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { placeOrderCommand } from '~/composables/useMakeOrder/commands/placeOrderCommand';
import { useCart } from '~/composables';
import type { PlaceOrderOutput } from '~/modules/GraphQL/types';
import type { UseMakeOrderErrors, UseMakeOrderInterface } from './useMakeOrder';

/** The `useMakeOrder()` composable allows making an order. */
export function useMakeOrder(): UseMakeOrderInterface {
  const loading = ref(false);
  const error = ref<UseMakeOrderErrors>({ make: null });
  const { cart } = useCart();
  const context = useContext();

  const make = async (): Promise<PlaceOrderOutput | null> => {
    Logger.debug('useMakeOrder.make');
    let placedOrder = null;
    try {
      loading.value = true;
      placedOrder = await placeOrderCommand.execute(context, cart.value.id);
      error.value.make = null;
    } catch (err) {
      error.value.make = err;
      Logger.error('useMakeOrder.make', err);
    } finally {
      loading.value = false;
    }

    return placedOrder;
  };

  return {
    make,
    error: readonly(error),
    loading: readonly(loading),
  };
}

export * from './useMakeOrder';
export default useMakeOrder;
