import graphql from '@rollup/plugin-graphql';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import { generateBaseConfig } from '../../rollup.base.config';

const server = {
  input: 'src/index.server.ts',
  output: [
    {
      file: pkg.server,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external: [
    '@apollo/client/utilities',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      // eslint-disable-next-line global-require
      typescript: require('typescript'),
    }),
    graphql(),
    json(),
    terser(),
  ],
};

export default [
  generateBaseConfig(pkg),
  server,
];
