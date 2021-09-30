import gql from 'graphql-tag';

export default gql`
query focusProductAttribute($attribute_code: String!) {
  focusProductAttribute(attribute_code: $attribute_code) {
    attribute_code
    attribute_id
    label
    options {
      label
      value
    }
  }
}`;
