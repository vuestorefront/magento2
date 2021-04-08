import gql from 'graphql-tag';
import { customerFragment } from '../../fragments';

export default gql`
  query customer {
    customer {
      ${customerFragment}
    }
  }
`;
