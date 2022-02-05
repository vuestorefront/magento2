import { computed, Ref } from '@vue/composition-api';
import { Context, FactoryParams, PlatformApi, sharedRef, Logger, configureFactoryParams, ComposableFunctionArgs } from '@absolute-web/vsf-core';
import { UseMakeOrder, UseMakeOrderErrors } from '../types/composables';

export interface UseMakeOrderFactoryParams<ORDER, PAYMENT_METHOD, API extends PlatformApi = any> extends FactoryParams<API> {
  make: (context: Context, params: ComposableFunctionArgs<{}>) => Promise<ORDER>;
  setPaymentAndMake: (context: Context, params: ComposableFunctionArgs<{ paymentMethod: PAYMENT_METHOD }>) => Promise<ORDER>;
}

export const useMakeOrderFactory = <ORDER, PAYMENT_METHOD, API extends PlatformApi = any>(
  factoryParams: UseMakeOrderFactoryParams<ORDER, PAYMENT_METHOD, API>
) => {
  return function useMakeOrder(): UseMakeOrder<ORDER, PAYMENT_METHOD, API> {
    const order: Ref<ORDER> = sharedRef(null, 'useMakeOrder-order');
    const loading: Ref<boolean> = sharedRef(false, 'useMakeOrder-loading');
    const error: Ref<UseMakeOrderErrors> = sharedRef({
      make: null,
      setPaymentAndMake: null,
    }, 'useMakeOrder-error');

    const _factoryParams = configureFactoryParams(
      factoryParams,
      { mainRef: order, alias: 'currentOrder', loading, error }
    );

    const make = async (params = { customQuery: null }) => {
      Logger.debug('useMakeOrder.make');

      try {
        loading.value = true;
        const createdOrder = await _factoryParams.make(params);
        error.value.make = null;
        order.value = createdOrder;
      } catch (err) {
        error.value.make = err;
        Logger.error('useMakeOrder.make', err);
      } finally {
        loading.value = false;
      }
    };

    const setPaymentAndMake = async ({ paymentMethod, customQuery }) => {
      Logger.debug('useMakeOrder.setPaymentAndMake', { paymentMethod, customQuery });

      try {
        loading.value = true;
        const createdOrder = await _factoryParams.setPaymentAndMake({ paymentMethod, customQuery });
        error.value.setPaymentAndMake = null;
        order.value = createdOrder;
      } catch (err) {
        error.value.setPaymentAndMake = err;
        Logger.error('useMakeOrder.setPaymentAndMake', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      api: _factoryParams.api,
      order,
      make,
      setPaymentAndMake,
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
};
