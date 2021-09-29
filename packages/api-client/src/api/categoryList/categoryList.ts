import gql from 'graphql-tag';

export default gql`
  query categoryList {
    categories {
      items {
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
        product_count
        name
        uid
      }
    }
  }`;
