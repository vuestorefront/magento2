import { Context } from '@absolute-web/vsf-core';
import { Currency } from '@absolute-web/magento-api';
import { useCurrencyFactory, UseCurrencyFactoryParams } from '../../factories/useCurrencyFactory';
import { UseCurrency } from '../../types/composables';

const factoryParams: UseCurrencyFactoryParams<Currency, null> = {
  load: async (context: Context, params): Promise<Currency> => {
    const { data } = await context.$magento.api.currency();

    return data.currency || {};
  },

  change: (context: Context, params) => {
    context.$magento.config.state.setCurrency(params.id);
  },
};

const useCurrency: () => UseCurrency<Currency> = useCurrencyFactory<Currency>(factoryParams);

export default useCurrency;
