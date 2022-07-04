import HttpClient from 'utils/httpClient';

const deleteProduct = async (accessToken: string, sku: string) => {
  const httpClient = HttpClient({ accessToken });

  const { data } = await httpClient.delete(`/products/${sku}`);

  return data;
};

export default deleteProduct;
