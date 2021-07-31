import gql from 'graphql-tag';

export default gql`fragment ConfigurableProductOptionsData on ConfigurableProduct{
  configurable_options {
    attribute_code
    attribute_uid
    label
    position
    uid
    use_default
    values {
      label
      swatch_data {
        value
      }
      uid
    }
  }
}`;
