import { useSelector } from 'react-redux';

import { USER_MANAGEMENT_MAP as components } from './constants';

export default function UserManagement(props) {
  const role = useSelector((state) => state.profile.role);

  const Component = components[role];

  return <Component />;
}
