import { Suspense, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

import ROUTES from 'constants/routes';
import { useSelector } from 'react-redux';

const Routes = () => {
  const profile = useSelector((state) => state.auth.profile);
  const routes = useMemo(() => {
    return ROUTES.filter((route) => !route.role.length || route.role.includes(profile?.role));
  }, [profile]);

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            render={(props) => (
              <Layout {...route.settings}>
                <route.component {...props} />
              </Layout>
            )}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
