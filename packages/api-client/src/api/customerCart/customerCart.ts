import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  query customerCart {
    customerCart {
      ${cartFragment}
    }
  }`;
