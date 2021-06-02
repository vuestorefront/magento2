# useCategory

## Features
`useCategory` composable is responsible for fetching a list of categories. A common usage scenario for this composable is navigation.

## API
```typescript
interface UseCategory<Category, CategoryListQueryVariables> {
  categories: ComputedProperty<Category[]>;
  search(params: ComposableFunctionArgs<CategoryListQueryVariables>): Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseCategoryErrors>;
}

export type CategoryListQueryVariables = Exact<{ [key: string]: never; }>;

export interface Category {
  available_sort_by?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Breadcrumbs, parent categories info. */
  breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
  /** Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Categories' is enabled */
  canonical_url?: Maybe<Scalars['String']>;
  /** Child categories tree. */
  children?: Maybe<Array<Maybe<Category>>>;
  children_count?: Maybe<Scalars['String']>;
  /** Category CMS Block. */
  cms_block?: Maybe<CmsBlock>;
  /**
   * Timestamp indicating when the category was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  custom_layout_update_file?: Maybe<Scalars['String']>;
  /** The attribute to use for sorting. */
  default_sort_by?: Maybe<Scalars['String']>;
  /** An optional description of the category. */
  description?: Maybe<Scalars['String']>;
  display_mode?: Maybe<Scalars['String']>;
  filter_price_range?: Maybe<Scalars['Float']>;
  /**
   * An ID that uniquely identifies the category.
   * @deprecated Use the `uid` argument instead.
   */
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  include_in_menu?: Maybe<Scalars['Int']>;
  is_anchor?: Maybe<Scalars['Int']>;
  landing_page?: Maybe<Scalars['Int']>;
  /** Indicates the depth of the category within the tree. */
  level?: Maybe<Scalars['Int']>;
  meta_description?: Maybe<Scalars['String']>;
  meta_keywords?: Maybe<Scalars['String']>;
  meta_title?: Maybe<Scalars['String']>;
  /** The display name of the category. */
  name?: Maybe<Scalars['String']>;
  /** Category Path. */
  path?: Maybe<Scalars['String']>;
  /** Category path in store. */
  path_in_store?: Maybe<Scalars['String']>;
  /** The position of the category relative to other categories at the same level in tree. */
  position?: Maybe<Scalars['Int']>;
  /** The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
  product_count?: Maybe<Scalars['Int']>;
  /** The list of products assigned to the category. */
  products?: Maybe<CategoryProducts>;
  /** The unique ID for a `CategoryInterface` object. */
  uid: Scalars['ID'];
  /**
   * Timestamp indicating when the category was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** The url key assigned to the category. */
  url_key?: Maybe<Scalars['String']>;
  /** The url path assigned to the category. */
  url_path?: Maybe<Scalars['String']>;
  /** The part of the category URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
}
```

### `search`
Function that takes `CategoryListQueryVariables`as optional param and gets the `categories` accordingly

### `categories`
Returns an array of categories fetched by `search` method as a `computed` property.

### `loading`
Returns the current state of `search` as `computed` boolean property

### `error`
Reactive object containing the error message, if search failed for any reason.

## Getters
````typescript
interface CategoryGetters<Category> {
  getTree: (category: Category) => AgnosticCategoryTree | null;
  getBreadcrumbs: (category: Category) => AgnosticBreadcrumb[];
  getCategoryTree?: (
    category: Category,
    currentCategory: string,
    withProducts: boolean,
  ) => AgnosticCategoryTree | null;
}

export interface AgnosticBreadcrumb {
  text: string;
  link: string;
}

export interface AgnosticCategoryTree {
  label: string;
  slug?: string;
  items: AgnosticCategoryTree[];
  isCurrent: boolean;
  count?: number;
  [x: string]: unknown;
}
````
## Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useCategory } from '@vue-storefront/magento';

export default {
  setup () {
    const { categories, search, loading } = useCategory('AppHeader:Categories');

    onSSR(async () => {
      await search({
        pageSize: 100,
      });
    });

    return {
      categories,
      loading
    }
  }
}
```
