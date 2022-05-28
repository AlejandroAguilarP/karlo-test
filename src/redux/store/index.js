import {legacy_createStore, combineReducers} from 'redux';
import userReducer from '../Reducers/userReducer';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import usersReducer from '../Reducers/usersReducer';
import ordersReducer from '../Reducers/OrdersReducer';
import productsReducer from '../Reducers/ProductsReducer';
const rootReducer = combineReducers({user: userReducer, users: usersReducer, products: productsReducer, orders: ordersReducer});
const configureStore = () => {
  return legacy_createStore(rootReducer, applyMiddleware(thunk));
};
export default configureStore;