import { config } from '../config';

/**
 * Resolve base URL based on the client-side or server-side environment.
 * Fallbacks to `apiUrl` when there is no `ssrApiUrl` on server-side environment,
 * bacause `ssrApiUrl` is optional.
 */
export const resolveBaseUrl = () => {
  const apiUrl = config.get('apiUrl');
  const ssrApiUrl = config.get('ssrApiUrl');

  const baseUrl = typeof window === 'undefined' ? ssrApiUrl || apiUrl : apiUrl;

  return baseUrl;
};
