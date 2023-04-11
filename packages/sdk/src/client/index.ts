import axios, { Axios } from 'axios';
import { resolveBaseUrl } from '../resolvers';
import { catchApiErrors } from './plugins';

/**
 * This is a proxy that will be used to create an axios instance.
 * It will be used to set the base url and withCredentials flag.
 * Depending on the client-side or server side usage, the base url will be either the `apiUrl` or the `ssrApiUrl`.
 * `resolveBaseUrl` is taking care of that.
 */
const client = new Proxy(axios.create(), {
  get: (axiosInstance, property) => {
    axiosInstance.defaults.withCredentials = true;
    axiosInstance.defaults.baseURL = resolveBaseUrl();
    axiosInstance.interceptors.response.use(catchApiErrors);
    return axiosInstance[property as keyof Axios];
  }
});

export { client };
