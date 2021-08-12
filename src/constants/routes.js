import CanvasBoard from 'pages/CanvasBoard';
import UserManagement from 'pages/UserManagement';
import Login from 'pages/Login';

import { USER_ROLES } from './user-roles';

export const LOCATION_MAP = {
  current: '/current-state',
  first: '/future-state-1',
  second: '/future-state-2',
  manage: '/user-management',
  login: '/login',
};

export const HEADER_TYPES = {
  topic: 'topic',
  title: 'title',
};

export const DEFAULT_LAYOUT_SETTINGS = {
  sidebar: {
    display: true,
  },
  header: {
    display: true,
    type: HEADER_TYPES.topic,
  },
};

export const ROUTE_MAP = [
  {
    location: LOCATION_MAP.current,
    component: CanvasBoard,
    settings: DEFAULT_LAYOUT_SETTINGS,
    role: [USER_ROLES.user, USER_ROLES.facilitator],
  },
  {
    location: LOCATION_MAP.first,
    component: CanvasBoard,
    settings: DEFAULT_LAYOUT_SETTINGS,
    role: [USER_ROLES.user, USER_ROLES.facilitator],
  },
  {
    location: LOCATION_MAP.second,
    component: CanvasBoard,
    settings: DEFAULT_LAYOUT_SETTINGS,
    role: [USER_ROLES.user, USER_ROLES.facilitator],
  },
  {
    location: LOCATION_MAP.manage,
    component: UserManagement,
    settings: {
      ...DEFAULT_LAYOUT_SETTINGS,
      header: {
        display: true,
        type: HEADER_TYPES.title,
      },
    },
    role: [USER_ROLES.admin, USER_ROLES.facilitator],
  },
  {
    location: LOCATION_MAP.login,
    component: Login,
    settings: {
      sidebar: {
        display: false,
      },
      header: {
        display: false,
        type: HEADER_TYPES.topic,
      },
    },
    role: [USER_ROLES.guest],
  },
];
