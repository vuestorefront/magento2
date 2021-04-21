import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export function generateBaseConfig(pkg) {
  return {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
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
      typescript({
        // eslint-disable-next-line global-require
        typescript: require('typescript'),
      }),
      terser(),
    ],
  };
}
