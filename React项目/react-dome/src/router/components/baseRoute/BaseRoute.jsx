import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../../views/home/Home';
import ComponentStudy from '../../../views/componentStudy/ComponentStudy';
import RouterStudy from '../../../views/routerStudy/RouterStudy';
import ReduxStudy from '../../../views/reduxStudy/ReduxStudy';
import HookStudy from '../../../views/hookStudy/HookStudy';

export default function BaseRoute() {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      {/* 动态路由 */}
      <Route
        exact
        strict
        path="/com/:id?/:name?"
        component={ComponentStudy}
      ></Route>
      <Route exact strict path="/router" component={RouterStudy}></Route>
      <Route exact strict path="/redux" component={ReduxStudy}></Route>
      <Route exact strict path="/hook" component={HookStudy}></Route>
      <Route exact>404</Route>
    </Switch>
  );
}
