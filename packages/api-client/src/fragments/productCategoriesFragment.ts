import gql from 'graphql-tag';

export default gql`
fragment ProductCategoriesData on ProductInterface {
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
}`;
