import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createProduct, selectProducts } from 'redux/slices/productSlice';
import * as yup from 'yup';

import Button from 'components/Button';
import Card from 'components/Card';
import Container from 'components/Container';
import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label';
import Title from 'components/Title';
import { useDispatch, useSelector } from 'hooks/useRedux';

interface FormInputs {
  sku: string;
  title: string;
}

const resolver = yupResolver(
  yup
    .object({
      sku: yup.string().trim().required('SKU is required'),
      title: yup.string().trim().required('Title is required'),
    })
    .required()
);

const ProductCreate = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver });
  const { loading, error } = useSelector(selectProducts);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadImageError, setUploadImageError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      setUploadImageError(null);
    }
  }, [selectedImage]);

  const onSubmitProduct = async (data: FormInputs) => {
    if (!selectedImage) {
      setUploadImageError('Please select an image');
      return;
    }

    dispatch(createProduct.trigger({ image: selectedImage, product: data }));
  };

  return (
    <Container>
      <Card>
        <Title as="h2">Create New Product</Title>
        <Form onSubmit={handleSubmit(onSubmitProduct)}>
          <Input {...register('sku')} type="text" placeholder="SKU" error={errors.sku?.message} />
          <Input
            {...register('title')}
            type="text"
            placeholder="Title"
            error={errors.title?.message}
          />
          {selectedImage && (
            <img
              alt="product-image"
              width={280}
              height={280}
              src={URL.createObjectURL(selectedImage)}
            />
          )}
          <Input
            type="file"
            onChange={event => {
              setSelectedImage(event.target.files?.[0] || null);
            }}
            accept="image/*"
            error={uploadImageError}
          />
          <Button disabled={loading} loading={loading} type="submit">
            Submit
          </Button>
          {error && <Label margin="0.375rem 0">{error}</Label>}
        </Form>
      </Card>
    </Container>
  );
};

export default ProductCreate;
