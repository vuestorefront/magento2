<div align="center">
<img src="https://blog.vuestorefront.io/wp-content/uploads/2020/01/1QU9F6hQlFyHsJIbsdmt6FA.png" height="80px"/>  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magento_Logo.svg/2560px-Magento_Logo.svg.png" height="80px"/>
</div>
## Vue Storefront 2 integration with Magento

This project is a Magento 2 integration for Vue Storefront 2.
This integration developed by superheroes from [Caravel](https://github.com/caravelx) and [Leonex](https://www.leonex.de/) ❤️

<div align="center">
<img src="https://user-images.githubusercontent.com/1626923/127100067-98eda368-94e3-47dd-b824-842d38dc8550.png" height="80px"/>  <img src="https://user-images.githubusercontent.com/1626923/127100001-7607c515-474d-449d-b9df-1c710f966f0a.png" height="80px"/>
</div>

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->


## How to start if you want to try out the integration

```
yarn global add @vue-storefront/cli
```
```
vsf init <project_name> && cd <project_name> && yarn && yarn dev
```

## How to start if you want to contribute?

Want to contribute? Ping us on `magento2-vsf2` channel on [our Discord](https://discord.vuestorefront.io)!
### Requirements:
  - NodeJS v14 or later
  - Magento >= v2.4 instance for GraphQL endpoint
### Steps
1. Fork the repo
2. Clone your fork of the repo
    ```
    example:
    git clone https://github.com/vuestorefront/magento2.git
    cd magento2
    ```
3. Checkout develop branch `git checkout develop`
4. Run `yarn` to install dependencies
5. Copy .env.example and update GraphQL Endpoint
    ```
    cp packages/theme/.env.example .env
    ```
6. Update `MAGENTO_GRAPHQL=` with url to Magento 2.4 GrapgQL endpoint
    ```
    MAGENTO_GRAPHQL=https://{YOUR_SITE_FRONT_URL}/graphql
    ```
7. Build dependencies `yarn build:api-client && yarn build:composables`
8. Run `yarn dev:theme` to run theme. You can find other commands in `package.json`
- If you need HMR on Api Client/Composables run `yarn dev:api-client` or `yarn dev:composables` on a separate terminal window.

## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Magento 2 integration Documentation (WIP)](https://docs.vuestorefront.io/magento)
- [Community Chat](https://discord.vuestorefront.io)

## Support

If you have any questions about this integration we will be happy to answer them on  `magento2-vsf2` channel on [our Discord](discord.vuestorefront.io).

## Contributors ✨

### Honorable Mentions
- [Cyberfuze](https://cyberfuze.com/)

Thanks go to these wonderful people 🙌:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/bloodf"><img src="https://avatars.githubusercontent.com/u/1626923?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Heitor Ramon Ribeiro</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=bloodf" title="Code">💻</a> <a href="#maintenance-bloodf" title="Maintenance">🚧</a> <a href="https://github.com/vuestorefront/magento2/commits?author=bloodf" title="Documentation">📖</a> <a href="#projectManagement-bloodf" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/alefbarbeli"><img src="https://avatars.githubusercontent.com/u/7727647?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Alef Barbeli</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=alefbarbeli" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=alefbarbeli" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/domideimel"><img src="https://avatars.githubusercontent.com/u/32941053?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Dominik Deimel</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=domideimel" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=domideimel" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/LiorLindvor"><img src="https://avatars.githubusercontent.com/u/6757942?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Lior Lindvor</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=LiorLindvor" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/hcmlopes"><img src="https://avatars.githubusercontent.com/u/20449158?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Henrique Lopes</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=hcmlopes" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=hcmlopes" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/DaiLoc5698"><img src="https://avatars.githubusercontent.com/u/76195735?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Đại Lộc Lê Quang</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=DaiLoc5698" title="Code">💻</a></td>
    <td align="center"><a href="https://mediabridge.solutions/"><img src="https://avatars.githubusercontent.com/u/10129233?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bogdan Podlesnii</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=zfmaster" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/filrak"><img src="https://avatars.githubusercontent.com/u/15185752?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Filip Rakowski</b></sub></a><br /><a href="#question-filrak" title="Answering Questions">💬</a> <a href="#mentoring-filrak" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Afilrak" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/filipsobol"><img src="https://avatars.githubusercontent.com/u/4145208?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Filip Sobol</b></sub></a><br /><a href="#question-filipsobol" title="Answering Questions">💬</a> <a href="#mentoring-filipsobol" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Afilipsobol" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/andrzejewsky"><img src="https://avatars.githubusercontent.com/u/7943292?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Patryk Andrzejewski</b></sub></a><br /><a href="#question-andrzejewsky" title="Answering Questions">💬</a> <a href="#mentoring-andrzejewsky" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Aandrzejewsky" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/renanoliveira0"><img src="https://avatars.githubusercontent.com/u/1081576?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Renan Oliveira</b></sub></a><br /><a href="#tool-renanoliveira0" title="Tools">🔧</a> <a href="#plugin-renanoliveira0" title="Plugin/utility libraries">🔌</a></td>
    <td align="center"><a href="https://www.youtube.com/playlist?list=PLBjvYfV_TvwL7srfoBB0QxP1P-iJ5sQnc"><img src="https://avatars.githubusercontent.com/u/13258255?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Patrick Monteiro</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=patrickmonteiro" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
