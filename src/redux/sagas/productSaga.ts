import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  createProduct,
  deleteProduct,
  fetchProduct,
  fetchProducts,
  updateProduct,
} from 'redux/slices/productSlice';
import { logout, selectAccessToken } from 'redux/slices/userSlice';
import { push } from 'redux-first-history';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import createProductAPI from 'services/products/createProduct';
import deleteProductAPI from 'services/products/deleteProduct';
import fetchProductAPI from 'services/products/fetchProduct';
import fetchProductsAPI from 'services/products/fetchProducts';
import updateProductAPI from 'services/products/updateProduct';
import uploadProductImage from 'services/products/uploadProductImage';

function* handleFetchProducts(action: PayloadAction<{ page?: number; search?: string }>) {
  try {
    yield put(fetchProducts.request());

    const query = action.payload?.search;
    const page = action.payload?.page;
    const products: Product.ProductListResponse = yield call(() =>
      fetchProductsAPI({
        page,
        query,
      })
    );

    yield put(fetchProducts.success(products));
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      yield put(fetchProducts.failure({ error: error.response?.data?.message }));
    } else {
      yield put(fetchProducts.failure({ error: 'Something wen wrong. Please contact support.' }));
    }
  } finally {
    yield put(fetchProducts.fulfill());
  }
}

function* handleFetchProduct(action: PayloadAction<{ sku: string }>) {
  try {
    yield put(fetchProduct.request());

    const { sku } = action.payload;

    const product: State.ProductDetails = yield call(() => fetchProductAPI(sku));

    yield put(fetchProduct.success(product));
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      yield put(fetchProduct.failure({ error: error.response?.data?.message }));
    } else {
      yield put(fetchProduct.failure({ error: 'Something wen wrong. Please contact support.' }));
    }
  } finally {
    yield put(fetchProduct.fulfill());
  }
}

function* handleCreateProduct(
  action: PayloadAction<{
    image: File;
    product: {
      sku: string;
      title: string;
    };
  }>
) {
  try {
    yield put(createProduct.request());

    const { product, image } = action.payload;
    const token: ReturnType<typeof selectAccessToken> = yield select(selectAccessToken);

    if (token) {
      yield call(() => createProductAPI(token.accessToken, product));
      yield call(() => uploadProductImage(token.accessToken, product.sku, image));
      yield put(createProduct.success());
      yield put(push('/products'));
    } else {
      yield put(logout.trigger());
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      yield put(createProduct.failure({ error: error.response?.data?.message }));
    } else {
      yield put(createProduct.failure({ error: 'Something wen wrong. Please contact support.' }));
    }
  } finally {
    yield put(createProduct.fulfill());
  }
}

function* handleUpdateProduct(
  action: PayloadAction<{
    image: File;
    product: {
      sku: string;
      title: string;
    };
  }>
) {
  try {
    yield put(updateProduct.request());

    const { product, image } = action.payload;
    const token: ReturnType<typeof selectAccessToken> = yield select(selectAccessToken);

    if (token) {
      yield call(() => updateProductAPI(token.accessToken, product.sku, product));
      if (image) {
        yield call(() => uploadProductImage(token.accessToken, product.sku, image));
      }
      yield put(updateProduct.success());
      yield put(push('/products'));
    } else {
      yield put(logout.trigger());
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      yield put(updateProduct.failure({ error: error.response?.data?.message }));
    } else {
      yield put(updateProduct.failure({ error: 'Something wen wrong. Please contact support.' }));
    }
  } finally {
    yield put(updateProduct.fulfill());
  }
}

function* handleDeleteProduct(action: PayloadAction<{ sku: string }>) {
  try {
    yield put(deleteProduct.request());

    const { sku } = action.payload;
    const token: ReturnType<typeof selectAccessToken> = yield select(selectAccessToken);

    if (token) {
      yield call(() => deleteProductAPI(token.accessToken, sku));
      yield put(deleteProduct.success());
      yield put(fetchProducts.trigger());
    } else {
      yield put(logout.trigger());
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      yield put(deleteProduct.failure({ error: error.response?.data?.message }));
    } else {
      yield put(deleteProduct.failure({ error: 'Something wen wrong. Please contact support.' }));
    }
  } finally {
    yield put(deleteProduct.fulfill());
  }
}

function* productSaga() {
  yield all([
    takeLatest(fetchProducts.TRIGGER, handleFetchProducts),
    takeLatest(fetchProduct.TRIGGER, handleFetchProduct),
    takeLatest(createProduct.TRIGGER, handleCreateProduct),
    takeLatest(updateProduct.TRIGGER, handleUpdateProduct),
    takeLatest(deleteProduct.TRIGGER, handleDeleteProduct),
  ]);
}

export default productSaga;
