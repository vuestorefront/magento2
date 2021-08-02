import gql from 'graphql-tag';
import ProductMediaConfigurationData from './productMediaConfigurationFragment';

export default gql`
  ${ProductMediaConfigurationData}
  
fragment ProductImagesData on ProductInterface {
  small_image {
    ...ProductMediaConfigurationData
  }
  image {
    ...ProductMediaConfigurationData
  }
}`;
