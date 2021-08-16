import { post, patch } from 'services/axios';

export const inviteToAccessToken = async (params) => {
  return await post('auth', params);
};

export const updateOwnProfile = async (uuid, data) => {
  return await patch(['users', uuid], data);
};
