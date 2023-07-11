require("dotenv").config();
const fetch = require("cross-fetch");
const fs = require("fs");

fetch(process.env.VSF_MAGENTO_GRAPHQL_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
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
    const possibleTypes = {};

    // eslint-disable-next-line no-underscore-dangle
    result.data.__schema.types.forEach((supertype) => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
      }
    });

    fs.writeFile("./src/types/possibleTypes.json", JSON.stringify(possibleTypes), (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error("Error writing possibleTypes.json", err);
      } else {
        // eslint-disable-next-line no-console
        console.log("Fragment types successfully extracted!");
      }
    });
  });
