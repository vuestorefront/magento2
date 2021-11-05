import {
  Context,
} from '@absolute-web/vsf-core';
import { PaypalExpressTokenInput, PaypalExpressTokenOutput } from '@absolute-web/magento-api';
import { UsePaypalExpressFactory, usePaypalExpressFactory } from '../../factories/usePaypalExpressFactory';
import { UsePaypalExpress } from '../../types/composables';

const factoryParams: UsePaypalExpressFactory<PaypalExpressTokenOutput, PaypalExpressTokenInput, any> = {
  createToken: async (context: Context, params: PaypalExpressTokenInput): Promise<PaypalExpressTokenOutput> => {
    const apiState = context.$magento.config.state;
    const cartId = apiState.getCartId();
    const input = {
      cart_id: cartId,
      code: 'paypal_express',
      ...params,
    }
    const { data } = await context.$magento.api.createPaypalExpressToken(input);
    return data.createPaypalExpressToken;
  },
};

const usePaypalExpress: (cacheId?: string) =>
UsePaypalExpress<PaypalExpressTokenOutput,
PaypalExpressTokenInput, any> = usePaypalExpressFactory<PaypalExpressTokenOutput,
PaypalExpressTokenInput, any>(factoryParams);

export default usePaypalExpress;
