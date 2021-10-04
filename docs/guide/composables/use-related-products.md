# useRelatedProducts

`useRelatedProducts`

## API
```typescript
export interface UseRelatedProducts<
  PRODUCTS,
  RELATED_PRODUCT_SEARCH_PARAMS,
  API extends PlatformApi = any>
  extends Composable<API> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseRelatedProductsErrors>;
  search(params: ComposableFunctionArgs<RELATED_PRODUCT_SEARCH_PARAMS>): Promise<void>;
  [x: string]: any;
}

```

* `` - 

## Example

```javascript
```
