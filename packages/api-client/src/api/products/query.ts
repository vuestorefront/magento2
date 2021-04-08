import gql from 'graphql-tag';
import { productFragment } from '../../fragments';

export const detailQuery = gql`
    query products($search: String, $filter: ProductAttributeFilterInput, $pageSize: Int = 20, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
        products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
            items {
                id
                type_id
                canonical_url
                sku
                name
                stock_status
                only_x_left_in_stock
                description {
                    html
                }
                short_description {
                    html
                }
                media_gallery {
                    url
                }
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
                small_image {
                    url
                }
                image {
                    url
                }
                thumbnail {
                    url
                }
                url_rewrites {
                    url
                    parameters {
                        name
                        value
                    }
                }
                upsell_products {
                    ${productFragment}
                }
                related_products {
                    ${productFragment}
                }
                categories {
                    id
                    name
                    url_suffix
                    url_path
                    breadcrumbs {
                        category_name,
                        category_url_path
                    }
                }
                ... on ConfigurableProduct {
                    variants {
                        attributes {
                            code
                            value_index
                        }
                        product {
                            ${productFragment}
                            media_gallery {
                                url
                            }
                        }
                    }
                    configurable_options {
                        id
                        label
                        attribute_code
                        values {
                            value_index
                            label
                        }
                    }
                }
            }
        }
    }
`;

export const listQuery = gql`
    query products($search: String, $filter: ProductAttributeFilterInput, $pageSize: Int = 20, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
        products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
            aggregations {
                attribute_code,
                count,
                label,
                options {
                    count,
                    label,
                    value
                }
            }
            items {
                ${productFragment}
            },
            total_count
        }
    }
`;
