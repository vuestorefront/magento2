import { gql } from 'graphql-request';

export default gql`
  query categoryList {
    categories {
      items {
        children {
          is_anchor
          name
          position
          product_count
          uid
          url_path
          url_suffix
          children {
            is_anchor
            name
            position
            product_count
            uid
            url_path
            url_suffix
            children {
              is_anchor
              name
              position
              product_count
              uid
              url_path
              url_suffix
            }
          }
        }
        product_count
        name
        uid
      }
    }
  }
`;
