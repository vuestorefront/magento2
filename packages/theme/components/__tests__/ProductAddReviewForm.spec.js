/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { useRoute } from '@nuxtjs/composition-api';
import {
  render,
  useUserMock,
  useReviewMock,
} from '~/tests/unit/test-utils';

import { useReview } from '~/modules/review/composables/useReview';
import { useUser } from '~/modules/customer/composables/useUser';
import ProductAddReviewForm from '../../modules/catalog/product/components/ProductAddReviewForm';

jest.mock('~/composables', () => {
  const originalModule = jest.requireActual('~/composables');
  return {
    ...originalModule,
    useUser: jest.fn(),
  };
});

jest.mock('@nuxtjs/composition-api', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@nuxtjs/composition-api');

  return {
    ...originalModule,
    useRoute: jest.fn(),
  };
});

jest.mock('~/modules/review/composables/useReview', () => {
  const originalModule = jest.requireActual('~/modules/review/composables/useReview');
  return {
    ...originalModule,
    useReview: jest.fn(),
  };
});

describe.skip('<ProductAddReviewForm/>', () => {
  it('Form fields are rendered and validated', async () => {
    useUser.mockReturnValue(useUserMock());
    useReview.mockReturnValue(useReviewMock());
    useRoute.mockReturnValue({ value: { params: { id: '' } } });

    const { getByRole, findAllByText, queryByTestId } = render(ProductAddReviewForm);

    // Nickname, title and review fields should be rendered and required

    const recaptchaComponent = queryByTestId('recaptcha');
    expect(recaptchaComponent).toBeNull();

    const nickname = getByRole('textbox', { name: /name/i });
    expect(nickname).toBeRequired();

    const summary = getByRole('textbox', { name: /title/i });
    expect(summary).toBeRequired();

    const text = getByRole('textbox', { name: /review/i });
    expect(text).toBeRequired();

    const submitButton = getByRole('button', { name: /add review/i });
    userEvent.click(submitButton);

    // should display form errors when field are not filled
    const errors = await findAllByText('This field is required');
    expect(errors).toHaveLength(3);
  });

  it('User can submit a review', async () => {
    const values = {
      nickname: 'nickname value',
      rating: '2',
      sku: 'sku value',
      summary: 'summary value',
      text: 'text value',
      token: 'token value',
    };

    useRoute.mockReturnValue({ value: { params: { id: values.sku } } });
    useUser.mockReturnValue(useUserMock());
    useReview.mockReturnValue(useReviewMock({
      metadata: {
        value: [{
          id: 'rating',
          name: 'Product rating',
          values: [
            { value_id: '1', value: 'Rating 1' },
            { value_id: '2', value: 'Rating 2' },
            { value_id: '3', value: 'Rating 3' },
          ],
        }],
      },
    }));

    const { getByRole, emitted, queryByTestId } = render(ProductAddReviewForm, {
      mocks: {
        $nuxt: {
          context: {
            $config: { isRecaptcha: true },
            $recaptcha: {
              init: jest.fn(),
              getResponse: jest.fn().mockResolvedValue(Promise.resolve(values.token)),
            },
          },
        },
      },
    });

    const recaptchaComponent = queryByTestId('recaptcha');
    expect(recaptchaComponent).toBeTruthy();

    const nickname = getByRole('textbox', { name: /name/i });
    const summary = getByRole('textbox', { name: /title/i });
    const text = getByRole('textbox', { name: /review/i });
    const rating = getByRole('combobox', { name: /product rating/i });
    const submitButton = getByRole('button', { name: /add review/i });

    // fill the form
    userEvent.type(nickname, values.nickname);
    userEvent.type(summary, values.summary);
    userEvent.selectOptions(rating, values.rating);
    userEvent.type(text, values.text);

    // Submit the form
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(emitted()).toHaveProperty('add-review');
      expect(emitted()['add-review'][0][0]).toEqual({
        nickname: values.nickname,
        ratings: [{ id: 'rating', value_id: values.rating }],
        sku: values.sku,
        summary: values.summary,
        text: values.text,
        recaptchaToken: values.token,
      });
    });
  });
});
