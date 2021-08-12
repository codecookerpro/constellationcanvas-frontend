import { MyCanvasPanel, ParticipantPanel, ToolBoxPanel } from './Sidebar/Panels';
import { TopicHeader, TitleHeader } from './Header';

import { HEADER_TYPES, LOCATION_MAP } from 'constants/routes';
import { USER_ROLES } from 'constants/user-roles';
import { CANVAS_STATES } from 'reducers/constants';

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
    children: [
      {
        title: 'Current State',
        location: LOCATION_MAP.current,
        index: CANVAS_STATES.current,
      },
      {
        title: 'Future State 1',
        location: LOCATION_MAP.first,
        index: CANVAS_STATES.first,
      },
      {
        title: 'Future State 2',
        location: LOCATION_MAP.second,
        index: CANVAS_STATES.second,
      },
    ],
  },
  {
    title: 'TOOLBOX',
    type: SIDEBAR_ITEM_TYPES.toolbox,
    role: [USER_ROLES.facilitator, USER_ROLES.user],
    component: ToolBoxPanel,
  },
  {
    title: 'PARTICIPANT',
    type: SIDEBAR_ITEM_TYPES.participant,
    role: [USER_ROLES.facilitator, USER_ROLES.user],
    component: ParticipantPanel,
  },
  {
    title: 'USER MANAGEMENT',
    type: SIDEBAR_ITEM_TYPES.manage,
    role: [USER_ROLES.facilitator, USER_ROLES.admin],
    location: LOCATION_MAP.manage,
  },
];
