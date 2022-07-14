# Load testing
We use K6 for load testing. "K6" refers to both the `k6` executable used in the terminal, and the K6 cloud SAAS platform at [app.k6.io](https://app.k6.io)

## Installing the `k6` executable
To run load tests locally, you need to install the `k6` executable.\
On Mac with Homebrew, you can run:
```sh
brew install k6
k6 --help
```

## Running load tests

### Running locally

To run the load test `searchProducts.js` on your computer, with its cannons aimed at our `canary` environment, run:
```sh
k6 run searchProducts.js -e BASE_URL=https://demo-magento2-canary.europe-west1.gcp.storefrontcloud.io
```
Please run tests locally before running on the cloud or comitting them to make sure the tests can execute at all.

### Running in the cloud

#### Accessing K6 web dashboard
Before you ask the K6 cloud to run the tests for you, please make sure that:
1. You logged in at [app.k6.io](https://app.k6.io) with your VSF Google domain account
2. You were invited to the VSF K6 organization (K6 won't automatically add you to it - even though you're using your domain account) - ask Miłosz if you don't have access
3. In the sidebar in the top right, select the "Magento" project.
That way you'll be able to access the test results.

K6 tests whose options assign the test to the Magento project ID will be shown there. Only tests ran in the cloud appear (ran through GitHub action or locally with `k6 cloud`).

#### Running from our GitHub Action workflow

Go to [the GitHub Actions tab in our repository](https://github.com/vuestorefront/magento2/actions/workflows/run-k6-load-test.yml). On the right, click the "Run workflow" button. A form with these fields will appear:

* Through the checkbox at the top of the form, you can decide if you want to run the test on K6 cloud or within the GitHub action agent (similar to running the test with `k6 run` on your computer, just remotely in GitHub Actions). If you're unsure the test will run correctly, try running it within the Actions agent first, then in the cloud. This avoids wasting a test run from our K6 cloud paid plan.
* The path of the K6 test case file to run
* The `BASE_URL` on which tests will be ran. This the `canary` environment URL by default, since you're most likely to be load testing pre-releases.
* The flags to pass to the k6 command.\
This is useful for overriding or setting options for this particular workflow run. For example, putting `-e K6_VUS=7` in this field makes the test spawn 7 virtual users instead of 10 (default).\
You'll find flag names for other options in the [K6 options reference](https://k6.io/docs/using-k6/k6-options/reference/) - look for the environment variable version of the command in the `ENV` column in the reference table. Some options, like `Extensions` can't be passed as ENV flag - you'll have to hardcode the option in test definition JavaScript code.

### Requesting a cloud run manually
Use the `k6 cloud` command to issue a cloud run request manually. Though the GitHub action workflow is preferred.
