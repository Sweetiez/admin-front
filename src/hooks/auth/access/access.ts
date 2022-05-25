import { Role } from './Roles';
import DecodedToken from './DecodedToken';

export function isAuthorized(role: Role): boolean {
  // Get access token
  const accessToken = localStorage.getItem('access_token');
  // If access token is not present, return false
  if (!accessToken) {
    return false;
  }
  const decodedToken = parseJwt(accessToken);
  const roles = decodedToken?.auth?.split(',');
  // // Check if user has the required role
  return roles?.includes(role) || false;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export function parseJwt(token: string): DecodedToken {
  // Parse JWT access token
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export function cleanToken(token: string): string {
  return token.slice(7);
}
