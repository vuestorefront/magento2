const fragmentCategory = `
  fragment CategoryFields on CategoryTree {
    is_anchor
    name
    position
    product_count
    uid
    url_path
    url_suffix
    include_in_menu
  }
`;

export default `
  query categoryList {
    categories {
      items {
        ...CategoryFields
        children {
          ...CategoryFields
          children {
            ...CategoryFields
            children {
              ...CategoryFields
            }
          }
        }
      }
    }
  }
  ${fragmentCategory}
`;
