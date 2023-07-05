export const mergeCarts = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation mergeCarts($sourceCartId: String!, $destinationCartId: String!) {
        mergeCarts(source_cart_id: $sourceCartId, destination_cart_id: $destinationCartId) {
          ${metadata.fields}
        }
      }
     `,
  };
};
