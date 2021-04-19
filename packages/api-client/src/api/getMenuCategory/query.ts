import gql from 'graphql-tag';
import { categoryDataFragment, categoryUrlData } from '../../fragments';

export const BaseQuery = gql`
  query GetMenuCategory($filters: CategoryFilterInput = {}){
    categories(filters: $filters) {
      items {
        children {
          ${categoryDataFragment}
          ${categoryUrlData}
          children_count
          children {
            ${categoryDataFragment}
            ${categoryUrlData}
            children_count
          }
        }
        children_count
        ${categoryDataFragment}
        ${categoryUrlData}
      }
      page_info{
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
`;
