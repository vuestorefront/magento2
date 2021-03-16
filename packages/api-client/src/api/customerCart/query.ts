import gql from 'graphql-tag';
import { cartFragment } from '../../fragments';

export default gql`
    query customerCart {
        customerCart {
            ${cartFragment}
        }
    }
`;
