import gql from 'graphql-tag';

export default gql`
mutation focusIDmeVerify($input: focusIDmeVerifyInput) {
  focusIDmeVerify(input: $input) {
    uuid
    first_name
    last_name
    email
    zip
    is_verified
    group
    subgroup
    user_errors
    group_data {
      handle
      name
      value
    }
  }
}`;
