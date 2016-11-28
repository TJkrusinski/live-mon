// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import form from './form';
import server from './server';

const rootReducer = combineReducers({
  server,
  form,
  routing
});

export default rootReducer;
