import fetch from 'cross-fetch';

const request = ({ body }) => fetch('https://magento2-instance.vuestorefront.io/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body,
});

export default request;
