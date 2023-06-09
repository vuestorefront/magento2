import { sdkContext } from '../../context';

/**
 * Resolve base URL based on the client-side or server-side environment.
 * Fallbacks to `apiUrl` when there is no `ssrApiUrl` on server-side environment,
 * bacause `ssrApiUrl` is optional.
 */
export const resolveBaseUrl = () => {
  const apiUrl = sdkContext.get('apiUrl');
  const ssrApiUrl = sdkContext.get('ssrApiUrl');

  return typeof window === 'undefined' ? ssrApiUrl || apiUrl : apiUrl;
};
