import React from 'react';
import { NavLink } from 'react-router-dom';
import './BaseLink.css';

// Link跳转
export default class Home extends React.Component {
  render() {
    let homeDome = (
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/com/1">
                <h3>组件学习</h3>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: '/router',
                  search: '?id=1&name=xt',
                  hash: 'ui',
                  state: { router: true },
                }}
              >
                <h3>路由学习</h3>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: '/redux',
                  search: '?id=2&name=xt',
                  state: { redux: true },
                }}
              >
                <h3>redux学习</h3>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: '/hook',
                  search: '?id=3&name=xt',
                  state: { hook: true },
                }}
              >
                <h3>Hook学习</h3>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );

    return homeDome;
  }
}
