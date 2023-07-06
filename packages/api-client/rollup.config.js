import json from "@rollup/plugin-json";

import { generateBaseConfig, generateServerConfig } from "@vue-storefront/rollup-config";
import package_ from "./package.json";

const baseConfig = generateBaseConfig(package_);
const serverConfig = generateServerConfig(package_);

baseConfig.plugins.push(json());
serverConfig.plugins.push(json());

export default [baseConfig, serverConfig];
