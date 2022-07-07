# Vue Storefront for Magento 1.0.0-rc.10 release notes

Vue Storefront for Magento 1.0.0.rc.10 contains backward-incompatible changes. To review these backward-incompatible changes, see

[1.0.0-rc.10 Backward incompatible changes reference](./rc.10-bic.md)

## Vue Storefront for Magento 1.0.0-rc.10 highlights

### New features

- feat: add quantity error message on the PDP when adding to the cart [https://github.com/vuestorefront/magento2/pull/1123](https://github.com/vuestorefront/magento2/pull/1123)

### Bugfix

- fix: checkouts discounted price is wrongly displayed [https://github.com/vuestorefront/magento2/pull/1180](https://github.com/vuestorefront/magento2/pull/1180)
- fix(category): fix various rwd issues on category mobile view [https://github.com/vuestorefront/magento2/pull/1168](https://github.com/vuestorefront/magento2/pull/1168)
- fix: don't make 'show password' button huge [https://github.com/vuestorefront/magento2/pull/1135](https://github.com/vuestorefront/magento2/pull/1135)
- fix: cart store not cleared properly on logout [https://github.com/vuestorefront/magento2/pull/1159](https://github.com/vuestorefront/magento2/pull/1159)
- fix: cart, checkout - size and colour values are wrongly displayed [https://github.com/vuestorefront/magento2/pull/1161](https://github.com/vuestorefront/magento2/pull/1161)
- fix: fixed wrong values of selected configurable product variants [https://github.com/vuestorefront/magento2/pull/1178](https://github.com/vuestorefront/magento2/pull/1178)
- fix: error during recaptcha verification [https://github.com/vuestorefront/magento2/pull/1175](https://github.com/vuestorefront/magento2/pull/1175)
- fix: mobile category add to cart button is missing on mobile view [https://github.com/vuestorefront/magento2/pull/1171](https://github.com/vuestorefront/magento2/pull/1171) [https://github.com/vuestorefront/magento2/pull/1177](https://github.com/vuestorefront/magento2/pull/1177)
- fix(theme): billing address is cleared while returning to billing step on checkout [https://github.com/vuestorefront/magento2/pull/783](https://github.com/vuestorefront/magento2/pull/783)
- fix: my account password change toast fix [https://github.com/vuestorefront/magento2/pull/1124](https://github.com/vuestorefront/magento2/pull/1124)
- fix: user addresses - reset region if changing country [https://github.com/vuestorefront/magento2/pull/1140](https://github.com/vuestorefront/magento2/pull/1140)
- fix: fix pagination on mobile wishlist view [https://github.com/vuestorefront/magento2/pull/1125](https://github.com/vuestorefront/magento2/pull/1125)
- fix: fixed order details 500 error [https://github.com/vuestorefront/magento2/pull/1134](https://github.com/vuestorefront/magento2/pull/1134)
- fix: fixed mega menu z-index in safari [https://github.com/vuestorefront/magento2/pull/1181](https://github.com/vuestorefront/magento2/pull/1181)
- fix: wishlist show products limit increased [https://github.com/vuestorefront/magento2/pull/1128](https://github.com/vuestorefront/magento2/pull/1128)
- fix: the amount of displayed products is changed after visiting My account -> My wishlist [https://github.com/vuestorefront/magento2/pull/1130](https://github.com/vuestorefront/magento2/pull/1130)
- fix: pressing home button shouldn't open sidebar [https://github.com/vuestorefront/magento2/pull/1137](https://github.com/vuestorefront/magento2/pull/1137)
- fix: mobile category tree parent categories should allow viewing children [https://github.com/vuestorefront/magento2/pull/1129](https://github.com/vuestorefront/magento2/pull/1129)
- fix: move user to first page of products after applying filters [https://github.com/vuestorefront/magento2/pull/1150](https://github.com/vuestorefront/magento2/pull/1150)
- fix!: product pricing [https://github.com/vuestorefront/magento2/pull/1146](https://github.com/vuestorefront/magento2/pull/1146)
- fix!: fixed price recalculation for configurable products [https://github.com/vuestorefront/magento2/pull/1199](https://github.com/vuestorefront/magento2/pull/1199)
- fix: close search results if close button clicked [https://github.com/vuestorefront/magento2/pull/1131](https://github.com/vuestorefront/magento2/pull/1131)
- fix: empty list of currencies while trying to change currency [https://github.com/vuestorefront/magento2/pull/1183](https://github.com/vuestorefront/magento2/pull/1183)
- fix: phone number-related fixes [https://github.com/vuestorefront/magento2/pull/1133](https://github.com/vuestorefront/magento2/pull/1133)
- fix: fixed adding grouped product to cart from catalog [https://github.com/vuestorefront/magento2/pull/1136](https://github.com/vuestorefront/magento2/pull/1136)
- fix: sfselect size label overlap [https://github.com/vuestorefront/magento2/pull/1153](https://github.com/vuestorefront/magento2/pull/1153)
- fix: mobile filter controls too close to left edge [https://github.com/vuestorefront/magento2/pull/1149](https://github.com/vuestorefront/magento2/pull/1149)
- fix: country SfSelect overlapping with value [https://github.com/vuestorefront/magento2/pull/1141](https://github.com/vuestorefront/magento2/pull/1141)
- fix: search cancel button narrow when 2-3 search results [https://github.com/vuestorefront/magento2/pull/1147](https://github.com/vuestorefront/magento2/pull/1147)
- fix: unify login/register notifications and error handling [https://github.com/vuestorefront/magento2/pull/1172](https://github.com/vuestorefront/magento2/pull/1172)
- fix(checkout): login and register in checkout should show errors [https://github.com/vuestorefront/magento2/pull/1163](https://github.com/vuestorefront/magento2/pull/1163)
- fix!: checkout province state code issue [https://github.com/vuestorefront/magento2/pull/1120](https://github.com/vuestorefront/magento2/pull/1120)
- fix(checkout): find addresses with numeric id [https://github.com/vuestorefront/magento2/pull/1164](https://github.com/vuestorefront/magento2/pull/1164)
- fix: pre-select default shipping address [https://github.com/vuestorefront/magento2/pull/1143](https://github.com/vuestorefront/magento2/pull/1143)
- fix: overlapping homepage app store buttons [https://github.com/vuestorefront/magento2/pull/1138](https://github.com/vuestorefront/magento2/pull/1138)
- fix: pagination not visible on order history view [https://github.com/vuestorefront/magento2/pull/1148](https://github.com/vuestorefront/magento2/pull/1148)
- fix: country sfselect overlapping with default value [https://github.com/vuestorefront/magento2/pull/1152](https://github.com/vuestorefront/magento2/pull/1152)
- fix: my account - display country names, not codes [https://github.com/vuestorefront/magento2/pull/1162](https://github.com/vuestorefront/magento2/pull/1162)
- fix: merging cart doesn't work for bundled products [https://github.com/vuestorefront/magento2/pull/1176](https://github.com/vuestorefront/magento2/pull/1176)
- fix: when changing itemsPerPage, also reset page to 0 [https://github.com/vuestorefront/magento2/pull/1169](https://github.com/vuestorefront/magento2/pull/1169)
- fix: move to first page when changing category itemsPerPage [https://github.com/vuestorefront/magento2/pull/1160](https://github.com/vuestorefront/magento2/pull/1160)
- fix: moving back in history after logout shouldn't 404 [https://github.com/vuestorefront/magento2/pull/1118](https://github.com/vuestorefront/magento2/pull/1118)
- fix: hide mobile address delete buttons on default addresses [https://github.com/vuestorefront/magento2/pull/1116](https://github.com/vuestorefront/magento2/pull/1116)
- fix: phone number- related fixes [https://github.com/vuestorefront/magento2/pull/1133](https://github.com/vuestorefront/magento2/pull/1133)
- fix: category page filters translation [https://github.com/vuestorefront/magento2/pull/1197](https://github.com/vuestorefront/magento2/pull/1197)
- fix: cart three dots icon on mobile view [https://github.com/vuestorefront/magento2/pull/1196](https://github.com/vuestorefront/magento2/pull/1196)
- fix: don't require two characters in profile update form [https://github.com/vuestorefront/magento2/pull/1117](https://github.com/vuestorefront/magento2/pull/1117)
- fix: pressing enter should search immediately [https://github.com/vuestorefront/magento2/pull/1144](https://github.com/vuestorefront/magento2/pull/1144)
- fix: product names with special signs are wrongly encoded [https://github.com/vuestorefront/magento2/pull/1195](https://github.com/vuestorefront/magento2/pull/1195)
- fix: missing required (*) near rating dropdown [https://github.com/vuestorefront/magento2/pull/1132](https://github.com/vuestorefront/magento2/pull/1132)
- fix: incorrect add-to-cart label on mobile menu [https://github.com/vuestorefront/magento2/pull/1201](https://github.com/vuestorefront/magento2/pull/1201)
- fix: my account province state value displayed as a code [https://github.com/vuestorefront/magento2/pull/1203](https://github.com/vuestorefront/magento2/pull/1203)
- fix: login registration does not work with recaptcha [https://github.com/vuestorefront/magento2/pull/1205](https://github.com/vuestorefront/magento2/pull/1205)
- fix: currency cookie breaks the application [https://github.com/vuestorefront/magento2/pull/1210](https://github.com/vuestorefront/magento2/pull/1210)
- fix: button add to cart doesn't work for configurable products [https://github.com/vuestorefront/magento2/pull/1208](https://github.com/vuestorefront/magento2/pull/1208)

### Refactors

- refactor(checkout): simplify billing/checkout logic [https://github.com/vuestorefront/magento2/pull/1174](https://github.com/vuestorefront/magento2/pull/1174)
- refactor: added ui notifications to register form [https://github.com/vuestorefront/magento2/pull/1127](https://github.com/vuestorefront/magento2/pull/1127)
- refactor: user addresses styling [https://github.com/vuestorefront/magento2/pull/1173](https://github.com/vuestorefront/magento2/pull/1173)
- refactor: fixed shipping addresses layout on checkout shipping step [https://github.com/vuestorefront/magento2/pull/1139](https://github.com/vuestorefront/magento2/pull/1139)

### Performance

- perf: category page CLS improvement [https://github.com/vuestorefront/magento2/pull/1179](https://github.com/vuestorefront/magento2/pull/1179)

### Tests

- test: add BottomNavigation tests [https://github.com/vuestorefront/magento2/pull/1114](https://github.com/vuestorefront/magento2/pull/1114)
- test: add StoresModal unit tests [https://github.com/vuestorefront/magento2/pull/1113](https://github.com/vuestorefront/magento2/pull/1113)
- test: useCurrency unit tests [https://github.com/vuestorefront/magento2/pull/1119](https://github.com/vuestorefront/magento2/pull/1119)
- test(load): add K6 load test workflow with example tests [https://github.com/vuestorefront/magento2/pull/1182](https://github.com/vuestorefront/magento2/pull/1182)
- test(load): assign test result to project [ci skip] [https://github.com/vuestorefront/magento2/pull/1188](https://github.com/vuestorefront/magento2/pull/1188)
- test(load): assign test result to project [https://github.com/vuestorefront/magento2/pull/1189](https://github.com/vuestorefront/magento2/pull/1189)
- test(load): urls in yaml need quotes [https://github.com/vuestorefront/magento2/pull/1190](https://github.com/vuestorefront/magento2/pull/1190)
- test(load): fix context nested property [https://github.com/vuestorefront/magento2/pull/1191](https://github.com/vuestorefront/magento2/pull/1191)
- test(load): pass BASE_URL as flag instead [https://github.com/vuestorefront/magento2/pull/1192](https://github.com/vuestorefront/magento2/pull/1192) [https://github.com/vuestorefront/magento2/pull/1193](https://github.com/vuestorefront/magento2/pull/1193)
- test: added missing custom queries to composables [https://github.com/vuestorefront/magento2/pull/1126](https://github.com/vuestorefront/magento2/pull/1126)

### Chore

- chore: use lodash-es over per-function packages [https://github.com/vuestorefront/magento2/pull/1112](https://github.com/vuestorefront/magento2/pull/1112)

### Repository

- ci: create gh deployment entry as early as possible [https://github.com/vuestorefront/magento2/pull/1151](https://github.com/vuestorefront/magento2/pull/1151)
- ci: shorten pr name lint action runtime from 90s to 20s [https://github.com/vuestorefront/magento2/pull/1166](https://github.com/vuestorefront/magento2/pull/1166)

### Documentation

- docs: running load tests with K6 internal guide [https://github.com/vuestorefront/magento2/pull/1198](https://github.com/vuestorefront/magento2/pull/1198)
- docs: add Getting started section [https://github.com/vuestorefront/magento2/pull/1121](https://github.com/vuestorefront/magento2/pull/1121)
