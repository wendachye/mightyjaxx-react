import HttpClient from 'utils/httpClient';

const fetchProducts = async ({
  query,
  page = 1,
  limit = 10,
}: {
  limit?: number;
  page?: number;
  query?: string;
}) => {
  const httpClient = HttpClient({ basicAuth: true });

  let queryString = '?';
  queryString = page ? `${queryString}page=${page}` : queryString;
  queryString = limit ? `${queryString}&limit=${limit}` : queryString;
  queryString = query ? `${queryString}&query=${query}` : queryString;

  const { data } = await httpClient.get<Product.ProductListResponse>(`/products${queryString}`);

  return data;
};

export default fetchProducts;
