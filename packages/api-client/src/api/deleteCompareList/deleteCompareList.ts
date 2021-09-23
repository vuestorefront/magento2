import gql from 'graphql-tag';

export default gql`
mutation deleteCompareList($uid: ID!) {
  deleteCompareList(uid: $uid) {
    result
  }
}`;
