# Contributing

Yeay! You want to contribute to @vuestorefront/magento2. That's amazing! To smoothen everyone's experience involved with the project please take note of the following guidelines and rules.


## Found an Issue?

Thank you for reporting any issues you find. We do our best to test and make @vuestorefront/magento2 as solid as possible, but any reported issue is a real help.

Please follow these guidelines when reporting issues:

- Provide a title in the format of `<Error> when <Task>`
- Tag your issue with the tag `bug`
- Provide a short summary of what you are trying to do
- Provide the log of the encountered error if applicable
- Provide the exact version of @vuestorefront/magento2.
- Be awesome and consider contributing a [pull request](#want-to-contribute)

## Want to contribute?

You consider contributing changes to @vuestorefront/magento2 – we dig that!
Please consider these guidelines when filing a pull request:

> @vuestorefront/magento2 pull requests

- Follow the [Coding Rules](#coding-rules)
- Follow the [Commit Rules](#commit-rules)
- Make sure you rebased the current master branch when filing the pull request
- Squash your commits when filing the pull request
- Provide a short title with a maximum of 100 characters
- Provide a more detailed description containing
  _ What you want to achieve
  _ What you changed
  _ What you added
  _ What you removed

## Coding Rules

To keep the code base of @vuestorefront/magento2 neat and tidy the following rules apply to every change

> Coding standards

- `eslint` is king
- Favor micro library over swiss army knives (rimraf, ncp vs. fs-extra)
- Be awesome

## Commit Rules

To help everyone with understanding the commit history of commitlint the following commit rules are enforced.
To make your life easier @vuestorefront/magento2 is commitizen-friendly and provides the npm run-script `commit`.

> Commit standards

- [conventional-changelog](https://github.com/conventional-changelog)
- husky commit message hook available
- present tense
- maximum of 100 characters
- message format of `$type($scope): $message`
