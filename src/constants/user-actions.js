import { USER_ROLES } from './user-roles';

export const USER_ACTION_TYPES = {
  invite: 'invite',
  resend: 'resend',
  delete: 'delete',
};

export const USER_ACTIONS = [
  {
    title: 'Invite User',
    role: USER_ROLES.facilitator,
    type: USER_ACTION_TYPES.invite,
  },
  {
    title: 'Resend Code',
    role: USER_ROLES.all,
  },
  {
    title: 'Delete Facilitator',
    role: USER_ROLES.facilitator,
  },
  {
    title: 'Delete User',
    role: USER_ROLES.user,
  },
];
