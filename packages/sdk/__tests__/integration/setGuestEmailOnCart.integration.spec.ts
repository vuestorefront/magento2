import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID, TEST_USER_EMAIL } from './__config__/jest.const';

const ORIGINAL_EMAIL = TEST_USER_EMAIL;
const NEW_EMAIL = 'john.doe@gmail.com';

describe(describeGroup('setGuestEmailOnCart'), () => {
  it('it should set email on cart', async () => {
    const { data } = await sdk.magento.setGuestEmailOnCart({ cart_id: TEST_CART_ID, email: NEW_EMAIL });

    expect(data?.setGuestEmailOnCart?.cart?.email).toEqual(NEW_EMAIL);

    // reset email
    await sdk.magento.setGuestEmailOnCart({ cart_id: TEST_CART_ID, email: ORIGINAL_EMAIL });
  });
});
