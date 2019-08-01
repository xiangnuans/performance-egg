import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/coco/project/support/performance-node/app/web/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/coco/project/support/performance-node/app/web/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/',
        redirect: '/index',
        exact: true,
      },
      {
        path: '/index',
        icon: 'home',
        name: 'dashboard',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/coco/project/support/performance-node/app/web/src/pages/Dashboard/models/view.js').then(
                  m => {
                    return { namespace: 'view', ...m.default };
                  },
                ),
              ],
              component: () => import('../Dashboard/View'),
              LoadingComponent: require('/Users/coco/project/support/performance-node/app/web/src/components/PageLoading/index')
                .default,
            })
          : require('../Dashboard/View').default,
        exact: true,
      },
      {
        path: '/pk',
        icon: 'team',
        name: 'pk',
        routes: [
          {
            path: '/pk/userlist',
            name: 'userlist',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/coco/project/support/performance-node/app/web/src/pages/PK/models/list.js').then(
                      m => {
                        return { namespace: 'list', ...m.default };
                      },
                    ),
                    import('/Users/coco/project/support/performance-node/app/web/src/pages/PK/models/pk.js').then(
                      m => {
                        return { namespace: 'pk', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../PK/UserList'),
                  LoadingComponent: require('/Users/coco/project/support/performance-node/app/web/src/components/PageLoading/index')
                    .default,
                })
              : require('../PK/UserList').default,
            exact: true,
          },
          {
            path: '/pk/cardlist',
            name: 'cardlist',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/coco/project/support/performance-node/app/web/src/pages/PK/models/list.js').then(
                      m => {
                        return { namespace: 'list', ...m.default };
                      },
                    ),
                    import('/Users/coco/project/support/performance-node/app/web/src/pages/PK/models/pk.js').then(
                      m => {
                        return { namespace: 'pk', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../PK/CardList'),
                  LoadingComponent: require('/Users/coco/project/support/performance-node/app/web/src/components/PageLoading/index')
                    .default,
                })
              : require('../PK/CardList').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/coco/project/support/performance-node/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../404'),
              LoadingComponent: require('/Users/coco/project/support/performance-node/app/web/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/coco/project/support/performance-node/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/coco/project/support/performance-node/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
