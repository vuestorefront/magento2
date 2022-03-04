import { gql } from 'graphql-request';

export default gql`
  query category($id: Int!) {
    category(id: $id) {
      id
      display_mode
      landing_page
      cms_block {
        identifier
        content
      }
    }
  }
`;
