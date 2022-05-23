import {legacy_createStore, combineReducers} from 'redux';
import userReducer from '../Reducers/userReducer';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({user: userReducer});
const configureStore = () => {
  return legacy_createStore(rootReducer, applyMiddleware(thunk));
};
export default configureStore;