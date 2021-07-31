import gql from 'graphql-tag';

export default gql`
fragment ProductMediaConfigurationData on MediaGalleryInterface{
  url
  position
  disabled
  label
}`;
