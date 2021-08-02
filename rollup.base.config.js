import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.graphql'];

export function generateBaseConfig(pkg) {
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
    ],
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({
        rollupCommonJSResolveHack: false,
        useTsconfigDeclarationDir: true,
        // eslint-disable-next-line unicorn/prefer-module
        tslib: require.resolve('typescript'),
      }),
      // terser(),
    ],
  };
}
