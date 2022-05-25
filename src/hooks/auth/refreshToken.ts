import { useState } from 'react';

function getRefreshToken(): string {
  const tokenString = localStorage.getItem('refresh_token');
  if (tokenString) {
    return tokenString;
  }
  return '';
}

function useRefreshToken() {
  function setRefreshToken(userToken: string) {
    localStorage.setItem('refresh_token', userToken);
  }
  const [refreshToken] = useState(getRefreshToken());

  return {
    setRefreshToken,
    refreshToken,
  };
}

export { getRefreshToken, useRefreshToken };
