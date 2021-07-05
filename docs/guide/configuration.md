# Configuration

Magento 2 configuration is located in two places:

## Requirements:
- NodeJS v14 or later
- Magento >= v2.4.2 instance for GraphQL endpoint

## Steps
1. Fork the repo
2. Clone your fork of the repo
    ```
    example:
    git clone https://github.com/vuestorefront/magento2.git
    cd magento2
    ```
3. Checkout develop branch `git checkout develop`
4. Run `yarn` to install dependencies
5. Copy `config/example.json` to an environment named config and update GraphQL Endpoint
    ```
    cp packages/theme/config/example.json packages/theme/config/dev.json
    ```
6. Update `magentoGraphQl` with url to Magento >=2.4.2 GraphQL endpoint, and the other variable accordingly to your store configurations.
    ```
    "magentoGraphQl": "https://{YOUR_SITE_FRONT_URL}/graphql",
    ```
7. Build dependencies `yarn build:api-client && yarn build:composables`
8. Run `yarn dev:theme` to run theme. You can find other commands in `package.json`
- If you need HMR on Api Client/Composables run `yarn dev:api-client` or `yarn dev:composables` on a separate terminal window.
