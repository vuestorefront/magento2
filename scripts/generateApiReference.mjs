import { copyFileSync, unlinkSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { execa } from 'execa';

/**
 * We don't want to litter the `theme` folder because we use it to generate end projects.
 * For this reason, we need to store all files and commands needed to generate the API
 * reference from it somewhere else. Although we can point `api-extractor` to another folder
 * than the current one, it always gets the package name from the closest `package.json`.
 * This behavior forces us to have a script that copies all configuration files to the
 * `theme` folder, then run `tsc` and `api-extractor` from that folder, so the latter uses
 * the theme package name. This script also does a cleanup in the `theme` folder so that
 * outputs don't end up in the end projects.
 *
 * Use this script by running the `yarn api-extract` command from the `docs` folder.
 */
(async () => {
  const extractorConfigName = 'api-extractor.theme.json';
  const tsConfigName = 'tsconfig.theme.json';
  const dirName = dirname(fileURLToPath(import.meta.url));
  const themeFolderPath = resolve(dirName, '../packages/theme');
  const extractorConfigDestination = resolve(themeFolderPath, extractorConfigName);
  const tsConfigPathDestination = resolve(themeFolderPath, tsConfigName);

  console.log('Copy TypeScript config file to the `theme` folder');

  copyFileSync(
    resolve(dirName, 'templates', tsConfigName),
    tsConfigPathDestination,
  );

  console.log('Copy extractor config file to the `theme` folder');

  copyFileSync(
    resolve(dirName, 'templates', extractorConfigName),
    extractorConfigDestination,
  );

  console.log('Generate TypeScript declaration files');

  await execa(
    'tsc',
    ['-p', tsConfigPathDestination],
    {
      preferLocal: true,
      cwd: themeFolderPath,
    },
  );

  console.log('Generate API reference');

  await execa(
    'api-extractor',
    ['run', '--config', extractorConfigDestination],
    {
      preferLocal: true,
      cwd: themeFolderPath,
    },
  );

  console.log('Cleanup the `theme` folder');

  unlinkSync(extractorConfigDestination);
  unlinkSync(tsConfigPathDestination);
  rmSync(resolve(themeFolderPath, 'dist'), { recursive: true });
})();
