import { keyMirror } from 'utils';

export const USER_ROLES = keyMirror({
  admin: null,
  facilitator: null,
  user: null,
  unknown: null,
});

export const HEADER_TYPES = keyMirror({
  topic: null,
  title: null,
});

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

export const CANVAS_STATES = keyMirror({
  current: 0,
  futureState1: 1,
  futureState2: 2,
});
