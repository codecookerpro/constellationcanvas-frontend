import { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

import { ROUTE_MAP as routes } from 'constants/routes';

const Routes = () => (
  <Suspense fallback={<div />}>
    <BrowserRouter>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.location}
            path={route.location}
            render={(props) => {
              const Component = route.component;

              return (
                <Layout {...route.settings}>
                  <Component />
                </Layout>
              );
            }}
          />
        ))}
        <Redirect to="/current-state" />
      </Switch>
    </BrowserRouter>
  </Suspense>
);

export default Routes;
