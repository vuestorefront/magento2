import gql from 'graphql-tag';
import ProductMediaConfigurationData from './productMediaConfigurationFragment';

export default gql`
  ${ProductMediaConfigurationData}
  
fragment ProductGalleryData on ProductInterface {
  media_gallery {
    ...ProductMediaConfigurationData
  }
}`;
