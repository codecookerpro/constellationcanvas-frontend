import { Suspense, lazy } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('pages/home'));

const Routes = () => (
  <Suspense fallback={<div />}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </Suspense>
);

export default Routes;
