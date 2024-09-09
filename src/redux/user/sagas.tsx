import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccess, loginFailure, loginRequest } from './slice.tsx';

function* loginSaga(action) {
  try {
    const response = yield call(axios.post, '/api/auth/signin', action.payload);

    const { token, username } = response.data;

    if (token) {
      localStorage.setItem('token', token);
      yield put(loginSuccess({ token, username }));
    } else {
      throw new Error("Token not found");
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* watchLogin() {
  yield takeLatest(loginRequest, loginSaga);
}
