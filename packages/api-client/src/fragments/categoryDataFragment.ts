import gql from 'graphql-tag';

export default gql`fragment CategoryData on CategoryTree {
  image
  include_in_menu
  is_anchor
  level
  name
  position
  product_count
  uid
}`;
