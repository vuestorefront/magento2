import gql from 'graphql-tag';

export const filteredQuery = gql`
    query categoryList($filters: CategoryFilterInput) {
        categoryList(filters: $filters) {
            id,
            name,
            url_path,
            url_suffix,
            meta_title,
            meta_description,
            breadcrumbs {
                category_name,
                category_url_path
            },
            display_mode,
            description,
            available_sort_by,
            default_sort_by,
            product_count,
            cms_block{
                content,
                title
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
