import { handleError } from 'actions';
import { setUserInfo } from 'actions/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'services/axios';

const useInitApp = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.accessToken;
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    if (accessToken) {
      axios.interceptors.request.use(
        (config) => {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      const storedProfile = JSON.parse(localStorage.profile);
      dispatch(setUserInfo(accessToken, storedProfile));
    }

    axios.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        dispatch(handleError(error?.response));
        return Promise.reject(error);
      }
    );

    setInitialized(true);
  }
};

export default useInitApp;
