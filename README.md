<div align="center">
<img src="https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png" height="80px"/>  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magento_Logo.svg/2560px-Magento_Logo.svg.png" height="80px"/>
</div>


### Stay connected

![GitHub Repo stars](https://img.shields.io/github/stars/vuestorefront/vue-storefront?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/vuestorefront?style=social)
![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCkm1F3Cglty3CE1QwKQUhhg?style=social)
[![Discord](https://img.shields.io/discord/770285988244750366?label=join%20discord&logo=Discord&logoColor=white)](https://discord.vuestorefront.io)


## Vue Storefront 2 integration with Magento

This project is a Magento 2 integration for Vue Storefront 2.

<hr />

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-22-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## How to start if you want to try out the integration

Please follow the [installation guide](https://docs.vuestorefront.io/magento/installation-setup/installation.html)

## How to start if you want to contribute?

Want to contribute? Ping us on `magento2` channel on [our Discord](http://discord.vuestorefront.io)!

### Requirements:
- NodeJS v16 or later
- Yarn (npm is not supprted yet)
- Magento >= v2.4.3 instance for GraphQL endpoint
- Change Magento GraphQL Query Complexity and Depth values

> Don't forget to change the Magento GraphQL Query Complexity and Depth values
Magento 2 by default has a lower value for the complexity of 300, and a higher value for the depth of 20. [Magento 2 - Issue #32427](https://github.com/magento/magento2/issues/32427#issuecomment-860478483)

>The changes are required, due to the size of the queries and mutations in the `api-client` implementation.

>To do this changes, you can use the [Magento 2 module](https://github.com/caravelx/module-graphql-config), which adds a configuration panel to your admin, or do this changes manually.


To install the Magento 2 GraphQL Config module, on your Magento installation execute:

```bash
composer require caravelx/module-graphql-config

php bin/magento module:enable Caravel_GraphQlConfig

php bin/magento setup:upgrade

php bin/magento setup:di:compile

php bin/magento setup:static-content:deploy
```

Find more information about the module [GraphQl Custom Config](https://github.com/caravelx/module-graphql-config)

### Steps
(<b>Note: Currently only yarn is supported because of workspaces resolving. Do not use npm to install or build the project.</b>)
1. [Fork the repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
2. Clone your fork of the repo
    ```bash
    git clone https://github.com/vuestorefront/magento2.git && cd magento2
    ```
3. Checkout `develop` branch
    ```bash
    git checkout develop
    ```
4. Run `yarn` to install dependencies
    ```bash
    yarn install
    ```
5. Copy `.env.example` to `.env`
    ```bash
    cp packages/theme/.env.example packages/theme/.env
    ```
6. Update `MAGENTO_GRAPHQL_URL` with url to Magento >=2.4.2 GraphQL endpoint, and the other variable accordingly to your store configurations.
    ```
    MAGENTO_GRAPHQL_URL=https://{YOUR_SITE_FRONT_URL}/graphql
    ```
7. Build dependencies `yarn build:api-client && yarn build:composables`
    ```bash
    yarn build:api-client && yarn build:composables
    ```
8. Run `yarn dev:theme` to run theme. You can find other commands in `package.json`
    ```bash
    yarn dev:theme
    ```
- If you need HMR on Api Client/Composables run `yarn dev:api-client` or `yarn dev:composables` on a separate terminal window.

## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Magento 2 integration Documentation (WIP)](https://docs.vuestorefront.io/magento)
- [Community Chat](http://discord.vuestorefront.io)

## Support

If you have any questions about this integration we will be happy to answer them on  `magento2-vsf2` channel on [our Discord](http://discord.vuestorefront.io).

## Contributors ✨

### Honorable Mentions
- [Caravel x](https://www.caravelx.com/)
- [Cyberfuze](https://cyberfuze.com/)
- [Leonex](https://www.leonex.de/)

Thanks go to these wonderful people 🙌:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/bloodf"><img src="https://avatars.githubusercontent.com/u/1626923?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Heitor Ramon Ribeiro</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=bloodf" title="Code">💻</a> <a href="#maintenance-bloodf" title="Maintenance">🚧</a> <a href="https://github.com/vuestorefront/magento2/commits?author=bloodf" title="Documentation">📖</a> <a href="#projectManagement-bloodf" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/alefbarbeli"><img src="https://avatars.githubusercontent.com/u/7727647?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Alef Barbeli</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=alefbarbeli" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=alefbarbeli" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/hcmlopes"><img src="https://avatars.githubusercontent.com/u/20449158?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Henrique Lopes</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=hcmlopes" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=hcmlopes" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/DaiLoc5698"><img src="https://avatars.githubusercontent.com/u/76195735?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Đại Lộc Lê Quang</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=DaiLoc5698" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/zfmaster"><img src="https://avatars.githubusercontent.com/u/10129233?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bogdan Podlesnii</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=zfmaster" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/patrickmonteiro"><img src="https://avatars.githubusercontent.com/u/13258255?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Patrick Monteiro</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=patrickmonteiro" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/KevinGorjan"><img src="https://avatars.githubusercontent.com/u/789614?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Kevin Gorjan</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=kevingorjan" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=kevingorjan" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/bartoszherba"><img src="https://avatars.githubusercontent.com/u/16045377?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bartosz Herba</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=bartoszherba" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=bartoszherba" title="Documentation">📖</a> <a href="#maintenance-bartoszherba" title="Maintenance">🚧</a> <a href="#mentoring-bartoszherba" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Abartoszherba" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/Frodigo"><img src="https://avatars.githubusercontent.com/u/11998249?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Marcin Kwiatkowski</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=Frodigo" title="Code">💻</a> <a href="#projectManagement-Frodigo" title="Project Management">📆</a> <a href="#business-Frodigo" title="Business development">💼</a> <a href="https://github.com/vuestorefront/magento2/commits?author=Frodigo" title="Documentation">📖</a> <a href="#ideas-Frodigo" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-Frodigo" title="Maintenance">🚧</a> <a href="#mentoring-Frodigo" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3AFrodigo" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/filrak"><img src="https://avatars.githubusercontent.com/u/15185752?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Filip Rakowski</b></sub></a><br /><a href="#question-filrak" title="Answering Questions">💬</a> <a href="#mentoring-filrak" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Afilrak" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/filipsobol"><img src="https://avatars.githubusercontent.com/u/4145208?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Filip Sobol</b></sub></a><br /><a href="#question-filipsobol" title="Answering Questions">💬</a> <a href="#mentoring-filipsobol" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Afilipsobol" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/vuestorefront/magento2/commits?author=filipsobol" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/andrzejewsky"><img src="https://avatars.githubusercontent.com/u/7943292?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Patryk Andrzejewski</b></sub></a><br /><a href="#question-andrzejewsky" title="Answering Questions">💬</a> <a href="#mentoring-andrzejewsky" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Aandrzejewsky" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/renanoliveira0"><img src="https://avatars.githubusercontent.com/u/1081576?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Renan Oliveira</b></sub></a><br /><a href="#tool-renanoliveira0" title="Tools">🔧</a> <a href="#plugin-renanoliveira0" title="Plugin/utility libraries">🔌</a></td>
    <td align="center"><a href="https://github.com/domideimel"><img src="https://avatars.githubusercontent.com/u/32941053?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Dominik Deimel</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=domideimel" title="Code">💻</a> <a href="https://github.com/vuestorefront/magento2/commits?author=domideimel" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/LiorLindvor"><img src="https://avatars.githubusercontent.com/u/6757942?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Lior Lindvor</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=LiorLindvor" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/sethidden"><img src="https://avatars.githubusercontent.com/u/5359825?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Artur Tagisow</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=sethidden" title="Code">💻</a> <a href="#question-sethidden" title="Answering Questions">💬</a> <a href="#ideas-sethidden" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-sethidden" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-sethidden" title="Maintenance">🚧</a> <a href="https://github.com/vuestorefront/magento2/pulls?q=is%3Apr+reviewed-by%3Asethidden" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/vuestorefront/magento2/commits?author=sethidden" title="Tests">⚠️</a> <a href="#tool-sethidden" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/jonathanribas"><img src="https://avatars.githubusercontent.com/u/3003782?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Jonathan Ribas</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=jonathanribas" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Aliaaaam"><img src="https://avatars.githubusercontent.com/u/88658555?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Ali Ghanei</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=Aliaaaam" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mayashavin"><img src="https://avatars.githubusercontent.com/u/6650139?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Maya Shavin</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=mayashavin" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/AlexanderDevitsky"><img src="https://avatars.githubusercontent.com/u/14941520?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Alexander Devitsky</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=AlexanderDevitsky" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Diegoalbag"><img src="https://avatars.githubusercontent.com/u/72459310?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Diego Alba</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=Diegoalbag" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/aelmizeb"><img src="https://avatars.githubusercontent.com/u/19288561?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Abdellatif EL MIZEB</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=aelmizeb" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

