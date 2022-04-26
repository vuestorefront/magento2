import gql from 'graphql-tag';

/** GraphQL Query that fetches the resolver for received URL. */
export default gql`
  query urlResolver($url: String!) {
    urlResolver(url: $url) {
      id
      redirectCode
      relative_url
      type
      entity_uid
    }
  }
`;
