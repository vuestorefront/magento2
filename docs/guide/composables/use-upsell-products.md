# useUpsellProducts

`useUpsellProducts`

## API
```typescript
export interface UseUpsellProducts<
  PRODUCTS, UPSELL_PRODUCTS_SEARCH_PARAMS,
  API extends PlatformApi = any>
  extends Composable<API> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;
  search(params: ComposableFunctionArgs<UPSELL_PRODUCTS_SEARCH_PARAMS>): Promise<void>;
  [x: string]: any;
}
```

* `` - 

## Example

```javascript
```
