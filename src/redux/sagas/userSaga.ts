import { AnyAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { login, logout, selectAccessToken } from 'redux/slices/userSlice';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import fetchUserProfile from 'services/users/fetchUserProfile';
import userLoginService from 'services/users/userLogin';
import userLogoutService from 'services/users/userLogout';

function* handleUserLogin(action: AnyAction) {
  try {
    yield put(login.request());

    const { email, password } = action.payload;

    const { accessToken, expiresIn }: User.UserLoginResponse = yield call(() =>
      userLoginService(email, password)
    );

    const user: User.UserProfileResponse = yield call(() => fetchUserProfile(accessToken));

    yield put(
      login.success({
        accessToken: {
          accessToken,
          expiresIn,
        },
        user,
      })
    );
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      yield put(login.failure({ error: error.response?.data?.message }));
    } else {
      yield put(login.failure({ error: 'Something wen wrong. Please contact support.' }));
    }
  } finally {
    yield put(login.fulfill());
  }
}

function* handleUserLogout() {
  try {
    yield put(logout.request());

    const token: ReturnType<typeof selectAccessToken> = yield select(selectAccessToken);

    if (token) {
      yield call(() => userLogoutService(token.accessToken));
    }

    yield put(logout.success());
  } catch (error) {
    yield put(logout.failure());
  } finally {
    yield put(logout.fulfill());
  }
}

function* userSaga() {
  yield all([
    takeLatest(login.TRIGGER, handleUserLogin),
    takeLatest(logout.TRIGGER, handleUserLogout),
  ]);
}

export default userSaga;
