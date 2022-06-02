FROM node:16-alpine AS build

WORKDIR /var/www

RUN apk add --no-cache \
    yarn

COPY . .

# Run dependencies needed to build API Refenrece
RUN yarn install

# Build docs
RUN cd docs \
  && yarn install \
  && sed -i "s/base: '\/',/base: '\/magento\/',/g" ./.vuepress/config.js \
  && cat ./.vuepress/config.js \
  && yarn api-extract \
  && yarn build

FROM nginx

COPY --from=build /var/www/docs/.vuepress/dist /usr/share/nginx/html/magento
