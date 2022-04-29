import { AddressGetter } from '~/modules/customer/getters/types';
import { Countries } from '~/composables';
import { Country } from '~/modules/GraphQL/types';

const countriesList: AddressGetter['countriesList'] = (countries: Countries[]) => countries
  .filter((c) => c.id && c.full_name_english && c.full_name_locale)
  .map((c) => ({
    id: c.id,
    label: c.full_name_locale,
    englishLabel: c.full_name_english,
    abbreviation: c.two_letter_abbreviation,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const regionList: AddressGetter['regionList'] = (country: Country) => (country?.available_regions ? country.available_regions
  .filter((c) => c.id && c.code && c.name)
  .map((c) => ({
    id: c.id,
    label: c.name,
    abbreviation: c.code,
  } as {
    id: number;
    label: string;
    abbreviation: string;
  }))
  .sort((a, b) => a.label.localeCompare(b.label)) : []);

export default {
  countriesList,
  regionList,
} as AddressGetter;
