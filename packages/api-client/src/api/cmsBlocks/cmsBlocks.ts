export default `
  query cmsBlock($identifiers: [String]) {
      cmsBlocks(identifiers: $identifiers) {
          items {
              content
              identifier
              title
          }
      }
  }
`;
