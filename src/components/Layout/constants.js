import { MyCanvasPanel, ParticipantPanel, ToolBoxPanel } from './Sidebar/Panels';
import { TopicHeader, TitleHeader } from './Header';

import { HEADER_TYPES, USER_ROLES } from 'utils/constants/enums';
import LINKS from 'utils/constants/links';

export const HEADER_MAP = {
  [HEADER_TYPES.topic]: TopicHeader,
  [HEADER_TYPES.title]: TitleHeader,
};

export const HEADER_TITLE_MAP = {
  [USER_ROLES.admin]: 'ADMINISTRATION CONTROL PANEL',
  [USER_ROLES.facilitator]: 'FACILITATOR CONTROL PANEL',
};

export const SIDEBAR_ITEM_TYPES = {
  canvas: 'canvas',
  toolbox: 'toolbox',
  participant: 'participant',
  manage: 'usermanagement',
};

export const SIDEBAR_ITEMS = [
  {
    title: 'MY CANVAS',
    type: SIDEBAR_ITEM_TYPES.canvas,
    role: [USER_ROLES.facilitator, USER_ROLES.user],
    component: MyCanvasPanel,
    children: [{ title: 'Current State' }, { title: 'Future State 1' }, { title: 'Future State 2' }],
    defaultExpand: ({ selectedParticipant, pathname }) => !selectedParticipant && pathname === LINKS.board,
  },
  {
    title: 'TOOLBOX',
    type: SIDEBAR_ITEM_TYPES.toolbox,
    role: [USER_ROLES.facilitator, USER_ROLES.user],
    component: ToolBoxPanel,
    defaultExpand: () => false,
  },
  {
    title: 'PARTICIPANT',
    type: SIDEBAR_ITEM_TYPES.participant,
    role: [USER_ROLES.facilitator],
    component: ParticipantPanel,
    defaultExpand: ({ selectedParticipant, pathname }) => selectedParticipant && pathname === LINKS.board,
  },
  {
    title: 'USER MANAGEMENT',
    type: SIDEBAR_ITEM_TYPES.manage,
    role: [USER_ROLES.facilitator, USER_ROLES.admin],
    path: LINKS.userManagement,
  },
];
