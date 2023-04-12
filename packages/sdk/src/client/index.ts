import axios from 'axios';
import { sdkContext } from '../context';

const client = axios.create({
  baseURL: sdkContext.get('apiUrl'),
  withCredentials: true
});

export { client };
