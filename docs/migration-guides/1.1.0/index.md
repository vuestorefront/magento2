# Vue Storefront for Magento 1.1.0

Vue Storefront for Magento 1.1.0 contains backward-incompatible changes. To review these backward-incompatible changes, see

[1.1.0 **Backward incompatible changes reference** ](./1.1.0-bic.md)

## Vue Storefront for Magento 1.1.0 highlights

Vue Storefront for Magento 1.1.0 provides a few new features like SEO-friendly URLs, SEO meta tags, Google Cloud CDN support, and more.

## Features

- feat!: implement magento URL rewrites [https://github.com/vuestorefront/magento2/pull/1321](https://github.com/vuestorefront/magento2/pull/1321/files)
- feat: add GC CDN support [https://github.com/vuestorefront/magento2/pull/1338](https://github.com/vuestorefront/magento2/pull/1338)
- feat: implement a meta info on cms, product,category page [https://github.com/vuestorefront/magento2/pull/1326](https://github.com/vuestorefront/magento2/pull/1326)
- feat: implement add a grouped product to cart [https://github.com/vuestorefront/magento2/pull/1324](https://github.com/vuestorefront/magento2/pull/1324)
- feat: make security connection optional by default [https://github.com/vuestorefront/magento2/pull/1354](https://github.com/vuestorefront/magento2/pull/1354)

### Bugfix

- fix: product list page is sometimes unresponsive after the store switch [https://github.com/vuestorefront/magento2/pull/1352](https://github.com/vuestorefront/magento2/pull/1352)
- fix: logout doesn't work after reload of the MyAccount page [https://github.com/vuestorefront/magento2/pull/1347](https://github.com/vuestorefront/magento2/pull/1347)
- fix: pods do not get up after deployment [https://github.com/vuestorefront/magento2/pull/1351](https://github.com/vuestorefront/magento2/pull/1351)
- fix: add missing canary URL protocols [https://github.com/vuestorefront/magento2/pull/1349](https://github.com/vuestorefront/magento2/pull/1349)
- fix: product is not marked as added to the wishlist [https://github.com/vuestorefront/magento2/pull/1346](https://github.com/vuestorefront/magento2/pull/1346)
- fix: fix the issue with a store switching on the customer account [https://github.com/vuestorefront/magento2/pull/1345](https://github.com/vuestorefront/magento2/pull/1345)
- fix: fix a message about the submitted review [https://github.com/vuestorefront/magento2/pull/1331](https://github.com/vuestorefront/magento2/pull/1331)
- fix: vsf2 not working with docker-compose [https://github.com/vuestorefront/magento2/pull/1337](https://github.com/vuestorefront/magento2/pull/1337)
- fix: pods have warnings error after deployment [https://github.com/vuestorefront/magento2/pull/1335](https://github.com/vuestorefront/magento2/pull/1335)
- fix: fix product detail components [https://github.com/vuestorefront/magento2/pull/1330](https://github.com/vuestorefront/magento2/pull/1330)
- fix: downloadableProduct might not have been initialized [https://github.com/vuestorefront/magento2/pull/1325](https://github.com/vuestorefront/magento2/pull/1325)
- fix: getAvailableShippingMethods query variables [https://github.com/vuestorefront/magento2/pull/1318](https://github.com/vuestorefront/magento2/pull/1318)
- fix: update CDN default configuration [https://github.com/vuestorefront/magento2/pull/1372](https://github.com/vuestorefront/magento2/pull/1372)
- fix: getMagentoImage reading 'split' error [https://github.com/vuestorefront/magento2/pull/1373](https://github.com/vuestorefront/magento2/pull/1373)
- fix: cart type error in the console after opening mini cart as a guest [https://github.com/vuestorefront/magento2/pull/1374](https://github.com/vuestorefront/magento2/pull/1374)
- fix: product detail gallery is missing when browsing products using mobile [https://github.com/vuestorefront/magento2/pull/1375](https://github.com/vuestorefront/magento2/pull/1375)
- fix: ssr reload on the grouped product page [https://github.com/vuestorefront/magento2/pull/1376](https://github.com/vuestorefront/magento2/pull/1376)
- fix: product list page items on product page list page zero prices issues [https://github.com/vuestorefront/magento2/pull/1379](https://github.com/vuestorefront/magento2/pull/1379)
-
### Chore

- chore: removed deprecated composables packages from the repository [https://github.com/vuestorefront/magento2/pull/1322](https://github.com/vuestorefront/magento2/pull/1322)

### Docs

- docs: fixed breaking change reference link [https://github.com/vuestorefront/magento2/pull/1350](https://github.com/vuestorefront/magento2/pull/1350)
- docs: fix wording + add installation video [https://github.com/vuestorefront/magento2/pull/1319](https://github.com/vuestorefront/magento2/pull/1319)
- docs: removed outdated information about cors configuration [https://github.com/vuestorefront/magento2/pull/1378](https://github.com/vuestorefront/magento2/pull/1378)

### Repository

- ci: fix code not checked out [https://github.com/vuestorefront/magento2/pull/1327](https://github.com/vuestorefront/magento2/pull/1327)
- ci: refactor k6 action to add new env vars [https://github.com/vuestorefront/magento2/pull/1287](https://github.com/vuestorefront/magento2/pull/1287)

### Credits

Huge thanks to @[sethidden](https://github.com/sethidden), [@sequensucks](https://github.com/sequensucks), [@Frodigo](https://github.com/Frodigo), [@bartoszherba](https://github.com/bartoszherba)
