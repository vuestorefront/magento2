import gql from 'graphql-tag';

export default gql`
  query category($filters: CategoryFilterInput) {
    categoryList(filters: $filters) {
      image
      include_in_menu
      is_anchor
      level
      name
      position
      product_count
      id
      uid
      url_path
      url_suffix
      display_mode
      meta_title
      meta_description
      meta_keywords
      siblings {
        category_uid
        category_name
        category_level
        category_url_key
        category_url_path
      }
      breadcrumbs {
        category_uid
        category_name
        category_level
        category_url_key
        category_url_path
      }
      children {
        image
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
          image
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
            image
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
              image
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
                image
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
                  image
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
                    image
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
                      image
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
                        image
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
                }
              }
            }
          }
        }
      }
    }
    cacheTags @client
  }
`;
