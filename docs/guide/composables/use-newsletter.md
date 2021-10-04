# useNewsletter

`useNewsletter`

## API
```typescript
export interface UseNewsletter<UPDATE_NEWSLETTER_PARAMS, API extends PlatformApi = any> extends Composable<API>{
  error: ComputedProperty<UseNewsletterErrors>;
  loading: ComputedProperty<boolean>;
  updateSubscription: (params: { 
    email: UPDATE_NEWSLETTER_PARAMS,
  }) => Promise<void>;
}
```

* `` - 

## Example

```javascript
```
