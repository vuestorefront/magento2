import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
mutation focusSetGroupOnItem($input: focusSetGroupOnItemInput) {
  focusSetGroupOnItem(input: $input) {
    ${cartFragment}
  }
}`;
