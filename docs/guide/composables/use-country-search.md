# useCountrySearch

## Features
`useCountrySearch` composable is responsible for fetching a list of categories. A common usage scenario for this composable is navigation.

## API
The `useCountrySearch` composable implements custom factory `useCountrySearchFactory` located in `packages/composables/src/composables/useCountrySearch/index.ts` and returns `UseCountrySearch` interface:
```typescript
export interface UseCountrySearch<Countries, Country> {
  load: () => Promise<Countries[]>;
  search: (params: { id: string }) => Promise<Country>;
  countries: ComputedProperty<Countries[]>;
  country: ComputedProperty<Country>;
  error: ComputedProperty<UseCountrySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export type Countries = CountriesListQuery['countries'][0];

export interface Country {
  available_regions?: Maybe<Array<Maybe<Region>>>;
  full_name_english?: Maybe<Scalars['String']>;
  full_name_locale?: Maybe<Scalars['String']>;
  /** The unique ID for a `Country` object. */
  id?: Maybe<Scalars['String']>;
  three_letter_abbreviation?: Maybe<Scalars['String']>;
  two_letter_abbreviation?: Maybe<Scalars['String']>;
}
```

### `load`
Function that takes no params and gets the `Countries` array accordingly

### `search`
Function that takes `id`as search param and gets the `Country` accordingly

### `countries`
Returns an array of countries fetched by `load` method as a `computed` property.

### `country`
Returns a single `Country` object fetched by `search` method as a `computed` property.

### `loading`
Returns the current state of `search` as `computed` boolean property

### `error`
Reactive object containing the error message, if search failed for any reason.

## Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useCountrySearch } from '@vue-storefront/magento';

export default {
  setup (props) {
    const {
      load: loadCountries,
      countries,
      search: searchCountry,
      country,
    } = useCountrySearch('Step:Billing');

    onSSR(async () => {
      await searchCountry({
        id: props.identifier,
      });
    });

    return {
      loadCountries,
      countries,
      country,
    }
  }
}
```
