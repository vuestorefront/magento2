import { render } from '~/tests/unit/test-utils';
import EmptyWishlist from '~/modules/wishlist/components/EmptyWishlist.vue';

describe('EmptyWishlist.vue', () => {
  it('Renders with a default value', () => {
    const { getByTestId } = render(EmptyWishlist);

    const icon = getByTestId('icon');
    const label = getByTestId('label');

    expect(icon).toBeDefined();
    expect(label).toBeDefined();
  });

  it('Renders content from the "default" slot', () => {
    const wrapper = render(EmptyWishlist, {
      slots: {
        default: '<div id="testSlot"></div>',
      },
    });
    expect(wrapper.html()).toContain('<div id="testSlot"></div>');
  });
});
