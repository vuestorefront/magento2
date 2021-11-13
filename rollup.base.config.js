import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.graphql'];

export function generateBaseConfig(pkg, useTerser = false) {
  const plugins = [
    nodeResolve({
      extensions,
    }),
    typescript({
      rollupCommonJSResolveHack: false,
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: false,
      // eslint-disable-next-line unicorn/prefer-module
      tslib: require.resolve('typescript'),
    }),
    commonjs({
      extensions,
    }),
  ];

  if (useTerser) plugins.push(terser());

  return {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins,
  };
}
