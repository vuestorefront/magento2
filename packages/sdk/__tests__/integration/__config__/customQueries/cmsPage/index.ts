export const cmsPage = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query cmsPage($identifier: String) {
        cmsPage(identifier:$identifier) {
          ${metadata?.fields}
        }
      }
     `,
  };
};
