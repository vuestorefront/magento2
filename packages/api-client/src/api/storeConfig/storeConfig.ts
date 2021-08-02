import gql from 'graphql-tag';

export default gql`
query storeConfig {
  storeConfig {
    absolute_footer,
    base_currency_code,
    catalog_default_sort_by,
    category_url_suffix,
    cms_home_page,
    cms_no_cookies,
    code,
    copyright,
    default_description,
    default_display_currency_code,
    default_keywords,
    default_title,
    grid_per_page,
    grid_per_page_values,
    head_shortcut_icon,
    header_logo_src,
    id
    list_per_page,
    list_per_page_values
    locale,
    logo_alt,
    logo_height,
    logo_width,
    magento_wishlist_general_is_enabled,
    no_route
    product_url_suffix,
    root_category_id,
    show_cms_breadcrumbs,
    store_name,
    timezone,
    title_prefix,
    title_separator,
    title_suffix,
    website_id
    welcome,
    allow_guests_to_write_product_reviews,
    catalog_default_sort_by,
    copyright,
    show_cms_breadcrumbs,
    grid_per_page,
    head_includes,
  }
}`;
