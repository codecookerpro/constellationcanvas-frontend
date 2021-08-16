import { Suspense, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

import ROUTES from 'constants/routes';
import { useSelector } from 'react-redux';

const Routes = () => {
  const userRole = useSelector((state) => state.auth.profile.role);
  const routes = useMemo(() => ROUTES.filter(({ role }) => role.includes(userRole)), [userRole]);

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {routes.map(({ path, settings, component: Component }) => (
          <Route
            key={path}
            path={path}
            render={(props) => (
              <Layout {...settings}>
                <Component {...props} />
              </Layout>
            )}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
