/* eslint-disable unicorn/prefer-module */
require('dotenv').config();
const fetch = require('cross-fetch');
const fs = require('fs');

// eslint-disable-next-line promise/catch-or-return
fetch(process.env.VSF_MAGENTO_GRAPHQL_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
}).then((result) => result.json())
  // eslint-disable-next-line promise/always-return
  .then((result) => {
    const possibleTypes = {};

    // eslint-disable-next-line no-underscore-dangle
    result.data.__schema.types.forEach((supertype) => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
      }
    });

    fs.writeFile('./src/types/possibleTypes.json', JSON.stringify(possibleTypes), (err) => {
      if (err) {
        console.error('Error writing possibleTypes.json', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
