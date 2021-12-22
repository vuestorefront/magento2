import userEvent from '@testing-library/user-event';
import { render } from '~/test-utils';
// @ts-ignore
import AddToWishlist from '../AddToWishlist';

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

    const button = getByText('Add to wishlist');
    expect(button).toBeInTheDocument();
  });

  it('Should render remove from wishlist button', () => {
    const { getByText } = render(AddToWishlist, {
      props: {
        isShow: true,
        isInWishlist: true,
      },
    });

    const button = getByText('Remove from wishlist');
    expect(button).toBeInTheDocument();
  });

  it('Should emit clock event when add to wishlist button is clicked', () => {
    const { getByText, emitted } = render(AddToWishlist, {
      props: {
        isShow: true,
      },
    });

    const button = getByText('Add to wishlist');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    userEvent.click(button);

    expect(emitted()).toHaveProperty('addToWishlist');
  });
});
