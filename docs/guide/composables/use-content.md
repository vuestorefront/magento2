# usePage

## Features
`usePage` is the alias used by `useContent` composable, and can be used to fetch content pages.

## API
The `useContent` composable implements custom factory `useContentFactory` located in `packages/composables/src/factories/useContentFactory.ts` and returns `UsePage` interface:

```typescript
interface UseContent<CmsPage> {
  page: ComputedProperty<CmsPage>;
  loadPage: (identifier: string) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface CmsPage {
  /** CMS page content */
  content?: Maybe<Scalars['String']>;
  /** CMS page content heading */
  content_heading?: Maybe<Scalars['String']>;
  /** Identifier of the CMS page */
  identifier?: Maybe<Scalars['String']>;
  /** CMS page meta description */
  meta_description?: Maybe<Scalars['String']>;
  /** CMS page meta keywords */
  meta_keywords?: Maybe<Scalars['String']>;
  /** CMS page meta title */
  meta_title?: Maybe<Scalars['String']>;
  /** CMS page content heading */
  page_layout?: Maybe<Scalars['String']>;
  /** CMS page title */
  title?: Maybe<Scalars['String']>;
  /** URL key of CMS page */
  url_key?: Maybe<Scalars['String']>;
}
```

### `loadPage`
Function that takes in `identifier` as param and gets the `page` accordingly

### `page`
Returns `page` as a `computed` property

### `loading`
Returns the `loading` state of `loadPage`

## Example
```javascript
import { onSSR } from '@vue-storefront/core';
import { usePage } from '@vue-storefront/magento';

export default {
  setup(props) {
    const { page, loadPage, loading } = usePage('cmsPage');

    onSSR(async () => {
      await loadPage(props.identifier);
    });

    return {
      page,
      loading,
    };
  }
};
```
