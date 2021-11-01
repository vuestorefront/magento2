import gql from 'graphql-tag';

export default gql`
  fragment ProductCustomOptionsFragment on SimpleProduct {
    options {
      required
      sort_order
      title
      uid
      ... on CustomizableAreaOption {
        product_sku
        CustomizableAreaOptionValue: value {
          max_characters
          price
          price_type
          sku
          uid
        }
      }
      ... on CustomizableDateOption {
        product_sku
        CustomizableDateOptionValue: value {
          price
          price_type
          sku
          uid
        }
      }
      ... on CustomizableDropDownOption {
        CustomizableDropDownOptionValue: value {
          option_type_id
          price
          price_type
          sku
          sort_order
          title
          uid
        }
      }
      ... on CustomizableMultipleOption {
        CustomizableMultipleOptionValue: value {
          option_type_id
          price
          price_type
          sku
          sort_order
          title
          uid
        }
      }
      ... on CustomizableFieldOption {
        product_sku
        value {
          price
          price_type
          sku
          uid
        }
      }
      ... on CustomizableFileOption {
        product_sku
        CustomizableFileOptionValue: value {
          file_extension
          image_size_x
          image_size_y
          price
          price_type
          sku
          uid
        }
      }
      ... on CustomizableRadioOption {
        CustomizableRadioOptionValue: value {
          option_type_id
          price
          price_type
          sku
          sort_order
          title
          uid
        }
      }
      ... on CustomizableCheckboxOption {
        CustomizableCheckboxOptionValue: value {
          option_type_id
          price
          price_type
          sku
          sort_order
          title
          uid
        }
      }
    }
  }
`;
