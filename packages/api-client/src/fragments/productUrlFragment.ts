import gql from 'graphql-tag';

export default gql`
fragment ProductUrlFragmentData on ProductInterface {
  url_key
  url_rewrites {
    url
  }
}`;
