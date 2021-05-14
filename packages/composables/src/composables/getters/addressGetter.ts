import { Countries } from '@vue-storefront/magento-api';
import { AddressGetter } from '../../types';

const countriesList: AddressGetter['countriesList'] = (countries: Countries[]) => countries
  .filter((c) => c.id && c.full_name_english && c.full_name_locale)
  .map((c) => ({
    id: c.id,
    label: c.full_name_locale,
    englishLabel: c.full_name_english,
    abbreviation: c.two_letter_abbreviation,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export default {
  countriesList,
} as AddressGetter;
