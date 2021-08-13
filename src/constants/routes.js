import CanvasBoard from 'pages/CanvasBoard';
import UserManagement from 'pages/UserManagement';
import { Register, ScreenName } from 'pages/Auth';

import { HEADER_TYPES, USER_ROLES } from './enums';
import LINKS from './links';

export const DEFAULT_LAYOUT_SETTINGS = {
  sidebar: {
    display: true,
  },
  header: {
    display: true,
    type: HEADER_TYPES.topic,
  },
};

const ROUTES = [
  {
    path: LINKS.current,
    component: CanvasBoard,
    settings: DEFAULT_LAYOUT_SETTINGS,
    role: [USER_ROLES.user, USER_ROLES.facilitator],
  },
  {
    path: LINKS.futureState1,
    component: CanvasBoard,
    settings: DEFAULT_LAYOUT_SETTINGS,
    role: [USER_ROLES.user, USER_ROLES.facilitator],
  },
  {
    path: LINKS.futureState2,
    component: CanvasBoard,
    settings: DEFAULT_LAYOUT_SETTINGS,
    role: [USER_ROLES.user, USER_ROLES.facilitator],
  },
  {
    path: LINKS.userManagement,
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
    path: LINKS.register,
    component: Register,
    settings: {
      sidebar: {
        display: false,
      },
      header: {
        display: false,
        type: HEADER_TYPES.topic,
      },
    },
    role: [],
  },
  {
    path: LINKS.screenName,
    component: ScreenName,
    settings: {
      sidebar: {
        display: false,
      },
      header: {
        display: false,
        type: HEADER_TYPES.topic,
      },
    },
    role: [],
  },
];

export default ROUTES;
