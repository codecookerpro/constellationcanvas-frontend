import { post } from 'services/axios';

export const inviteToAccessToken = async (params) => {
  return await post('auth', params);
};
