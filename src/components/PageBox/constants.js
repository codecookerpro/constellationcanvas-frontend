import { MyCanvasPanel, ParticipantPanel, ToolBoxPanel } from './PageSidebar/Panels';

import { USER_ROLES } from 'constants/user-roles';

export const SIDEBAR_ITEMS = [
  {
    title: 'MY CANVAS',
    role: [USER_ROLES.facilitator, USER_ROLES.user],
    component: MyCanvasPanel,
  },
  {
    title: 'TOOLBOX',
    role: [USER_ROLES.facilitator, USER_ROLES.user],
    component: ToolBoxPanel,
  },
  {
    title: 'PARTICIPANT',
    role: [USER_ROLES.facilitator, USER_ROLES.user],
    component: ParticipantPanel,
  },
  {
    title: 'USER MANAGEMENT',
    role: [USER_ROLES.facilitator, USER_ROLES.admin],
    path: '/user-management',
  },
];
