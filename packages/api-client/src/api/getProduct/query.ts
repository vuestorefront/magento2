import gql from 'graphql-tag';

export default gql`
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
                sku,
                name,
                price_range {
                    minimum_price {
                        final_price {
                            currency,
                            value
                        },
                        regular_price {
                            currency,
                            value
                        }
                    }
                },
                small_image {
                    url
                },
                image {
                    url
                },
                thumbnail {
                    url
                },
                url_rewrites {
                    url,
                    parameters {
                        name,
                        value
                    }
                }
            },
            total_count
        }
    }
`;
