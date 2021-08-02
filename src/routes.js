import { Suspense, lazy } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const Dashboard = lazy(() => import('pages/Dashboard'));

const Routes = () => (
  <Suspense fallback={<div />}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </Suspense>
);

export default Routes;
