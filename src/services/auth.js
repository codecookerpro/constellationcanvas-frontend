import { post, patch, get, put } from 'services/axios';

export const inviteToAccessToken = async (params) => {
  return await post('auth', params);
};

export const updateUser = async (uuid, data) => {
  return await patch(['users', uuid], data);
};

export const inviteUser = async (params) => {
  return await post(['invite', 'user'], params);
};

export const getUsers = async (params) => {
  return await get('users', params);
};

export const resendCode = async (userUUID) => {
  return await put(['invite', 'resend', userUUID]);
};

export const getInviteCode = async (userUUID) => {
  return await put(['invite', 'invite-code', userUUID]);
};
