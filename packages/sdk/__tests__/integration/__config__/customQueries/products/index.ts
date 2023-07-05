export const productsList = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query productsList(
        $search: String = "",
        $filter: ProductAttributeFilterInput,
        $pageSize: Int = 10,
        $currentPage: Int = 1,
        $sort: ProductAttributeSortInput
      ) {
        products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
         ${metadata.fields}
        }
      }
    `,
  };
};
