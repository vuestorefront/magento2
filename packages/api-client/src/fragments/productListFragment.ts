import productFragment from './productFragment';
import freeGiftRuleFragment from './freeGiftRuleFragment';

export default `
${productFragment}
media_gallery {
  url
  position
  disabled
  label
}
free_gift_data {
  ${freeGiftRuleFragment}
}
`;
