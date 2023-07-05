export const productReview = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query productReview($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
        products(search: $search, filter: $filter, sort: $sort) {
          items {
            review_count
            reviews(pageSize: $pageSize, currentPage: $currentPage) {
              items {
                ${metadata?.fields}
              }
            }
          }
        }
      }
     `,
  };
};
