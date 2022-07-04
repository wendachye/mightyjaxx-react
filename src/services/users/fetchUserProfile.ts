import HttpClient from 'utils/httpClient';

const fetchUserProfile = async (accessToken: string) => {
  const httpClient = HttpClient({ accessToken });

  const { data } = await httpClient.get<User.UserProfileResponse>('/users/me');

  return data;
};

export default fetchUserProfile;
