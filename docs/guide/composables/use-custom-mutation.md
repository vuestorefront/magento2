# useCustomMutation

## Features
`useCustomMutation` composition function can be used to execute custom Mutation on the Magento GraphQL API.

What makes it powerful is the ability to accept any GraphQL mutation, and execute it.

## API
```typescript
export interface UseCustomMutation<MUTATION, MUTATION_VARIABLES, MUTATION_RETURN, API extends PlatformApi = any> extends Composable<API> {
  setMutationString: (newMutationString: string) => void;
  mutationString: ComputedProperty<MUTATION>;
  mutation: ({ variables, fetchPolicy }: {
    variables: MUTATION_VARIABLES,
    fetchPolicy?: FetchPolicy,
  }) => Promise<MUTATION_RETURN>;
  result: ComputedProperty<MUTATION_RETURN>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;
  [x: string]: any;
}
```

### `setMutationString`
Function to define the mutation to be executed on the GraphQL Mutation

### `mutationString`
`sharedRef` of the GraphQL mutation string

### `query`
Actual query function to mutate the data under the Magento GraphQL API.

### `result`
Reactive object containing the result information from mutation method.

### `loading`
Reactive object containing the loading state of the query function.

### `error`
Reactive object containing the error message, if mutation failed for any reason.

## Example
`customMutationExample.ts`

```typescript
import { useCustomMutation } from '@vue-storefront/magento';

export const customMutation = (id?: string) => {
  const {
    error,
    loading,
    mutation,
    result,
    setMutationString,
  } = useCustomMutation(id);

  setMutationString(`
  mutation subscribeEmailToNewsletter($email: String!){
    subscribeEmailToNewsletter(email: $email) {
      status
    }
  }`);

  return {
    error,
    loading,
    mutation,
    result,
  };
};
```

`Any File`
```typescript
import { customQuery } from '~/composables/customMutationExample.ts';

const { mutation } = customQuery(id);

await mutation({
  variables: {
    email: `${newEmail}`,
  },
});
```
