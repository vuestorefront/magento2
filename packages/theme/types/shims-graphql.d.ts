/* eslint-disable */

declare module '*.gql' {
  import { DocumentNode } from 'graphql';

  const MyQuery: DocumentNode;

  export default MyQuery;
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const MyQuery: DocumentNode;

  export default MyQuery;
}
