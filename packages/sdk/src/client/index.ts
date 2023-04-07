import axios from 'axios';

/**
 * This is the client that will be used by the SDK.
 * All the methods should use this client to make requests.
 * It should be exported from the main package to be used in extensions.
 * ALl closely related code should be kept in the client folder.
 */
export const client = axios.create();
