import axios, { Axios } from 'axios';
import { resolveBaseUrl } from './resolvers';

const client = new Proxy(axios.create(), {
  get: (axiosInstance, property) => {
    axiosInstance.defaults.withCredentials = true;
    axiosInstance.defaults.baseURL = resolveBaseUrl();

    return axiosInstance[property as keyof Axios];
  }
});

export { client };
