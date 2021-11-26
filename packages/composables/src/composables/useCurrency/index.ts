import { Context } from '@vue-storefront/core';
import { Currency } from '@vue-storefront/magento-api';
import { useCurrencyFactory, UseCurrencyFactoryParams } from '../../factories/useCurrencyFactory';
import { UseCurrency } from '../../types/composables';

const factoryParams: UseCurrencyFactoryParams<Currency> = {
  load: async (context: Context): Promise<Currency> => {
    const { data } = await context.$magento.api.currency();

    return data.currency || {};
  },
};

const useCurrency: () => UseCurrency<Currency> = useCurrencyFactory<Currency>(factoryParams);

export default useCurrency;
