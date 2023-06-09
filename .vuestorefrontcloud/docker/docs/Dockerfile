FROM node:16-alpine AS build

ARG NPM_EMAIL
ARG NPM_PASS
ARG NPM_USER
ARG NPM_REGISTRY

WORKDIR /var/www

COPY . .

RUN npm install -g npm-cli-login \
  && npm-cli-login

# Run dependencies needed to build API Reference
RUN yarn install

# Build docs
RUN cd docs \
  && yarn install \
  && sed -i "s/base: '\/',/base: '\/sdk-magento2\/',/g" ./.vuepress/config.js \
  && cat ./.vuepress/config.js \
  && yarn api-extract \
  && yarn build

FROM nginx

COPY --from=build /var/www/docs/.vuepress/dist /usr/share/nginx/html/sdk-magento2
