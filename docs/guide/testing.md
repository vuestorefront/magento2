# Type of tests

We have a few type of tests:
- static code analysis (eslint)
- type tests (TypeScript)
- unit/integration (Jest & @testing-library/vue)
- e2e (Cypress)
- manual testing

## Getting started with Unit testing

### Approach

1. Test application from a user perspective and hide implementation details in tests.
2. Focus on `theme` package testing
3. Write data-driven tests
4. Use `describe` block to group tests
5. Use `test` function to write test cases

### Toolset
Tools that we use for unit testing:
1. [Vue testing library](https://testing-library.com/docs/vue-testing-library/intro/)
2. [Jest](https://jestjs.io/)
3. [jest-dom](https://github.com/testing-library/jest-dom)
4. [user-event](https://testing-library.com/docs/ecosystem-user-event/)
5. [TestingPlayground](https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano?hl=en)

#### Before start
We recommend reading these articles before start write unit tests:

- [Testing implementation details](https://kentcdodds.com/blog/testing-implementation-details)
- [Avoid nesting during testing](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing)
- [AHA programming](https://kentcdodds.com/blog/aha-programming)

### Custom render method
We have custom `render` method built on top of testing library [render](https://testing-library.com/docs/vue-testing-library/api#rendercomponent-options-callback) method.

```
function render(Component, options, callbackFunction) {
  return {
    ...DOMTestingLibraryQueries,
    container,
    baseElement,
    debug,
    unmount,
    isUnmounted,
    html,
    emitted,
    updateProps,
  }
}
```

#### Parameters

##### Component
The valid Vue Component to be tested.

#### Options
An object containing additional information to be passed to @vue/test-utils [mount](https://vue-test-utils.vuejs.org/api/options.html#mounting-options).

Read more about options [here](https://testing-library.com/docs/vue-testing-library/api#options).

#### callbackFunction

`function callbackFunction(vueInstance, vuexStore, router) {}`

A callback function that receives the Vue instance as a parameter.
Its return value is merged with options, allowing 3rd party plugins
to be installed prior to mount. To see how this works, see the example using [vue-i18n](https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/translations-vue-i18n.js).

#### Example of use

```
import { render } from '~/test-utils';
import ComponmentToTest from '../ComponentToTest';

test('Should display Hello world', () => {
  const { getByText } = render(ComponmentToTest);

  expect(getByText('Hello world')).toBeInTheDocument();
});
```

##### Passing props

```
const { getByText } = render(Component, {
  props: {
    myProps: true,
  },
});
```

##### Passing mocks
```
const $mock = jesyt.fn();

const { getByText } = render(Component, {
  mocks: {
    $mock
  },
});
```

### How to add test
Let's imagine that you want to test `packages/theme/components/CartSidebar.vue` component.
1. Add `CartSidebar.spec.js` file to `packages/theme/components/__tests__` directory
2. If `__tests__` directory does not exist, please create a new one
3. Add `describe` block and tests inside it.

Rules:
1. Each test file should have `*.spec.js` prefix
2. Each test file should be placed inside `__tests__` directory

### Mocking

Our approach assuming mock composable in unit tests.
To do so you can use existing mocks that are exported from `~/test-utils`.
You can find them in `packages/theme/test-utils/mocks` directory

In case when you can find existing mock, please create a new one:
1. Add file with mock in `packages/theme/test-utils/mocks` directory
2. Re-export the mock in `packages/theme/test-utils/mocks/index.js` file

#### Example of use mock in test

```
import { useGuestUser, useUser } from '@vue-storefront/magento';
import { render, useUserMock, useGuestUserMock } from '~/test-utils';

import UserAccount from '../UserAccount'; // component to test

jest.mock('@vue-storefront/magento', () => ({
  useGuestUser: jest.fn(),
  useUser: jest.fn(),
}));

test('Email should be validated', async () => {
  useUser.mockReturnValue(useUserMock());
  useGuestUser.mockReturnValue(useGuestUserMock());

  (...)
});
```

#### Extending default mock
You can extend default mock by passing an object with props
that you want to extend as a argument to mock function:

```
const attachToCartMock = jest.fn();

useGuestUser.mockReturnValue(useGuestUserMock({
  attachToCart: attachToCartMock,
}));
```

#### Mocking other modules
Sometimes you need to extend some external composables,
or extend only one composable returned by whole package.
Here is the recipe:

```
jest.mock('@nuxtjs/composition-api', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@nuxtjs/composition-api');

  return {
    ...originalModule,
    useRouter: jest.fn(),
  };
});
```

### Setup

In case when something should be set-up before test running, you should use `packages/theme/jest-setup.js` file.
Take a look at the current implementation:

```
import '@testing-library/jest-dom';
import Vue from 'vue';

Vue.directive('e2e', {});
```

### Sample test files
Please take a look at these test files to see the aproach:
1. `packages/theme/pages/Checkout/__tests__/UserAccount.spec.js`
2. `packages/theme/components/__tests__/AddtoWishlist.spec.js`

### Useful links
[Testing library cheatsheet](https://testing-library.com/docs/vue-testing-library/cheatsheet)
