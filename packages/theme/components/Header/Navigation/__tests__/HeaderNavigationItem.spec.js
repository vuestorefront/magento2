import HeaderNavigationItem from '../HeaderNavigationItem.vue';
import { render } from '~/test-utils';

describe('HeaderNavigationItem', () => {
  it('display proper label and link', () => {
    const testLabel = 'test_label';
    const testLink = 'http://some_path/';
    const { getByText, getByRole } = render(HeaderNavigationItem, { props: { label: testLabel, link: testLink } });
    getByText(testLabel);
    expect(getByRole('link', { name: /test_label/i })).toHaveAttribute('href', testLink);
  });
});
