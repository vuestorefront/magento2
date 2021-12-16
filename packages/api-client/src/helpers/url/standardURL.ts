import { stripIgnoredCharacters } from 'graphql';
import { URL } from 'node:url';

export default (initialUrl: string) => {
  const url = new URL(initialUrl);
  const query = url.searchParams.get('query');

  if (!query) return initialUrl;

  url.searchParams.set('query', stripIgnoredCharacters(query));

  return url.toString();
};
