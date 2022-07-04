import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from 'react-redux';
import { rootReducer, store } from 'redux/store';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
