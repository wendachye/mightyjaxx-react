import axios from 'axios';

interface httpClientProps {
  accessToken?: string;
  baseURL?: string;
  basicAuth?: boolean;
  timeout?: number;
}

const HttpClient = ({ baseURL, basicAuth, accessToken, timeout = 30000 }: httpClientProps) => {
  const instance = axios.create({
    baseURL: baseURL || process.env.REACT_APP_ADMIN_API_V1_BASE_URL,
    timeout,
  });

  if (basicAuth) {
    instance.defaults.headers.common = {
      Authorization: `Basic ${btoa(
        `${process.env.REACT_APP_ADMIN_API_BASIC_AUTH_USERNAME}:${process.env.REACT_APP_ADMIN_API_BASIC_AUTH_PASSWORD}`
      )}`,
    };
  }

  if (accessToken) {
    instance.defaults.headers.common = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return instance;
};

export default HttpClient;
