import gql from 'graphql-tag';

export const filteredQuery = gql`
    query categoryList($filters: CategoryFilterInput) {
        categoryList(filters: $filters) {
            id,
            name,
            url_path,
            url_suffix,
            breadcrumbs {
                category_name,
                category_url_path
            },
            children {
                id,
                name,
                url_path,
                url_suffix,
                children {
                    id,
                    name,
                    url_path,
                    url_suffix,
                    children {
                        id,
                        name,
                        url_path,
                        url_suffix,
                        children {
                            id,
                            name,
                            url_path,
                            url_suffix
                        }
                    }
                }
            }
        }
    }
`;

export const query = gql`
    query categoryList {
        categoryList {
            id,
            name,
            url_path,
            url_suffix,
            children {
                id,
                name,
                url_path,
                url_suffix,
                children {
                    id,
                    name,
                    url_path,
                    url_suffix,
                    children {
                        id,
                        name,
                        url_path,
                        url_suffix,
                        children {
                            id,
                            name,
                            url_path,
                            url_suffix
                        }
                    }
                }
            }
        }
    }
`;
