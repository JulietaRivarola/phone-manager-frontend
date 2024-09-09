import { combineReducers } from 'redux';
import userReducer from './user/slice.tsx';
import productReducer from './product/productSlice.tsx';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});

export default rootReducer;
