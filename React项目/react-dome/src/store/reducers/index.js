import { combineReducers } from 'redux';
import User from './User';
import Number from './Number';

const rootRedux = combineReducers({ User, Number });
export default rootRedux;
