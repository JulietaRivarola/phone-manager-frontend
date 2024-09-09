import { all, fork } from 'redux-saga/effects';
import { watchLogin } from './user/sagas.tsx';
import { watchFetchProducts } from './product/productSaga.tsx'; 

function* rootSaga() {
  yield all([
    fork(watchFetchProducts),
    fork(watchLogin), 
  ]);
}

export default rootSaga;
