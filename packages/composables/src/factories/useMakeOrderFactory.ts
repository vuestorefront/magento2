import { computed, Ref } from '@vue/composition-api';
import { UseMakeOrder, UseMakeOrderErrors } from '../types';
import { CustomQuery, Context, FactoryParams, sharedRef, Logger } from '@vue-storefront/core'
import { configureFactoryParams } from '../utils'

export interface UseMakeOrderFactoryParams<ORDER> extends FactoryParams {
    make: (context: Context, params: { customQuery?: CustomQuery }) => Promise<ORDER>;
}

export const useMakeOrderFactory = <ORDER>(
    factoryParams: UseMakeOrderFactoryParams<ORDER>
) => {
    return function useMakeOrder(): UseMakeOrder<ORDER> {
        const order: Ref<ORDER> = sharedRef(null, 'useMakeOrder-order');
        const loading: Ref<boolean> = sharedRef(false, 'useMakeOrder-loading');
        const error: Ref<UseMakeOrderErrors> = sharedRef({}, 'useMakeOrder-error');
        const _factoryParams = configureFactoryParams(factoryParams);

        const make = async (params = { customQuery: null }) => {
            Logger.debug('useMakeOrder.make');

            try {
                loading.value = true;
                error.value.make = null;
                const createdOrder = await _factoryParams.make(params);
                order.value = createdOrder;
            } catch (err) {
                error.value.make = err;
                Logger.error('useMakeOrder.make', err);
            } finally {
                loading.value = false;
            }
        };

        return {
            order,
            make,
            loading: computed(() => loading.value),
            error: computed(() => error.value)
        };
    };
};