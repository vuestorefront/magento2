import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation setShippingMethodsOnCart($input: SetShippingMethodsOnCartInput) {
    setShippingMethodsOnCart(input: $input) {
      cart {
        ${cartFragment}
      }
    }
  }`;
