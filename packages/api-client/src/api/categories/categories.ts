export default `
  query categories(
    $filters: CategoryFilterInput,
    $pageSize: Int,
    $currentPage: Int
  ) {
    categories(
      filters: $filters,
      pageSize: $pageSize,
      currentPage: $currentPage
    ) {
      items {
        children {
          include_in_menu
          is_anchor
          level
          name
          position
          product_count
          uid
          url_key
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
            url_key
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
              url_key
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
                url_key
                url_path
                url_suffix
              }
            }
          }
        }
        product_count
        name
        uid
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
`;
