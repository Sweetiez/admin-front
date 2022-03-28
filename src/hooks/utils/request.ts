import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../token';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

// Wrapper around axios that adds the JWT token in req header
const authenticatedRequest = (options: AxiosRequestConfig) => {
  client.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

  // commonRequest(options);
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    // optionaly catch errors and add some additional logging here
    return error;
  };

  return client({ timeout: 5000, ...options })
    .then(onSuccess)
    .catch(onError);
};

const commonRequest = (options: AxiosRequestConfig) => {
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    throw error;
    // optionaly catch errors and add some additional logging here
    // return error;
  };

  return client({ timeout: 5000, ...options })
    .then(onSuccess)
    .catch(onError);
};

export { authenticatedRequest, commonRequest };
