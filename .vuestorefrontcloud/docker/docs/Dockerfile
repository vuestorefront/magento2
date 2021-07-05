FROM node:12 AS build

WORKDIR /var/www

COPY . .

RUN npm install \
  && sed -i "s/base: '\/',/base: '\/magento\/',/g" ./.vuepress/config.js \
  && cat ./.vuepress/config.js \
  && npm run build

FROM nginx

COPY --from=build /var/www/.vuepress/dist /usr/share/nginx/html/magento
