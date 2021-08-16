import { setUserInfo } from 'actions/auth';
import { USER_ROLES } from 'constants/enums';
import LINKS from 'constants/links';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'services/axios';

const useInitApp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { role: userRole, name: userName } = useSelector((state) => state.auth.profile);

  useEffect(() => {
    const accessToken = localStorage.accessToken;

    if (!accessToken) {
      history.push(LINKS.register);
      return;
    }

    axios.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    if (userRole === USER_ROLES.unknown) {
      const storedProfile = JSON.parse(localStorage.profile);
      dispatch(setUserInfo(accessToken, storedProfile));
      return;
    }

    if (!userName) {
      history.push(LINKS.screenName);
      return;
    }

    switch (userRole) {
      case USER_ROLES.admin:
        history.push(LINKS.userManagement);
        break;
      case USER_ROLES.facilitator:
        if ([LINKS.register, LINKS.screenName].includes(history.location.pathname)) {
          history.push(LINKS.userManagement);
        }
        break;
      case USER_ROLES.user:
        if ([LINKS.register, LINKS.screenName].includes(history.location.pathname)) {
          history.push(LINKS.userManagement);
        }
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [userRole, userName]);
};

export default useInitApp;