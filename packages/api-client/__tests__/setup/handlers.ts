import { graphql } from 'msw';
import {STORE_CONFIG_MOCK_RESP} from './../mockData/api/storeConfig'

const magento = graphql.link('https://magento2-instance.vuestorefront.io/graphql');

export const handlers = [
  magento.query('storeConfig', (req, res, ctx) => res(
    ctx.data({
      data: STORE_CONFIG_MOCK_RESP,
    }),
  )),
];
