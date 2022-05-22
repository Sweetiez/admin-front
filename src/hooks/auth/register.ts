import { commonRequest, loginRequest } from '../common/request';
import LoginRequest from './requests/LoginRequest';

const login = async (request: LoginRequest): Promise<string> => {
  const token = await loginRequest({
    url: `/auth/login`,
    method: 'POST',
    data: {
      username: request.username,
      password: request.password,
    },
  });
  return token.slice(7);
};

const register = async (
  name: string,
  username: string,
  description: string,
  site: string,
  hashtags: string,
  avatar_url: string,
  email: string,
  password: string,
): Promise<{
  id: string;
  name: string;
  email: string;
  username: string;
}> => {
  const { data } = await commonRequest({
    url: `/users`,
    method: 'POST',
    data: {
      name: name,
      username: username,
      description: description,
      site: site,
      hashtags: hashtags,
      avatar_url: avatar_url,
      email: email,
      password: password,
    },
  });

  return data;
};

export { login, register };
