import { commonRequest } from './utils/request';

const login = async (username: string, password: string): Promise<string> => {
  const { data } = await commonRequest({
    url: `/auth/login`,
    method: 'POST',
    data: {
      username: username,
      password: password,
    },
  });

  return data.access_token;
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
