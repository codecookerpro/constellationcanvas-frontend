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
  const profile = useSelector((state) => state.auth.profile);

  useEffect(() => {
    const accessToken = localStorage.accessToken;

    if (!accessToken) {
      history.push(LINKS.register);
      return;
    }

    if (!profile) {
      const storedProfile = JSON.parse(localStorage.profile);
      dispatch(setUserInfo(accessToken, storedProfile));
      return;
    }

    // if (!profile.name) {
    //   history.push(LINKS.screenName);
    // } else
    if (profile.role === USER_ROLES.admin) {
      history.push(LINKS.userManagement);
    } else if (history.location.pathname === '/') {
      if (profile.role === USER_ROLES.facilitator) {
        history.push(LINKS.userManagement);
      } else {
        history.push(LINKS.current);
      }
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
    // eslint-disable-next-line
  }, [profile]);
};

export default useInitApp;
