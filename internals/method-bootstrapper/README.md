# Simple method bootstrapper

Internal tool for creating new methods in the SDK

## Usage

* Run `yarn install` in repo root (make sure that node_modules/.bin/mkmethod exists, **if not**,
  run `rm -rf node_modules && yarn install`
* cd to `packages/sdk`
* Run `npx mkmethod nameOfMethodYouWantToCreate`
* Run `git status` to see which files were created/modified (should be one unit test file, one integration test file,
  one methods/methodName/index.ts file and a modification to methods/index.ts)

### Example

```bash
$ yarn install
$ cd packages/sdk
$ npx mkmethod getMyMethod
```

Please remember to update a unit test and an integration test for your new method. Also make sure to add a description
to the method in `packages/sdk/src/methods/methodName/index.ts`.
