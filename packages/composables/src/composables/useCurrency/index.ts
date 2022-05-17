/**
 * @deprecated since version 1.0.0
 */
import { Context } from '@vue-storefront/core';
import { Currency } from '@vue-storefront/magento-api';
import { useCurrencyFactory, UseCurrencyFactoryParams } from '../../factories/useCurrencyFactory';
import { UseCurrency } from '../../types/composables';

const factoryParams: UseCurrencyFactoryParams<Currency, null> = {
  load: async (context: Context, _params): Promise<Currency> => {
    const { data } = await context.$magento.api.currency();

    return data.currency || {};
  },

  change: (context: Context, params) => {
    context.$magento.config.state.setCurrency(params.id);
  },
};

const useCurrency: () => UseCurrency<Currency> = useCurrencyFactory<Currency>(factoryParams);

export default useCurrency;
