export const productReviewRatingsMetadata = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query productReviewRatingsMetadata{
        productReviewRatingsMetadata {
          items {
            ${metadata.fields}
          }
        }
      }
    `,
  };
};
