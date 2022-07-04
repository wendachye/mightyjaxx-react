import HttpClient from 'utils/httpClient';

const fetchProduct = async (sku: string) => {
  const httpClient = HttpClient({ basicAuth: true });

  const { data } = await httpClient.get<Product.ProductDetailsResponse>(`/products/${sku}`);

  return data;
};

export default fetchProduct;
