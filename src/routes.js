import { Suspense, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

import { useSelector } from 'react-redux';
import { ROUTES, LINKS, USER_ROLES, CANVAS_STATES } from 'utils/constants';
import { AuthGuard } from 'hocs';

const Routes = () => {
  const { role: userRole, name: userName } = useSelector((state) => state.auth.profile);
  const routes = useMemo(
    () =>
      ROUTES.filter(({ role, path }) => {
        if (role.includes(userRole)) {
          if (path === LINKS.screenName && userName) {
            return false;
          }
          return true;
        }
        return false;
      }),
    [userRole, userName]
  );

  const redirect = useMemo(() => {
    if (userRole !== USER_ROLES.unknown && !userName) {
      return LINKS.screenName;
    }

    switch (userRole) {
      case USER_ROLES.unknown:
        return LINKS.register;
      case USER_ROLES.admin:
      case USER_ROLES.facilitator:
        return LINKS.userManagement;
      case USER_ROLES.user:
        return LINKS.board.replace(':index', CANVAS_STATES.current);
      default:
        return LINKS.root;
    }
  }, [userRole, userName]);

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {routes.map(({ path, settings, component: Component }) => (
          <Route
            key={path}
            path={path}
            render={(props) =>
              userRole === USER_ROLES.unknown ? (
                <Layout {...settings}>
                  <Component {...props} />
                </Layout>
              ) : (
                <AuthGuard>
                  <Layout {...settings}>
                    <Component {...props} />
                  </Layout>
                </AuthGuard>
              )
            }
          />
        ))}
        <Redirect to={redirect} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
