import gql from 'graphql-tag';
import CustomerReturnFragment from '../../fragments/customerReturnFragment';

export default gql`
  query focusGuestRmaList($input: FocusGuestRmaListInput!) {
    focusGuestRmaList(input: $input) {
      items {
        ${CustomerReturnFragment}
      }
    }
  }
`;
