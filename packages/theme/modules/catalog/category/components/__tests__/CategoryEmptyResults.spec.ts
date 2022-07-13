import { render } from '~/tests/unit/test-utils';
import CategoryEmptyResults from '../CategoryEmptyResults.vue';

describe('CategoryEmptyResults.vue', () => {
  it('Renders with a default value', () => {
    const { getByRole, queryByText } = render(CategoryEmptyResults);

    const svgImage = getByRole('img');
    const paragraph = queryByText('We can\'t find products matching the selection.');

    expect(svgImage).toBeDefined();
    expect(paragraph).toBeDefined();
  });

  it('Renders content from the "default" slot', () => {
    const wrapper = render(CategoryEmptyResults, {
      slots: {
        default: '<div id="testSlot"></div>',
      },
    });
    expect(wrapper.html()).toContain('<div id="testSlot"></div>');
  });
});
