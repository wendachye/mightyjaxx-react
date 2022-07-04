import HttpClient from 'utils/httpClient';

const createProduct = async (accessToken: string, product: Product.ProductCreateRequest) => {
  const httpClient = HttpClient({ accessToken });

  const { data } = await httpClient.post<Product.ProductCreateResponse>(`/products`, product);

  return data;
};

export default createProduct;
