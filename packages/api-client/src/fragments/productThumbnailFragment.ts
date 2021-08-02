import gql from 'graphql-tag';
import ProductMediaConfigurationData from './productMediaConfigurationFragment';

export default gql`
  ${ProductMediaConfigurationData}
  
fragment ProductThumbnailData on ProductInterface {
  thumbnail {
    ...ProductMediaConfigurationData
  }
}`;
