// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import form from './form';

const rootReducer = combineReducers({
  form,
  routing
});

export default rootReducer;
