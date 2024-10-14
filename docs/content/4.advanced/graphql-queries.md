# Magento 2 API GraphQL Queries Documentation

This documentation provides an overview of the GraphQL queries executed by specific methods in the Magento 2 API.

### Method: addBundleProductsToCart
- Query: addBundleProductsToCart
```graphql
mutation addBundleProductsToCart($input: AddBundleProductsToCartInput) {
    addBundleProductsToCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: addConfigurableProductsToCart
- Query: addConfigurableProductsToCart
```graphql
mutation addConfigurableProductsToCart($input: AddConfigurableProductsToCartInput) {
    addConfigurableProductsToCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: addDownloadableProductsToCart
- Query: addDownloadableProductsToCart
```graphql
mutation addDownloadableProductsToCart($input: AddDownloadableProductsToCartInput) {
    addDownloadableProductsToCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: addProductToWishList
- Query: addProductsToWishlist
```graphql
mutation addProductsToWishlist($id: ID!, $items: [WishlistItemInput!]!) {
    addProductsToWishlist(wishlistId: $id, wishlistItems: $items) {
      wishlist {
        id
        items_count
        sharing_code
        items_v2 {
          items {
            id
            quantity
            description
            added_at
            product {
              ...on ConfigurableProduct {
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
              }
              ... on BundleProduct {
                items {
                  sku
                  title
                  options {
                    uid
                    quantity
                    product {
                      uid
                      sku
                      name
                      price_range {
                        maximum_price {
                          final_price {
                            currency
                            value
                          }
                          regular_price {
                            currency
                            value
                          }
                        }
                        minimum_price {
                          final_price {
                            currency
                            value
                          }
                          regular_price {
                            currency
                            value
                          }
                        }
                      }
                    }
                  }
                }
              }
              uid
              __typename
              sku
              name
              stock_status
              only_x_left_in_stock
              rating_summary
              categories {
                uid
                name
                url_suffix
                url_path
                breadcrumbs {
                  category_name,
                  category_url_path
                }
              }
              price_range {
                maximum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
                position
                disabled
                label
              }
              url_key
              url_rewrites {
                url
              }
              review_count
              reviews {
                items {
                  average_rating
                  ratings_breakdown {
                    name
                    value
                  }
                }
              }
              ... on GroupedProduct {
                items {
                  product {
                    sku
                  }
                }
              }
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
      }
    }
  }
```

### Method: addProductsToCart
- Query: addProductsToCart
```graphql
mutation addProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
    addProductsToCart(cartId,: $cartId, cartItems,: $cartItems) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
      user_errors {
        code
        message
      }
    }
  }
```

### Method: addSimpleProductsToCart
- Query: addSimpleProductsToCart
```graphql
mutation addSimpleProductsToCart($input: AddSimpleProductsToCartInput) {
    addSimpleProductsToCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: addVirtualProductsToCart
- Query: addVirtualProductsToCart
```graphql
mutation addVirtualProductsToCart($input: AddVirtualProductsToCartInput) {
    addVirtualProductsToCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: applyCouponToCart
- Query: applyCouponToCart
```graphql
mutation applyCouponToCart($input: ApplyCouponToCartInput) {
    applyCouponToCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: availableStores
- Query: availableStores
```graphql
query availableStores {
    availableStores {
      absolute_footer
      allow_guests_to_write_product_reviews
      allow_items
      allow_order
      autocomplete_on_storefront
      base_currency_code
      base_link_url
      base_media_url
      base_static_url
      base_url
      catalog_default_sort_by
      category_fixed_product_tax_display_setting
      category_url_suffix
      cms_home_page
      cms_no_cookies
      cms_no_route
      code
      configurable_thumbnail_source
      copyright
      default_description
      default_display_currency_code
      default_keywords
      default_title
      front
      grid_per_page
      grid_per_page_values
      head_includes
      head_shortcut_icon
      header_logo_src
      id
      is_default_store
      is_default_store_group
      list_mode
      list_per_page
      list_per_page_values
      locale
      logo_alt
      logo_height
      logo_width
      magento_wishlist_general_is_enabled
      minimum_password_length
      no_route
      payment_payflowpro_cc_vault_active
      product_fixed_product_tax_display_setting
      product_reviews_enabled
      product_url_suffix
      required_character_classes_number
      root_category_id
      root_category_uid
      sales_fixed_product_tax_display_setting
      secure_base_link_url
      secure_base_media_url
      secure_base_static_url
      secure_base_url
      show_cms_breadcrumbs
      store_code
      store_group_code
      store_group_name
      store_name
      store_sort_order
      timezone
      title_prefix
      title_separator
      title_suffix
      use_store_in_url
      website_code
      website_id
      website_name
      weight_unit
      welcome
    }
  }
```

### Method: cart
- Query: cart
```graphql
query cart($cartId: String!) {
    cart(cart_id:$cartId) {
      id
      email
      is_virtual
      applied_coupons {
        code
      }
      prices {
        subtotal_with_discount_excluding_tax {
          value
          currency
        }
        subtotal_excluding_tax {
          value
          currency
        }
        subtotal_including_tax {
          value
          currency
        }
        applied_taxes {
          amount {
            value
            currency
          }
          label
        }
        discounts {
          amount {
            value
            currency
          }
          label
        }
        grand_total {
          value
          currency
        }
      }
      items {
        uid
        product {
          uid
          __typename
          sku
          name
          stock_status
          only_x_left_in_stock
          rating_summary
          thumbnail {
            url
            position
            disabled
            label
          }
          url_key
          url_rewrites {
            url
          }
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
            minimum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
          }
          categories {
            uid
            name
            url_suffix
            url_path
            url_key
            include_in_menu
            breadcrumbs {
              category_name
              category_url_path
            }
          }
          review_count
          reviews {
            items {
              average_rating
              ratings_breakdown {
                name
                value
              }
            }
          }
        }
        prices {
          row_total {
            value
            currency
          }
          row_total_including_tax {
            value
            currency
          }
          total_item_discount {
            value
            currency
          }
        }
        quantity
        ... on ConfigurableCartItem {
          configurable_options {
            configurable_product_option_uid
            option_label
            configurable_product_option_value_uid
            value_label
          }
          configured_variant {
            sku
            name
            only_x_left_in_stock
            price_range {
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            thumbnail {
              url
            }
          }
        }
        ... on BundleCartItem {
          bundle_options {
            uid
            label
            type
            values {
              id
              label
              price
              quantity
            }
          }
        }
      }
      total_quantity
      shipping_addresses {
        firstname
        lastname
        street
        city
        company
        region {
          code
          region_id
          label
        }
        postcode
        telephone
        country {
          code
          label
        }
        selected_shipping_method {
          carrier_code
          carrier_title
          method_code
          method_title
          amount {
            value
            currency
          }
        }
      }
      billing_address {
        firstname
        lastname
        street
        city
        company
        region {
          code
          region_id
          label
        }
        postcode
        telephone
        country {
          code
          label
        }
      }
    }
  }
```

### Method: categories
- Query: categories
```graphql
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
```

### Method: categoryList
- Query: categoryList
```graphql
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
    }
  }
```

### Method: categorySearch
- Query: categorySearch
```graphql
query categorySearch($filters: CategoryFilterInput) {
    categoryList(filters: $filters) {
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
```

### Method: changeCustomerPassword
- Query: changeCustomerPassword
```graphql
mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      date_of_birth
      default_billing
      default_shipping
      email
      firstname
      is_subscribed
      lastname
      middlename
      prefix
      suffix
      taxvat
      addresses {
        city
        country_code
        default_billing
        default_shipping
        extension_attributes {
          attribute_code
          value
        }
        firstname
        id
        lastname
        postcode
        prefix
        region {
          region_code
          region_id
          region
        }
        street
        suffix
        telephone
        vat_id
      }
    }
  }
```

### Method: cmsBlocks
- Query: cmsBlocks
```graphql
query cmsBlock($identifiers: [String]) {
      cmsBlocks(identifiers: $identifiers) {
          items {
              content
              identifier
              title
          }
      }
  }
```

### Method: cmsPage
- Query: cmsPage
```graphql
query cmsPage($identifier: String) {
    cmsPage(identifier:$identifier) {
      identifier
      content
      title
      meta_title
      meta_description
      meta_keywords
      content_heading
    }
  }
```

### Method: countries
- Query: countries
```graphql
query countriesList {
    countries {
      id
      two_letter_abbreviation
      full_name_locale
      full_name_english
    }
  }
```

### Method: country
- Query: country
```graphql
query countryInformation($id: String) {
    country(id: $id) {
      id
      two_letter_abbreviation
      full_name_locale
      full_name_english
      available_regions {
        id
        code
        name
      }
    }
  }
```

### Method: createCustomer
- Query: createCustomer
```graphql
mutation createCustomer($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        date_of_birth
        default_billing
        default_shipping
        email
        firstname
        is_subscribed
        lastname
        middlename
        prefix
        suffix
        taxvat
        addresses {
          city
          country_code
          default_billing
          default_shipping
          extension_attributes {
            attribute_code
            value
          }
          firstname
          id
          lastname
          postcode
          prefix
          region {
            region_code
            region_id
            region
          }
          street
          suffix
          telephone
          vat_id
        }
      }
    }
  }
```

### Method: createCustomerAddress
- Query: createCustomerAddress
```graphql
mutation createCustomerAddress($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      lastname
      prefix
      suffix
      id
      region {
        region
        region_id
        region_code
      }
      country_code
      street
      telephone
      postcode
      city
      default_shipping
      default_billing
      vat_id
    }
  }
```

### Method: currency
- Query: currency
```graphql
query currency {
    currency {
      available_currency_codes
      base_currency_code
      base_currency_symbol
      default_display_currecy_code
      default_display_currecy_symbol
      default_display_currency_code
      default_display_currency_symbol
      exchange_rates {
        currency_to
        rate
      }
    }
  }
```

### Method: customer
- Query: customer
```graphql
query customer {
    customer {
      date_of_birth
      default_billing
      default_shipping
      email
      firstname
      is_subscribed
      lastname
      middlename
      prefix
      suffix
      taxvat
      addresses {
        city
        country_code
        default_billing
        default_shipping
        extension_attributes {
          attribute_code
          value
        }
        firstname
        id
        lastname
        postcode
        prefix
        region {
          region_code
          region_id
          region
        }
        street
        suffix
        telephone
        vat_id
      }
      is_subscribed
    }
  }
```

### Method: customerCart
- Query: customerCart
```graphql
query customerCart {
    customerCart {
      id
      email
      is_virtual
      applied_coupons {
        code
      }
      prices {
        subtotal_excluding_tax {
          value
          currency
        }
        subtotal_including_tax {
          value
          currency
        }
        applied_taxes {
          amount {
            value
            currency
          }
          label
        }
        discounts {
          amount {
            value
            currency
          }
          label
        }
        grand_total {
          value
          currency
        }
      }
      items {
        uid
        product {
          uid
          __typename
          sku
          name
          stock_status
          only_x_left_in_stock
          rating_summary
          thumbnail {
            url
            position
            disabled
            label
          }
          url_key
          url_rewrites {
            url
          }
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
            minimum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
          }
          categories {
            uid
            name
            url_suffix
            url_path
            url_key
            include_in_menu
            breadcrumbs {
              category_name
              category_url_path
            }
          }
          review_count
          reviews {
            items {
              average_rating
              ratings_breakdown {
                name
                value
              }
            }
          }
        }
        prices {
          row_total {
            value
            currency
          }
          row_total_including_tax {
            value
            currency
          }
          total_item_discount {
            value
            currency
          }
        }
        quantity
        ... on ConfigurableCartItem {
          configurable_options {
            configurable_product_option_uid
            option_label
            configurable_product_option_value_uid
            value_label
          }
          configured_variant {
            sku
            name
            only_x_left_in_stock
            price_range {
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            thumbnail {
              url
            }
          }
        }
        ... on BundleCartItem {
          bundle_options {
            uid
            label
            type
            values {
              id
              label
              price
              quantity
            }
          }
        }
      }
      total_quantity
      shipping_addresses {
        firstname
        lastname
        street
        city
        company
        region {
          code
          region_id
          label
        }
        postcode
        telephone
        country {
          code
          label
        }
        selected_shipping_method {
          carrier_code
          carrier_title
          method_code
          method_title
          amount {
            value
            currency
          }
        }
      }
      billing_address {
        firstname
        lastname
        street
        city
        company
        region {
          code
          region_id
          label
        }
        postcode
        telephone
        country {
          code
          label
        }
      }
    }
  }
```

### Method: customerOrders
- Query: customerOrders
```graphql
query customerOrders($currentPage: Int = 1, $filter: CustomerOrdersFilterInput = {}, $pageSize: Int = 10) {
    customer {
      orders(currentPage: $currentPage, filter: $filter, pageSize: $pageSize) {
        items {
          number
          id
          order_date
          total {
            discounts {
              amount {
                currency
                value
              }
              label
            }
            grand_total {
              currency
              value
            }
            base_grand_total {
              currency
              value
            }
            shipping_handling {
              amount_excluding_tax {
                currency
                value
              }
              amount_including_tax {
                currency
                value
              }
              discounts {
                amount {
                  currency
                  value
                }
              }
              taxes {
                amount {
                  currency
                  value
                }
                rate
                title
              }
              total_amount {
                currency
                value
              }
            }
            subtotal {
              currency
              value
            }
            taxes {
              amount {
                currency
                value
              }
              rate
              title
            }
            total_shipping {
              currency
              value
            }
            total_tax {
              currency
              value
            }
          }
          status
          comments {
            message
            timestamp
          }
          invoices {
            comments {
              message
              timestamp
            }
            id
            items {
              discounts {
                amount {
                  currency
                  value
                }
                label
              }
              id
              product_name
              product_sale_price {
                currency
                value
              }
              product_sku
              quantity_invoiced
            }
            number
            total {
              discounts {
                amount {
                  currency
                  value
                }
                label
              }
              base_grand_total {
                currency
                value
              }
              shipping_handling {
                amount_excluding_tax {
                  currency
                  value
                }
                amount_including_tax {
                  currency
                  value
                }
                discounts {
                  amount {
                    currency
                    value
                  }
                }
                taxes {
                  amount {
                    currency
                    value
                  }
                  rate
                  title
                }
                total_amount {
                  currency
                  value
                }
              }
              subtotal {
                currency
                value
              }
              taxes {
                amount {
                  currency
                  value
                }
                rate
                title
              }
              total_shipping {
                currency
                value
              }
              total_tax {
                currency
                value
              }
            }
          }
          items {
            discounts {
              amount {
                currency
                value
              }
              label
            }
            entered_options {
              label
              value
            }
            id
            product_name
            product_sale_price {
              currency
              value
            }
            product_sku
            product_type
            product_url_key
            quantity_canceled
            quantity_invoiced
            quantity_ordered
            quantity_refunded
            quantity_returned
            quantity_shipped
            selected_options {
              label
              value
            }
            status
          }
          payment_methods {
            name
            type
            additional_data {
              name
              value
            }
          }
          shipments {
            comments {
              message
              timestamp
            }
            id
            number
            tracking {
              carrier
              number
              title
            }
            items {
              id
              product_name
              product_sale_price {
                currency
                value
              }
              product_sku
              quantity_shipped
            }
          }
          shipping_address {
            city
            country_code
            firstname
            lastname
            postcode
            prefix
            region
            street
            suffix
            telephone
          }
          billing_address {
            city
            country_code
            firstname
            lastname
            postcode
            prefix
            region
            street
            suffix
            telephone
          }
          shipping_method
        }
        page_info {
          current_page
          total_pages
          page_size
        }
        total_count
      }
    }
  }
```

### Method: customerProductReview
- Query: reviews
```graphql
query customerProductReview($pageSize: Int = 10, $currentPage: Int = 1) {
    customer {
        reviews(pageSize: $pageSize, currentPage: $currentPage) {
          items {
            average_rating
            ratings_breakdown {
              name
              value
            }
            nickname
            summary
            text
            created_at
            product {
              name
              uid
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
    }
  }
```

### Method: generateCustomerToken
- Query: generateCustomerToken
```graphql
mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
```

### Method: getAvailableCustomerShippingMethods
- Query: shippingMethods
```graphql
query CustomerAvailableShippingMethods {
    customerCart {
      shipping_addresses {
        available_shipping_methods {
          amount {
            currency
            value
          }
          available
          carrier_code
          carrier_title
          error_message
          method_code
          method_title
          price_excl_tax {
            currency
            value
          }
          price_incl_tax {
            currency
            value
          }
        }
      }
    }
  }
```

### Method: getAvailableShippingMethods
- Query: shippingMethods
```graphql
query GuestAvailableShippingMethods($cart_id: String!) {
    cart(cart_id:$cart_id) {
      shipping_addresses {
        available_shipping_methods {
          amount {
            currency
            value
          }
          available
          carrier_code
          carrier_title
          error_message
          method_code
          method_title
          price_excl_tax {
            currency
            value
          }
          price_incl_tax {
            currency
            value
          }
        }
      }
    }
  }
```

### Method: getCustomerAddresses
- Query: getCustomerAddresses
```graphql
query getCustomerAddresses {
    customer {
      addresses {
        city
        country_code
        default_billing
        default_shipping
        extension_attributes {
          attribute_code
          value
        }
        firstname
        id
        lastname
        postcode
        prefix
        region {
          region_code
          region_id
          region
        }
        street
        suffix
        telephone
        vat_id
      }
    }
  }
```

### Method: mergeCarts
- Query: mergeCarts
```graphql
mutation mergeCarts($sourceCartId: String!, $destinationCartId: String!) {
    mergeCarts(source_cart_id: $sourceCartId, destination_cart_id: $destinationCartId) {
      id
      email
      is_virtual
      applied_coupons {
        code
      }
      prices {
        subtotal_excluding_tax {
          value
          currency
        }
        subtotal_including_tax {
          value
          currency
        }
        applied_taxes {
          amount {
            value
            currency
          }
          label
        }
        discounts {
          amount {
            value
            currency
          }
          label
        }
        grand_total {
          value
          currency
        }
      }
      items {
        uid
        product {
          uid
          __typename
          sku
          name
          stock_status
          only_x_left_in_stock
          rating_summary
          thumbnail {
            url
            position
            disabled
            label
          }
          url_key
          url_rewrites {
            url
          }
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
            minimum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
          }
          categories {
            uid
            name
            url_suffix
            url_path
            url_key
            include_in_menu
            breadcrumbs {
              category_name
              category_url_path
            }
          }
          review_count
          reviews {
            items {
              average_rating
              ratings_breakdown {
                name
                value
              }
            }
          }
        }
        prices {
          row_total {
            value
            currency
          }
          row_total_including_tax {
            value
            currency
          }
          total_item_discount {
            value
            currency
          }
        }
        quantity
        ... on ConfigurableCartItem {
          configurable_options {
            configurable_product_option_uid
            option_label
            configurable_product_option_value_uid
            value_label
          }
          configured_variant {
            sku
            name
            only_x_left_in_stock
            price_range {
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            thumbnail {
              url
            }
          }
        }
        ... on BundleCartItem {
          bundle_options {
            uid
            label
            type
            values {
              id
              label
              price
              quantity
            }
          }
        }
      }
      total_quantity
      shipping_addresses {
        firstname
        lastname
        street
        city
        company
        region {
          code
          region_id
          label
        }
        postcode
        telephone
        country {
          code
          label
        }
        selected_shipping_method {
          carrier_code
          carrier_title
          method_code
          method_title
          amount {
            value
            currency
          }
        }
      }
      billing_address {
        firstname
        lastname
        street
        city
        company
        region {
          code
          region_id
          label
        }
        postcode
        telephone
        country {
          code
          label
        }
      }
    }
  }
```

### Method: productDetails
- Query: productDetails
```graphql
query productDetails(
    $search: String = "",
    $filter: ProductAttributeFilterInput,
    $pageSize: Int = 10,
    $currentPage: Int = 1,
    $sort: ProductAttributeSortInput
  ) {
    products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
      items {
        uid
        sku
        name
        stock_status
        only_x_left_in_stock
        thumbnail {
          url
          position
          disabled
          label
        }
        url_key
        url_rewrites {
          url
        }
        categories {
          uid
          name
          url_suffix
          url_path
          url_key
          breadcrumbs {
            category_name,
            category_url_path
          }
        }
        rating_summary
        review_count
        reviews {
          items {
            average_rating
            ratings_breakdown {
              name
              value
            }
          }
        }
        small_image {
          url
          position
          disabled
          label
        }
        image {
          url
          position
          disabled
          label
        }
        media_gallery {
          url
          position
          disabled
          label
        }
        thumbnail {
          url
          position
          disabled
          label
        }
        url_key
        url_rewrites {
          url
        }
        meta_description
        meta_keyword
        meta_title
        description {
          html
        }
        short_description {
          html
        }
        options_container
        special_to_date
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
        }
        ... on ConfigurableProduct {
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
          variants {
            attributes {
              code
              label
              uid
              value_index
            }
            product {
              uid
              sku
              name
              stock_status
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              media_gallery{
                label
                url
              }
            }
          }
        }

        ... on DownloadableProduct {
          stock_status
          only_x_left_in_stock
          downloadable_product_samples {
            sample_url
            title
          }
          downloadable_product_links {
            id
            price
            title
            uid
          }
        }
        ... on VirtualProduct {
          stock_status
          only_x_left_in_stock
          gift_message_available
          product_links {
            link_type
            linked_product_sku
            linked_product_type
            position
            sku
          }
        }
        ... on GroupedProduct {
          stock_status
          only_x_left_in_stock
          items {
            position
            qty
            product {
              uid
              sku
              name
              stock_status
              only_x_left_in_stock
              price_range {
                maximum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
                position
                disabled
                label
              }
            }
          }
        }
      }
    }
  }
```

### Method: productReview
- Query: productReview
```graphql
query productReview($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
    products(search: $search, filter: $filter, sort: $sort) {
      items {
        review_count
        reviews(pageSize: $pageSize, currentPage: $currentPage) {
          items {
            average_rating
            ratings_breakdown {
              name
              value
            }
            product {
              name
              uid
            }
            nickname
            summary
            text
            created_at
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
      }
    }
  }
```

### Method: productReviewRatingsMetadata
- Query: productReviewRatingsMetadata
```graphql
query productReviewRatingsMetadata{
    productReviewRatingsMetadata {
      items {
        id
        name
        values {
          value_id
          value
        }
      }
    }
  }
```

### Method: products
- Query: products
```graphql
query productsList($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
    products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
      aggregations {
        attribute_code
        label
        options {
          label
          value
          count
        }
      }
      items {
        uid
        sku
        name
        stock_status
        only_x_left_in_stock
        rating_summary
        thumbnail {
          url
          position
          disabled
          label
        }
        url_key
        url_rewrites {
          url
        }
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
          minimum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
        }
        categories {
          uid
          name
          url_suffix
          url_path
          breadcrumbs {
            category_name,
            category_url_path
          }
        }
        review_count
        reviews {
          items {
            average_rating
            ratings_breakdown {
              name
              value
            }
          }
        }
        ... on GroupedProduct {
          items {
            product {
              sku
            }
          }
        }
        ... on ConfigurableProduct {
          variants {
            product {
              uid
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
                position
                disabled
                label
              }
            }
          }
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
```

### Method: relatedProducts
- Query: relatedProducts
```graphql
query relatedProduct(
    $search: String = ""
    $filter: ProductAttributeFilterInput
    $pageSize: Int = 10
    $currentPage: Int = 1
    $sort: ProductAttributeSortInput
  ) {
    products(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        related_products {
          uid
          __typename
          sku
          name
          stock_status
          only_x_left_in_stock
          rating_summary
          thumbnail {
            url
            position
            disabled
            label
          }
          url_key
          url_rewrites {
            url
          }
          price_range {
            maximum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
            minimum_price {
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
          }
          categories {
            uid
            name
            url_suffix
            url_path
            breadcrumbs {
              category_name,
              category_url_path
            }
          }
          review_count
          reviews {
            items {
              average_rating
              ratings_breakdown {
                name
                value
              }
            }
          }
        }
        uid
      }
    }
  }
```

### Method: removeCouponFromCart
- Query: removeCouponFromCart
```graphql
mutation removeCouponFromCart($input: RemoveCouponFromCartInput) {
    removeCouponFromCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: removeItemFromCart
- Query: removeItemFromCart
```graphql
mutation removeItemFromCart($input: RemoveItemFromCartInput) {
    removeItemFromCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: removeProductsFromWishlist
- Query: removeProductsFromWishlist
```graphql
mutation removeProductsFromWishlist($id: ID!, $items: [ID!]!) {
    removeProductsFromWishlist(wishlistId: $id, wishlistItemsIds: $items) {
      wishlist {
        id
        items_count
        sharing_code
        items_v2 {
          items {
            id
            quantity
            description
            added_at
            product {
              ...on ConfigurableProduct {
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
              }
              ... on BundleProduct {
                items {
                  sku
                  title
                  options {
                    uid
                    quantity
                    product {
                      uid
                      sku
                      name
                      price_range {
                        maximum_price {
                          final_price {
                            currency
                            value
                          }
                          regular_price {
                            currency
                            value
                          }
                        }
                        minimum_price {
                          final_price {
                            currency
                            value
                          }
                          regular_price {
                            currency
                            value
                          }
                        }
                      }
                    }
                  }
                }
              }
              uid
              __typename
              sku
              name
              stock_status
              only_x_left_in_stock
              rating_summary
              categories {
                uid
                name
                url_suffix
                url_path
                breadcrumbs {
                  category_name,
                  category_url_path
                }
              }
              price_range {
                maximum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
                position
                disabled
                label
              }
              url_key
              url_rewrites {
                url
              }
              review_count
              reviews {
                items {
                  average_rating
                  ratings_breakdown {
                    name
                    value
                  }
                }
              }
              ... on GroupedProduct {
                items {
                  product {
                    sku
                  }
                }
              }
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
      }
    }
  }
```

### Method: reviews
- Query: reviews
```graphql
query reviews($pageSize: Int = 10, $currentPage: Int = 1) {
    customer {
        reviews(pageSize: $pageSize, currentPage: $currentPage) {
          items {
            average_rating
            ratings_breakdown {
              name
              value
            }
            nickname
            summary
            text
            created_at
            product {
              name
              uid
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
    }
  }
```

### Method: route
- Query: route
```graphql
query route($url: String!) {
    route(url: $url) {
      type
       ... on ProductInterface {
        sku
      }
      ... on CategoryTree {
        uid
      }
      ... on CmsPage {
        identifier
      }
      ... on CategoryInterface {
        uid
      }
    }
  }
```

### Method: setBillingAddressOnCart
- Query: setBillingAddressOnCart
```graphql
mutation setBillingAddressOnCart($input: SetBillingAddressOnCartInput) {
    setBillingAddressOnCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: setGuestEmailOnCart
- Query: setGuestEmailOnCart
```graphql
mutation setGuestEmailOnCart($input: SetGuestEmailOnCartInput) {
    setGuestEmailOnCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: setPaymentMethodOnCart
- Query: setPaymentMethodOnCart
```graphql
mutation setPaymentMethodOnCart($input: SetPaymentMethodOnCartInput) {
    setPaymentMethodOnCart(input: $input) {
      cart {
        available_payment_methods {
          code
          title
        }
        selected_payment_method {
          code
          title
        }
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: setShippingAddressesOnCart
- Query: setShippingAddressesOnCart
```graphql
mutation setShippingAddressesOnCart($input: SetShippingAddressesOnCartInput) {
    setShippingAddressesOnCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: setShippingMethodsOnCart
- Query: setShippingMethodsOnCart
```graphql
mutation setShippingMethodsOnCart($input: SetShippingMethodsOnCartInput) {
    setShippingMethodsOnCart(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: storeConfig
- Query: storeConfig
```graphql
query storeConfig {
    storeConfig {
        allow_guests_to_write_product_reviews,
        allow_items,
        allow_order,
        base_currency_code,
        base_media_url,
        catalog_default_sort_by,
        category_fixed_product_tax_display_setting,
        cms_home_page,
        cms_no_cookies,
        cms_no_route,
        configurable_thumbnail_source,
        copyright,
        default_description,
        default_display_currency_code,
        default_keywords,
        default_title,
        grid_per_page,
        grid_per_page_values,
        head_shortcut_icon,
        header_logo_src,
        is_default_store,
        is_default_store_group,
        list_mode,
        list_per_page,
        list_per_page_values,
        locale,
        logo_alt,
        logo_height,
        logo_width,
        magento_wishlist_general_is_enabled,
        minimum_password_length,
        no_route,
        product_fixed_product_tax_display_setting,
        product_reviews_enabled,
        required_character_classes_number,
        root_category_uid,
        sales_fixed_product_tax_display_setting,
        store_code,
        store_group_code,
        store_group_name,
        store_name,
        store_sort_order,
        timezone,
        title_prefix,
        title_separator,
        title_suffix,
        use_store_in_url,
        website_code,
        website_name,
        weight_unit,
        welcome,
    }
  }
```

### Method: updateCartItems
- Query: updateCartItems
```graphql
mutation updateCartItems($input: UpdateCartItemsInput) {
    updateCartItems(input: $input) {
      cart {
        id
        email
        is_virtual
        applied_coupons {
          code
        }
        prices {
          subtotal_with_discount_excluding_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          subtotal_including_tax {
            value
            currency
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          grand_total {
            value
            currency
          }
        }
        items {
          uid
          product {
            uid
            __typename
            sku
            name
            stock_status
            only_x_left_in_stock
            rating_summary
            thumbnail {
              url
              position
              disabled
              label
            }
            url_key
            url_rewrites {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            categories {
              uid
              name
              url_suffix
              url_path
              url_key
              include_in_menu
              breadcrumbs {
                category_name
                category_url_path
              }
            }
            review_count
            reviews {
              items {
                average_rating
                ratings_breakdown {
                  name
                  value
                }
              }
            }
          }
          prices {
            row_total {
              value
              currency
            }
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              configurable_product_option_uid
              option_label
              configurable_product_option_value_uid
              value_label
            }
            configured_variant {
              sku
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
              }
            }
          }
          ... on BundleCartItem {
            bundle_options {
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_quantity
        shipping_addresses {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
          }
        }
        billing_address {
          firstname
          lastname
          street
          city
          company
          region {
            code
            region_id
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
```

### Method: updateCustomer
- Query: updateCustomer
```graphql
mutation updateCustomer($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        date_of_birth
        default_billing
        default_shipping
        email
        firstname
        is_subscribed
        lastname
        middlename
        prefix
        suffix
        taxvat
        addresses {
          city
          country_code
          default_billing
          default_shipping
          extension_attributes {
            attribute_code
            value
          }
          firstname
          id
          lastname
          postcode
          prefix
          region {
            region_code
            region_id
            region
          }
          street
          suffix
          telephone
          vat_id
        }
      }
    }
  }
```

### Method: updateCustomerAddress
- Query: updateCustomerAddress
```graphql
mutation updateCustomerAddress($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      id
      city
      company
      country_code
      default_billing
      default_shipping
      extension_attributes {
        attribute_code
        value
      }
      fax
      firstname
      id
      lastname
      middlename
      postcode
      prefix
      region {
        region
        region_code
        region_id
      }
      street
      suffix
      telephone
      vat_id
    }
  }
```

### Method: updateCustomerEmail
- Query: updateCustomerEmail
```graphql
mutation updateCustomerEmail($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password){
      customer {
        date_of_birth
        default_billing
        default_shipping
        email
        firstname
        is_subscribed
        lastname
        middlename
        prefix
        suffix
        taxvat
        addresses {
          city
          country_code
          default_billing
          default_shipping
          extension_attributes {
            attribute_code
            value
          }
          firstname
          id
          lastname
          postcode
          prefix
          region {
            region_code
            region_id
            region
          }
          street
          suffix
          telephone
          vat_id
        }
      }
    }
  }
```

### Method: upsellProducts
- Query: upsellProducts
```graphql
query upsellProducts(
    $search: String = ""
    $filter: ProductAttributeFilterInput
    $pageSize: Int = 10
    $currentPage: Int = 1
    $sort: ProductAttributeSortInput
  ) {
    products(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ){
      items {
        upsell_products {
          uid
    __typename
    sku
    name
    stock_status
    only_x_left_in_stock
    rating_summary
    thumbnail {
      url
      position
      disabled
      label
    }
    url_key
    url_rewrites {
      url
    }
    price_range {
      maximum_price {
        final_price {
          currency
          value
        }
        regular_price {
          currency
          value
        }
      }
      minimum_price {
        final_price {
          currency
          value
        }
        regular_price {
          currency
          value
        }
      }
    }
    categories {
      uid
      name
      url_suffix
      url_path
      breadcrumbs {
        category_name,
        category_url_path
      }
    }
    review_count
    reviews {
      items {
        average_rating
        ratings_breakdown {
          name
          value
        }
      }
    }
        }
        uid
      }
    }
  }
```

### Method: urlResolver
- Query: urlResolver
```graphql
query urlResolver($url: String!) {
    urlResolver(url: $url) {
      id
      redirectCode
      relative_url
      type
      entity_uid
    }
  }
```

### Method: wishlist
- Query: wishlist
```graphql
query wishlist($currentPage: Int = 1, $pageSize: Int = 10) {
    customer {
      wishlists {
        id
        items_count
        sharing_code
        items_v2(currentPage: $currentPage, pageSize: $pageSize) {
          items {
            id
            quantity
            description
            added_at
            product {
              ... on ConfigurableProduct {
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
              }
              ... on BundleProduct {
                items {
                  sku
                  title
                  options {
                    uid
                    quantity
                    product {
                      uid
                      sku
                      name
                      price_range {
                        maximum_price {
                          final_price {
                            currency
                            value
                          }
                          regular_price {
                            currency
                            value
                          }
                        }
                        minimum_price {
                          final_price {
                            currency
                            value
                          }
                          regular_price {
                            currency
                            value
                          }
                        }
                      }
                    }
                  }
                }
              }
              uid
              __typename
              sku
              name
              stock_status
              only_x_left_in_stock
              rating_summary
              categories {
                uid
                name
                url_suffix
                url_path
                breadcrumbs {
                  category_name
                  category_url_path
                }
              }
              price_range {
                maximum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
                position
                disabled
                label
              }
              url_key
              url_rewrites {
                url
              }
              review_count
              reviews {
                items {
                  average_rating
                  ratings_breakdown {
                    name
                    value
                  }
                }
              }
              ... on GroupedProduct {
                items {
                  product {
                    sku
                  }
                }
              }
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
      }
    }
  }
```

