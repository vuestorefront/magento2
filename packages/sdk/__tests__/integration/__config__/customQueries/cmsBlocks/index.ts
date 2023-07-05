export const cmsBlocks = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query cmsBlock($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
          items {
            ${metadata.fields}
          }
        }
      }
     `,
  };
};
