/* eslint-disable implicit-arrow-linebreak */
/**
 * @param {string} camelCaseString String to convert to kebab. Can also be pascal case (I won't call the police)
 * @example myString -> my-string
 */
module.exports.kebabize = (camelCaseString) =>
  [...camelCaseString]
    .map((letter, index) => {
      const isUppercase = letter === letter.toUpperCase();
      const isFirst = index === 0;
      return isUppercase && !isFirst ? `-${letter.toLowerCase()}` : letter;
    })
    .join("");

/**
 * @param {string} string
 * @example 'foo' -> 'Foo'
 */
module.exports.capitalize = (string) => string[0].toUpperCase() + string.slice(1);
