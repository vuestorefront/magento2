import { generateBaseConfig, generateServerConfig } from "@vue-storefront/rollup-config";
import package_ from "./package.json";

const baseConfig = generateBaseConfig(package_);
const serverConfig = generateServerConfig(package_);

export default [baseConfig, serverConfig];
