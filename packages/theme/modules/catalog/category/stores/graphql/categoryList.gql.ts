import gql from 'graphql-tag';

const fragmentCategory = gql`
  fragment CategoryFields on CategoryTree {
    is_anchor
    name
    position
    product_count
    uid
    url_path
    url_suffix
    include_in_menu
  }
`;

export default gql`
  query categoryList {
    categories {
      items {
        ...CategoryFields
        children {
          ...CategoryFields
          children {
            ...CategoryFields
            children {
              ...CategoryFields
            }
          }
        }
      }
    }
  }
  ${fragmentCategory}
`;
