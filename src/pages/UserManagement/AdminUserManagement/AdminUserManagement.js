import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';

import AdminUserManagementTable from './components/AdminUserManagementTable';
import InviteDialog from './components/InviteDialog';

import { USER_ROLES } from 'constants/user-roles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 60,
    paddingLeft: 30,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  label: {
    color: '#6c6c6e',
    fontSize: 16,
    fontWeight: 500,
    fontStyle: 'italic',
    letterSpacing: 0.56,
  },
  invite: {
    marginLeft: 'auto',
    padding: '7px 37px',
    color: 'white',
    backgroundColor: '#4a95d7',
    borderRadius: 9999,
    textTransform: 'capitalize',
  },
}));

const initialUsers = [
  {
    email: 'james@abc.com',
    screenName: 'James Smith',
    inviteCode: 'uond039283323',
    type: 'free',
    date: '2021-04-01',
    role: USER_ROLES.facilitator,
    open: false,
    users: [
      {
        email: 'sean@abc.com',
        screenName: 'Seen Call',
        inviteCode: '23908wevonowei',
        type: 'free',
        date: '2021-04-01',
        role: USER_ROLES.user,
      },
      {
        email: 'rob@abc.com',
        screenName: 'Rob Jones',
        inviteCode: '23908wevonowei',
        type: 'free',
        date: '2021-04-01',
        role: USER_ROLES.user,
      },
      {
        email: 'victor@abc.com',
        screenName: 'Victor Ashford',
        inviteCode: '23908wevonowei',
        type: 'free',
        date: '2021-04-01',
        role: USER_ROLES.user,
      },
    ],
  },
  {
    email: 'sean@abc.com',
    screenName: 'Amy Baker',
    inviteCode: '2948thsoeif0021',
    type: 'paid',
    date: '2021-05-02',
    role: USER_ROLES.facilitator,
    open: false,
    users: [],
  },
  {
    email: 'boris@abc.com',
    screenName: 'None',
    inviteCode: '2044ufns0392jm',
    type: 'free',
    date: '2021-05-02',
    role: USER_ROLES.facilitator,
    open: false,
    users: [],
  },
];

export default function AdminUserManagement(props) {
  const classes = useStyles();
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);

  const toggleOpen = (email, open) => {
    setUsers(
      users.map((user) =>
        user.email !== email
          ? user
          : {
              ...user,
              open,
            }
      )
    );
  };

  const userCount = users.map((user) => user.users?.length | 0).reduce((a, b) => a + b);

  return (
    <Box className={classes.root}>
      <Box className={classes.toolbar}>
        <Typography className={classes.label}>
          {users.length} Facilitators, {userCount} Users total
        </Typography>
        <Button className={classes.invite} startIcon={<PersonAddIcon fontSize="small" />} onClick={() => setOpen(true)}>
          Invite Facilitator
        </Button>
      </Box>
      <AdminUserManagementTable users={users} toggleOpen={toggleOpen} />
      <InviteDialog open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
}
