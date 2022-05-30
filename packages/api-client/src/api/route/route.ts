import gql from 'graphql-tag';

/** GraphQL Query that fetches the resolver for received URL. */
export default gql`
  query route($url: String!) {
    route(url: $url) {
      relative_url
      redirect_code
      type
      ... on CategoryTree {
        uid
        id
      }
    }
  }
`;
