import { Context } from '@vue-storefront/core';
import { useCurrencyFactory, UseCurrencyFactoryParams } from '../../factories/useCurrencyFactory';
import { UseCurrency } from '../../types/composables';

const factoryParams: UseCurrencyFactoryParams<Currencies, CurrencyParam> = {
  load: async (context: Context): Promise<Currencies> => {
    const { data } = await context.$magento.api.currency();

    return data.currency || {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change: (context: Context, params: CurrencyParam) => {
    // await context.$magento.api.changeCurrency(params);
    return null;
  },
};

const useCurrency: () => UseCurrency<Currencies, CurrencyParam> = useCurrencyFactory<Currencies, CurrencyParam>(factoryParams);

export default useCurrency;
