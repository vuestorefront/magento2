import request from '../../setup/request';
import { STORE_CONFIG_MOCK_RESP } from '../../mockData/api/storeConfig';

describe('[Magento-API-Client] storeConfig', () => {
  it('Fetching the storeConfig', async () => {
    const res = await request({
      body: JSON.stringify({
        query: `
          query {
            storeConfig {
              allow_guests_to_write_product_reviews
              allow_items
              allow_order
              base_currency_code
              catalog_default_sort_by
              category_fixed_product_tax_display_setting
              cms_home_page
              cms_no_cookies
              cms_no_route
              configurable_thumbnail_source
              copyright
              default_description
              default_display_currency_code
              default_keywords
              default_title
              grid_per_page
              grid_per_page_values
              head_shortcut_icon
              header_logo_src
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
              product_fixed_product_tax_display_setting
              product_reviews_enabled
              required_character_classes_number
              root_category_uid
              sales_fixed_product_tax_display_setting
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
              website_name
              weight_unit
              welcome
            }
          }
        `,
      }),
    });
    const { data } = await res.json();

    expect(data).toEqual(STORE_CONFIG_MOCK_RESP);
  });
});
