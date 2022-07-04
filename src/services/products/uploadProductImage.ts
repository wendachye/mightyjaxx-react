import HttpClient from 'utils/httpClient';

const uploadProductImage = async (accessToken: string, sku: string, imageFile: File) => {
  const httpClient = HttpClient({ accessToken });

  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const formData = new FormData();
  formData.append('image', imageFile);

  const { data } = await httpClient.post<Product.ProductCreateResponse>(
    `/products/${sku}/image`,
    formData,
    { headers }
  );

  return data;
};

export default uploadProductImage;
