import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

import { ROUTE_MAP } from 'constants/routes';

const Routes = () => (
  <Suspense fallback={<div />}>
    <Switch>
      {ROUTE_MAP.map((route) => (
        <Route
          key={route.location}
          path={route.location}
          render={(props) => (
            <Layout {...route.settings}>
              <route.component {...props} />
            </Layout>
          )}
        />
      ))}
      <Redirect to="/current-state" />
    </Switch>
  </Suspense>
);

export default Routes;
