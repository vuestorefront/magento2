import {
  Context,
} from '@vue-storefront/core';
import { Countries, Country } from '@vue-storefront/magento-api';
import { UseCountryFactoryParams, useCountrySearchFactory } from '../../factories/useCountrySearchFactory';
import { UseCountrySearch } from '../../types/composables';

const factoryParams: UseCountryFactoryParams<Countries, Country> = {
  load: async (context: Context): Promise<Countries[]> => {
    const { data } = await context.$magento.api.countries();

    return data.countries;
  },
  search: async (context: Context, params): Promise<Country> => {
    const { data } = await context.$magento.api.country(params.id);

    return data.country;
  },
};

const useCountrySearch: (cacheId?: string) => UseCountrySearch<Countries, Country> = useCountrySearchFactory<Countries, Country>(factoryParams);

export default useCountrySearch;
