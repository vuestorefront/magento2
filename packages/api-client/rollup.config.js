import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import graphql from '@rollup/plugin-graphql';
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
    resolve({
      extensions: ['.js', '.ts', '.graphql'],
    }),
    typescript(),
    graphql(),
    json(),
  ],
};

export default [
  generateBaseConfig(pkg),
  server,
];
