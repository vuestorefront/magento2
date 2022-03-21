import { Country } from '~/modules/GraphQL/types';
import { Countries } from '~/composables/types';

export interface AddressGetter {
  countriesList(countries: Countries[]): {
    id: string;
    label: string;
    englishLabel: string;
    abbreviation: string;
  }[];
  regionList(country: Country): {
    id: number;
    label: string;
    abbreviation: string;
  }[];
}
