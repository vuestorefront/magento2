FROM node:16-alpine AS build

WORKDIR /var/www

RUN apk add --no-cache \
    yarn

COPY . .

# Run dependencies needed to build API Refenrece
RUN yarn install

# Build docs
RUN cd docs
RUN cd docs && yarn install
# RUN sed -i "s/base: '\/',/base: '\/sdk-magento2\/',/g" ./.vuepress/config.js
# RUN cat ./.vuepress/config.js
RUN cd docs && yarn api-extract
RUN cd docs && yarn build

FROM nginx

COPY --from=build /var/www/docs/.vuepress/dist /usr/share/nginx/html/sdk-magento2
