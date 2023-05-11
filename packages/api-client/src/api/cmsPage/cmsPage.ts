export default `
  query cmsPage($identifier: String) {
    cmsPage(identifier:$identifier) {
      identifier
      content
      title
      meta_title
      meta_description
      meta_keywords
      content_heading
    }
  }
`;
