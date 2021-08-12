import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'services/axios';

const useInitApp = () => {
  const history = useHistory();

  useEffect(() => {
    const accessToken = localStorage.accessToken;

    if (!accessToken) {
      history.push('/login');
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
  }, []);
};

export default useInitApp;
