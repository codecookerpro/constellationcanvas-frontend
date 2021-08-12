import AdminUserManagement from './AdminUserManagement';
import FacilitatorUserManagement from './FacilitatorUserManagement';

import { USER_ROLES } from 'constants/user-roles';

export const USER_MANAGEMENT_MAP = {
  [USER_ROLES.admin]: AdminUserManagement,
  [USER_ROLES.facilitator]: FacilitatorUserManagement,
};
