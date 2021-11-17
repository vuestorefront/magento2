import gql from 'graphql-tag';
import CustomerReturnFragment from '../../fragments/customerReturnFragment';

export default gql`
  mutation focusGuestRequestReturn($input: FocusGuestRequestReturnInput!) {
    focusGuestRequestReturn(input: $input) {
      return {
        ${CustomerReturnFragment}
      }
    }
  }`;
