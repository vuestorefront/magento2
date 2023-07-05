import {
  generateBaseConfig,
  generateServerConfig,
} from "@vue-storefront/rollup-config";
import package_ from "./package.json";

export default [generateBaseConfig(package_), generateServerConfig(package_)];
