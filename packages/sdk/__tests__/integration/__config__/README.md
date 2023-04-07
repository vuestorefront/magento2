# Integration tests automated mocks setup

Integration tests in this repository leverage automated mocks created by [Nock](https://github.com/nock/nock). The data
from SAP is requested once (during the first integration tests run) and saved in the __nock-fixtures__ directory.
Subsequent test runs use these recorded responses and do not send any requests to SAP.

While setting up Nock, we had to solve a couple of issues to make it work seamlessly in our case.

## Running API Middleware with Storefront removed from the monorepo

When the Storefront was still in the integration's monorepo, we could simply import `middleware.js`
and `middleware.config.js` files to run the API Middleware from within SDK's `jest.setup.global.js` file. After the
Storefront had been removed, we had to re-adjust `jest.setup.global.js` so that it can spin up the API Middleware
completely on its own.

As a result, it repeats the logic and config previously imported from `middleware.js` and `middleware.config.js` files.
It also uses a dedicated `.env` file from the `./packages/sdk/__tests__/integration/__config__` directory. Bear in mind
the file is not version-controlled and **has to be added manually to the repo before running the tests locally**.
Otherwise, you're in for an error with the following message:

> Missing at least one environment variable. Make sure the .env file is present in `__tests__/integration/__config__`.

## Setting Nock up once before all tests instead of every test separately

The simplest way to set up Nock would be to do it in every single test case. However, this would add a lot of
boilerplate to our integration test suites. Thus, we've taken some time to figure out how to set it up once, before all
tests, and not worry about it anymore.

For that purpose, we've created the `jest.setup.js` file where we have:

- set Nock [mode](https://www.npmjs.com/package/nock#modes) to `record`,
- told Nock what directory it should save recorded responses (fixtures) in,
- told Nock to create fixtures names from `expect.getState().currentTestName`.

## Giving test groups uniform names

To avoid boilerplate while describing a test group, we use the `describeGroup()` helper. Instead of describing it like
this:

```ts
describe('[SDK][Integration Tests] getProduct', () => {});
```

we describe it like this:

```ts
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('getProduct'), () => {});
```

In both cases, the result is the same. However, using the helper makes our test suites cleaner, makes sure every test
group has the same description and allows us to create **uniform Nock fixtures names**.

## Mocking only requests to SAP (and not to API Middleware)

Let's say we are running our integration tests for the first time. During every test, 2 **real** requests are sent:

- From SDK to API Middleware,
- From API Middleware to SAP OCC API.

As a result of that first test run, Nock records responses to both of these requests. In subsequent test runs - instead
of sending a real request from SDK to API Middleware again, Nock simply returns the mocked response. It means that our
API Middleware is not reached and does not make call #2 (to SAP OCC API).

We want to avoid this situation. We want our integration tests to always send the **real** request #1 and only use the
mocked response to request #2. To achieve that, we had to do two things in the `nockSetup()` method:

- Add `afterRecord` callback to `nock.back()` and manually remove the recorded response for request #1 there
- Call `nock.enableNetConnect()` after `nock.back()`. Without it, request #1 was blocked by Nock in subsequent test runs
  with the NetConnectNotAllowedError.

## Solving errors while running tests in parallel

While recording, Nock does not handle very well tests running in parallel (in multiple child processes) instead of
serially in a single process. Therefore, to record responses properly, we must run integration tests with
the `--runInBand` flag.

This repository has a dedicated command for running integration tests to create (or re-create) Nock mocks:

`test:integration:init`

For subsequent test runs (where mocks are already present in the `__nock-fixtures__` directory), the basic command
should be used:

`yarn test:integration`

## Simulating authenticated user requests

Our SDK methods can send requests on behalf of both anonymous and authenticated users. We can simulate an authenticated
user session by calling the async `initUserSession()` helper (imported from the `jest.setup` file) at the beginning of a
test case:

```ts
import { initUserSession } from './__config__/jest.setup';

it('simulates authenticated user session', async () => {
  await initUserSession();
  // ...
});
```

First, the helper requests a real user token from the SAP authorization server and the response is saved in a fixture.
Second, it attaches the token as a cookie header to all remaining requests to API Middleware within the running test
case.

After the test case execution is over, the cookie header is cleared automatically within the global `afterEach()` hook.
Subsequent test cases must call `initUserSession()` again if they want to simulate an authenticated user session.

```ts
import { initUserSession } from './__config__/jest.setup';

it('simulates authenticated user session', async () => {
  await initUserSession();
  // ...
});

it('simulates authenticated user session, too', async () => {
  await initUserSession();
  // ...
});
```

If - for some reason - you need to simulate both authenticated and anonymous sessions within a single test, you can use
a complimentary `terminateUserSession()` helper:

```ts
import { initUserSession, terminateUserSession } from './__config__/jest.setup';

it('simulates authenticated user session', async () => {
  await initUserSession();
  // send some requests as a logged-in user...

  terminateUserSession();
  // send some requests as an anonymous user...
});
```
