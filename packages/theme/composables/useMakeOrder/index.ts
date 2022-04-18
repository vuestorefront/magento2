import { ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { placeOrderCommand } from '~/composables/useMakeOrder/commands/placeOrderCommand';
import { useCart } from '~/composables';
import { Maybe, PlaceOrderOutput } from '~/modules/GraphQL/types';
import { UseMakeOrderErrors } from '~/composables/useMakeOrder/useMakeOrder';

export function useMakeOrder() {
  const loading = ref(false);
  const error = ref<UseMakeOrderErrors>({ make: null });
  const { cart } = useCart();
  const context = useContext();

  const make = async (): Promise<Maybe<PlaceOrderOutput>> => {
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
    loading,
    error,
  };
}

export default useMakeOrder;
