/* eslint-disable import/no-extraneous-dependencies */
import commonjs from '@rollup/plugin-commonjs';
import graphql from '@rollup/plugin-graphql';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { generateBaseConfig } from '../../rollup.base.config';

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.graphql'];

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
    nodeResolve({
      extensions,
    }),
    graphql(),
    json(),
    typescript({
      rollupCommonJSResolveHack: false,
      useTsconfigDeclarationDir: true,
      // eslint-disable-next-line unicorn/prefer-module
      tslib: require.resolve('typescript'),
    }),
    commonjs({
      extensions,
    }),
  ],
};

export default [
  generateBaseConfig(pkg, true),
  server,
];
