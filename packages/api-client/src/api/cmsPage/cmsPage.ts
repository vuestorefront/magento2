import gql from 'graphql-tag';

export default gql`
  query cmsPage($identifier: String) {
    cmsPage(identifier:$identifier) {
      identifier
      content
      title,
      meta_title
      meta_description
      meta_keywords
      content_heading
    }
  }
`;
