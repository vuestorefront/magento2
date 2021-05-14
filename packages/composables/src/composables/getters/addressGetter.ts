import { Countries } from '@vue-storefront/magento-api';
import { AddressGetter } from '../../types';

const countriesList: AddressGetter['countriesList'] = (countries: Countries[]) => countries.map((c) => ({
  id: c.id,
  label: c.full_name_locale,
  englishLabel: c.full_name_english,
  abbreviation: c.two_letter_abbreviation,
}));

export default {
  countriesList,
} as AddressGetter;
