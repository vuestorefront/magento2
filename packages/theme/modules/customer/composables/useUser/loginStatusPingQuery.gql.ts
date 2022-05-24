import { gql } from 'graphql-request';

/**
 * Attempts querying the smallest amount of customer info to see if
 * current user is logged in (has auth cookie and it's not expired)
 *
 * If not, sending this query will return graphql-authorization error
 */
export default gql`
  query customer {
    customer {
      __typename
    }
  }
`;
