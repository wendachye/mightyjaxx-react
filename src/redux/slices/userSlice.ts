import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isFullfillAction, isRequestAction } from 'redux/helpers';
import { createRoutine } from 'redux-saga-routines';

import { RootState } from 'hooks/useRedux';

const name = 'user';

const initialState: State.User = {
  accessToken: null,
  error: null,
  isLoggedIn: false,
  loading: false,
  user: null,
};

// actions
export const profile = createRoutine(`${name}/profile`);
export const login = createRoutine(`${name}/login`);
export const logout = createRoutine(`${name}/logout`);

// reducers
export default createSlice({
  extraReducers: builder => {
    builder
      .addCase(login.SUCCESS, (state, action: PayloadAction<State.UserLoginSuccessPayload>) => {
        const { accessToken, user } = action.payload;

        if (accessToken && user) {
          state.accessToken = accessToken;
          state.user = user;
          state.isLoggedIn = true;
          state.error = null;
        }
      })
      .addCase(login.FAILURE, (state, action: PayloadAction<State.ErrorPayload>) => {
        const { error } = action.payload;
        state.isLoggedIn = false;
        state.error = error || 'Something wen wrong. Please contact support.';
      })
      .addCase(logout.SUCCESS, state => {
        state.isLoggedIn = false;
        state.accessToken = null;
        state.user = null;
      })
      .addCase(logout.FAILURE, state => {
        state.isLoggedIn = false;
        state.accessToken = null;
        state.user = null;
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
export const selectUser = (state: RootState) => state.user;
export const selectAccessToken = (state: RootState) => state.user.accessToken;
