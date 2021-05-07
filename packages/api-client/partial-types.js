require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

fetch(process.env.MAGENTO_GRAPHQL, {
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
})
  .then((result) => result.json())
  .then((result) => {
  // here we're filtering out any type information unrelated to unions or interfaces
    result.data.__schema.types = result.data.__schema.types.filter(
      (type) => type.possibleTypes !== null,
    );
    fs.writeFile('./src/types/fragmentTypes.json', JSON.stringify(result.data), (err) => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
