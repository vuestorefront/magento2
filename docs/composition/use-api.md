# useApi composable

`useApi` composable allows to execute received GraphQL query with optional variables and headers and returns the result.

## API
`useApi` composable returns the following properties:

- `query` - function that executes a GraphQL query and handle its error and result
- `mutate` - function that executes received GraphQL Mutation with optional variables and headers and returns the result.

## Interfaces

```ts
type FetchPolicy = 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';

type Variables = {
  [key: string]: any;
};

type Error = {
  message: string;
  locations?: {
    line: number;
    column: number;
  }[];
  path?: string[];
  extensions?: any;
};

type Request = <DATA, VARIABLES extends Variables = Variables>(
  request: string,
  variables?: VARIABLES,
  fetchPolicy?: FetchPolicy,
) => Promise<{ data: DATA, errors: Error[] }>;

interface UseApiInterface {
  query: Request;
  mutate: Request;
}
```

## Example

Execute a GraphQL query to get cart price:

```ts
import { useApi } from '~/composables/useApi';

const GET_CART_PRICE_QUERY = `
  query GET_CART_PRICE_QUERY($cartId: String!) {
    cart(cart_id: $cartId) {
      prices {
        subtotal_excluding_tax {
          value
        }
      }
    }
  }
`;

export default {
  setup() {
    const { query } = useApi();

    async function getCartPrice(cartId: string) {
      return await query(
        GET_CART_PRICE_QUERY,
        { cartId },
        { 'Accept': 'application/json' }
      );
    }
  }
};
```

