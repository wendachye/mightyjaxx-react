import HttpClient from 'utils/httpClient';

const userLogin = async (email: string, password: string) => {
  const httpClient = HttpClient({ basicAuth: true });

  const { data } = await httpClient.post<User.UserLoginResponse>('/users/login', {
    email,
    password,
  });

  return data;
};

export default userLogin;
