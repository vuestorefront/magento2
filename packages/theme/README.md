<div align="center">
<img src="https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png" height="80px"/>  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magento_Logo.svg/2560px-Magento_Logo.svg.png" height="80px"/>
</div>

# Magento 2.x theme

### Vue Storefront 2 integration with Magento

This theme developed by superheroes from [Caravel](https://github.com/caravelx) ❤️

<div align="center">
<img src="https://user-images.githubusercontent.com/1626923/127100067-98eda368-94e3-47dd-b824-842d38dc8550.png" height="80px"/>
</div>

### Requirements:

- NodeJS v14 or later
- Yarn
- Magento >= v2.4.3 instance for GraphQL endpoint
- Change Magento GraphQL Query Complexity and Depth values

> [WARNING] Don't forget to change the Magento GraphQL Query Complexity and Depth values
Magento 2 by default has a lower value for the complexity of 300, and a higher value for the depth of 20. [Magento 2 - Issue #32427](https://github.com/magento/magento2/issues/32427#issuecomment-860478483)
The changes are required, due to the size of the queries and mutations in the `api-client` implementation.
To do this changes, you can use the [Magento 2 module](https://github.com/caravelx/module-graphql-config), which adds a configuration panel to your admin, or do this changes manually.

To install the Magento 2 GraphQL Config module, on your Magento installation execute:

```bash
composer require caravelx/module-graphql-config

php bin/magento module:enable Caravel_GraphQlConfig

php bin/magento setup:upgrade

php bin/magento setup:di:compile

php bin/magento setup:static-content:deploy
```

Find more information about the module [GraphQl Custom Config](https://github.com/caravelx/module-graphql-config)

### Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Contributors ✨

### Honorable Mentions
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
    <td align="center"><a href="https://github.com/KevinGorjan"><img src="https://avatars.githubusercontent.com/u/789614?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Kevin Gorjan</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=kevingorjan" title="Code">💻</a></td>
    <td align="center"><a href="http://digibart.com/"><img src="https://avatars.githubusercontent.com/u/16045377?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bartosz Herba</b></sub></a><br /><a href="https://github.com/vuestorefront/magento2/commits?author=bartoszherba" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
