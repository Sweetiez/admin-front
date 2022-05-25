import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../auth/token';
import LoginResponse from '../auth/responses/LoginResponse';
import { cleanToken, logout } from '../auth/access/access';
import { getRefreshToken } from '../auth/refreshToken';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

// Wrapper around axios that adds the JWT token in req header
const authenticatedRequest = (options: AxiosRequestConfig) => {
  client.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

  // commonRequest(options);
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    if (error.response.status === 403) {
      client.defaults.headers.common.Authorization = `Bearer ${getRefreshToken()}`;
      client({ timeout: 5000, url: `/auth/refresh/token`, method: 'GET' })
        .then((response: any) => {
          localStorage.setItem(
            'access_token',
            cleanToken(response.headers['authorization']),
          );
        })
        .catch((error: any) => {
          logout();
          return error;
        });
    }
    // optionally catch errors and add some additional logging here
    return error;
  };

  return client({ timeout: 5000, ...options })
    .then(onSuccess)
    .catch(onError);
};

const commonRequest = (options: AxiosRequestConfig) => {
  const onSuccess = (response: any) => {
    console.log(response.headers['authorization']); //['Authorization']
    return response;
  };
  const onError = (error: any) => {
    throw error;
    // optionally catch errors and add some additional logging here
    // return error;
  };

  return client({ timeout: 5000, ...options })
    .then(onSuccess)
    .catch(onError);
};

const loginRequest = (options: AxiosRequestConfig) => {
  const onSuccess = (response: any) => {
    return new LoginResponse(
      cleanToken(response.headers['authorization']),
      cleanToken(response.headers['refresh-token']),
    );
  };
  const onError = (error: any) => {
    throw error;
    // optionally catch errors and add some additional logging here
    // return error;
  };

  return client({ timeout: 5000, ...options })
    .then(onSuccess)
    .catch(onError);
};

export { authenticatedRequest, commonRequest, loginRequest };
