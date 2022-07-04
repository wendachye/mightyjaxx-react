import HttpClient from 'utils/httpClient';

const updateProduct = async (
  accessToken: string,
  sku: string,
  product: Product.ProductUpdateRequest
) => {
  const httpClient = HttpClient({ accessToken });

  const { data } = await httpClient.patch<Product.ProductCreateResponse>(
    `/products/${sku}`,
    product
  );

  return data;
};

export default updateProduct;
