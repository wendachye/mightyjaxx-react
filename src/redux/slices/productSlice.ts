import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isFullfillAction, isRequestAction } from 'redux/helpers';
import { createRoutine } from 'redux-saga-routines';

import { RootState } from 'hooks/useRedux';

const initialState: State.Product = {
  error: null,
  loading: false,
  product: null,
  products: null,
};

const name = 'products';

// actions
export const fetchProducts = createRoutine(`${name}/list`);
export const fetchProduct = createRoutine(`${name}/details`);
export const createProduct = createRoutine(`${name}/create`);
export const updateProduct = createRoutine(`${name}/update`);
export const deleteProduct = createRoutine(`${name}/delete`);

// reducers
export default createSlice({
  extraReducers: builder => {
    builder
      .addCase(
        fetchProducts.SUCCESS,
        (state, action: PayloadAction<Product.ProductListResponse>) => {
          const products = action.payload;
          state.products = products;
          state.error = null;
        }
      )
      .addCase(fetchProducts.FAILURE, (state, action: PayloadAction<State.ErrorPayload>) => {
        const { error } = action.payload;
        state.error = error || 'Something wen wrong. Please contact support.';
      })
      .addCase(fetchProduct.SUCCESS, (state, action: PayloadAction<State.ProductDetails>) => {
        const product = action.payload;
        state.product = product;
        state.error = null;
      })
      .addCase(createProduct.SUCCESS, state => {
        state.error = null;
      })
      .addCase(updateProduct.SUCCESS, state => {
        state.product = null;
        state.error = null;
      })
      .addMatcher(
        action => isRequestAction(name, action),
        state => {
          state.loading = true;
        }
      )
      .addMatcher(
        action => isFullfillAction(name, action),
        state => {
          state.loading = false;
        }
      );
  },
  initialState,
  name,
  reducers: {},
}).reducer;

// selectors
export const selectProducts = (state: RootState) => state.product;
