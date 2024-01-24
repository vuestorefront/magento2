/** GraphQL Query that fetches the category list. */
export default `
  query categoryList {
    categories {
      items {
        children {
          include_in_menu
          is_anchor
          level
          name
          position
          product_count
          uid
          url_path
          url_suffix
          children {
            include_in_menu
            is_anchor
            level
            name
            position
            product_count
            uid
            url_path
            url_suffix
            children {
              include_in_menu
              is_anchor
              level
              name
              position
              product_count
              uid
              url_path
              url_suffix
            }
          }
        }
        product_count
        name
        uid
      }
    }
  }
`;
