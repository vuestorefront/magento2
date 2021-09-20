FROM node:12 AS build

WORKDIR /var/www

COPY . .

RUN npm install \
  && sed -i "s/base: '\/',/base: '\/magento\/',/g" ./docs/.vuepress/config.js \
  && cat ./docs/.vuepress/config.js \
  && npm run build

FROM nginx

COPY --from=build /var/www/docs/.vuepress/dist /usr/share/nginx/html/magento
