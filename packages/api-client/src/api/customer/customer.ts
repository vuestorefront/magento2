import gql from 'graphql-tag';
import customerFragment from '../../fragments/customerFragment';

export default gql`
  query customer {
    customer {
      ${customerFragment}
    }
  }
`;
