import express from 'express';
import { GraphQLClient } from 'graphql-request';
import DOMPurify from 'isomorphic-dompurify';
import categoryContentQuery from '../modules/catalog/category/components/cms/categoryContentQuery';

// @ts-ignore
import config from '../config.js';

const magentoGraphQlEndpoint : string = config.get('magentoGraphQl');
const client = new GraphQLClient(magentoGraphQlEndpoint, { method: 'GET' });

const app = express();
const safeCmsContentEndpoint = '/__safe-cms-content';
const safeCmsContentEndpointWithQueryParam = `${safeCmsContentEndpoint}/:id`;

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get(safeCmsContentEndpointWithQueryParam, async (req, res) => {
  const data = await client.request(categoryContentQuery, { id: req.params.id });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  data.category.cms_block = DOMPurify.sanitize(data.category.cms_block);
  res.json(data);
});

export default app;
