import { Suspense, lazy } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const Dashboard = lazy(() => import('pages/Dashboard'));
const Login = lazy(() => import('pages/Login'));

const Routes = () => (
  <Suspense fallback={<div />}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </Suspense>
);

export default Routes;
