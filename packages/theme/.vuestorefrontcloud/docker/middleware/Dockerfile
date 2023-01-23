FROM node:16-alpine

ARG NPM_USER
ARG NPM_PASS
ARG NPM_EMAIL
ARG NPM_REGISTRY
ARG VSF_MAGENTO_BASE_URL
ARG VSF_MAGENTO_GRAPHQL_URL

ENV VSF_MAGENTO_BASE_URL=${VSF_MAGENTO_BASE_URL}
ENV VSF_MAGENTO_GRAPHQL_URL=${VSF_MAGENTO_GRAPHQL_URL}

WORKDIR /var/www

COPY middleware.js middleware.config.js .npmrc ./
COPY .vuestorefrontcloud/docker/middleware/package.json ./

## Install and build
RUN npm install -g npm-cli-login && npm-cli-login \
    && yarn install --network-concurrency 1 \
    && yarn cache clean --all

EXPOSE 8181

ENTRYPOINT ["yarn", "start:middleware"]
