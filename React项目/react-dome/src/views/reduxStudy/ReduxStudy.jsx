import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Logger from 'redux-logger';
import Thunk from 'redux-thunk';
import RootReducer from '../..//store/reducers/index';
import Count from './components/count/Count';
import User from './components/user/User';

const store = createStore(RootReducer, applyMiddleware(Logger, Thunk));
export default class ReduxStudy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>redux</h1>
        <Provider store={store}>
          <Count />
          <User />
        </Provider>
      </div>
    );
  }
}
