# useUrlResolver composable

`useUrlResolver` composable that allows searching the resolver for current route path (URL).

## API
`useUrlResolver` composable returns the following properties:

- `search` - function that searches the resolver for current route URL.
- `path` - ref that contains the path of the current route.
- `error` - ref that contains an errors from the composable methods.
- `loading` - ref that contains information whether any of the composable methods is loading.


## Interfaces

```ts
interface UseUrlResolverErrors {
  search: Error | null;
}

interface RoutableInterface {
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect */
  redirect_code: Scalars['Int'];
  relative_url?: Maybe<Scalars['String']>;
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  sku?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  identifier?: Maybe<Scalars['String']>;
}

interface UseUrlResolverInterface {
  path: string;
  error: DeepReadonly<Ref<UseUrlResolverErrors>>;
  loading: Readonly<Ref<boolean>>;
  search(): Promise<RoutableInterface>;
}
```
