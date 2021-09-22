import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BaseLink from './components/baseLink/BaseLink';
import BaseRoute from './components/baseRoute/BaseRoute';

export default class Router extends React.Component {
  render() {
    let homeDome = (
      <div>
        <BrowserRouter>
          <BaseLink />

          <BaseRoute />
        </BrowserRouter>
      </div>
    );

    return homeDome;
  }
}
