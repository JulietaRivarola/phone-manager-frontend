import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../services/axiosInstance';
import { fetchProductsSuccess, fetchProductsFailure, fetchProductsRequest } from './productSlice.tsx';
import { AxiosResponse } from 'axios';

interface Product {
  name: string;
  model: string;
  brand: string;
  data: { price: number; color: string }[];
}

interface ProductsResponse {
  data: Product[];
}

function* fetchProductsSaga() {
  try {
    const response: AxiosResponse<ProductsResponse> = yield call(axiosInstance.get, '/products');
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
}

export function* watchFetchProducts() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
}
