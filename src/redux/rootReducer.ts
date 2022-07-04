import productsSlice from './slices/productSlice';
import userSlice from './slices/userSlice';

const rootReducer = {
  product: productsSlice,
  user: userSlice,
};

export default rootReducer;
