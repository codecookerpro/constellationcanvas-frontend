import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import SyncIcon from '@material-ui/icons/SyncOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHorizOutlined';

import { getBoard, getInviteCode, inviteUser, resendCode, updateUser, deleteUser } from 'actions';

import { UserTableContainer, TableDescription, InviteDialog, InviteButton, EditField, UserActionMenu, ConfirmDialog } from '../components';

import { TABLE_COLUMN_MAP } from '../constants';
import { HEADER_HEIGHT } from 'constants/user-interface';

const useStyles = makeStyles({
  root: {
    paddingLeft: 30,
    paddingRight: 60,
    paddingTop: 60,
    paddingBottom: 60,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  tableContainer: {
    maxHeight: `calc(100vh - ${HEADER_HEIGHT}px - 170px)`,
  },
  inviteCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default function FacilitatorUserManagement(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    users: allUsers,
    profile: { uuid: currentUser, boardUUID },
  } = useSelector((state) => state.auth);
  const users = useMemo(() => allUsers.filter((u) => u.uuid !== currentUser), [allUsers, currentUser]);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [menuState, setMenuState] = useState({
    id: null,
    anchorEl: null,
  });

  // eslint-disable-next-line
  useEffect(() => dispatch(getBoard()), []);

  const handleInviteDialogOpen = () => {
    setInviteDialogOpen(true);
  };

  const handleSubmit = (email) => {
    setTimeout(handleMenuClose, 200);
    setInviteDialogOpen(false);
    dispatch(inviteUser(email, boardUUID));
  };

  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setTimeout(handleMenuClose, 200);
    setConfirmDialogOpen(false);
  };

  const handleConfirm = () => {
    dispatch(deleteUser(menuState.id));
    handleConfirmDialogClose();
  };

  const handleUserChange = (id, type, value) => {
    dispatch(updateUser(id, { [type]: value }));
  };

  const handleSync = (id) => {
    dispatch(getInviteCode(id));
  };

  const handleMenuOpen = (e, id) => {
    setMenuState({
      id,
      anchorEl: e.currentTarget,
    });
  };

  const handleMenuClose = () => {
    setMenuState({
      id: null,
      anchorEl: null,
    });
  };

  const handleUserDelete = () => {
    handleConfirmDialogOpen();
  };

  const handleCodeResend = () => {
    dispatch(resendCode(menuState.id));
    handleMenuClose();
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.toolbar}>
        <TableDescription>{users.length} Users total</TableDescription>
        <InviteButton onClick={handleInviteDialogOpen}>Invite User</InviteButton>
      </Box>

      <UserTableContainer className={classes.tableContainer} alter>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {TABLE_COLUMN_MAP.map((column) => (
                <TableCell key={column.label} width={column.width}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uuid}>
                <TableCell>
                  <EditField value={user.email} handleChange={(value) => handleUserChange(user.uuid, 'email', value)} />
                </TableCell>
                <TableCell>
                  <EditField value={user.name} handleChange={(value) => handleUserChange(user.uuid, 'name', value)} />
                </TableCell>
                <TableCell>
                  <Box className={classes.inviteCell}>
                    {user.inviteCode}
                    <IconButton onClick={(e) => handleSync(user.uuid)}>
                      <SyncIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell style={{ textTransform: 'uppercase' }}>{user.type}</TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, user.uuid)}>
                    <MoreHorizIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <UserActionMenu anchorEl={menuState.anchorEl} keepMounted open={Boolean(menuState.anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleCodeResend}>Resend Code</MenuItem>
          <MenuItem onClick={handleUserDelete}>Delete User</MenuItem>
        </UserActionMenu>
      </UserTableContainer>

      <InviteDialog open={inviteDialogOpen} title="Invite User" onSubmit={handleSubmit} onClose={() => setInviteDialogOpen(false)} />

      <ConfirmDialog open={confirmDialogOpen} onClose={handleConfirmDialogClose} onSubmit={handleConfirm} title="Warning" />
    </Box>
  );
}
