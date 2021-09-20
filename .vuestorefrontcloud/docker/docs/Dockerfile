FROM node:14 AS build

WORKDIR /var/www

COPY . .

RUN npx yarn \
  && sed -i "s/base: '\/',/base: '\/magento\/',/g" ./docs/.vuepress/config.js \
  && cat ./docs/.vuepress/config.js \
  && npm run build

FROM nginx

COPY --from=build /var/www/docs/.vuepress/dist /usr/share/nginx/html/magento
