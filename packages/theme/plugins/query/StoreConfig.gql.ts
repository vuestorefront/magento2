/** GraphQL Query that fetches store configuration from the API */
export const StoreConfigQuery = `
  query storeConfig {
    storeConfig {
        store_code,
        default_title,
        store_name,
        default_display_currency_code,
        locale,
        header_logo_src,
        logo_width,
        logo_height,
        logo_alt
    }
  }
`;

export default StoreConfigQuery;
