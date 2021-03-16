import pkg from './package.json';
import { generateBaseConfig } from '../../rollup.base.config';
import graphql from 'rollup-plugin-graphql';
import json from '@rollup/plugin-json';

const baseConfig = generateBaseConfig(pkg);
baseConfig.plugins.push(graphql(), json());

export default baseConfig;
