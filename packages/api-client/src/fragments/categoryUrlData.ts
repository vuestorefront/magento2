import gql from 'graphql-tag';

export default gql`fragment CategoryUrlData on CategoryTree {
  url_path
  url_suffix
}`;
