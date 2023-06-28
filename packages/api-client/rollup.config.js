import {
  generateBaseConfig,
  generateServerConfig,
} from "@vue-storefront/rollup-config";
import package_ from "../dev/magento2/packages/api-client/package.json";

export default [generateBaseConfig(package_), generateServerConfig(package_)];
