import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchProduct, selectProducts, updateProduct } from 'redux/slices/productSlice';
import { push } from 'redux-first-history';
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

const ProductUpdate = () => {
  const dispatch = useDispatch();
  const { sku } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<FormInputs>({ resolver });
  const { loading, error, product } = useSelector(selectProducts);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (sku) {
      dispatch(fetchProduct.trigger({ sku }));
    }
  }, []);

  useEffect(() => {
    if (product) {
      setValue('sku', product.sku);
      setValue('title', product.title);
    }
  }, [product]);

  const onSubmitProduct = async (data: FormInputs) => {
    if (isDirty || selectedImage) {
      dispatch(updateProduct.trigger({ image: selectedImage, product: data }));
    } else {
      dispatch(push('/products'));
    }
  };

  return (
    <Container>
      <Card>
        <Title as="h2">Update Product</Title>
        <Form onSubmit={handleSubmit(onSubmitProduct)}>
          <Input {...register('sku')} type="text" placeholder="SKU" error={errors.sku?.message} />
          <Input
            {...register('title')}
            type="text"
            placeholder="Title"
            error={errors.title?.message}
          />
          {selectedImage ? (
            <img
              alt="product-image"
              width={280}
              height={280}
              src={URL.createObjectURL(selectedImage)}
            />
          ) : (
            <img
              alt="product-image"
              width={280}
              height={280}
              src={`${process.env.REACT_APP_ADMIN_API_V1_BASE_URL}${product?.imageURL}`}
            />
          )}
          <Input
            type="file"
            onChange={event => {
              setSelectedImage(event.target.files?.[0] || null);
            }}
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

export default ProductUpdate;
