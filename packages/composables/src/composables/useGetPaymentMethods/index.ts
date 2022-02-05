import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { AvailablePaymentMethod } from '@absolute-web/magento-api';
import { UseGetPaymentMethodsFactory, useGetPaymentMethodsFactory } from '../../factories/useGetPaymentMethodsFactory';

const factoryParams: UseGetPaymentMethodsFactory<AvailablePaymentMethod> = {
  load: async (context: Context, params): Promise<AvailablePaymentMethod[]> => {
    const apiState = context.$magento.config.state;
    Logger.debug('[Magento]: Load payment methods', { params });
    const customerToken = apiState.getCustomerToken();

    if (customerToken) {
      try {
        const { data: customerData } = await context.$magento.api.getAvailableCustomerPaymentMethods();
        Logger.debug('[Result]:', { data: customerData });

        return customerData.customerCart.available_payment_methods;
      } catch {
        apiState.setCustomerToken();
      }
    }

    const cartId = apiState.getCartId();

    try {
      const { data } = await context.$magento.api.getAvailablePaymentMethods({ cartId });

      Logger.debug('[Result]:', { data });

      return data.cart.available_payment_methods;
    } catch {
      apiState.setCartId();
    }
  },
};

const useGetPaymentMethods = useGetPaymentMethodsFactory<AvailablePaymentMethod>(factoryParams);

export default useGetPaymentMethods;
