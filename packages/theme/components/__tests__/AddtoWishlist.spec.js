import userEvent from '@testing-library/user-event';
import { render } from '~/tests/unit/test-utils';
// @ts-ignore
import AddToWishlist from '../AddToWishlist.vue';

describe('<AddToWishlist>', () => {
  it('Should not render add to wishlist button because isShow prop equals false by default', () => {
    const { queryByText } = render(AddToWishlist);

    expect(queryByText('Add to wishlist')).toBeNull();
  });

  it('Should render add to wishlist button', () => {
    const { getByText } = render(AddToWishlist, {
      props: {
        isShow: true,
      },
    });

    const button = getByText('Add to Wishlist');
    expect(button).toBeInTheDocument();
  });

  it('Should render remove from wishlist button', () => {
    const { getByText } = render(AddToWishlist, {
      props: {
        isShow: true,
        isInWishlist: true,
      },
    });

    const button = getByText('Remove from Wishlist');
    expect(button).toBeInTheDocument();
  });

  it('Should emit clock event when add to wishlist button is clicked', async () => {
    const user = userEvent.setup();

    const { getByText, emitted } = render(AddToWishlist, {
      props: {
        isShow: true,
      },
    });

    const button = getByText('Add to Wishlist');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await user.click(button);

    expect(emitted()).toHaveProperty('addToWishlist');
  });
});
