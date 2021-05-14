import {
  Context,
} from '@vue-storefront/core';
import { Countries, Country } from '@vue-storefront/magento-api';
import { UseCountrySearch } from '../../types';
import { UseCountryFactoryParams, useCountrySearchFactory } from '../../factories/useCountrySearchFactory';

const factoryParams: UseCountryFactoryParams<Countries, Country> = {
  loadCountries: async (context: Context): Promise<Countries[]> => {
    const { data } = await context.$magento.api.countries();

    return data.countries;
  },
  searchCountry: async (context: Context, params): Promise<Country> => {
    const { data } = await context.$magento.api.country(params.id);

    return data.country;
  },
};

const useCountrySearch: (cacheId: string) => UseCountrySearch<Countries, Country> = useCountrySearchFactory<Countries, Country>(factoryParams);

export default useCountrySearch;
