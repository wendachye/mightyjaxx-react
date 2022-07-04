import HttpClient from 'utils/httpClient';

const userLogin = async (accessToken: string) => {
  const httpClient = HttpClient({ accessToken });

  const { data } = await httpClient.post<User.UserLoginResponse>('/users/logout');

  return data;
};

export default userLogin;
