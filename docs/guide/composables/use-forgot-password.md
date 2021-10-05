# useForgotPassword

`useForgotPassword`

## API
```typescript
export interface UseForgotPassword<RESULT> {
  result: ComputedProperty<RESULT>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseForgotPasswordErrors>;
  setNew(params: ComposableFunctionArgs<{
    tokenValue: string,
    newPassword: string,
    email: string,
  }>): Promise<void>;
  request(params: ComposableFunctionArgs<{ 
    email: string
  }>): Promise<void>;
}
```

* `` - 

## Example

```javascript
```
