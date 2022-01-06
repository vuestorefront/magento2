import gql from 'graphql-tag';
import CustomerReturnFragment from '../../fragments/customerReturnFragment';

export default gql`
  query focusGuestRma($input: FocusGuestRmaInput!) {
    focusGuestRma(input: $input) {
      return {
        ${CustomerReturnFragment}
      }
    }
  }
`;
