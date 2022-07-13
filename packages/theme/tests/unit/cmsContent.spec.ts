import { render } from '~/tests/unit/test-utils';
import { Content, cmsContentMock } from '~/tests/unit/mocks/cmsContentMock';

// eslint-disable-next-line jest/no-export
export const cmsContentTest = (component) => {
  test.each(cmsContentMock as Content[])(
    '$received should be displayed as $expected',
    ({ received, expected }) => {
      const { getByText } = render(component, { props: { content: received } });

      expect(getByText(expected)).toBeDefined();
    },
  );
};
