# useAddresses

`useAddresses`:

## API
```typescript
export interface UseAddresses<ADDRESS,
  LOAD_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  SAVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  UPDATE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  REMOVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  API extends PlatformApi = any,
> extends Composable<API> {
  error: ComputedProperty<UseAddressesErrors>;
  loading: ComputedProperty<boolean>;
  addresses: ComputedProperty<ADDRESS[]>;
  load: (loadParams?: LOAD_ADDRESS_PARAMS) => Promise<void>,
  save: (saveParams: SAVE_ADDRESS_PARAMS) => Promise<void>,
  remove: (removeParams: REMOVE_ADDRESS_PARAMS) => Promise<void>,
  update: (updateParams: UPDATE_ADDRESS_PARAMS) => Promise<void>,
}
```

* `` - 

## Example

```javascript
```
