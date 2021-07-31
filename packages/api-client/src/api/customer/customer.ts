import gql from 'graphql-tag';
import CustomerData from '../../fragments/customerFragment';

export default gql`
${CustomerData}
query customer {
  customer {
    ...CustomerData
    is_subscribed
  }
}`;
