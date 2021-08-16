import { post, patch } from 'services/axios';

export const inviteToAccessToken = async (params) => {
  return await post('auth', params);
};

export const updateOwnProfile = async (params) => {
  return await patch(['users', 'profile'], params);
};
