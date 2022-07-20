# Docs require puppeteer / chromium to generate OpenGraph images.
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-on-alpine

FROM node:16-alpine AS build

WORKDIR /var/www

# Installs latest Chromium (92) package.
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    yarn

COPY . .

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Run dependencies needed to build API reference
RUN yarn install --frozen-lockfile

# Build docs
RUN cd docs \
  && yarn install --frozen-lockfile \
  && sed -i "s/base: '\/',/base: '\/magento\/',/g" ./.vuepress/config.js \
  && cat ./.vuepress/config.js \
  && yarn api-extract \
  && yarn build

FROM nginx

COPY --from=build /var/www/docs/.vuepress/dist /usr/share/nginx/html/magento
