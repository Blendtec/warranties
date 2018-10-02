import { combineReducers } from 'redux';
import productsReducer from './product';
import personalReducer from './personal';

const allReducers = combineReducers({
	products: productsReducer,
	personal: personalReducer
});

export default allReducers;