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

export const StoreConfigQueryString = 'query=query%20storeConfig%20%7B%0A%20%20%20%20storeConfig%20%7B%0A%20%20%20%20%20%20%20%20store_code,%0A%20%20%20%20%20%20%20%20default_title,%0A%20%20%20%20%20%20%20%20store_name,%0A%20%20%20%20%20%20%20%20default_display_currency_code,%0A%20%20%20%20%20%20%20%20locale,%0A%20%20%20%20%20%20%20%20header_logo_src,%0A%20%20%20%20%20%20%20%20logo_width,%0A%20%20%20%20%20%20%20%20logo_height,%0A%20%20%20%20%20%20%20%20logo_alt%0A%20%20%20%20%7D%0A%20%20%7D&variables=%7B%7D&operationName=storeConfig';
